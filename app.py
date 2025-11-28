from flask import Flask, jsonify, request, send_from_directory
from dataclasses import dataclass
from typing import List
import os
import json
import threading
import math

app = Flask(__name__, static_folder="static", static_url_path="/static")
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable caching in development

# Detect if running on Vercel (serverless environment with read-only filesystem)
IS_VERCEL = os.environ.get('VERCEL') == '1' or os.environ.get('VERCEL_ENV') is not None

# Path to store persistent reservas (only used in local development)
BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")
RESERVAS_FILE = os.path.join(DATA_DIR, "reservas.json")

# Only create data directory if not on Vercel
if not IS_VERCEL:
    os.makedirs(DATA_DIR, exist_ok=True)

_data_lock = threading.Lock()

@dataclass
class Sitio:
    id: int
    nombre: str
    tipo: str
    direccion: str
    descripcion: str
    lat: float
    lon: float
    precio: float
    acepta_ninos: bool
    acepta_mascotas: bool
    horarios: str
    puntos_referencia: str
    nombre_en: str = ""
    descripcion_en: str = ""

@dataclass
class Hotel:
    id: int
    nombre: str
    direccion: str
    precio_noche: float
    acepta_mascotas: bool
    disponibilidad: int

@dataclass
class Transporte:
    id: int
    tipo: str
    origen: str
    destino: str
    precio_por_persona: float
    duracion_min: int

@dataclass
class Reserva:
    id: int
    categoria: str
    item_id: int
    cliente: str
    fecha: str
    personas: int
    info: str = ""

