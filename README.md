# App Turística Colombia 🇨🇴

> **Sistema de Información Turística para Extranjeros**
> Proyecto Final - Teoría de Sistemas - CUC

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg)](https://leafletjs.com/)

Una aplicación web integral que facilita a turistas extranjeros la exploración, planificación y reservación de experiencias turísticas en Colombia, con especial énfasis en Barranquilla y sus alrededores.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demostración](#-demostración)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API REST](#-api-rest)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación](#-documentación)
- [Tecnologías](#-tecnologías)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### Funcionalidades Principales

- 🗺️ **Mapas Interactivos** - Visualiza ubicaciones con Leaflet.js y OpenStreetMap
- 🏛️ **20 Sitios Turísticos** - Información completa de lugares en Barranquilla y Colombia
- 🏨 **10 Hoteles** - Opciones de alojamiento con precios y disponibilidad
- 🚕 **12 Opciones de Transporte** - Información de taxis, buses y transporte turístico
- 📅 **Sistema de Reservas** - CRUD completo con persistencia en JSON
- 🌐 **Soporte Bilingüe** - Interfaz en Español e Inglés
- 📱 **Diseño Responsive** - Optimizado para móviles, tablets y escritorio

### Sitios Destacados

**En Barranquilla:**
- Puerto Mocho
- Malecón de Barranquilla
- Estadio Metropolitano
- Zoológico
- El Muelle (Puerto Colombia)
- La Troja (Vida Nocturna)
- Kilimanjaro
- Museo del Caribe

**En Colombia:**
- Ciudad Amurallada (Cartagena)
- Parque Tayrona (Santa Marta)
- Museo del Oro (Bogotá)
- Valle de Cocora (Salento)
- Caño Cristales
- Y más...

---

## 🖼️ Demostración

### Pantalla Principal
- **Sitios Turísticos** con información completa
- **Mapa Interactivo** con marcadores de ubicaciones
- **Hoteles** con precios y disponibilidad
- **Transporte** con rutas y tarifas

### Sistema de Reservas
- Formulario intuitivo
- Validación de datos
- Confirmación instantánea
- Gestión completa de reservas

---

## 📦 Requisitos

### Software

- **Python 3.8+**
- **pip** (gestor de paquetes)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### Hardware (Mínimo)

- Procesador: Dual-core 1.5 GHz
- RAM: 2 GB
- Disco: 100 MB libres
- Conexión a Internet

---

## 🚀 Instalación

### Windows

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd app_turistica
   ```

2. **Crear entorno virtual**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. **Instalar dependencias**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**
   ```powershell
   python app.py
   ```

5. **Acceder**
   ```
   Abre tu navegador en: http://localhost:5000
   ```

### macOS / Linux

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd app_turistica
   ```

2. **Crear entorno virtual**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

5. **Acceder**
   ```
   Abre tu navegador en: http://localhost:5000
   ```

---

## 📖 Uso

### Cambiar Idioma

Haz clic en los botones **ES** o **EN** en la esquina superior derecha.

### Ver Sitios Turísticos

1. Navega por la lista de sitios en la página principal
2. Cada sitio muestra: nombre, tipo, descripción, precio
3. Haz clic en un marcador del mapa para ver información

### Hacer una Reserva

1. Haz clic en **"Reservar"** en cualquier sitio/hotel
2. Completa el formulario:
   - Nombre del cliente
   - Fecha de la visita
   - Número de personas
   - Información adicional (opcional)
3. Haz clic en **"Reservar"**
4. Recibirás un número de confirmación (ej: R5)

### Ver Mis Reservas

1. Haz clic en **"Mis Reservas"** en el menú superior
2. Verás todas tus reservas con su información
3. Puedes eliminar reservas con el botón **"Eliminar"**

---

## 🔌 API REST

### Endpoints

#### Páginas HTML

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página principal |
| GET | `/reservas` | Página de reservas |

#### API - Datos

| Método | Endpoint | Parámetros | Descripción |
|--------|----------|------------|-------------|
| GET | `/api/sitios` | `?lang=es\|en` | Lista de sitios turísticos |
| GET | `/api/hoteles` | - | Lista de hoteles |
| GET | `/api/transporte` | - | Lista de transporte |
| GET | `/api/reservas` | - | Lista de reservas |
| POST | `/api/reservas` | Body JSON | Crear reserva |
| GET | `/api/reservas/:id` | - | Detalle de reserva |
| DELETE | `/api/reservas/:id` | - | Eliminar reserva |

### Ejemplo: Crear Reserva

**Request:**
```bash
POST /api/reservas
Content-Type: application/json

{
  "categoria": "sitio",
  "item_id": 1,
  "cliente": "John Smith",
  "fecha": "2025-12-25",
  "personas": 2,
  "info": "Visita matutina"
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "categoria": "sitio",
  "item_id": 1,
  "cliente": "John Smith",
  "fecha": "2025-12-25",
  "personas": 2,
  "info": "Visita matutina"
}
```

---

## 📁 Estructura del Proyecto

```
app_turistica/
│
├── app.py                    # Aplicación Flask principal
├── requirements.txt          # Dependencias Python
├── README.md                 # Este archivo
│
├── data/                     # Datos persistentes
│   └── reservas.json        # Reservas guardadas
│
├── static/                   # Archivos estáticos
│   ├── css/
│   │   └── styles.css       # Estilos personalizados
│   ├── js/
│   │   └── app.js           # Lógica del frontend
│   └── pages/
│       ├── index.html       # Página principal
│       └── reservas.html    # Página de reservas
│
└── documentacion/           # Documentación académica
    ├── 01-analisis-requisitos.md
    ├── 02-casos-de-uso.md
    ├── 03-diagramas-uml.md
    ├── 04-manual-tecnico.md
    ├── 05-manual-usuario.md
    └── 06-presentacion-proyecto.md
```

---

## 📚 Documentación

### Documentación Académica Completa

1. **[Análisis de Requisitos](documentacion/01-analisis-requisitos.md)**
   - Requisitos funcionales y no funcionales
   - Casos de uso principales
   - Modelo de datos
   - Restricciones del sistema

2. **[Casos de Uso Detallados](documentacion/02-casos-de-uso.md)**
   - 9 casos de uso con diagramas
   - Flujos principales y alternativos
   - Precondiciones y postcondiciones

3. **[Diagramas UML](documentacion/03-diagramas-uml.md)**
   - Diagrama de Casos de Uso
   - Diagrama de Clases
   - Diagramas de Secuencia (2)
   - Diagrama de Componentes
   - Diagrama de Despliegue
   - Diagrama de Estados
   - Diagrama de Actividades
   - Diagrama ER

4. **[Manual Técnico](documentacion/04-manual-tecnico.md)**
   - Arquitectura del sistema
   - API REST completa
   - Instalación y configuración
   - Resolución de problemas
   - Despliegue en producción

5. **[Manual de Usuario](documentacion/05-manual-usuario.md)**
   - Guía paso a paso
   - Capturas de pantalla
   - Preguntas frecuentes
   - Consejos y recomendaciones

6. **[Presentación del Proyecto](documentacion/06-presentacion-proyecto.md)**
   - Presentación completa para exposición
   - Diapositivas en Markdown
   - Demostraciones
   - Conclusiones

---

## 🛠️ Tecnologías

### Backend

- **Python 3.8+** - Lenguaje de programación
- **Flask 2.0+** - Framework web ligero
- **JSON** - Almacenamiento de datos

### Frontend

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos
- **JavaScript (ES6+)** - Lógica del cliente
- **Bootstrap 5.3** - Framework UI responsive
- **Leaflet.js 1.9** - Mapas interactivos
- **OpenStreetMap** - Tiles de mapas

### Arquitectura

- **Patrón MVC** - Separación de capas
- **API RESTful** - Comunicación cliente-servidor
- **SPA (Single Page Application)** - Experiencia fluida
- **Responsive Design** - Adaptable a dispositivos

---

## 🤝 Contribuir

### ¿Cómo contribuir?

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Áreas de Mejora

- [ ] Agregar más sitios turísticos
- [ ] Implementar búsqueda y filtros
- [ ] Sistema de autenticación
- [ ] Migrar a base de datos SQL
- [ ] Agregar tests automatizados
- [ ] Implementar calificaciones y reseñas
- [ ] Integración con pasarelas de pago

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la materia de Teoría de Sistemas en CUC.

---

## 👥 Equipo

**Curso:** Teoría de Sistemas
**Universidad:** CUC (Corporación Universitaria de la Costa)
**Fecha:** Noviembre 2025

---

## 📞 Contacto

Para preguntas, sugerencias o reportar bugs:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

---

## 🙏 Agradecimientos

- **CUC** - Por la formación académica
- **Profesor de Teoría de Sistemas** - Por la guía
- **OpenStreetMap** - Por los mapas gratuitos
- **Leaflet.js** - Por la biblioteca de mapas
- **Bootstrap** - Por el framework UI
- **Flask** - Por el framework web

---

**¡Disfruta explorando Colombia! 🇨🇴**
