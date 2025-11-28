# Manual Técnico - App Turística Colombia

**Proyecto:** Sistema de Información Turística para Extranjeros en Colombia
**Curso:** Teoría de Sistemas - CUC
**Versión:** 1.0

---

## 1. Introducción

Este manual técnico está dirigido a desarrolladores y administradores del sistema que necesiten instalar, configurar, mantener o extender la aplicación.

### 1.1 Propósito del Documento
Proporcionar información técnica detallada sobre la arquitectura, instalación, configuración y mantenimiento del sistema.

### 1.2 Alcance
El manual cubre:
- Arquitectura del sistema
- Requisitos técnicos
- Instalación y configuración
- Estructura del código
- API REST
- Base de datos
- Extensión y personalización

---

## 2. Arquitectura del Sistema

### 2.1 Arquitectura General
```
┌──────────────────┐
│   Navegador Web  │  ← Frontend (HTML/CSS/JS)
└────────┬─────────┘
         │ HTTP/REST
         ▼
┌────────────────────┐
│  Flask Server      │  ← Backend (Python)
│  - Routes          │
│  - Business Logic  │
│  - Data Management │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  Almacenamiento    │  ← Datos (JSON/Memoria)
│  - reservas.json   │
│  - Listas en RAM   │
└────────────────────┘
```

### 2.2 Tecnologías Utilizadas

| Componente | Tecnología | Versión |
|------------|-----------|---------|
| Backend | Python | 3.8+ |
| Framework Web | Flask | 2.0+ |
| Frontend | HTML5 / CSS3 | - |
| UI Framework | Bootstrap | 5.3.2 |
| Mapas | Leaflet.js | 1.9.4 |
| Persistencia | JSON | - |
| Control de Versiones | Git | - |

---

## 3. Requisitos del Sistema

### 3.1 Requisitos de Software
- **Sistema Operativo:** Windows, macOS, Linux
- **Python:** Versión 3.8 o superior
- **pip:** Gestor de paquetes de Python
- **Navegador:** Chrome, Firefox, Safari, Edge (versiones recientes)

### 3.2 Requisitos de Hardware (Mínimos)
- **Procesador:** Dual-core 1.5 GHz
- **RAM:** 2 GB
- **Disco:** 100 MB libres
- **Red:** Conexión a Internet para CDN y mapas

---

## 4. Instalación y Configuración

### 4.1 Instalación en Windows

1. **Instalar Python 3.8+**
   - Descargar desde https://www.python.org/downloads/
   - Asegurarse de marcar "Add Python to PATH"

2. **Descargar el proyecto**
   ```bash
   # Si tienes Git instalado
   git clone <url-del-repositorio>
   cd app_turistica
   ```

3. **Crear entorno virtual**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

4. **Instalar dependencias**
   ```powershell
   pip install -r requirements.txt
   ```

5. **Ejecutar la aplicación**
   ```powershell
   python app.py
   ```

6. **Acceder a la aplicación**
   - Abrir navegador en: http://localhost:5000

### 4.2 Instalación en macOS/Linux

1. **Verificar Python**
   ```bash
   python3 --version  # Debe ser 3.8+
   ```

2. **Descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd app_turistica
   ```

3. **Crear entorno virtual**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

4. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

5. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

6. **Acceder a la aplicación**
   - Abrir navegador en: http://localhost:5000

### 4.3 Variables de Configuración

El archivo `app.py` contiene configuraciones importantes:

```python
# Puerto del servidor (línea 219)
app.run(debug=True, port=5000)

# Cambiar a:
app.run(debug=False, port=8080)  # Para producción
```

---

## 5. Estructura del Proyecto

```
app_turistica/
│
├── app.py                    # Aplicación Flask principal
├── requirements.txt          # Dependencias Python
├── README.md                 # Documentación básica
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
└── documentacion/           # Documentación del proyecto
    ├── 01-analisis-requisitos.md
    ├── 02-casos-de-uso.md
    ├── 03-diagramas-uml.md
    ├── 04-manual-tecnico.md
    └── 05-manual-usuario.md
