# ⚡ Guía RÁPIDA - Deploy en Render (5 Pasos)

## 🎯 Objetivo
Tener tu App Turística en línea en: `https://tu-app.onrender.com`

---

## Paso 1️⃣: GitHub (3 minutos)

### Si NO tienes cuenta GitHub:
1. Ve a **https://github.com** → Sign up
2. Verifica tu email

### Subir código:

**Opción A - Terminal (Rápida):**
```bash
cd app_turistica
git init
git add .
git commit -m "App Turística Colombia - Proyecto CUC"
git remote add origin https://github.com/TU_USUARIO/app-turistica.git
git push -u origin main
```

**Opción B - Manual:**
1. GitHub → New repository → `app-turistica`
2. Upload files → Arrastra carpeta completa
3. Commit

---

## Paso 2️⃣: Render.com (1 minuto)

1. Ve a **https://render.com**
2. **"Continue with GitHub"**
3. Autoriza Render

---

## Paso 3️⃣: Crear Web Service (1 minuto)

1. **New +** → **Web Service**
2. Selecciona tu repositorio `app-turistica`
3. **Connect**

---

## Paso 4️⃣: Configuración (30 segundos)

Solo cambia esto:

- **Name:** `app-turistica-colombia`
- **Start Command:** `gunicorn app:app`
- **Instance Type:** **Free**

Déjalo TODO lo demás como está.

**Create Web Service**

---

## Paso 5️⃣: ¡Espera! (2-3 minutos)

Render está:
- ✅ Instalando Python
- ✅ Instalando Flask
- ✅ Iniciando tu app

Cuando veas: **"Your service is live" ✅**

---

## 🎉 ¡LISTO!

Tu app está en:
```
https://app-turistica-colombia.onrender.com
```

**Comparte esta URL:**
- Funciona en celular ✅
- Funciona en tablet ✅
- Funciona en cualquier PC ✅
- Funciona 24/7 ✅

---

## 🔄 Actualizar después

```bash
git add .
git commit -m "Cambios"
git push
```

**Render actualiza automáticamente** 🚀

---

## ⚠️ IMPORTANTE

**Primera carga puede tardar 30-50 segundos** (plan free)

**Solución:** Abre tu app 10 min antes de presentar en clase.

---

## 📱 En Clase

1. Proyecta: `https://tu-app.onrender.com`
2. Pide a compañeros que accedan desde sus celulares
3. ¡Todos pueden usar la app al mismo tiempo!

---

**¿Problemas?** Lee `DEPLOY_RENDER.md` (guía completa)
