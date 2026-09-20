// Módulo de Autenticación, Seguridad y Gestión de Sesiones
class AuthManager {
  constructor() {
    this.fb = window.firebaseClient;
    this.repo = window.coluaRepository;
    this.sessionTimeoutMs = 2 * 60 * 60 * 1000; // 2 horas
  }

  // --- HASHING Y CLAVE MAESTRA ---
  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async checkAdminMasterPassword(input) {
    if (!input || !input.trim()) return false;
    const cleanInput = input.trim();
    const inputHash = await this.sha256(cleanInput);
    
    // Hash predeterminado de '1234'
    const defaultHash = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
    const customStoredHash = localStorage.getItem('admin_master_hash');
    
    let matches = false;
    if (customStoredHash) {
      matches = (inputHash.toLowerCase() === customStoredHash.toLowerCase());
    } else {
      matches = (inputHash.toLowerCase() === defaultHash.toLowerCase()) || (cleanInput === '1234');
    }

    if (matches) {
      this.setAdminSessionActive(true);
    }
    return matches;
  }

  async updateMasterPassword(newPassword) {
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, error: 'La nueva Clave Universal debe tener al menos 4 caracteres' };
    }
    const cleanPass = newPassword.trim();
    const newHash = await this.sha256(cleanPass);
    localStorage.setItem('admin_master_hash', newHash);

    if (window.coluaRepo && typeof window.coluaRepo.updateGlobalConfig === 'function') {
      await window.coluaRepo.updateGlobalConfig({ master_admin_password_hash: newHash });
    }
    if (window.coluaRepo && typeof window.coluaRepo.logAudit === 'function') {
      await window.coluaRepo.logAudit({
        action: 'ACTUALIZAR_CLAVE_UNIVERSAL',
        performedBy: this.getCurrentUser()?.nombre || 'Super Administrador',
        details: 'Se actualizó la Clave Universal Institucional con cifrado SHA-256'
      });
    }
    return { success: true };
  }

  setAdminSessionActive(active) {
    if (active) {
      sessionStorage.setItem('admin_session_active', 'true');
      sessionStorage.setItem('admin_session_timestamp', String(Date.now()));
    } else {
      sessionStorage.removeItem('admin_session_active');
      sessionStorage.removeItem('admin_session_timestamp');
    }
  }

  isAdminSessionActive() {
    const active = sessionStorage.getItem('admin_session_active') === 'true';
    if (!active) return false;

    const last = parseInt(sessionStorage.getItem('admin_session_timestamp') || '0', 10);
    const elapsed = Date.now() - last;
    if (elapsed > this.sessionTimeoutMs) {
      this.setAdminSessionActive(false);
      return false;
    }
    sessionStorage.setItem('admin_session_timestamp', String(Date.now()));
    return true;
  }

  // --- REGLAS Y FORMATO DE DPI ---
  formatDpi(raw) {
    const digits = (raw || '').replace(/\D/g, '');
    if (digits.length <= 4) return digits;
    if (digits.length <= 9) return `${digits.substring(0, 4)} ${digits.substring(4)}`;
    return `${digits.substring(0, 4)} ${digits.substring(4, 9)} ${digits.substring(9, 13)}`;
  }

  isValidDpi(raw) {
    const digits = (raw || '').replace(/\D/g, '');
    return digits.length === 13;
  }

  // --- POLÍTICAS DE CONTRASEÑA ---
  checkPasswordPolicy(pass) {
    if (!pass) return { valid: false, length: false, cases: false, numSpecial: false };
    const length = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasDigit = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9\s]/.test(pass);

    const cases = hasUpper && hasLower;
    const numSpecial = hasDigit && hasSpecial;
    return {
      valid: length && cases && numSpecial,
      length,
      cases,
      numSpecial
    };
  }

  generateStrongPassword() {
    const uppers = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowers = "abcdefghijkmnopqrstuvwxyz";
    const digits = "23456789";
    const specials = "!@#$%^&*()_+-=";

    const rand = (str) => str.charAt(Math.floor(Math.random() * str.length));
    return `Colua${rand(specials)}${Math.floor(100 + Math.random() * 900)}${rand(uppers)}${rand(specials)}${rand(lowers)}`;
  }

  // --- SESIÓN DEL ASOCIADO O INVITADO ---
  getCurrentSession() {
    const raw = localStorage.getItem('UserPrefs') || sessionStorage.getItem('UserPrefs');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  saveUserSession(user, remember = true) {
    const data = {
      user_id: user.userId || user.user_id,
      user_name: user.nombre || user.user_name || "Asociado",
      user_phone: user.telefono || user.user_phone || "",
      user_dpi: user.dpi || user.user_dpi || "",
      user_email: user.email || user.user_email || "",
      user_role: user.role || user.user_role || "MEMBER",
      tipoUsuario: user.tipoUsuario || (user.role === 'GUEST' ? 'INVITADO' : 'ASOCIADO'),
      timestamp: Date.now()
    };
    const str = JSON.stringify(data);
    if (remember) {
      localStorage.setItem('UserPrefs', str);
    } else {
      sessionStorage.setItem('UserPrefs', str);
    }
  }

  // Alias para compatibilidad
  verifyMasterPassword(input) {
    return this.checkAdminMasterPassword(input);
  }

  formatDPI(raw) {
    return this.formatDpi(raw);
  }

  validateDPI(raw) {
    return this.isValidDpi(raw);
  }

  logout() {
    return this.clearSession();
  }

  async loginWithEmail(email, password) {
    if (!password) return { success: false, error: 'Ingresa la contraseña o clave' };
    const cleanPass = password.trim();
    const cleanEmail = (email || '').trim().toLowerCase();

    // 1. Verificación de Clave Universal Institucional (Acceso Super Admin)
    const isMaster = await this.checkAdminMasterPassword(cleanPass);
    if (isMaster) {
      this.currentAdminSession = {
        user: { uid: 'master_superadmin', email: cleanEmail || 'admin@colua.com.gt', role: 'superadmin', nombre: 'Super Administrador' },
        loginTime: Date.now()
      };
      this.setAdminSessionActive(true);
      this.saveUserSession({
        userId: 'admin_colua_master',
        nombre: 'Super Administrador',
        email: cleanEmail || 'admin@colua.com.gt',
        role: 'SUPER_ADMIN'
      });
      return { success: true, user: this.currentAdminSession.user };
    }

    // 2. Verificación de Administradores y Managers autorizados en el Repositorio
    if (window.coluaRepo && typeof window.coluaRepo.getAllUsers === 'function') {
      try {
        const users = await window.coluaRepo.getAllUsers();
        const matched = users.find(u => {
          const uEmail = (u.email || '').toLowerCase().trim();
          const uNombre = (u.nombre || '').toLowerCase().trim();
          const matchId = (cleanEmail && (uEmail === cleanEmail || uNombre.includes(cleanEmail)));
          const matchPass = (u.password ? (u.password === cleanPass) : (cleanPass === '123456'));
          return matchId && matchPass;
        });

        if (matched) {
          const userRole = (matched.role || 'manager').toLowerCase();
          this.currentAdminSession = {
            user: {
              uid: matched.uid || matched.id || 'usr_' + Date.now(),
              email: matched.email || cleanEmail,
              role: userRole,
              nombre: matched.nombre || 'Administrador'
            },
            loginTime: Date.now()
          };
          this.setAdminSessionActive(true);
          this.saveUserSession({
            userId: matched.uid || matched.id || 'usr_' + Date.now(),
            nombre: matched.nombre || 'Administrador',
            email: matched.email || cleanEmail,
            role: userRole === 'superadmin' ? 'SUPER_ADMIN' : (userRole === 'admin' ? 'ADMIN' : 'MANAGER')
          });
          return { success: true, user: this.currentAdminSession.user };
        }
      } catch (e) {
        console.warn('Error validando usuario administrativo local:', e);
      }
    }

    // 3. Verificación vía Firebase Auth
    if (this.fb && typeof this.fb.loginWithEmail === 'function') {
      try {
        const cred = await this.fb.loginWithEmail(email, password);
        const mail = (cred.user && cred.user.email) || email || '';
        this.saveUserSession({
          userId: (cred.user && cred.user.uid) || 'uid_' + Date.now(),
          nombre: mail.split('@')[0],
          email: mail,
          role: 'ADMIN'
        });
        return { success: true, user: cred.user };
      } catch (e) {
        return { success: false, error: e.message || 'Credenciales no válidas' };
      }
    }

    return { success: false, error: 'Credenciales no válidas o no autorizadas' };
  }

  async registerMember(data) {
    const rawDpi = (data.dpi || '').replace(/\D/g, '');
    if (!this.isValidDpi(rawDpi)) {
      return { success: false, error: 'El DPI debe tener exactamente 13 dígitos numéricos' };
    }
    const associateNum = Math.floor(1000 + Math.random() * 9000);
    const associateId = `00${associateNum}5`;
    const newUser = {
      userId: 'asoc_' + rawDpi,
      nombre: data.name || 'Asociado COLUA',
      telefono: data.phone || '',
      dpi: rawDpi,
      email: data.email || '',
      role: 'asociado',
      associateId: associateId,
      tipoUsuario: 'ASOCIADO'
    };
    this.saveUserSession(newUser, true);
    return { success: true, associateId, user: newUser };
  }

  clearSession() {
    localStorage.removeItem('UserPrefs');
    sessionStorage.removeItem('UserPrefs');
    this.currentAdminSession = null;
    this.setAdminSessionActive(false);
    if (this.fb && typeof this.fb.logout === 'function') this.fb.logout();
  }

  isLoggedIn() {
    const session = this.getCurrentSession();
    return session !== null;
  }

  isSuperAdmin() {
    if (this.currentAdminSession?.user?.role === 'superadmin' || this.currentAdminSession?.user?.role === 'SUPER_ADMIN') return true;
    const s = this.getCurrentSession();
    if (!s) return false;
    const role = (s.user_role || '').toLowerCase();
    return role === 'super_admin' || role === 'superadmin';
  }

  isManager() {
    if (this.currentAdminSession?.user?.role === 'manager' || this.currentAdminSession?.user?.role === 'MANAGER') return true;
    const s = this.getCurrentSession();
    if (!s) return false;
    const role = (s.user_role || '').toLowerCase();
    return role === 'manager';
  }

  isAdmin() {
    if (this.currentAdminSession) return true;
    if (this.isAdminSessionActive()) return true;
    const s = this.getCurrentSession();
    if (!s) return false;
    const role = (s.user_role || '').toLowerCase();
    return this.isSuperAdmin() || this.isManager() || role === 'admin' || role === 'super_admin' || role === 'superadmin' || role === 'manager';
  }

  isGuest() {
    const s = this.getCurrentSession();
    if (!s) return true;
    return s.user_role === 'GUEST' || (s.user_id || '').startsWith('guest_');
  }

  getCurrentUser() {
    const s = this.getCurrentSession();
    if (!s) return null;
    return {
      uid: s.user_id,
      userId: s.user_id,
      nombre: s.user_name,
      displayName: s.user_name,
      email: s.user_email,
      role: s.user_role,
      tipoUsuario: s.tipoUsuario,
      phone: s.user_phone,
      dpi: s.user_dpi,
      associateId: s.associateId || '0010025'
    };
  }
}

window.authManager = new AuthManager();
window.authService = window.authManager;
