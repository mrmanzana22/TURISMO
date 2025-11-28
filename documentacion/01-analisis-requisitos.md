# Análisis de Requisitos - App Turística Colombia

**Proyecto:** Sistema de Información Turística para Extranjeros en Colombia
**Curso:** Teoría de Sistemas - CUC
**Fecha:** Noviembre 2025

---

## 1. Introducción

### 1.1 Propósito del Sistema
Desarrollar una aplicación web que facilite a los turistas extranjeros la exploración, planificación y reservación de experiencias turísticas en Colombia, con especial énfasis en Barranquilla y sus alrededores.

### 1.2 Alcance del Sistema
El sistema permite a los usuarios:
- Consultar sitios turísticos con información detallada
- Visualizar ubicaciones en mapas interactivos
- Conocer precios y requisitos de ingreso
- Gestionar reservas para sitios, hoteles y transporte
- Acceder a información de hotelería y transporte
- Descubrir sitios nocturnos y gastronómicos

### 1.3 Audiencia Objetivo
- Turistas extranjeros que visitan Colombia
- Viajeros internacionales planificando su visita
- Agencias de turismo
- Usuarios locales interesados en explorar la región

---

## 2. Requisitos Funcionales

### RF-001: Gestión de Sitios Turísticos
**Descripción:** El sistema debe permitir consultar información completa de sitios turísticos.

**Criterios de aceptación:**
- ✅ Mostrar nombre, tipo y descripción del sitio
- ✅ Incluir dirección y puntos de referencia
- ✅ Mostrar precios de entrada
- ✅ Indicar horarios de atención
- ✅ Especificar si acepta niños y/o mascotas
- ✅ Mostrar coordenadas geográficas (latitud, longitud)
- ✅ Soporte multiidioma (Español/Inglés)

**Prioridad:** Alta

---

### RF-002: Sistema de Reservas
**Descripción:** El sistema debe permitir crear, visualizar y eliminar reservas.

**Criterios de aceptación:**
- ✅ Crear reserva con datos del cliente, fecha y número de personas
- ✅ Validar disponibilidad antes de confirmar
- ✅ Listar todas las reservas del usuario
- ✅ Eliminar reservas existentes
- ✅ Persistir reservas en almacenamiento
- ✅ Generar ID único para cada reserva

**Prioridad:** Alta

---

### RF-003: Información de Hotelería
**Descripción:** El sistema debe mostrar opciones de alojamiento disponibles.

**Criterios de aceptación:**
- ✅ Mostrar nombre y dirección del hotel
- ✅ Incluir precio por noche
- ✅ Indicar si acepta mascotas
- ✅ Mostrar disponibilidad en tiempo real
- ✅ Permitir realizar reservas

**Prioridad:** Media

---

### RF-004: Opciones de Transporte
**Descripción:** El sistema debe proporcionar información sobre transporte local.

**Criterios de aceptación:**
- ✅ Mostrar tipo de transporte (taxi, bus, etc.)
- ✅ Incluir origen y destino
- ✅ Mostrar precio por persona
- ✅ Indicar duración estimada del trayecto

**Prioridad:** Media

---

### RF-005: Soporte Multiidioma
**Descripción:** El sistema debe funcionar en español e inglés.

**Criterios de aceptación:**
- ✅ Cambio de idioma desde la interfaz
- ✅ Traducción de contenido dinámico
- ✅ Persistencia de preferencia de idioma
- ✅ Detección automática del idioma del navegador

**Prioridad:** Alta

---

### RF-006: Visualización en Mapas
**Descripción:** El sistema debe integrar mapas interactivos para ubicar sitios.

**Criterios de aceptación:**
- ⏳ Mostrar ubicación de sitios turísticos en mapa
- ⏳ Permitir zoom y navegación
- ⏳ Mostrar marcadores con información básica
- ⏳ Calcular rutas y distancias

**Prioridad:** Media
**Estado:** Pendiente de implementación

---

### RF-007: Filtrado de Sitios
**Descripción:** El sistema debe permitir filtrar sitios por categoría.

**Criterios de aceptación:**
- ⏳ Filtrar por tipo (turístico, nocturno, cultural, naturaleza)
- ⏳ Filtrar por precio
- ⏳ Filtrar por requisitos (acepta niños, mascotas)
- ⏳ Búsqueda por texto

**Prioridad:** Baja
**Estado:** Pendiente de implementación

---

## 3. Requisitos No Funcionales

### RNF-001: Usabilidad
- La interfaz debe ser intuitiva y fácil de usar
- Tiempo de aprendizaje máximo: 10 minutos
- Diseño responsive para móviles y escritorio
- Accesibilidad: Cumplir con WCAG 2.1 nivel AA