SITIOS: List[Sitio] = [
    # Sitios de Barranquilla
    Sitio(1, "Puerto Mocho", "turistico", "Malecón del Río, Barranquilla", "Mirador icónico sobre el río Magdalena, ideal para paseos y atardeceres", 10.9893, -74.7944, 0, True, True, "06:00-22:00", "Frente al río Magdalena, cerca del Puente Pumarejo", "Puerto Mocho", "Iconic viewpoint over the Magdalena River, ideal for walks and sunsets"),

    Sitio(2, "Malecón de Barranquilla", "turistico", "Carrera 1, Barranquilla", "Paseo marítimo con vista al río, restaurantes y espacios recreativos", 10.9920, -74.7910, 0, True, True, "00:00-23:59", "A lo largo del río Magdalena", "Barranquilla Boardwalk", "Riverside promenade with restaurants and recreational spaces"),

    Sitio(3, "Estadio Metropolitano Roberto Meléndez", "turistico", "Calle 72 con Circunvalar, Barranquilla", "Estadio de fútbol, sede de partidos del Junior y eventos masivos", 11.0018, -74.8215, 0, True, False, "Según eventos", "Vía 40, cerca del Centro Comercial Buenavista", "Roberto Meléndez Metropolitan Stadium", "Football stadium, home of Junior FC and massive events"),

    Sitio(4, "Zoológico de Barranquilla", "turistico", "Calle 77 No. 68-40, Barranquilla", "Uno de los mejores zoológicos de Colombia con amplia variedad de especies", 10.9978, -74.8165, 12000, True, False, "09:00-17:00", "Vía 40, cerca del Estadio", "Barranquilla Zoo", "One of Colombia's best zoos with a wide variety of species"),

    Sitio(5, "El Muelle (Puerto Colombia)", "turistico", "Puerto Colombia, Atlántico", "Antiguo muelle de hierro, patrimonio histórico con vista al mar Caribe", 10.9895, -74.9529, 0, True, True, "00:00-23:59", "Puerto Colombia, a 30 min de Barranquilla", "The Pier (Puerto Colombia)", "Old iron pier, historical heritage with Caribbean Sea view"),

    Sitio(6, "Playa de Puerto Colombia", "naturaleza", "Puerto Colombia, Atlántico", "Playa del Caribe colombiano, ideal para surf y deportes acuáticos", 10.9870, -74.9580, 0, True, True, "06:00-20:00", "Junto al Muelle de Puerto Colombia", "Puerto Colombia Beach", "Colombian Caribbean beach, ideal for surfing and water sports"),

    Sitio(7, "La Troja", "nocturno", "Carrera 43 No. 31-120, Barranquilla", "Discoteca emblemática con música vallenata, salsa y champeta", 11.0050, -74.8115, 15000, False, False, "21:00-04:00", "Norte de Barranquilla, zona de bares", "La Troja", "Iconic nightclub with vallenato, salsa and champeta music"),

    Sitio(8, "Kilimanjaro", "nocturno", "Calle 93 No. 52-165, Barranquilla", "Discoteca y bar con ambiente tropical y música urbana", 11.0140, -74.8072, 18000, False, False, "22:00-05:00", "Zona Norte, cerca de universidades", "Kilimanjaro", "Nightclub and bar with tropical atmosphere and urban music"),

    Sitio(9, "Museo del Caribe", "cultural", "Calle 36 No. 46-66, Barranquilla", "Museo interactivo sobre la cultura e historia de la región Caribe", 10.9958, -74.7932, 8000, True, False, "08:00-17:00", "Centro de Barranquilla, cerca del Paseo Bolívar", "Caribbean Museum", "Interactive museum about Caribbean culture and history"),

    Sitio(10, "Gran Malecón", "restaurante", "Carrera 51B No. 79-201, Barranquilla", "Restaurante de comida costeña y mariscos", 11.0025, -74.8142, 25000, True, False, "11:00-22:00", "Cerca del Estadio Metropolitano", "Gran Malecón Restaurant", "Coastal cuisine and seafood restaurant"),

    # Sitios de otras ciudades de Colombia
    Sitio(11, "Ciudad Amurallada - Cartagena", "turistico", "Centro histórico, Cartagena", "Barrio histórico con murallas coloniales, plazas y arquitectura del siglo XVI", 10.4231, -75.5470, 0, True, False, "00:00-23:59", "Torre del Reloj (entrada principal)", "Walled City - Cartagena", "Historic walled city with colonial walls, plazas and 16th century architecture"),

    Sitio(12, "Playa Blanca - Barú", "naturaleza", "Isla Barú, Cartagena", "Playa paradisíaca con arena blanca y aguas cristalinas del Caribe", 10.2167, -75.6167, 10000, True, False, "08:00-18:00", "Isla Barú, acceso en lancha desde Cartagena", "Playa Blanca - Barú", "Paradise beach with white sand and crystal clear Caribbean waters"),

    Sitio(13, "Parque Tayrona", "naturaleza", "Santa Marta, Magdalena", "Parque nacional con playas vírgenes, senderos ecológicos y biodiversidad única", 11.3306, -74.1306, 62000, True, False, "07:00-17:00", "Entrada por El Zaino, 34 km de Santa Marta", "Tayrona National Park", "National park with virgin beaches, ecological trails and unique biodiversity"),

    Sitio(14, "Museo del Oro - Bogotá", "cultural", "Calle 16 No. 5-41, Bogotá", "El museo de orfebrería precolombina más importante del mundo", 4.5981, -74.0758, 5000, True, False, "09:00-18:00", "La Candelaria, cerca a Plaza de Bolívar", "Gold Museum - Bogotá", "The world's most important pre-Columbian goldsmithing museum"),

    Sitio(15, "Monserrate - Bogotá", "turistico", "Cerro de Monserrate, Bogotá", "Santuario religioso a 3,152 msnm con vista panorámica de Bogotá", 4.6055, -74.0565, 28000, True, False, "06:30-23:00", "Centro de Bogotá, teleférico o funicular", "Monserrate - Bogotá", "Religious sanctuary at 3,152 masl with panoramic view of Bogotá"),

    Sitio(16, "Plaza Botero - Medellín", "cultural", "Centro, Medellín", "Plaza con 23 esculturas monumentales donadas por Fernando Botero", 6.2522, -75.5677, 0, True, False, "00:00-23:59", "Centro de Medellín, frente al Museo de Antioquia", "Botero Plaza - Medellín", "Plaza with 23 monumental sculptures donated by Fernando Botero"),

    Sitio(17, "Valle de Cocora", "naturaleza", "Salento, Quindío", "Valle con las palmas de cera más altas del mundo en paisaje cafetero", 4.6389, -75.4914, 8000, True, False, "07:00-16:00", "Salento, Quindío - entrada al valle en Jeep", "Cocora Valley", "Valley with the world's tallest wax palms in coffee landscape"),

    Sitio(18, "Caño Cristales", "naturaleza", "La Macarena, Meta", "El río más hermoso del mundo con 5 colores únicos", 2.2042, -73.7851, 180000, True, False, "07:00-15:00", "La Macarena, Meta - acceso con tour", "Caño Cristales", "The world's most beautiful river with 5 unique colors"),

    Sitio(19, "Isla de San Andrés", "turistico", "Archipiélago de San Andrés", "Isla caribeña con mar de siete colores y cultura raizal", 12.5842, -81.7006, 0, True, True, "00:00-23:59", "Aeropuerto Gustavo Rojas Pinilla", "San Andrés Island", "Caribbean island with seven-color sea and Raizal culture"),

    Sitio(20, "Desierto de la Tatacoa", "naturaleza", "Villavieja, Huila", "Desierto con formaciones rocosas rojizas y grises, ideal para astronomía", 3.2167, -75.1667, 12000, True, False, "06:00-20:00", "Villavieja, Huila - 38 km de Neiva", "Tatacoa Desert", "Desert with reddish and gray rock formations, ideal for astronomy"),
]