```

---

## 6. API REST

### 6.1 Endpoints Disponibles

#### Páginas HTML

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página principal (index.html) |
| GET | `/reservas` | Página de reservas (reservas.html) |

#### API - Sitios Turísticos

| Método | Ruta | Parámetros | Respuesta |
|--------|------|------------|-----------|
| GET | `/api/sitios` | `?lang=es\|en` | Lista de sitios turísticos |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Puerto Mocho",
    "tipo": "turistico",
    "direccion": "Malecón del Río, Barranquilla",
    "descripcion": "Mirador icónico...",
    "lat": 10.9893,
    "lon": -74.7944,
    "precio": 0.0,
    "acepta_ninos": true,
    "acepta_mascotas": true,
    "horarios": "06:00-22:00",
    "puntos_referencia": "Frente al río..."
  }
]
```

#### API - Hoteles

| Método | Ruta | Respuesta |
|--------|------|-----------|
| GET | `/api/hoteles` | Lista de hoteles |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hotel El Prado",
    "direccion": "Carrera 54 No. 70-10, Barranquilla",
    "precio_noche": 180.0,
    "acepta_mascotas": true,
    "disponibilidad": 8
  }
]
```

#### API - Transporte

| Método | Ruta | Respuesta |
|--------|------|-----------|
| GET | `/api/transporte` | Lista de opciones de transporte |

#### API - Reservas

| Método | Ruta | Body | Respuesta |
|--------|------|------|-----------|
| GET | `/api/reservas` | - | Lista de todas las reservas |
| POST | `/api/reservas` | JSON (ver abajo) | Reserva creada |
| GET | `/api/reservas/:id` | - | Detalle de reserva |
| DELETE | `/api/reservas/:id` | - | Confirmación de eliminación |

**Body para POST `/api/reservas`:**
```json
{
  "categoria": "sitio|hotel|transporte",
  "item_id": 1,
  "cliente": "Juan Pérez",
  "fecha": "2025-12-25",
  "personas": 2,
  "info": "Información adicional (opcional)"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "categoria": "sitio",
  "item_id": 1,
  "cliente": "Juan Pérez",
  "fecha": "2025-12-25",
  "personas": 2,
  "info": ""
}
```

**Respuesta de error (400):**
```json
{
  "error": "Mensaje descriptivo del error"
}
```

### 6.2 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 7. Base de Datos

### 7.1 Modelo de Datos

#### Sitio
```python
@dataclass
class Sitio:
    id: int
    nombre: str
    tipo: str  # turistico, nocturno, cultural, naturaleza, historico
    direccion: str
    descripcion: str
    lat: float
    lon: float
    precio: float
    acepta_ninos: bool
    acepta_mascotas: bool
    horarios: str
    puntos_referencia: str
    nombre_en: str
    descripcion_en: str
```

#### Hotel
```python
@dataclass
class Hotel:
    id: int
    nombre: str
    direccion: str
    precio_noche: float
    acepta_mascotas: bool
    disponibilidad: int  # habitaciones disponibles
```

#### Transporte
```python
@dataclass
class Transporte:
    id: int
    tipo: str  # Taxi, Bus, Lancha, etc.
    origen: str
    destino: str
    precio_por_persona: float
    duracion_min: int
```

#### Reserva
```python
@dataclass
class Reserva:
    id: int
    categoria: str  # sitio, hotel, transporte
    item_id: int   # ID del sitio/hotel/transporte
    cliente: str
    fecha: str
    personas: int
    info: str
