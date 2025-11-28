# 🚀 Guía Completa: Desplegar en Render.com

## ⚡ Por qué Render es PERFECTO para este proyecto:

- ✅ Deploy automático desde GitHub
- ✅ GRATIS (750 horas/mes)
- ✅ Soporta Flask nativamente
- ✅ URL profesional: `https://tu-app.onrender.com`
- ✅ SSL/HTTPS automático (seguro)
- ✅ Deploy en 5 minutos
- ✅ Actualizaciones automáticas cuando subes código

---

# 📋 PARTE 1: Subir Código a GitHub

## Paso 1.1: Crear cuenta en GitHub (si no tienes)

1. Ve a: **https://github.com**
2. Clic en **"Sign up"**
3. Crea tu cuenta gratis
4. Verifica tu email

## Paso 1.2: Crear un nuevo repositorio

1. Una vez logeado, clic en el **+** (arriba derecha) → **"New repository"**
2. Nombre: `app-turistica-colombia` (o el que prefieras)
3. Descripción: "Sistema de información turística para extranjeros - Proyecto CUC"
4. **PUBLIC** (gratis) o Private (tu eliges)
5. **NO** marques "Add a README"
6. Clic en **"Create repository"**

## Paso 1.3: Subir tu código a GitHub

### Opción A: Desde la terminal (Recomendado - más rápido)

Abre la terminal en la carpeta de tu proyecto y ejecuta:

```bash
# 1. Inicializar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit - App Turística Colombia"

# 4. Conectar con tu repositorio (CAMBIA LA URL por la tuya)
git remote add origin https://github.com/TU_USUARIO/app-turistica-colombia.git

# 5. Subir el código
git push -u origin main
```

**NOTA:** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub

### Opción B: Subir archivos manualmente (más lento pero más simple)

1. En la página de tu repositorio nuevo en GitHub
2. Clic en **"uploading an existing file"**
3. Arrastra y suelta TODOS estos archivos:
   - `app.py`
   - `requirements.txt`
   - `runtime.txt`
   - Carpeta `static/` completa (con css, js, pages)
   - Carpeta `data/` (puede estar vacía)
4. Clic en **"Commit changes"**

---

# 📋 PARTE 2: Desplegar en Render

## Paso 2.1: Crear cuenta en Render

1. Ve a: **https://render.com**
2. Clic en **"Get Started"**
3. **Opción recomendada:** Clic en **"Continue with GitHub"**
   - Esto conecta automáticamente tu cuenta de GitHub
4. Autoriza Render para acceder a tus repositorios

## Paso 2.2: Crear un nuevo Web Service

1. Una vez dentro de Render, clic en **"New +"** (arriba derecha)
2. Selecciona **"Web Service"**
3. Busca tu repositorio: `app-turistica-colombia`
4. Clic en **"Connect"**

## Paso 2.3: Configurar el servicio

Llena el formulario con estos datos:

### **Name:**
```
app-turistica-colombia
```
(Este será parte de tu URL: `app-turistica-colombia.onrender.com`)

### **Region:**
```
Oregon (US West)
```
(El más cercano a Colombia, pero cualquiera funciona)

### **Branch:**
```
main
```

### **Runtime:**
```
Python 3
```
(Se detecta automáticamente)

### **Build Command:**
```
pip install -r requirements.txt
```
(Se llena automáticamente)

### **Start Command:**
```
gunicorn app:app
```
**IMPORTANTE:** Escribe esto exactamente

### **Instance Type:**
```
Free
```
✅ Selecciona el plan FREE

---

## Paso 2.4: Variables de Entorno (Opcional)

Por ahora NO necesitas agregar ninguna.

---

## Paso 2.5: Deploy! 🚀

1. Scroll hasta abajo
2. Clic en **"Create Web Service"**
3. **Espera 2-3 minutos** mientras Render:
   - ✅ Clona tu código
   - ✅ Instala Python
   - ✅ Instala Flask y gunicorn
   - ✅ Inicia tu app
4. Verás logs en tiempo real
5. Cuando veas: ✅ **"Your service is live"**
6. **¡LISTO!** Tu app está en: `https://app-turistica-colombia.onrender.com`

---

# 🎯 Acceder a tu App

Tu URL pública será:
```
https://NOMBRE-QUE-ELEGISTE.onrender.com
```

**Ejemplo:** `https://app-turistica-colombia.onrender.com`

- Funciona en **cualquier dispositivo**
- Celular, tablet, PC, proyector
- **SSL/HTTPS** automático (candado verde)
- **24/7** disponible

---

# 🔄 Actualizar tu App

Cuando hagas cambios al código:

### Si usaste Git:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

**¡Render detecta automáticamente y hace redeploy!**

### Si subiste manualmente:
1. Ve a tu repositorio en GitHub
2. Edita el archivo que quieres cambiar
3. Commit changes
4. **Render detecta el cambio y redeploy automáticamente**

