# Diagramas UML - App Turística Colombia

**Proyecto:** Sistema de Información Turística para Extranjeros en Colombia
**Curso:** Teoría de Sistemas - CUC

---

## 1. Diagrama de Casos de Uso

```mermaid
graph TB
    subgraph "Sistema App Turística"
        CU1[Consultar Sitios Turísticos]
        CU2[Ver Detalles del Sitio]
        CU3[Crear Reserva]
        CU4[Ver Mis Reservas]
        CU5[Eliminar Reserva]
        CU6[Cambiar Idioma]
        CU7[Consultar Hoteles]
        CU8[Consultar Transporte]
        CU9[Ver Mapa]
    end

    Usuario((Turista/Usuario))

    Usuario --> CU1
    Usuario --> CU2
    Usuario --> CU3
    Usuario --> CU4
    Usuario --> CU5
    Usuario --> CU6
    Usuario --> CU7
    Usuario --> CU8
    Usuario --> CU9

    CU1 -.include.-> CU6
    CU2 -.include.-> CU9
    CU7 -.extend.-> CU3
    CU8 -.extend.-> CU3
```

---

## 2. Diagrama de Clases

```mermaid
classDiagram
    class Sitio {
        +int id
        +string nombre
        +string tipo
        +string direccion
        +string descripcion
        +float lat
        +float lon
        +float precio
        +bool acepta_ninos
        +bool acepta_mascotas
        +string horarios
        +string puntos_referencia
        +string nombre_en
        +string descripcion_en
        +to_dict() dict
    }

    class Hotel {
        +int id
        +string nombre
        +string direccion
        +float precio_noche
        +bool acepta_mascotas
        +int disponibilidad
        +reducir_disponibilidad() void
        +aumentar_disponibilidad() void
        +to_dict() dict
    }

    class Transporte {
        +int id
        +string tipo
        +string origen
        +string destino
        +float precio_por_persona
        +int duracion_min
        +to_dict() dict
    }

    class Reserva {
        +int id
        +string categoria
        +int item_id
        +string cliente
        +string fecha
        +int personas
        +string info
        +to_dict() dict
    }

    class FlaskApp {
        -List~Sitio~ sitios
        -List~Hotel~ hoteles
        -List~Transporte~ transportes
        -List~Reserva~ reservas
        -int next_id
        +index() html
        +api_sitios() json
        +api_hoteles() json
        +api_transporte() json
        +api_reservas() json
        +create_reserva() Reserva
        +delete_reserva() json
    }

    class DataManager {
        -string data_dir
        -string reservas_file
        +load_reservas() List~Reserva~
        +save_reservas(reservas) void
        +load_sitios() List~Sitio~
        +load_hoteles() List~Hotel~
        +load_transportes() List~Transporte~
    }

    FlaskApp --> Sitio : manages
    FlaskApp --> Hotel : manages
    FlaskApp --> Transporte : manages
    FlaskApp --> Reserva : manages
    FlaskApp --> DataManager : uses
    Reserva --> Sitio : references
    Reserva --> Hotel : references
    Reserva --> Transporte : references
```

---

## 3. Diagrama de Secuencia: Crear Reserva

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Interfaz Web
    participant API as Flask API
    participant BL as Lógica de Negocio
    participant DB as Almacenamiento

    Usuario->>UI: Click "Reservar" en sitio
    UI->>Usuario: Mostrar formulario modal
    Usuario->>UI: Completar datos (nombre, fecha, personas)
    Usuario->>UI: Click "Confirmar Reserva"

    UI->>API: POST /api/reservas {categoria, item_id, cliente, fecha, personas}
    API->>BL: create_reserva(data)

    alt Validación exitosa
        BL->>BL: Validar datos obligatorios

        alt Es Hotel
            BL->>BL: Verificar disponibilidad
            alt Sin disponibilidad
                BL-->>API: Error: "Hotel no disponible"
                API-->>UI: Status 400 + mensaje error
                UI-->>Usuario: Mostrar error
            else Con disponibilidad
                BL->>BL: Reducir disponibilidad
            end
        end

        BL->>DB: Guardar reserva en JSON
        DB-->>BL: Confirmación
        BL->>BL: Generar ID único
        BL-->>API: Reserva creada (objeto)
        API-->>UI: Status 201 + datos reserva
        UI->>UI: Cerrar modal
        UI-->>Usuario: Mostrar confirmación "Reserva R{id} creada"

    else Validación fallida
        BL-->>API: Error de validación
        API-->>UI: Status 400 + mensaje error
        UI-->>Usuario: Mostrar error en formulario
    end
