# Casos de Uso Detallados - App Turística Colombia

**Proyecto:** Sistema de Información Turística para Extranjeros en Colombia
**Curso:** Teoría de Sistemas - CUC

---

## Diagrama de Casos de Uso General

```
                    ┌─────────────────────────────────┐
                    │                                 │
                    │   App Turística Colombia        │
                    │                                 │
                    └─────────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
   ┌────▼────┐              ┌──────▼──────┐          ┌───────▼────────┐
   │Consultar│              │   Gestionar │          │    Consultar   │
   │ Sitios  │              │   Reservas  │          │ Información de │
   │Turísticos│             │             │          │Hoteles/Transp. │
   └─────────┘              └─────────────┘          └────────────────┘
        │                          │
        │                    ┌─────┴─────┐
        │                    │           │
        │              ┌─────▼─────┐ ┌──▼──────────┐
        │              │   Crear   │ │  Eliminar   │
        │              │  Reserva  │ │  Reserva    │
        │              └───────────┘ └─────────────┘
        │
   ┌────▼────────┐
   │Ver Detalles │
   │  y Ubicación│
   └─────────────┘
```

---

## CU-01: Consultar Sitios Turísticos

### Descripción
El usuario puede ver un listado de todos los sitios turísticos disponibles con información básica de cada uno.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- El sistema debe estar en línea
- Debe haber sitios registrados en el sistema

### Flujo Principal
1. El usuario accede a la página principal de la aplicación
2. El sistema carga y muestra todos los sitios turísticos disponibles
3. Para cada sitio, el sistema muestra:
   - Nombre del sitio
   - Tipo (turístico, nocturno, cultural, etc.)
   - Descripción breve
   - Precio de entrada
   - Botón para reservar
4. El usuario puede visualizar la información de los sitios
5. El usuario puede seleccionar un sitio para ver más detalles

### Flujo Alternativo A: Cambio de Idioma
- 3a. El usuario cambia el idioma a inglés
- 3b. El sistema recarga los sitios con nombres y descripciones en inglés
- 3c. Continúa en paso 4

### Postcondiciones
- El usuario visualiza la información de los sitios turísticos

### Requerimientos Especiales
- Tiempo de carga < 3 segundos
- Diseño responsive
- Información actualizada

---

## CU-02: Ver Detalles de un Sitio

### Descripción
El usuario puede consultar información detallada de un sitio turístico específico.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- El sitio debe existir en el sistema
- El usuario debe haber accedido a la lista de sitios

### Flujo Principal
1. El usuario hace clic en un sitio de la lista
2. El sistema muestra la información detallada:
   - Nombre completo
   - Descripción extendida
   - Dirección completa
   - Puntos de referencia
   - Coordenadas (latitud/longitud)
   - Horarios de atención
   - Precio de entrada
   - Si acepta niños
   - Si acepta mascotas
3. El sistema muestra la ubicación en un mapa (si está disponible)
4. El usuario puede ver cómo llegar al sitio
5. El usuario puede hacer una reserva desde esta vista

### Flujo Alternativo A: Ver en Mapa
- 3a. El usuario hace clic en "Ver ubicación"
- 3b. El sistema muestra el sitio en un mapa interactivo
- 3c. El usuario puede hacer zoom y explorar la zona
- 3d. Continúa en paso 5

### Postcondiciones
- El usuario conoce todos los detalles del sitio

---

## CU-03: Crear una Reserva

### Descripción
El usuario puede crear una reserva para un sitio turístico, hotel o transporte.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- El usuario debe haber seleccionado un sitio/hotel/transporte
- Debe haber disponibilidad (en caso de hoteles)

### Flujo Principal
1. El usuario hace clic en el botón "Reservar" en un sitio/hotel/transporte
2. El sistema muestra un formulario modal con los campos:
   - Nombre del cliente (obligatorio)
   - Fecha de la visita/reserva (obligatorio)
   - Número de personas (por defecto: 1)
   - Información adicional (opcional)
3. El usuario completa los campos del formulario
4. El usuario hace clic en "Reservar"
5. El sistema valida los datos:
   - Nombre no vacío
   - Fecha válida
   - Número de personas > 0
6. El sistema verifica disponibilidad (para hoteles)
7. El sistema crea la reserva con un ID único
8. El sistema guarda la reserva en el almacenamiento persistente
9. El sistema muestra mensaje de confirmación con el ID de reserva
10. El sistema cierra el modal

### Flujo Alternativo A: Datos Inválidos
- 6a. El sistema detecta que faltan datos obligatorios
- 6b. El sistema muestra mensaje de error
- 6c. El usuario corrige los datos
- 6d. Continúa en paso 4

### Flujo Alternativo B: Sin Disponibilidad (Hotel)
- 7a. El sistema detecta que el hotel no tiene disponibilidad
- 7b. El sistema muestra mensaje "Hotel no disponible"
- 7c. El caso de uso termina sin crear la reserva

### Flujo Alternativo C: Error de Sistema
- 8a. Ocurre un error al guardar la reserva
- 8b. El sistema muestra mensaje de error técnico
- 8c. El caso de uso termina sin crear la reserva

### Postcondiciones
- **Éxito:** Se crea una nueva reserva en el sistema
- **Fallo:** No se crea la reserva y se informa al usuario

### Requerimientos Especiales
- Validación en tiempo real
- Interfaz intuitiva
- Confirmación clara

---

