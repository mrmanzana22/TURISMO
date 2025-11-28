# 📂 App Turística Colombia - Proyecto CUC

**Carpeta preparada para deploy en Render.com**

---

## 📋 ESTRUCTURA DE ARCHIVOS

```
TURISMO/
│
├── 📄 LEEME_PRIMERO.md              ← ESTÁS AQUÍ - Lee esto primero
│
├── 🚀 GUÍAS DE DESPLIEGUE:
│   ├── GUIA_RAPIDA_RENDER.md        ← ⭐ EMPIEZA AQUÍ (5 pasos, 10 min)
│   ├── DEPLOY_RENDER.md             ← Guía completa con troubleshooting
│   ├── DEPLOY_PYTHONANYWHERE.md     ← Alternativa (más manual)
│   └── ARCHIVOS_PARA_SUBIR.txt      ← Lista de archivos necesarios
│
├── 💻 CÓDIGO PRINCIPAL:
│   ├── app.py                       ← Aplicación Flask principal
│   ├── requirements.txt             ← Dependencias (Flask, gunicorn)
│   ├── runtime.txt                  ← Versión de Python para Render
│   └── .gitignore                   ← Archivos a ignorar en Git
│
├── 🎨 FRONTEND (static/):
│   ├── css/
│   │   └── styles.css               ← Estilos modernos con animaciones
│   ├── js/
│   │   └── app.js                   ← Lógica frontend + filtros
│   └── pages/
│       ├── index.html               ← Página principal
│       └── reservas.html            ← Página de reservas
│
├── 💾 DATA:
│   └── data/
│       └── reservas.json            ← Almacén de reservas (JSON)
│
├── 📚 DOCUMENTACIÓN ACADÉMICA:
│   └── documentacion/
│       ├── 01-analisis-requisitos.md
│       ├── 02-casos-de-uso.md
│       ├── 03-diagramas-uml.md
│       ├── 04-manual-tecnico.md
│       ├── 05-manual-usuario.md
│       └── 06-presentacion-proyecto.md
│
└── 📖 README.md                     ← Documentación general del proyecto
```

---

## 🎯 ¿QUÉ HACER AHORA?

### OPCIÓN 1: Desplegar en Render.com (⭐ RECOMENDADO)

**Tiempo total: 10 minutos**

1. **Lee:** `GUIA_RAPIDA_RENDER.md`
2. Sube el código a GitHub
3. Conecta Render con GitHub
4. ¡Tu app estará en línea!

**Resultado:** `https://tu-app.onrender.com` (accesible 24/7)

---

### OPCIÓN 2: Probar localmente primero

```bash
# 1. Abre la terminal
cd ~/Desktop/TURISMO

# 2. Crea entorno virtual
python3 -m venv .venv
source .venv/bin/activate

# 3. Instala dependencias
pip install -r requirements.txt

# 4. Ejecuta la app
python app.py

# 5. Abre el navegador
# Ve a: http://localhost:5000
```

---

## ✅ CARACTERÍSTICAS DE LA APP

### Funcionalidades principales:
- ✅ **20 Sitios Turísticos** (10 en Barranquilla)
- ✅ **10 Hoteles** (5 en Barranquilla)
- ✅ **12 Opciones de Transporte**
- ✅ **Mapa Interactivo** (Leaflet.js + OpenStreetMap)
- ✅ **Sistema de Reservas** completo (CRUD)
- ✅ **Bilingüe** (Español/Inglés)
- ✅ **Filtros de Preferencias** (niños, mascotas, tipo de lugar)
- ✅ **Sistema de Recomendaciones** personalizado
- ✅ **Diseño Responsive** (móvil, tablet, desktop)
- ✅ **Modal de Confirmación** profesional con animaciones

### Tecnologías usadas:
- **Backend:** Python 3.10 + Flask 2.0
- **Frontend:** HTML5 + CSS3 + JavaScript ES6
- **UI Framework:** Bootstrap 5.3
- **Mapas:** Leaflet.js 1.9
- **Almacenamiento:** JSON (data/reservas.json)
- **Arquitectura:** REST API + MVC

---

## 📱 PARA PRESENTAR EN CLASE

1. Despliega en Render (10 min)
2. Comparte la URL con tus compañeros
3. Funciona en proyector, celular, cualquier dispositivo
4. Todos pueden acceder simultáneamente

**Demo en vivo:**
- Modal de bienvenida con filtros
- Sitios recomendados personalizados
- Crear reserva → confirmación animada
- Ver/eliminar reservas
- Mapa interactivo

---

## 🔧 ARCHIVOS TÉCNICOS IMPORTANTES

### `app.py`
- 20 sitios turísticos con datos completos
- 10 hoteles con precios y disponibilidad
- 12 opciones de transporte
- Sistema de reservas con persistencia
- API REST completa
- Fix del deadlock en threading

### `requirements.txt`
```
Flask>=2.0
gunicorn>=20.1.0
```

### `runtime.txt`
```
python-3.10.12
```

### `.gitignore`
Configurado para ignorar:
- `__pycache__/`, `.venv/`, archivos temporales
- Mantiene `data/` para estructura en GitHub

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### "No puedo crear reservas"
- Ya está SOLUCIONADO ✅
- Había un deadlock en el backend
- Ahora funciona perfectamente

### "El CSS/JS no carga en Render"
- Verifica estructura de carpetas
- `static/css/styles.css` ✅
- `static/js/app.js` ✅

### "Las reservas se borran en Render"
- Normal en plan FREE
- Render reinicia periódicamente
- Crea reservas antes de presentar

---

## 📞 SOPORTE

Si tienes problemas:

1. **Lee:** `DEPLOY_RENDER.md` (sección Troubleshooting)
2. **Verifica:** Logs en Render Dashboard
3. **Consulta:** Manual técnico en `documentacion/04-manual-tecnico.md`

---

## 🎓 INFORMACIÓN DEL PROYECTO

- **Curso:** Teoría de Sistemas
- **Universidad:** CUC (Corporación Universitaria de la Costa)
- **Tema:** Sistema de Información Turística para Extranjeros
- **Fecha:** Noviembre 2025
- **Objetivo:** Facilitar experiencia turística en Colombia

---

## 🏆 ÉXITO CON TU PRESENTACIÓN

**Checklist final:**
- [ ] Código probado localmente
- [ ] Desplegado en Render
- [ ] URL funciona
- [ ] Probado desde celular
- [ ] Documentación lista
- [ ] Preparado para preguntas técnicas

---

**¡Todo está listo! 🚀🇨🇴**

**Siguiente paso:** Abre `GUIA_RAPIDA_RENDER.md`
