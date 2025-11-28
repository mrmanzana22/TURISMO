# Presentación del Proyecto
# App Turística Colombia

**Sistema de Información Turística para Extranjeros**

---

## 👥 Equipo de Desarrollo

**Curso:** Teoría de Sistemas
**Universidad:** CUC (Corporación Universitaria de la Costa)
**Fecha:** Noviembre 2025

---

## 📋 Índice

1. Introducción y Problemática
2. Objetivos del Proyecto
3. Alcance y Audiencia Objetivo
4. Análisis de Requisitos
5. Arquitectura del Sistema
6. Tecnologías Utilizadas
7. Funcionalidades Implementadas
8. Demostración del Sistema
9. Modelo de Datos
10. Casos de Uso
11. Seguridad y Buenas Prácticas
12. Resultados y Logros
13. Trabajo Futuro
14. Conclusiones
15. Preguntas y Respuestas

---

## 1. Introducción y Problemática 🌎

### El Problema

Los turistas extranjeros que visitan Colombia enfrentan varios desafíos:

❌ **Falta de información centralizada** sobre sitios turísticos
❌ **Barreras de idioma** (español/inglés)
❌ **Desconocimiento de precios** y requisitos de ingreso
❌ **Dificultad para ubicar** lugares de interés
❌ **Información dispersa** en múltiples fuentes
❌ **No saben cómo moverse** (transporte local)
❌ **Difícil encontrar alojamiento** confiable

### La Solución

Una **aplicación web integral** que centraliza toda la información turística necesaria en un solo lugar, con soporte multiidioma y fácil de usar.

---

## 2. Objetivos del Proyecto 🎯

### Objetivo General

Desarrollar un sistema de información turística web que facilite a extranjeros la **exploración, planificación y reservación** de experiencias turísticas en Colombia, con especial énfasis en Barranquilla.

### Objetivos Específicos

1. ✅ **Centralizar información** de sitios turísticos, hoteles y transporte
2. ✅ **Implementar sistema de reservas** funcional y persistente
3. ✅ **Integrar mapas interactivos** para visualización geográfica
4. ✅ **Proveer soporte bilingüe** (Español/Inglés)
5. ✅ **Diseñar interfaz intuitiva** y responsive
6. ✅ **Documentar el sistema** según metodología de Teoría de Sistemas

---

## 3. Alcance y Audiencia 🎪

### Alcance del Sistema

**Funcionalidades Incluidas:**
- Catálogo de 20 sitios turísticos en Colombia
- 10 hoteles con precios y disponibilidad
- 12 opciones de transporte local e interurbano
- Sistema completo de reservas (CRUD)
- Mapas interactivos con Leaflet.js
- Interfaz bilingüe (ES/EN)
- Diseño responsive para móviles

**Limitaciones:**
- No incluye sistema de pagos
- No requiere autenticación de usuario
- Base de datos en JSON (no SQL)

### Audiencia Objetivo

👤 **Primaria:**
- Turistas extranjeros visitando Colombia
- Viajeros internacionales planificando su viaje

👤 **Secundaria:**
- Turistas locales explorando su región
- Agencias de turismo

---

## 4. Análisis de Requisitos 📊

### Requisitos Funcionales Implementados

| ID | Requisito | Estado |
|----|-----------|--------|
| RF-001 | Gestión de sitios turísticos | ✅ Completo |
| RF-002 | Sistema de reservas | ✅ Completo |
| RF-003 | Información de hotelería | ✅ Completo |
| RF-004 | Opciones de transporte | ✅ Completo |
| RF-005 | Soporte multiidioma | ✅ Completo |
| RF-006 | Visualización en mapas | ✅ Completo |

### Requisitos No Funcionales

✅ **Usabilidad:** Interfaz intuitiva con Bootstrap
✅ **Rendimiento:** Carga < 3 segundos
✅ **Disponibilidad:** 99% uptime
✅ **Portabilidad:** Compatible cross-browser
✅ **Mantenibilidad:** Código modular y documentado

---

## 5. Arquitectura del Sistema 🏗️

### Arquitectura de 3 Capas

```
┌──────────────────────────────────────┐
│     CAPA DE PRESENTACIÓN             │
│  • HTML5 / CSS3 / JavaScript         │
│  • Bootstrap 5.3                     │
│  • Leaflet.js (Mapas)                │
│  • Responsive Design                 │
└──────────────────┬───────────────────┘
                   │ HTTP/REST
┌──────────────────▼───────────────────┐
│    CAPA DE APLICACIÓN                │
│  • Flask (Python 3.8+)               │
│  • API RESTful                       │
│  • Lógica de Negocio                 │
│  • Validaciones                      │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│    CAPA DE PERSISTENCIA              │
│  • Almacenamiento JSON               │
│  • Listas en Memoria (RAM)           │
│  • Threading Locks                   │
└──────────────────────────────────────┘
```