## CU-04: Consultar Mis Reservas

### Descripción
El usuario puede ver todas sus reservas activas.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- El sistema debe estar en línea

### Flujo Principal
1. El usuario hace clic en "Mis Reservas" en la navegación
2. El sistema carga todas las reservas del sistema
3. El sistema muestra la lista de reservas con:
   - ID de reserva
   - Categoría (sitio/hotel/transporte)
   - ID del item reservado
   - Nombre del cliente
   - Fecha de la reserva
   - Número de personas
   - Botón para eliminar
4. El usuario visualiza sus reservas

### Flujo Alternativo A: Sin Reservas
- 3a. El sistema detecta que no hay reservas
- 3b. El sistema muestra mensaje "No hay reservas"
- 3c. El caso de uso termina

### Postcondiciones
- El usuario ve todas sus reservas activas

---

## CU-05: Eliminar una Reserva

### Descripción
El usuario puede cancelar/eliminar una reserva existente.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- Debe existir al menos una reserva
- El usuario debe estar en la página de reservas

### Flujo Principal
1. El usuario hace clic en el botón "Eliminar" de una reserva
2. El sistema muestra un diálogo de confirmación
3. El usuario confirma la eliminación
4. El sistema elimina la reserva del almacenamiento
5. Si era una reserva de hotel, el sistema incrementa la disponibilidad
6. El sistema actualiza la lista de reservas
7. El sistema muestra la lista actualizada sin la reserva eliminada

### Flujo Alternativo A: Usuario Cancela
- 3a. El usuario cancela la eliminación
- 3b. El caso de uso termina sin cambios

### Flujo Alternativo B: Reserva No Encontrada
- 4a. El sistema no encuentra la reserva
- 4b. El sistema muestra mensaje de error
- 4c. El caso de uso termina

### Postcondiciones
- **Éxito:** La reserva se elimina del sistema
- **Fallo:** La reserva permanece en el sistema

---

## CU-06: Cambiar Idioma

### Descripción
El usuario puede cambiar el idioma de la interfaz entre español e inglés.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- Ninguna

### Flujo Principal
1. El usuario hace clic en el botón de idioma deseado (ES/EN)
2. El sistema detecta la selección del usuario
3. El sistema actualiza todos los textos de la interfaz al idioma seleccionado
4. El sistema recarga el contenido dinámico (sitios) en el idioma seleccionado
5. El sistema guarda la preferencia en localStorage
6. El sistema marca el botón del idioma actual como activo

### Postcondiciones
- La interfaz se muestra en el idioma seleccionado
- La preferencia se guarda para futuras visitas

---

## CU-07: Consultar Hoteles

### Descripción
El usuario puede consultar las opciones de alojamiento disponibles.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- Debe haber hoteles registrados en el sistema

### Flujo Principal
1. El usuario navega a la sección de hoteles
2. El sistema carga y muestra la lista de hoteles con:
   - Nombre del hotel
   - Dirección
   - Precio por noche
   - Si acepta mascotas
   - Disponibilidad actual
   - Botón para reservar
3. El usuario visualiza la información
4. El usuario puede hacer una reserva

### Postcondiciones
- El usuario conoce las opciones de alojamiento

---

## CU-08: Consultar Transporte

### Descripción
El usuario puede consultar las opciones de transporte local.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- Debe haber opciones de transporte registradas

### Flujo Principal
1. El usuario navega a la sección de transporte
2. El sistema muestra las opciones disponibles con:
   - Tipo de transporte
   - Origen y destino
   - Precio por persona
   - Duración estimada
   - Botón para reservar información
3. El usuario visualiza las opciones

### Postcondiciones
- El usuario conoce cómo moverse en la ciudad

---

## CU-09: Ver Ubicación en Mapa (Futuro)

### Descripción
El usuario puede ver la ubicación exacta de un sitio en un mapa interactivo.

### Actores
- **Principal:** Turista/Usuario

### Precondiciones
- El sitio debe tener coordenadas geográficas
- El servicio de mapas debe estar disponible

### Flujo Principal
1. El usuario hace clic en "Ver en mapa" en un sitio
2. El sistema carga el servicio de mapas (Google Maps o Leaflet)
3. El sistema centra el mapa en las coordenadas del sitio
4. El sistema muestra un marcador en la ubicación exacta
5. El usuario puede:
   - Hacer zoom in/out
   - Arrastrar el mapa para explorar
   - Ver información del sitio en el marcador
   - Obtener direcciones
6. El usuario cierra el mapa y vuelve a la vista anterior

### Postcondiciones
- El usuario conoce la ubicación exacta del sitio

---

## Matriz de Trazabilidad

| Caso de Uso | Requisito Funcional | Prioridad | Estado |
|-------------|-------------------|-----------|--------|
| CU-01 | RF-001 | Alta | ✅ Implementado |
| CU-02 | RF-001 | Media | ⏳ Parcial |
| CU-03 | RF-002 | Alta | ✅ Implementado |
| CU-04 | RF-002 | Alta | ✅ Implementado |
| CU-05 | RF-002 | Alta | ✅ Implementado |
| CU-06 | RF-005 | Alta | ✅ Implementado |
| CU-07 | RF-003 | Media | ✅ Implementado |
| CU-08 | RF-004 | Media | ✅ Implementado |
| CU-09 | RF-006 | Media | ⏳ Pendiente |

---

**Documento creado:** Noviembre 2025
**Versión:** 1.0
