// Cliente y Gestor de Almacenamiento Supabase Storage (Equivalente a SupabaseStorageManager.kt)
class SupabaseStorageManager {
  constructor() {
    this.url = window.COLUA_CONFIG.supabase.url;
    this.key = window.COLUA_CONFIG.supabase.anonKey;
    this.buckets = window.COLUA_CONFIG.supabase.buckets;
    this.defaultBucket = window.COLUA_CONFIG.supabase.defaultBucket;
  }

  // Comprimir imagen a JPEG con canvas antes de subir
  async compressImage(file, maxDimension = 800, quality = 0.75) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          const maxCurr = Math.max(width, height);
          if (maxCurr > maxDimension) {
            const scale = maxDimension / maxCurr;
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({ blob, dataUrl: canvas.toDataURL('image/jpeg', quality) });
              } else {
                reject(new Error('Fallo al comprimir imagen.'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Archivo de imagen no válido.'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo.'));
      reader.readAsDataURL(file);
    });
  }

  // Subir imagen a Supabase Storage con reintentos y fallback a Base64
  async uploadImage(file, onProgress = () => {}) {
    try {
      onProgress('Comprimiendo imagen...');
      const { blob, dataUrl } = await this.compressImage(file);

      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `colua_${timestamp}_${randomStr}.jpg`;

      onProgress('Subiendo a Supabase Storage...');

      // Probar buckets configurados
      for (const bucket of this.buckets) {
        try {
          const uploadEndpoint = `${this.url}/storage/v1/object/${bucket}/${fileName}`;
          const response = await fetch(uploadEndpoint, {
            method: 'POST',
            headers: {
              'apikey': this.key,
              'Authorization': `Bearer ${this.key}`,
              'Content-Type': 'image/jpeg',
              'x-upsert': 'true'
            },
            body: blob
          });

          if (response.ok) {
            const publicUrl = `${this.url}/storage/v1/object/public/${bucket}/${fileName}`;
            console.log(`✓ Imagen subida exitosamente al bucket '${bucket}': ${publicUrl}`);
            return { success: true, url: publicUrl, type: 'cloud' };
          }
        } catch (bucketError) {
          console.warn(`Error en bucket '${bucket}':`, bucketError.message);
        }
      }

      // Fallback a Data URI en Base64 para garantizar que nunca se pierda la imagen
      console.warn('Supabase Storage restringido por RLS. Usando Cloud Data URI en Base64 como fallback.');
      return { success: true, url: dataUrl, type: 'data_uri' };

    } catch (e) {
      console.error('Error general al procesar imagen:', e);
      return { success: false, error: e.message };
    }
  }

  // Limpiar y formatear etiqueta para visualización amigable
  getShortDisplayLabel(path) {
    if (!path || !path.trim()) return '';
    const clean = path.trim();
    if (clean.startsWith('data:image/')) return '📷 imagen_subida_nube.jpg';
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      const last = clean.split('/').pop() || '';
      return '☁️ ' + (last.length > 25 ? last.substring(0, 22) + '...' : last);
    }
    return clean;
  }

  // Resolver ruta de imagen (sea URL remota, Data URI, JSON o Drawable fotográfico)
  resolveImageUrl(path, fallbackDrawable = 'assets/noticia_reforestacion.jpg') {
    if (!path || !path.trim()) return fallbackDrawable;
    let clean = path.trim();

    // Si viene empaquetado como JSON o array de fotos: e.g. "[data:image/jpeg;base64,...]"
    if (clean.startsWith('[') && clean.endsWith(']')) {
      try {
        const parsed = JSON.parse(clean);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]) {
          clean = parsed[0].trim();
        }
      } catch (e) {
        // En caso de formato semi-json no estándar "[data:...]"
        const match = clean.match(/(data:image\/[a-zA-Z0-9+]+;base64,[^\s,\]]+|https?:\/\/[^\s,\]]+)/);
        if (match && match[1]) {
          clean = match[1];
        }
      }
    }

    if (clean.startsWith('data:image/') || clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }

    // Mapeo contextual de nombres clave a fotos de alta resolución
    const lower = clean.toLowerCase();
    if (lower === 'grupo' || lower.includes('reforesta')) {
      return 'assets/noticia_reforestacion.jpg';
    }
    if (lower === 'sostenibilidad_cooperativa' || lower.includes('taller') || lower.includes('finanza')) {
      return 'assets/noticia_taller_finanzas.jpg';
    }
    if (lower === 'noticias_colua' || lower.includes('asamblea')) {
      return 'assets/noticia_asamblea_general.jpg';
    }
    if (lower === 'valores_colua' || lower === 'valores_colua_1') {
      return 'assets/valores_colua.png';
    }

    // Si ya incluye ruta assets
    if (clean.startsWith('assets/')) return clean;
    return `assets/${clean}.png`;
  }
}

window.supabaseStorageManager = new SupabaseStorageManager();