```

---

## 4. Diagrama de Secuencia: Consultar Sitios

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Interfaz Web
    participant API as Flask API
    participant BL as Lógica de Negocio
    participant Cache as Memoria

    Usuario->>UI: Acceder a página principal
    UI->>UI: Detectar idioma (localStorage o navegador)
    UI->>API: GET /api/sitios?lang=en
    API->>BL: Obtener sitios
    BL->>Cache: Leer lista de sitios

    alt Idioma = inglés
        BL->>BL: Traducir nombre y descripción
    end

    Cache-->>BL: Lista de sitios
    BL-->>API: JSON con sitios
    API-->>UI: Response 200 + sitios

    UI->>UI: Renderizar cards de sitios
    UI-->>Usuario: Mostrar sitios con información

    Usuario->>UI: Click en sitio
    UI-->>Usuario: Mostrar detalles completos
```

---

## 5. Diagrama de Componentes

```mermaid
graph TB
    subgraph "Frontend - Cliente"
        HTML[index.html / reservas.html]
        CSS[styles.css / Bootstrap]
        JS[app.js - Lógica Cliente]
        I18N[i18n - Multiidioma]
    end

    subgraph "Backend - Flask Server"
        APP[app.py - Flask Application]
        ROUTES[Routes / Endpoints]
        BL[Business Logic]
        DM[Data Manager]
    end

    subgraph "Almacenamiento"
        JSON[reservas.json]
        STATIC[Sitios/Hoteles/Transportes - En memoria]
    end

    subgraph "Servicios Externos (Futuro)"
        MAPS[Google Maps API]
        EMAIL[Email Service]
    end

    HTML --> JS
    JS --> CSS
    JS --> I18N
    JS -->|HTTP/AJAX| ROUTES

    ROUTES --> APP
    APP --> BL
    BL --> DM
    DM -->|Read/Write| JSON
    BL --> STATIC

    JS -.->|Integración futura| MAPS
    BL -.->|Notificaciones futuras| EMAIL
```

---

## 6. Diagrama de Despliegue

```mermaid
graph TB
    subgraph "Dispositivo Cliente"
        BROWSER[Navegador Web<br/>Chrome/Firefox/Safari]
    end

    subgraph "Servidor Web"
        FLASK[Flask Server<br/>Puerto 5000]
        STATIC_FILES[Archivos Estáticos<br/>HTML/CSS/JS]
        DATA[Data Layer<br/>JSON Files]
    end

    subgraph "Futuro - Producción"
        NGINX[Nginx<br/>Reverse Proxy]
        GUNICORN[Gunicorn<br/>WSGI Server]
        POSTGRES[PostgreSQL<br/>Database]
    end

    BROWSER -->|HTTP/HTTPS| FLASK
    FLASK --> STATIC_FILES
    FLASK --> DATA

    BROWSER -.->|Producción| NGINX
    NGINX -.-> GUNICORN
    GUNICORN -.-> POSTGRES
```

---

## 7. Diagrama de Estados: Reserva

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Usuario crea reserva

    Pendiente --> Validando: Sistema valida datos

    Validando --> Error: Datos inválidos o sin disponibilidad
    Error --> [*]

    Validando --> Confirmada: Validación exitosa
    Confirmada --> Guardada: Sistema persiste en JSON

    Guardada --> Activa: Reserva disponible para consulta

    Activa --> Eliminando: Usuario elimina reserva
    Eliminando --> Eliminada: Sistema confirma eliminación
    Eliminada --> [*]

    note right of Guardada
        Se genera ID único
        Se reduce disponibilidad (si es hotel)
    end note

    note right of Eliminada
        Se restaura disponibilidad (si es hotel)
        Se elimina del almacenamiento
    end note
```

---

## 8. Diagrama de Actividades: Flujo de Reserva

```mermaid
graph TD
    A[Inicio] --> B[Usuario navega a sitios]
    B --> C[Sistema muestra lista de sitios]
    C --> D{Usuario selecciona sitio?}

    D -->|No| E[Fin]
    D -->|Sí| F[Usuario click en Reservar]

    F --> G[Sistema muestra formulario]
    G --> H[Usuario completa datos]
    H --> I[Usuario click Confirmar]

    I --> J{Datos válidos?}
    J -->|No| K[Mostrar error]
    K --> H

    J -->|Sí| L{Es hotel?}
    L -->|No| N[Crear reserva]
    L -->|Sí| M{Hay disponibilidad?}

    M -->|No| K
    M -->|Sí| O[Reducir disponibilidad]
    O --> N

    N --> P[Generar ID único]
    P --> Q[Guardar en JSON]
    Q --> R[Mostrar confirmación]
    R --> E
