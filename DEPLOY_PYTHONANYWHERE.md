# 🌍 Guía de Despliegue en PythonAnywhere

## Paso 1️⃣: Crear Cuenta GRATIS en PythonAnywhere

1. Ve a: **https://www.pythonanywhere.com**
2. Clic en **"Start running Python online in less than a minute!"**
3. Clic en **"Create a Beginner account"** (GRATIS para siempre)
4. Llena el formulario:
   - Username: Elige un nombre (ej: `appturistica` o tu nombre)
   - Email: Tu correo
   - Password: Una contraseña segura
5. **IMPORTANTE**: Tu app estará en: `https://TU_USERNAME.pythonanywhere.com`

---

## Paso 2️⃣: Subir tu Código

### Opción A: Subir archivos manualmente (MÁS FÁCIL)

1. Una vez logeado, ve a **"Files"** en el menú superior
2. Crea una carpeta llamada: `app_turistica`
3. Entra a esa carpeta
4. Sube estos archivos UNO POR UNO:
   - `app.py`
   - `requirements.txt`

5. Crea las carpetas y sube archivos:
   - Crea carpeta `static/`
   - Dentro de `static/`, crea `css/`, `js/`, `pages/`
   - Sube `static/css/styles.css`
   - Sube `static/js/app.js`
   - Sube `static/pages/index.html`
   - Sube `static/pages/reservas.html`

6. Crea carpeta `data/` (aquí se guardarán las reservas)

### Opción B: Usar Git (Si tienes el código en GitHub)

1. Ve a **"Consoles"** → **"Bash"**
2. Ejecuta:
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git app_turistica
cd app_turistica
```

---

## Paso 3️⃣: Instalar Dependencias

1. Ve a **"Consoles"** → **"Bash"** (o usa la que ya abriste)
2. Ejecuta:
```bash
cd app_turistica
pip3 install --user -r requirements.txt
```

Espera a que termine (puede tardar 1-2 minutos)

---

## Paso 4️⃣: Configurar la Web App

1. Ve a **"Web"** en el menú superior
2. Clic en **"Add a new web app"**
3. Clic en **"Next"** (acepta el dominio gratuito)
4. Selecciona **"Manual configuration"**
5. Selecciona **Python 3.10** (o la versión más reciente)
6. Clic en **"Next"**

### Configuración WSGI:

7. En la página de configuración, busca la sección **"Code"**
8. En **"Source code"**, pon: `/home/TU_USERNAME/app_turistica`
9. En **"Working directory"**, pon: `/home/TU_USERNAME/app_turistica`

10. Clic en el enlace **"WSGI configuration file"** (algo como `/var/www/tuusername_pythonanywhere_com_wsgi.py`)

11. **BORRA TODO** el contenido del archivo y pega esto:

```python
import sys
import os

# Agregar tu directorio al path
path = '/home/TU_USERNAME/app_turistica'
if path not in sys.path:
    sys.path.append(path)

# Cambiar directorio de trabajo
os.chdir(path)

# Importar tu app
from app import app as application
```

⚠️ **IMPORTANTE**: Reemplaza `TU_USERNAME` con tu nombre de usuario real

12. Clic en **"Save"** (arriba a la derecha)

---

## Paso 5️⃣: Activar la App

1. Regresa a la pestaña **"Web"**
2. Scroll arriba y clic en el botón verde grande: **"Reload tuusername.pythonanywhere.com"**
3. Espera 10 segundos

---

## Paso 6️⃣: ¡Probar tu App!

1. Ve a: **https://TU_USERNAME.pythonanywhere.com**
2. ¡Deberías ver tu App Turística funcionando! 🎉

---

## 🔧 Solución de Problemas

### Si ves un error 500:
1. Ve a **"Web"** → **"Log files"**
2. Clic en **"Error log"**
3. Busca el error al final del archivo
4. Usualmente es porque:
   - No instalaste Flask: `pip3 install --user Flask`
   - Ruta incorrecta en el WSGI file
   - No pusiste tu username correcto

### Si no carga el CSS/JS:
1. Ve a **"Web"** → **"Static files"**
2. Agrega:
   - URL: `/static/`
   - Directory: `/home/TU_USERNAME/app_turistica/static/`

---

## 📱 Acceso desde Celular/Tablet

1. Comparte la URL: `https://TU_USERNAME.pythonanywhere.com`
2. Funciona en **cualquier dispositivo** con internet
3. **NO necesitas que tu computadora esté encendida**
4. Disponible **24/7** gratis

---

## 🔄 Actualizar tu App

Cuando hagas cambios al código:

1. Ve a **"Files"** y sube el archivo modificado
2. Ve a **"Web"**
3. Clic en **"Reload"**
4. ¡Listo! Los cambios están en vivo

---

## ✅ Checklist para la Presentación en la U

- [ ] Cuenta creada en PythonAnywhere
- [ ] Código subido completamente
- [ ] Flask instalado
- [ ] WSGI configurado correctamente
- [ ] App funcionando en: `https://TU_USERNAME.pythonanywhere.com`
- [ ] Probado desde celular
- [ ] URL compartida con el profesor/compañeros

---

## 🎓 Para Mostrar en Clase

Simplemente abre en el navegador:
```
https://TU_USERNAME.pythonanywhere.com
```

- Funciona en **proyector**
- Funciona en **celular**
- Funciona en **cualquier PC**
- **Sin necesidad de instalar nada**

---

**¡Éxito con tu proyecto! 🚀🇨🇴**