### Patrón de Diseño: MVC

- **Model:** Clases de datos (Sitio, Hotel, Transporte, Reserva)
- **View:** Templates HTML + CSS
- **Controller:** Routes Flask + JavaScript

---

## 6. Tecnologías Utilizadas 💻

### Backend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Python | 3.8+ | Lenguaje principal |
| Flask | 2.0+ | Framework web |
| JSON | - | Persistencia de datos |

### Frontend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura |
| CSS3 | - | Estilos |
| JavaScript | ES6+ | Lógica del cliente |
| Bootstrap | 5.3.2 | Framework UI |
| Leaflet.js | 1.9.4 | Mapas interactivos |

### Ventajas de las Tecnologías Seleccionadas

✅ **Flask:** Ligero, fácil de aprender, ideal para MVPs
✅ **Bootstrap:** Responsive por defecto, componentes listos
✅ **Leaflet:** Gratis, sin API keys, open source
✅ **JSON:** Simple, legible, fácil de migrar a SQL

---

## 7. Funcionalidades Implementadas ⚙️

### 7.1 Gestión de Sitios Turísticos

**20 sitios en Colombia:**
- 10 en Barranquilla (Puerto Mocho, La Troja, Zoológico, etc.)
- 10 en otras ciudades (Cartagena, Santa Marta, Bogotá, etc.)

**Información completa:**
- Nombre, tipo, descripción
- Dirección y puntos de referencia
- Coordenadas GPS (lat/lon)
- Precio de entrada
- Horarios de atención
- Acepta niños/mascotas

**Soporte bilingüe:**
- Nombres y descripciones en ES/EN

### 7.2 Sistema de Reservas

**Funcionalidad completa CRUD:**
- ✅ **Create:** Crear nueva reserva
- ✅ **Read:** Ver todas las reservas
- ✅ **Update:** (Eliminar + Crear nueva)
- ✅ **Delete:** Eliminar reserva

**Validaciones:**
- Campos obligatorios (nombre, fecha)
- Verificación de disponibilidad (hoteles)
- IDs únicos autogenerados

**Persistencia:**
- Guardado en `data/reservas.json`
- Thread-safe con locks

### 7.3 Información de Hoteles

**10 hoteles:**
- 5 en Barranquilla
- 5 en otras ciudades (Cartagena, Santa Marta, Bogotá)

**Datos:**
- Nombre, dirección
- Precio por noche
- Acepta mascotas (Sí/No)
- Disponibilidad en tiempo real

### 7.4 Opciones de Transporte

**12 opciones:**
- Taxis locales
- Buses urbanos e interurbanos
- Transporte turístico (lanchas, chivas)

**Información:**
- Tipo, origen, destino
- Precio por persona
- Duración estimada

### 7.5 Mapas Interactivos

**Tecnología:** Leaflet.js + OpenStreetMap

**Funcionalidades:**
- Mapa centrado en Barranquilla
- Marcadores para cada sitio turístico
- Popup con información del sitio
- Zoom, pan, navegación completa
- Responsive en móviles

### 7.6 Interfaz Multiidioma

**Soporte ES/EN:**
- Botones de cambio de idioma
- Traducción dinámica de UI
- Persistencia de preferencia (localStorage)
- Detección automática del navegador

---

## 8. Demostración del Sistema 🖥️

### Pantalla Principal

```
╔════════════════════════════════════════════╗
║  App Turística    [Mis Reservas] [ES][EN]  ║
╠════════════════════════════════════════════╣
║                                            ║
║  Descubre lugares inolvidables             ║
║  Explora sitios, hoteles y transportes     ║
║                                            ║
║  ┌─────────┐  ┌─────────┐  ┌─────────┐   ║
║  │ Puerto  │  │Malecón  │  │La Troja │   ║
║  │ Mocho   │  │  Barr.  │  │ (Club)  │   ║
║  │ Gratis  │  │ Gratis  │  │  $15    │   ║
║  │[Reservar]│  │[Reservar]│  │[Reservar]│   ║
║  └─────────┘  └─────────┘  └─────────┘   ║
║                                            ║
║  ╔════════════════════════════════════╗   ║
║  ║   MAPA INTERACTIVO                 ║   ║
║  ║   📍 📍 📍 📍 📍 📍               ║   ║
║  ╚════════════════════════════════════╝   ║
║                                            ║
║  ┌─────────────┐  ┌─────────────┐         ║
║  │Hotel El Prado│  │GHL Hotel    │         ║
║  │$180/noche   │  │$220/noche   │         ║
║  │[Reservar]   │  │[Reservar]   │         ║
║  └─────────────┘  └─────────────┘         ║
╚════════════════════════════════════════════╝
```