HOTELES: List[Hotel] = [
    # Hoteles en Barranquilla
    Hotel(1, "Hotel El Prado", "Carrera 54 No. 70-10, Barranquilla", 180000, True, 8),
    Hotel(2, "GHL Hotel Barranquilla", "Calle 77B No. 57-141, Barranquilla", 220000, False, 12),
    Hotel(3, "Hotel Barranquilla Plaza", "Calle 74 No. 41-119, Barranquilla", 150000, True, 15),
    Hotel(4, "Hilton Garden Inn Barranquilla", "Calle 74 No. 59-31, Barranquilla", 350000, True, 5),
    Hotel(5, "Hostal Casa Blanca", "Calle 70 No. 44-52, Barranquilla", 45000, False, 20),

    # Hoteles en otras ciudades
    Hotel(6, "Hotel Caribe Cartagena", "Carrera 1 No. 2-87, Cartagena", 450000, True, 10),
    Hotel(7, "Casa San Agustín (Cartagena)", "Calle Universidad No. 36-44, Cartagena", 850000, False, 3),
    Hotel(8, "Hostal Casa del Mar (Santa Marta)", "Carrera 1 No. 18-56, Santa Marta", 65000, True, 18),
    Hotel(9, "Hotel Estelar Santamar (Santa Marta)", "Km 14 Vía Ciénaga, Santa Marta", 280000, True, 12),
    Hotel(10, "Hotel Casa Deco (Bogotá)", "Calle 12C No. 2-36, Bogotá", 120000, False, 8),
]

TRANSPORTES: List[Transporte] = [
    # Transporte en Barranquilla
    Transporte(1, "Taxi", "Aeropuerto Ernesto Cortissoz", "Centro de Barranquilla", 35000, 30),
    Transporte(2, "Bus Metrolinea", "Portal del Prado", "Centro Histórico", 3200, 20),
    Transporte(3, "Taxi", "Barranquilla", "Puerto Colombia (Playa)", 25000, 35),
    Transporte(4, "Bus Urbano", "Centro", "Estadio Metropolitano", 3200, 25),
    Transporte(5, "Taxi", "Centro", "Zoológico de Barranquilla", 15000, 20),

    # Transporte entre ciudades
    Transporte(6, "Bus", "Barranquilla", "Cartagena", 35000, 120),
    Transporte(7, "Bus", "Barranquilla", "Santa Marta", 30000, 90),
    Transporte(8, "Taxi", "Aeropuerto Rafael Núñez", "Centro de Cartagena", 25000, 25),
    Transporte(9, "Bus Metroplus", "Estación Aguacatala", "Estación Cisneros, Medellín", 3000, 35),
    Transporte(10, "TransMilenio", "Portal Norte", "Las Aguas (Centro), Bogotá", 3000, 45),

    # Transporte turístico
    Transporte(11, "Lancha", "Cartagena", "Playa Blanca (Barú)", 50000, 60),
    Transporte(12, "Chiva Turística", "Centro de Cartagena", "Tour Ciudad Amurallada", 60000, 90),
]

RESERVAS: List[Reserva] = []
_next_id = 1