### RNF-002: Rendimiento
- Tiempo de carga inicial: < 3 segundos
- Tiempo de respuesta de API: < 500ms
- Soportar mínimo 50 usuarios concurrentes

### RNF-003: Disponibilidad
- Disponibilidad del sistema: 99% del tiempo
- Mantenimiento programado: máximo 4 horas/mes

### RNF-004: Seguridad
- Validación de datos de entrada
- Protección contra inyección SQL
- Protección contra XSS
- Manejo seguro de datos del cliente

### RNF-005: Mantenibilidad
- Código documentado y siguiendo estándares
- Arquitectura modular
- Uso de control de versiones (Git)

### RNF-006: Portabilidad
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- Funcional en sistemas operativos Windows, macOS, Linux
- Diseño responsive para dispositivos móviles

### RNF-007: Escalabilidad
- Arquitectura que permita agregar nuevos sitios fácilmente
- Capacidad de extensión a otras ciudades/regiones
- Base de datos escalable

---

## 4. Restricciones del Sistema

### 4.1 Restricciones Técnicas
- **Lenguaje Backend:** Python 3.8+
- **Framework Web:** Flask
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Almacenamiento:** JSON (inicial), migrable a SQLite/PostgreSQL
- **Bibliotecas UI:** Bootstrap 5.3

### 4.2 Restricciones de Negocio
- El sistema es de uso gratuito para usuarios finales
- No requiere registro de usuario (por ahora)
- Enfoque inicial en Barranquilla y Colombia

### 4.3 Restricciones de Tiempo
- Desarrollo: 4 semanas
- Pruebas: 1 semana
- Documentación: Continua

---

## 5. Casos de Uso Principales

1. **CU-01:** Consultar sitios turísticos
2. **CU-02:** Ver detalles de un sitio específico
3. **CU-03:** Crear una reserva
4. **CU-04:** Consultar mis reservas
5. **CU-05:** Eliminar una reserva
6. **CU-06:** Cambiar idioma de la aplicación
7. **CU-07:** Ver ubicación en mapa
8. **CU-08:** Consultar opciones de alojamiento
9. **CU-09:** Consultar opciones de transporte

---

## 6. Actores del Sistema

### Actor Principal: **Turista/Usuario**
- **Descripción:** Persona que utiliza el sistema para explorar y reservar experiencias turísticas
- **Responsabilidades:** Consultar información, crear reservas, gestionar reservas

### Actor Secundario: **Administrador del Sistema** (futuro)
- **Descripción:** Persona encargada de mantener y actualizar información
- **Responsabilidades:** Agregar/editar sitios, gestionar contenido, monitorear reservas

---

## 7. Modelo de Datos Preliminar

### Entidades Principales:

#### **Sitio**
- id (int)
- nombre (string)
- tipo (string): turístico, nocturno, cultural, naturaleza, histórico
- dirección (string)
- descripción (string)
- latitud (float)
- longitud (float)
- precio (float)
- acepta_niños (bool)
- acepta_mascotas (bool)
- horarios (string)
- puntos_referencia (string)
- nombre_en (string)
- descripción_en (string)

#### **Hotel**
- id (int)
- nombre (string)
- dirección (string)
- precio_noche (float)
- acepta_mascotas (bool)
- disponibilidad (int)

#### **Transporte**
- id (int)
- tipo (string)
- origen (string)
- destino (string)
- precio_por_persona (float)
- duración_min (int)

#### **Reserva**
- id (int)
- categoría (string): sitio, hotel, transporte
- item_id (int)
- cliente (string)
- fecha (string/date)
- personas (int)
- info (string)

---

## 8. Criterios de Éxito del Proyecto

✅ **Completado:**
- Sistema funcional con CRUD de reservas
- API RESTful documentada
- Interfaz responsive con Bootstrap
- Soporte bilingüe (ES/EN)
- Persistencia de datos

⏳ **Por Completar:**
- Integración de mapas interactivos
- Más datos de sitios específicos de Barranquilla
- Filtrado y búsqueda avanzada
- Documentación académica completa

---

## 9. Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Datos insuficientes de sitios | Media | Alto | Investigar y recopilar información local |
| Problemas de integración con mapas | Baja | Medio | Usar API estables (Google Maps/Leaflet) |
| Bajo rendimiento con muchos usuarios | Baja | Medio | Optimización y caching |
| Problemas de compatibilidad navegadores | Baja | Bajo | Pruebas cross-browser |

---

## 10. Glosario

- **API:** Application Programming Interface
- **CRUD:** Create, Read, Update, Delete
- **REST:** Representational State Transfer
- **Responsive:** Diseño adaptable a diferentes tamaños de pantalla
- **Persistencia:** Almacenamiento permanente de datos

---

**Documento creado:** Noviembre 2025
**Versión:** 1.0