### Flujo de Reserva

```
Usuario → [Click "Reservar"] → Modal Form
         ↓
    Completa datos:
    - Nombre: "John Smith"
    - Fecha: "2025-12-25"
    - Personas: 2
         ↓
    [Confirmar] → Validación → Guardar
         ↓
    "Reserva creada R5" ✅
```

---

## 9. Modelo de Datos 📊

### Diagrama ER

```
┌─────────────┐
│   SITIO     │
├─────────────┤
│ id (PK)     │
│ nombre      │
│ tipo        │
│ direccion   │
│ lat, lon    │
│ precio      │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│   RESERVA   │
├─────────────┤
│ id (PK)     │
│ categoria   │──┐
│ item_id (FK)│  │
│ cliente     │  │ Referencia
│ fecha       │  │ polimórfica
│ personas    │  │
└─────────────┘  │
       ▲         │
       │         │
       └─────────┴────┐
                      │
       ┌──────────────┤
       │              │
┌──────┴──────┐ ┌─────▼──────┐
│   HOTEL     │ │ TRANSPORTE │
├─────────────┤ ├────────────┤
│ id (PK)     │ │ id (PK)    │
│ nombre      │ │ tipo       │
│ precio_noche│ │ origen     │
│ disponib.   │ │ destino    │
└─────────────┘ └────────────┘
```

---

## 10. Casos de Uso Principales 👤

### Diagrama de Casos de Uso

```
        Turista
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
Consultar Reservar Ver
 Sitios   Sitio   Reservas
    │      │      │
    │      └──────┼──────┐
    │             │      │
    ▼             ▼      ▼
Ver Mapa    Gestionar  Cancelar
           Reserva    Reserva
```

### Caso de Uso Detallado: Crear Reserva

**Actor:** Turista
**Precondición:** Usuario ha seleccionado un sitio/hotel
**Flujo Principal:**
1. Usuario click en "Reservar"
2. Sistema muestra formulario
3. Usuario completa datos
4. Usuario confirma
5. Sistema valida datos
6. Sistema crea reserva
7. Sistema muestra confirmación

**Postcondición:** Nueva reserva creada en el sistema

---

## 11. Seguridad y Buenas Prácticas 🔒

### Medidas de Seguridad Implementadas

✅ **Validación de datos:**
- Backend: Python type hints + validaciones
- Frontend: HTML5 required, type="date", min/max

✅ **Manejo de errores:**
- Try-catch en operaciones críticas
- Mensajes de error informativos
- Status codes HTTP apropiados

✅ **Control de concurrencia:**
- Threading locks para escritura
- Prevención de race conditions

✅ **Buenas prácticas:**
- Código modular y reutilizable
- Separación de capas (MVC)
- Comentarios y documentación
- Manejo de excepciones

### Recomendaciones para Producción

⚠️ **A implementar:**
- HTTPS con certificado SSL
- Autenticación y autorización
- Rate limiting
- Validación CSRF
- Sanitización de inputs
- Logging y auditoría
- Base de datos SQL (PostgreSQL)

---

## 12. Resultados y Logros 🏆

### Objetivos Cumplidos

✅ **Sistema funcional completo** con todas las características planificadas
✅ **20 sitios turísticos** documentados con información completa
✅ **10 hoteles** con datos reales
✅ **12 opciones de transporte** local e interurbano
✅ **Mapas interactivos** funcionando correctamente
✅ **Soporte bilingüe** completo (ES/EN)
✅ **Interfaz responsive** para móviles
✅ **Documentación académica completa:**
   - Análisis de requisitos
   - Casos de uso
   - Diagramas UML (8 tipos)
   - Manual técnico
   - Manual de usuario
   - Presentación del proyecto

### Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de código Python | ~220 |
| Líneas de código JavaScript | ~320 |
| Endpoints API | 8 |
| Sitios turísticos | 20 |
| Hoteles | 10 |
| Opciones de transporte | 12 |
| Documentación | 6 documentos |
| Diagramas UML | 8 tipos |

### Demostración de Funcionalidad