---

# ⚠️ IMPORTANTE: Plan Free de Render

### ✅ Ventajas:
- Completamente gratis
- 750 horas/mes (suficiente para tu proyecto)
- Todo funciona perfecto

### ⚠️ Limitación:
- Después de **15 minutos de inactividad**, la app "duerme"
- Primera carga después de dormir toma **30-50 segundos**
- Cargas siguientes son instantáneas

### 💡 Solución para Presentación:
1. **10 minutos antes de presentar**, abre la URL en tu navegador
2. Esto "despierta" la app
3. Durante tu presentación, estará super rápida

---

# 🔧 Solución de Problemas

## Error: "Application failed to respond"

**Solución:**
1. Ve a tu servicio en Render
2. Verifica el **"Start Command"**: debe ser `gunicorn app:app`
3. Verifica que `requirements.txt` incluya `gunicorn`

## Error: "ModuleNotFoundError: No module named 'flask'"

**Solución:**
1. Verifica que `requirements.txt` exista en tu repositorio
2. Debe contener al menos:
   ```
   Flask>=2.0
   gunicorn>=20.1.0
   ```

## La app carga pero no se ve el CSS/JS

**Solución:**
1. Verifica que la carpeta `static/` esté en GitHub
2. Verifica que los archivos estén en:
   - `static/css/styles.css`
   - `static/js/app.js`
   - `static/pages/index.html`
   - `static/pages/reservas.html`

## Las reservas se borran

**Esto es NORMAL en el plan Free:**
- Render reinicia el servidor periódicamente
- Las reservas en `data/reservas.json` se pierden
- Es una **limitación del plan gratuito**

**Soluciones:**
1. Para DEMO: Crea reservas justo antes de presentar
2. Para PRODUCCIÓN real: Usar PostgreSQL (Render tiene guía)

---

# 📱 Demo en Clase

### Antes de presentar:
1. ✅ Abre tu URL 10 min antes
2. ✅ Crea 2-3 reservas de ejemplo
3. ✅ Prueba desde tu celular

### Durante la presentación:
1. Proyecta la URL
2. Muestra las funcionalidades:
   - ✅ Modal de bienvenida con filtros
   - ✅ Sitios turísticos con recomendaciones
   - ✅ Mapa interactivo
   - ✅ Crear reserva → confirmación profesional
   - ✅ Ver reservas
   - ✅ Eliminar reserva
3. **Bonus:** Pide a compañeros que accedan desde sus celulares

---

# 📊 Estructura de Archivos Necesaria en GitHub

```
app-turistica-colombia/
├── app.py                    ✅ Código principal Flask
├── requirements.txt          ✅ Dependencias (Flask, gunicorn)
├── runtime.txt              ✅ Versión de Python
├── static/
│   ├── css/
│   │   └── styles.css       ✅
│   ├── js/
│   │   └── app.js           ✅
│   └── pages/
│       ├── index.html       ✅
│       └── reservas.html    ✅
└── data/
    └── reservas.json        ⚠️ (se puede crear vacío)
```

---

# ✅ Checklist Final

Antes de presentar, verifica:

- [ ] Código subido a GitHub
- [ ] Servicio creado en Render
- [ ] Start Command: `gunicorn app:app`
- [ ] Deploy exitoso (estado: "Live")
- [ ] URL funciona: `https://tu-app.onrender.com`
- [ ] Modal de bienvenida funciona
- [ ] Sitios se cargan correctamente
- [ ] Mapa muestra marcadores
- [ ] Crear reserva funciona
- [ ] Modal de confirmación aparece
- [ ] Ver reservas funciona
- [ ] Eliminar reserva funciona
- [ ] Funciona desde celular

---

# 🎓 Para Explicar en la Presentación

**"¿Cómo funciona el deployment?"**

1. Tenemos el código en **GitHub** (repositorio de código)
2. **Render.com** se conecta con GitHub
3. Cuando subimos cambios a GitHub, Render automáticamente:
   - Descarga el código nuevo
   - Instala las dependencias (Flask, gunicorn)
   - Reinicia el servidor
4. Render usa **gunicorn** (servidor de producción para Python)
5. La app está disponible 24/7 en la nube
6. Accesible desde cualquier dispositivo con internet

**"¿Por qué no localhost?"**
- `localhost` solo funciona en TU computadora
- Con Render, la app está en un **servidor en la nube**
- Cualquiera con internet puede acceder
- Ideal para apps reales

---

# 🔗 Links Útiles

- **Render Dashboard:** https://dashboard.render.com
- **GitHub:** https://github.com
- **Documentación Render:** https://render.com/docs/web-services

---

**¡Éxito con tu presentación! 🚀🇨🇴**

Si tienes problemas, revisa los logs en Render:
**Dashboard → Tu servicio → Logs**