def _load_reservas_from_disk():
    global RESERVAS, _next_id

    # On Vercel, use in-memory storage only (filesystem is read-only)
    if IS_VERCEL:
        RESERVAS = []
        _next_id = 1
        return

    if not os.path.exists(RESERVAS_FILE):
        # create initial empty file
        with open(RESERVAS_FILE, "w", encoding="utf-8") as f:
            json.dump({"next_id": 1, "reservas": []}, f, ensure_ascii=False, indent=2)
        RESERVAS = []
        _next_id = 1
        return
    with open(RESERVAS_FILE, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            raw = data.get("reservas", [])
            RESERVAS = [Reserva(**r) for r in raw]
            _next_id = int(data.get("next_id", max((r.id for r in RESERVAS), default=0) + 1))
        except Exception:
            RESERVAS = []
            _next_id = 1


def _save_reservas_to_disk():
    # NOTE: This function should ONLY be called from within a _data_lock context
    # On Vercel, skip file operations (filesystem is read-only)
    if IS_VERCEL:
        return

    data = {"next_id": _next_id, "reservas": [r.__dict__ for r in RESERVAS]}
    with open(RESERVAS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def create_reserva(categoria: str, item_id: int, cliente: str, fecha: str, personas: int, info: str = "") -> Reserva:
    global _next_id
    if not cliente or not fecha:
        raise RuntimeError("Campos 'cliente' y 'fecha' son obligatorios")

    if categoria == "hotel":
        h = next((x for x in HOTELES if x.id == item_id), None)
        if not h or h.disponibilidad <= 0:
            raise RuntimeError("Hotel no disponible")
        h.disponibilidad -= 1
    elif categoria == "sitio":
        s = next((x for x in SITIOS if x.id == item_id), None)
        if not s:
            raise RuntimeError("Sitio no existe")
    elif categoria == "transporte":
        t = next((x for x in TRANSPORTES if x.id == item_id), None)
        if not t:
            raise RuntimeError("Transporte no existe")
    else:
        raise RuntimeError("Categoría no válida")

    with _data_lock:
        r = Reserva(_next_id, categoria, item_id, cliente, fecha, personas, info)
        RESERVAS.append(r)
        _next_id += 1
        _save_reservas_to_disk()
    return r

@app.route("/")
def index():
    return send_from_directory("static/pages", "index.html")

@app.route("/api/info")
def api_info():
    """Return environment info for the frontend"""
    return jsonify({
        "is_vercel": IS_VERCEL,
        "message": "Las reservas se guardan en memoria (demo mode)" if IS_VERCEL else "Las reservas se guardan en archivo"
    })

@app.route("/reservas")
def reservas_page():
    return send_from_directory("static/pages", "reservas.html")

@app.route("/api/sitios")
def api_sitios():
    # support language selection via query param ?lang=en
    lang = (request.args.get('lang') or 'es').lower()
    out = []
    for s in SITIOS:
        d = s.__dict__.copy()
        # if english requested and translations available, replace
        if lang.startswith('en'):
            if getattr(s, 'nombre_en', None):
                d['nombre'] = s.nombre_en
            if getattr(s, 'descripcion_en', None):
                d['descripcion'] = s.descripcion_en
        out.append(d)
    return jsonify(out)

@app.route("/api/hoteles")
def api_hoteles():
    return jsonify([h.__dict__ for h in HOTELES])

@app.route("/api/transporte")
def api_transporte():
    return jsonify([t.__dict__ for t in TRANSPORTES])

def get_item_nombre(categoria: str, item_id: int) -> str:
    """Get the name of a reserved item by category and ID"""
    if categoria == "sitio":
        item = next((s for s in SITIOS if s.id == item_id), None)
        return item.nombre if item else f"Sitio #{item_id}"
    elif categoria == "hotel":
        item = next((h for h in HOTELES if h.id == item_id), None)
        return item.nombre if item else f"Hotel #{item_id}"
    elif categoria == "transporte":
        item = next((t for t in TRANSPORTES if t.id == item_id), None)
        if item:
            return f"{item.tipo}: {item.origen} → {item.destino}"
        return f"Transporte #{item_id}"
    return f"{categoria} #{item_id}"

@app.route("/api/reservas", methods=["GET", "POST"])
def api_reservas():
    if request.method == "GET":
        result = []
        for r in RESERVAS:
            data = r.__dict__.copy()
            data['item_nombre'] = get_item_nombre(r.categoria, r.item_id)
            result.append(data)
        return jsonify(result)
    data = request.json or {}
    try:
        # basic validation
        categoria = data.get("categoria")
        item_id = int(data.get("item_id", 0))
        cliente = data.get("cliente", "").strip()
        fecha = data.get("fecha", "").strip()
        personas = int(data.get("personas", 1))
        info = data.get("info", "")

        r = create_reserva(categoria, item_id, cliente, fecha, personas, info)
        return jsonify(r.__dict__), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/reservas/<int:reserva_id>", methods=["GET", "DELETE"])
def api_reserva_detail(reserva_id: int):
    r = next((x for x in RESERVAS if x.id == reserva_id), None)
    if not r:
        return jsonify({"error": "Reserva no encontrada"}), 404
    if request.method == "GET":
        return jsonify(r.__dict__)
    # DELETE
    with _data_lock:
        RESERVAS.remove(r)
        # if it's a hotel, restore availability
        if r.categoria == "hotel":
            h = next((x for x in HOTELES if x.id == r.item_id), None)
            if h:
                h.disponibilidad += 1
        _save_reservas_to_disk()
    return jsonify({"status": "eliminada"})

# Load reservas on module import (for production servers like gunicorn)
_load_reservas_from_disk()

if __name__ == "__main__":
    # Run development server
    app.run(debug=True, port=5000)