```

### 7.2 Persistencia

- **Reservas:** Se guardan en `data/reservas.json`
- **Sitios, Hoteles, Transportes:** Almacenados en memoria (listas Python)
- **Concurrencia:** Se usa `threading.Lock()` para operaciones thread-safe

### 7.3 Archivo reservas.json

Estructura:
```json
{
  "next_id": 5,
  "reservas": [
    {
      "id": 1,
      "categoria": "hotel",
      "item_id": 3,
      "cliente": "María García",
      "fecha": "2025-12-01",
      "personas": 2,
      "info": ""
    }
  ]
}
```

---

## 8. Frontend

### 8.1 Tecnologías

- **HTML5:** Estructura semántica
- **CSS3:** Estilos con Bootstrap 5.3
- **JavaScript (ES6+):** Lógica del cliente
- **Leaflet.js:** Mapas interactivos

### 8.2 Componentes Principales

#### app.js

Funciones principales:
- `renderSitios()`: Carga y muestra sitios turísticos
- `renderHoteles()`: Carga y muestra hoteles
- `renderTransporte()`: Carga y muestra transporte
- `renderReservas()`: Carga y muestra reservas
- `renderMap()`: Inicializa mapa con marcadores
- `showReservaModal()`: Muestra formulario de reserva
- `deleteReserva()`: Elimina una reserva
- `setLanguage()`: Cambia idioma de la interfaz

#### Sistema i18n

Soporte bilingüe (Español/Inglés):
```javascript
const i18n = {
  es: { ... },
  en: { ... }
};
```

---

## 9. Seguridad

### 9.1 Medidas Implementadas

✅ **Validación de datos:**
- Validación en backend (app.py)
- Validación en frontend (formularios HTML5)

✅ **Manejo de errores:**
- Try-catch en operaciones críticas
- Mensajes de error informativos

✅ **Control de concurrencia:**
- Threading locks para escritura de archivos

### 9.2 Recomendaciones para Producción

⚠️ **Pendientes de implementar:**
- [ ] HTTPS en producción
- [ ] Autenticación y autorización
- [ ] Rate limiting
- [ ] Validación CSRF
- [ ] Sanitización de inputs
- [ ] Logging de auditoría

---

## 10. Mantenimiento

### 10.1 Agregar Nuevo Sitio Turístico

Editar `app.py`, línea 63:
```python
SITIOS: List[Sitio] = [
    # ...sitios existentes...
    Sitio(21, "Nuevo Sitio", "turistico", "Dirección",
          "Descripción", lat, lon, precio, True, False,
          "horarios", "referencias",
          "Name EN", "Description EN"),
]
```

### 10.2 Agregar Nuevo Hotel

Editar `app.py`, línea 107:
```python
HOTELES: List[Hotel] = [
    # ...hoteles existentes...
    Hotel(11, "Nuevo Hotel", "Dirección",
          precio_noche, acepta_mascotas, disponibilidad),
]
```

### 10.3 Migrar a Base de Datos SQL

**Pasos sugeridos:**

1. Instalar SQLAlchemy:
   ```bash
   pip install sqlalchemy
   ```

2. Crear modelos ORM
3. Migrar datos JSON a SQLite/PostgreSQL
4. Actualizar funciones de data management

---

## 11. Resolución de Problemas

### 11.1 La aplicación no inicia

**Problema:** Error al ejecutar `python app.py`

**Soluciones:**
- Verificar que Python 3.8+ esté instalado
- Activar el entorno virtual
- Instalar dependencias: `pip install -r requirements.txt`

### 11.2 Puerto ya en uso

**Error:** `Address already in use: Port 5000`

**Solución:**
- Cambiar puerto en `app.py`: `app.run(debug=True, port=8080)`
- O matar proceso en puerto 5000

### 11.3 Reservas no se guardan

**Problema:** Las reservas desaparecen al reiniciar

**Soluciones:**
- Verificar permisos de escritura en carpeta `data/`
- Revisar logs de error en consola
- Verificar que `data/reservas.json` exista

### 11.4 Mapa no se muestra

**Problema:** Sección de mapa está vacía

**Soluciones:**
- Verificar conexión a Internet (requiere CDN)
- Revisar consola del navegador para errores JavaScript
- Verificar que coordenadas sean válidas

---

## 12. Despliegue en Producción

### 12.1 Usando Gunicorn (Linux/Mac)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### 12.2 Usando Nginx como Reverse Proxy

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        alias /ruta/a/app_turistica/static;
    }
}
```

### 12.3 Usando Docker

**Dockerfile:**
```dockerfile
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

**Construir y ejecutar:**
```bash
docker build -t app-turistica .
docker run -p 5000:5000 app-turistica
```

---

## 13. Extensiones Futuras

### 13.1 Funcionalidades Planificadas

- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Notificaciones por email
- [ ] Filtros y búsqueda avanzada
- [ ] Sistema de calificaciones y reviews
- [ ] Integración con pasarelas de pago
- [ ] App móvil nativa (React Native/Flutter)

### 13.2 Mejoras Técnicas

- [ ] Migrar a base de datos SQL
- [ ] Implementar caché (Redis)
- [ ] Tests automatizados (pytest)
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo y logging (ELK stack)

---

## 14. Contacto y Soporte

Para reportar bugs o solicitar features:
- Crear issue en repositorio GitHub
- Contactar al equipo de desarrollo

---

**Documento creado:** Noviembre 2025
**Versión:** 1.0
**Autor:** Equipo de Desarrollo