```

---

## 9. Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    SITIO ||--o{ RESERVA : "puede tener"
    HOTEL ||--o{ RESERVA : "puede tener"
    TRANSPORTE ||--o{ RESERVA : "puede tener"

    SITIO {
        int id PK
        string nombre
        string tipo
        string direccion
        string descripcion
        float latitud
        float longitud
        float precio
        bool acepta_ninos
        bool acepta_mascotas
        string horarios
        string puntos_referencia
        string nombre_en
        string descripcion_en
    }

    HOTEL {
        int id PK
        string nombre
        string direccion
        float precio_noche
        bool acepta_mascotas
        int disponibilidad
    }

    TRANSPORTE {
        int id PK
        string tipo
        string origen
        string destino
        float precio_por_persona
        int duracion_min
    }

    RESERVA {
        int id PK
        string categoria
        int item_id FK
        string cliente
        date fecha
        int personas
        string info
    }
```

---

## 10. Diagrama de Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE PRESENTACIÓN                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  index.html  │  │reservas.html │  │  styles.css  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────────────────────────────────────────┐       │
│  │            app.js (JavaScript)                    │       │
│  │  - Fetch API calls                                │       │
│  │  - DOM manipulation                               │       │
│  │  - Event handlers                                 │       │
│  │  - i18n logic                                     │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                   HTTP (REST API)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE APLICACIÓN                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Flask Application (app.py)                 │ │
│  │                                                          │ │
│  │  RUTAS / ENDPOINTS                                      │ │
│  │  • GET  /                  → index.html                 │ │
│  │  • GET  /reservas          → reservas.html              │ │
│  │  • GET  /api/sitios        → Lista sitios               │ │
│  │  • GET  /api/hoteles       → Lista hoteles              │ │
│  │  • GET  /api/transporte    → Lista transporte           │ │
│  │  • GET  /api/reservas      → Lista reservas             │ │
│  │  • POST /api/reservas      → Crear reserva              │ │
│  │  • DELETE /api/reservas/:id → Eliminar reserva          │ │
│  │                                                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           LÓGICA DE NEGOCIO                             │ │
│  │  • create_reserva()                                     │ │
│  │  • validate_reserva()                                   │ │
│  │  • check_availability()                                 │ │
│  │  • update_disponibilidad()                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PERSISTENCIA                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            Data Manager                                 │ │
│  │  • _load_reservas_from_disk()                          │ │
│  │  • _save_reservas_to_disk()                            │ │
│  │  • Threading lock para concurrencia                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         ALMACENAMIENTO                                  │ │
│  │  • data/reservas.json (persistente)                    │ │
│  │  • SITIOS[] (en memoria)                               │ │
│  │  • HOTELES[] (en memoria)                              │ │
│  │  • TRANSPORTES[] (en memoria)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Patrones de Diseño Utilizados

### 11.1 MVC (Model-View-Controller)
- **Model:** Clases Sitio, Hotel, Transporte, Reserva
- **View:** Archivos HTML + CSS (templates)
- **Controller:** Flask routes y business logic

### 11.2 Repository Pattern
- **DataManager:** Abstracción para manejo de persistencia
- Separa lógica de negocio del almacenamiento

### 11.3 Singleton Pattern
- **FlaskApp:** Una sola instancia de la aplicación
- **DataManager:** Manejo centralizado de datos

### 11.4 RESTful API
- Uso de HTTP methods apropiados (GET, POST, DELETE)
- Recursos bien definidos (/api/sitios, /api/reservas)
- Respuestas JSON estándar

---

## 12. Flujo de Datos

```
Usuario → Navegador → HTTP Request → Flask Routes
                                          ↓
                                    Validación
                                          ↓
                                  Lógica de Negocio
                                          ↓
                                    Data Manager
                                          ↓
                                  Almacenamiento (JSON)
                                          ↓
                          Respuesta ← JSON Response ← Flask
                                          ↓
                                  Renderizado en UI
                                          ↓
                                      Usuario
```

---

**Documento creado:** Noviembre 2025
**Versión:** 1.0

**Notas:**
- Los diagramas están en formato Mermaid para fácil visualización en GitHub
- Para ver los diagramas, usa un visor compatible con Mermaid
- Alternativamente, puedes copiar el código en https://mermaid.live/
