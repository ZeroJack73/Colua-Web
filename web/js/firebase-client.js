// Conector e Inicializador del SDK de Firebase
class FirebaseClient {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    try {
      if (typeof firebase === 'undefined') {
        console.warn('SDK de Firebase no disponible aún.');
        return;
      }
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(window.COLUA_CONFIG.firebase);
      } else {
        this.app = firebase.app();
      }
      this.auth = firebase.auth();
      this.db   = firebase.firestore();
      this.isInitialized = true;
    } catch (e) {
      console.error('Error al inicializar Firebase:', e);
    }
  }

  // --- MÉTODOS DE AUTENTICACIÓN ---
  async loginWithEmail(email, password) {
    if (!this.auth) throw new Error('Firebase Auth no disponible.');
    return await this.auth.signInWithEmailAndPassword(email.trim(), password);
  }

  async registerWithEmail(email, password) {
    if (!this.auth) throw new Error('Firebase Auth no disponible.');
    return await this.auth.createUserWithEmailAndPassword(email.trim(), password);
  }

  async loginAnonymously() {
    if (!this.auth) throw new Error('Firebase Auth no disponible.');
    return await this.auth.signInAnonymously();
  }

  async sendPasswordReset(email) {
    if (!this.auth) throw new Error('Firebase Auth no disponible.');
    return await this.auth.sendPasswordResetEmail(email.trim());
  }

  async updateUserPassword(currentPassword, newPassword) {
    if (!this.auth || !this.auth.currentUser) throw new Error('No hay sesión activa para cambiar la contraseña.');
    const user = this.auth.currentUser;
    const email = user.email;
    if (email && currentPassword && typeof firebase !== 'undefined' && firebase.auth && firebase.auth.EmailAuthProvider) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
      await user.reauthenticateWithCredential(credential);
    }
    return await user.updatePassword(newPassword);
  }

  async logout() {
    if (!this.auth) return;
    return await this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth ? this.auth.currentUser : null;
  }

  onAuthStateChanged(callback) {
    if (!this.auth) return () => {};
    return this.auth.onAuthStateChanged(callback);
  }

  // --- HELPERS DE FIRESTORE ---
  collection(name) {
    if (!this.db) throw new Error('Firestore no disponible.');
    return this.db.collection(name);
  }

  async runTransaction(updateFunction) {
    if (!this.db) throw new Error('Firestore no disponible.');
    return await this.db.runTransaction(updateFunction);
  }

  serverTimestamp() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      return firebase.firestore.FieldValue.serverTimestamp();
    }
    return new Date();
  }
}

window.firebaseClient = new FirebaseClient();