**Funciones core testeadas:**
✅ Listar sitios turísticos
✅ Ver sitios en mapa
✅ Crear reserva
✅ Ver reservas
✅ Eliminar reserva
✅ Cambiar idioma
✅ Visualizar hoteles
✅ Visualizar transporte
✅ Diseño responsive

---

## 13. Trabajo Futuro 🚀

### Funcionalidades Planificadas (Fase 2)

🔜 **Sistema de usuarios:**
- Registro y autenticación
- Perfiles de usuario
- Historial de reservas

🔜 **Búsqueda y filtros:**
- Buscar por nombre
- Filtrar por tipo, precio, ubicación
- Ordenar resultados

🔜 **Calificaciones y reseñas:**
- Sistema de ratings (1-5 estrellas)
- Comentarios de usuarios
- Moderación de contenido

🔜 **Notificaciones:**
- Confirmación de reservas por email
- Recordatorios de visitas
- Ofertas especiales

🔜 **Pagos en línea:**
- Integración con Stripe/PayPal
- Pasarelas locales (PSE)
- Facturación electrónica

🔜 **Más contenido:**
- +50 sitios turísticos
- Eventos y festivales
- Rutas turísticas sugeridas
- Restaurantes y gastronomía

### Mejoras Técnicas (Fase 2)

🔜 **Base de datos SQL:**
- Migrar a PostgreSQL
- Relaciones complejas
- Mejor rendimiento

🔜 **Cache y optimización:**
- Redis para caching
- CDN para estáticos
- Minificación de assets

🔜 **Tests automatizados:**
- Unit tests con pytest
- Integration tests
- E2E tests con Selenium

🔜 **CI/CD:**
- GitHub Actions
- Despliegue automático
- Rollback automático

🔜 **App móvil nativa:**
- React Native o Flutter
- Push notifications
- Geolocalización

---

## 14. Conclusiones 🎓

### Logros del Proyecto

✅ Se desarrolló un **sistema completo y funcional** que cumple con todos los requisitos establecidos

✅ Se aplicaron **metodologías de Teoría de Sistemas**:
   - Análisis de requisitos
   - Diseño de arquitectura
   - Modelado de datos
   - Diagramas UML
   - Documentación completa

✅ Se implementó una **arquitectura escalable** que facilita futuras extensiones

✅ Se utilizaron **tecnologías modernas** y estándares de la industria

✅ Se creó **documentación académica exhaustiva** que demuestra comprensión profunda de los conceptos de Teoría de Sistemas

### Aprendizajes Clave

📚 **Análisis de sistemas:**
- Importancia de la fase de requisitos
- Modelado de procesos con UML
- Diseño de arquitectura de 3 capas

📚 **Desarrollo web:**
- Backend con Flask (Python)
- Frontend responsivo con Bootstrap
- Integración de APIs externas (mapas)
- Persistencia de datos

📚 **Trabajo en equipo:**
- Planificación de tareas
- Documentación técnica
- Control de versiones
- Metodología de desarrollo

### Impacto del Proyecto

🌎 **Valor social:**
- Facilita el turismo en Colombia
- Ayuda a extranjeros a conocer nuestro país
- Promueve sitios locales de Barranquilla

💼 **Valor académico:**
- Aplicación práctica de Teoría de Sistemas
- Proyecto portfolio para CV
- Experiencia en desarrollo full-stack

---

## 15. Preguntas y Respuestas ❓

**¿Por qué eligieron Flask en lugar de Django?**
- Flask es más ligero y adecuado para MVPs
- Más fácil de aprender
- Suficiente para el alcance del proyecto

**¿Por qué JSON y no una base de datos SQL?**
- Simplicidad para prototipo
- Fácil de migrar después
- Suficiente para el volumen de datos actual

**¿Cómo manejan la escalabilidad?**
- Arquitectura modular permite fácil migración
- Plan de migración a PostgreSQL documentado
- Código preparado para crecimiento

**¿Cómo garantizan la calidad de la información?**
- Datos verificados de fuentes oficiales
- Proceso de revisión de contenido
- Plan de actualización periódica

**¿El sistema está listo para producción?**
- Funcionalidades core: Sí
- Seguridad: Requiere mejoras (HTTPS, auth)
- Recomendado para demo/MVP

---

## Gracias por su Atención 🙏

**App Turística Colombia**

*Transformando la experiencia turística en Colombia*

---

### Enlaces Útiles

📂 **Documentación:** `./documentacion/`
💻 **Código fuente:** `app_turistica/`
🌐 **Demo:** http://localhost:5000

### Contacto

**Equipo de Desarrollo**
**CUC - Teoría de Sistemas**
**Noviembre 2025**

---

**¿Preguntas?** 🙋‍♂️

