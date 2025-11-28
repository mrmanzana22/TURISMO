// --- Formatear precios en formato colombiano
function formatPrecio(precio) {
  if (precio === 0) return null;
  return '$' + precio.toLocaleString('es-CO');
}

// --- LocalStorage para reservas (persistencia en Vercel)
function getLocalReservas() {
  try {
    return JSON.parse(localStorage.getItem('tripfinder_reservas') || '[]');
  } catch(e) {
    return [];
  }
}

function saveLocalReservas(reservas) {
  localStorage.setItem('tripfinder_reservas', JSON.stringify(reservas));
}

function addLocalReserva(reserva) {
  const reservas = getLocalReservas();
  // Evitar duplicados por ID
  const exists = reservas.find(r => r.id === reserva.id);
  if (!exists) {
    reservas.push(reserva);
    saveLocalReservas(reservas);
  }
}

function removeLocalReserva(id) {
  const reservas = getLocalReservas().filter(r => r.id !== id);
  saveLocalReservas(reservas);
}

// --- i18n setup
const i18n = {
  es: {
    reservasNav: 'Mis reservas',
    explorar: 'Explorar',
    heroTitle: 'Descubre lugares inolvidables',
    heroSub: 'Explora sitios, hoteles y transportes — reserva fácil y rápido.',
    sitiosTitle: 'Sitios recomendados',
    hotelesTitle: 'Hoteles recomendados',
    transporteTitle: 'Opciones de transporte',
    mapTitle: 'Mapa de sitios turísticos',
    mapHelp: 'Haz clic en los marcadores para ver información del sitio',
    reserveBtn: 'Reservar',
    verMapa: 'Ver en mapa',
    noReservas: 'No hay reservas',
    deleteConfirm: '¿Eliminar reserva R',
    clienteLabel: 'Nombre cliente',
    fechaLabel: 'Fecha',
    personasLabel: 'Personas',
    infoLabel: 'Info (opcional)',
    cancel: 'Cancelar',
    submit: 'Reservar',
    createdMsg: 'Reserva creada R',
    porNoche: 'por noche',
    disponibilidad: 'Disponibilidad',
    aceptaMascotas: 'Acepta mascotas',
    noAceptaMascotas: 'No acepta mascotas',
    duracion: 'Duración',
    minutos: 'min',
    recomendados: 'Sitios Recomendados para Ti',
    todosLosSitios: 'Todos los Sitios Disponibles'
  },
  en: {
    reservasNav: 'My reservations',
    explorar: 'Explore',
    heroTitle: 'Discover unforgettable places',
    heroSub: 'Explore sites, hotels and transport — book quickly and easily.',
    sitiosTitle: 'Recommended places',
    hotelesTitle: 'Recommended hotels',
    transporteTitle: 'Transportation options',
    mapTitle: 'Tourist sites map',
    mapHelp: 'Click on markers to view site information',
    reserveBtn: 'Reserve',
    verMapa: 'View on map',
    noReservas: 'No reservations',
    deleteConfirm: 'Delete reservation R',
    clienteLabel: 'Guest name',
    fechaLabel: 'Date',
    personasLabel: 'Guests',
    infoLabel: 'Info (optional)',
    cancel: 'Cancel',
    submit: 'Reserve',
    createdMsg: 'Reservation created R',
    porNoche: 'per night',
    disponibilidad: 'Availability',
    aceptaMascotas: 'Pets allowed',
    noAceptaMascotas: 'No pets',
    duracion: 'Duration',
    minutos: 'min',
    recomendados: 'Recommended Sites for You',
    todosLosSitios: 'All Available Sites'
  }
};

let currentLang = (localStorage.getItem('app_lang') || 'es');

let userPreferences = {
  lang: 'es',
  kids: 'any',
  pets: 'any',
  type: 'all'
};

function langQuery(url){
  if(url.startsWith('/api/sitios')){
    return url.includes('?') ? url + '&lang=' + currentLang : url + '?lang=' + currentLang;
  }
  return url;
}

async function fetchJson(url){
  const r = await fetch(langQuery(url));
  return r.json();
}

// Renderizar sitios con filtros y recomendaciones
async function renderSitios(){
  const cont = document.getElementById("sitios-list");
  if(!cont) return;

  const allSitios = await fetchJson("/api/sitios");

  // Sitios recomendados (que cumplen con las preferencias)
  const recommended = allSitios.filter(s => {
    if (userPreferences.kids === 'yes' && !s.acepta_ninos) return false;
    if (userPreferences.pets === 'yes' && !s.acepta_mascotas) return false;
    if (userPreferences.type !== 'all' && s.tipo !== userPreferences.type) return false;
    return true;
  });

  // Otros sitios
  const others = allSitios.filter(s => !recommended.includes(s));

  let html = '';

  // Mostrar recomendados si hay filtros activos
  if (userPreferences.kids !== 'any' || userPreferences.pets !== 'any' || userPreferences.type !== 'all') {
    if (recommended.length > 0) {
      html += `<div class="col-12"><h3 class="mt-4 mb-3"><i class="bi bi-star-fill text-warning"></i> ${i18n[currentLang].recomendados}</h3></div>`;
      html += recommended.map(s => createSitioCard(s, true)).join('');
    }

    if (others.length > 0) {
      html += `<div class="col-12"><h4 class="mt-4 mb-3 text-muted">${i18n[currentLang].todosLosSitios}</h4></div>`;
      html += others.map(s => createSitioCard(s, false)).join('');
    }
  } else {
    // Sin filtros, mostrar todos
    html = allSitios.map(s => createSitioCard(s, false)).join('');
  }

  cont.innerHTML = html;
}

function createSitioCard(s, isRecommended) {
  const badge = isRecommended ? '<span class="badge bg-warning text-dark ms-2"><i class="bi bi-star-fill"></i> Recomendado</span>' : '';
  const precioFormateado = formatPrecio(s.precio);
  return `
    <div class="col-sm-6 col-md-4 fade-in">
      <div class="card card-sitio mb-3 shadow-sm h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="mb-1">${s.nombre} ${badge}</h5>
          <small class="text-muted mb-2">${s.tipo}</small>
          <p class="mb-3 text-muted small">${s.descripcion}</p>
          <div class="mb-2">
            ${s.acepta_ninos ? '<span class="badge bg-info me-1"><i class="bi bi-people-fill"></i> Niños</span>' : ''}
            ${s.acepta_mascotas ? '<span class="badge bg-success"><i class="bi bi-heart-fill"></i> Mascotas</span>' : ''}
          </div>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="badge badge-precio">${precioFormateado || (currentLang === 'es' ? 'Gratis' : 'Free')}</span>
            <button class="btn btn-sm btn-primary" onclick="showReservaModal('sitio', ${s.id})">
              <i class="bi bi-calendar-plus"></i> ${i18n[currentLang].reserveBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderReservas(){
  const cont = document.getElementById("reservas-list");
  if(!cont) return;

  // Usar localStorage como fuente principal (funciona en Vercel)
  let reservas = getLocalReservas();

  // Intentar sincronizar con servidor (puede fallar en Vercel serverless)
  try {
    const serverReservas = await fetchJson("/api/reservas");
    // Si el servidor tiene reservas, sincronizar con localStorage
    if (serverReservas && serverReservas.length > 0) {
      serverReservas.forEach(r => addLocalReserva(r));
      reservas = getLocalReservas();
    }
  } catch(e) {
    console.log('Usando reservas locales');
  }

  if(reservas.length===0){
    cont.innerHTML = `<p class='text-muted'>${i18n[currentLang].noReservas}</p>`;
    return;
  }
  cont.innerHTML = "<div class='row g-2'>"+reservas.map(r=>
    `<div class='col-12'>
       <div class='card'><div class='card-body d-flex justify-content-between align-items-center'>
         <div>
           <strong>R${r.id}</strong> — ${r.item_nombre} <br>
           <small class='text-muted'>${r.cliente} · ${r.fecha} · ${r.personas} ${i18n[currentLang].personasLabel.toLowerCase()}</small>
         </div>
         <div>
           <button class='btn btn-sm btn-outline-danger' onclick='deleteReserva(${r.id})'>
             <i class="bi bi-trash"></i> ${currentLang==='en'?'Delete':'Eliminar'}
           </button>
         </div>
       </div></div>
     </div>`
  ).join("")+"</div>";
}

function showReservaModal(categoria, item_id){
  const modalEl = document.getElementById('reservaModal');
  if(!modalEl) return;

  document.getElementById('res-categoria').value = categoria;
  document.getElementById('res-item-id').value = item_id;
  document.getElementById('res-cliente').value = '';
  document.getElementById('res-fecha').value = '';
  document.getElementById('res-personas').value = 1;
  document.getElementById('res-info').value = '';

  const bs = new bootstrap.Modal(modalEl);
  bs.show();
}

async function deleteReserva(id){
  if(!confirm(i18n[currentLang].deleteConfirm + id + '?')) return;

  // Eliminar de localStorage primero
  removeLocalReserva(id);

  // Intentar eliminar del servidor también
  try {
    await fetch('/api/reservas/'+id, { method: 'DELETE' });
  } catch(err) {
    console.log('Error al eliminar del servidor, ya eliminada localmente');
  }

  renderReservas();
}

// Render Hoteles
async function renderHoteles(){
  const cont = document.getElementById("hoteles-list");
  if(!cont) return;
  const hoteles = await fetchJson("/api/hoteles");
  cont.innerHTML = hoteles.map(h => {
    const precioFormateado = formatPrecio(h.precio_noche);
    return `
    <div class="col-sm-6 col-md-4">
      <div class="card card-sitio mb-3 shadow-sm h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="mb-1">${h.nombre}</h5>
          <p class="mb-2 text-muted small">${h.direccion}</p>
          <div class="mb-3">
            <span class="badge badge-precio">${precioFormateado} ${i18n[currentLang].porNoche}</span>
            <span class="badge bg-secondary ms-1">${i18n[currentLang].disponibilidad}: ${h.disponibilidad}</span>
          </div>
          <div class="mb-2">
            <small class="text-muted">${h.acepta_mascotas ? '🐾 '+i18n[currentLang].aceptaMascotas : '🚫 '+i18n[currentLang].noAceptaMascotas}</small>
          </div>
          <div class="mt-auto">
            <button class="btn btn-sm btn-primary w-100" onclick="showReservaModal('hotel', ${h.id})">
              <i class="bi bi-calendar-plus"></i> ${i18n[currentLang].reserveBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;}).join("");
}

// Render Transporte
async function renderTransporte(){
  const cont = document.getElementById("transporte-list");
  if(!cont) return;
  const transportes = await fetchJson("/api/transporte");
  cont.innerHTML = transportes.map(t => {
    const precioFormateado = formatPrecio(t.precio_por_persona);
    return `
    <div class="col-sm-6 col-md-4">
      <div class="card card-sitio mb-3 shadow-sm h-100">
        <div class="card-body">
          <h6 class="mb-1 text-primary"><i class="bi bi-bus-front"></i> ${t.tipo}</h6>
          <p class="mb-2"><strong>${t.origen}</strong> → <strong>${t.destino}</strong></p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="badge badge-precio">${precioFormateado}</span>
            <small class="text-muted"><i class="bi bi-clock"></i> ${t.duracion_min} ${i18n[currentLang].minutos}</small>
          </div>
        </div>
      </div>
    </div>
  `;}).join("");
}

// Render Map
let map = null;
async function renderMap(){
  const mapEl = document.getElementById("map");
  if(!mapEl) return;

  const sitios = await fetchJson("/api/sitios");

  if(!map){
    map = L.map('map').setView([10.9896, -74.7937], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }

  sitios.forEach(s => {
    const marker = L.marker([s.lat, s.lon]).addTo(map);
    const precioFormateado = formatPrecio(s.precio);
    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h6 class="mb-1">${s.nombre}</h6>
        <p class="mb-1 small">${s.descripcion}</p>
        <p class="mb-1 small text-muted">${s.direccion}</p>
        <span class="badge badge-precio">${precioFormateado || (currentLang==='es'?'Gratis':'Free')}</span>
      </div>
    `);
  });
}

// Mostrar modal de bienvenida si es primera visita
function checkFirstVisit() {
  const hasVisited = localStorage.getItem('has_visited');
  if (!hasVisited) {
    setTimeout(() => {
      const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
      welcomeModal.show();
    }, 500);
  }
}

// Aplicar preferencias del usuario
function applyPreferences() {
  const lang = document.querySelector('input[name="lang_pref"]:checked').value;
  const kids = document.querySelector('input[name="kids_pref"]:checked').value;
  const pets = document.querySelector('input[name="pets_pref"]:checked').value;
  const type = document.getElementById('type_pref').value;

  userPreferences = { lang, kids, pets, type };
  localStorage.setItem('user_preferences', JSON.stringify(userPreferences));
  localStorage.setItem('has_visited', 'true');

  setLanguage(lang);

  const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
  welcomeModal.hide();

  renderSitios();
}

// Ir a página de reservas
function goToReservations() {
  window.location.href = '/reservas';
}

// Cerrar modal de confirmación
function closeConfirmation() {
  const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
  if (confirmModal) confirmModal.hide();
}

// Cargar preferencias guardadas
function loadSavedPreferences() {
  const saved = localStorage.getItem('user_preferences');
  if (saved) {
    userPreferences = JSON.parse(saved);
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", ()=>{
  loadSavedPreferences();
  applyLanguage();
  renderSitios();
  renderReservas();
  renderHoteles();
  renderTransporte();
  renderMap();
  checkFirstVisit();

  // Form submit handler para reservas
  const form = document.getElementById('reserva-form');
  if(form){
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();

      const categoria = document.getElementById('res-categoria').value;
      const item_id = parseInt(document.getElementById('res-item-id').value,10);
      const cliente = document.getElementById('res-cliente').value.trim();
      const fecha = document.getElementById('res-fecha').value;
      const personas = parseInt(document.getElementById('res-personas').value || '1',10);
      const info = document.getElementById('res-info').value || '';

      try{
        const resp = await fetch('/api/reservas', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({categoria, item_id, cliente, fecha, personas, info})
        });

        const js = await resp.json();

        if(js.error) {
          alert((currentLang==='en'?'Error: ':'Error: ')+js.error);
          return;
        }

        // Guardar en localStorage inmediatamente
        const reservaLocal = {
          id: js.id,
          categoria: categoria,
          item_id: item_id,
          cliente: cliente,
          fecha: fecha,
          personas: personas,
          info: info,
          item_nombre: js.item_nombre || `${categoria} #${item_id}`
        };
        addLocalReserva(reservaLocal);

        // Cerrar modal de reserva
        const modalEl = document.getElementById('reservaModal');
        const reservaModal = bootstrap.Modal.getInstance(modalEl);
        if(reservaModal) reservaModal.hide();

        // Mostrar modal de confirmación
        document.getElementById('reservation-number').textContent = 'R' + js.id;
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmModal.show();

        renderReservas();
      }catch(err){
        console.error(err);
        alert(currentLang==='en'?'Error creating reservation':'Error al crear reserva');
      }
    });
  }
});

// Actualizar reservas cuando la página se muestra (incluyendo navegación con botón atrás)
window.addEventListener('pageshow', (event) => {
  // Si la página viene del caché (bfcache), recargar las reservas
  if (event.persisted) {
    renderReservas();
  }
});

// También actualizar cuando la página se hace visible (cambio de pestaña)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    renderReservas();
  }
});

function applyLanguage(){
  document.querySelectorAll('#lang-es, #lang-en').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById('lang-'+currentLang);
  if(btn) btn.classList.add('active');

  const navRes = document.getElementById('nav-reservas'); if(navRes) navRes.textContent = i18n[currentLang].reservasNav;
  const navExp = document.getElementById('nav-explorar'); if(navExp) navExp.textContent = i18n[currentLang].explorar;
  const heroTitle = document.getElementById('hero-title'); if(heroTitle) heroTitle.textContent = i18n[currentLang].heroTitle;
  const heroSub = document.getElementById('hero-sub'); if(heroSub) heroSub.textContent = i18n[currentLang].heroSub;
  const heroRes = document.getElementById('hero-reservas'); if(heroRes) heroRes.textContent = i18n[currentLang].reservasNav;
  const sitiosTitle = document.getElementById('sitios-title'); if(sitiosTitle) sitiosTitle.textContent = i18n[currentLang].sitiosTitle;
  const hotelesTitle = document.getElementById('hoteles-title'); if(hotelesTitle) hotelesTitle.textContent = i18n[currentLang].hotelesTitle;
  const transporteTitle = document.getElementById('transporte-title'); if(transporteTitle) transporteTitle.textContent = i18n[currentLang].transporteTitle;
  const mapTitle = document.getElementById('map-title'); if(mapTitle) mapTitle.textContent = i18n[currentLang].mapTitle;
  const mapHelp = document.getElementById('map-help'); if(mapHelp) mapHelp.textContent = i18n[currentLang].mapHelp;
  const reservasTitle = document.getElementById('reservas-title'); if(reservasTitle) reservasTitle.textContent = i18n[currentLang].reservasNav;

  const labelCliente = document.getElementById('label-cliente'); if(labelCliente) labelCliente.textContent = i18n[currentLang].clienteLabel;
  const labelFecha = document.getElementById('label-fecha'); if(labelFecha) labelFecha.textContent = i18n[currentLang].fechaLabel;
  const labelPersonas = document.getElementById('label-personas'); if(labelPersonas) labelPersonas.textContent = i18n[currentLang].personasLabel;
  const labelInfo = document.getElementById('label-info'); if(labelInfo) labelInfo.textContent = i18n[currentLang].infoLabel;
  const modalCancel = document.getElementById('modal-cancel'); if(modalCancel) modalCancel.textContent = i18n[currentLang].cancel;
  const modalSubmit = document.getElementById('modal-submit'); if(modalSubmit) modalSubmit.textContent = i18n[currentLang].submit;
}

function setLanguage(lang){
  if(!i18n[lang]) return;
  currentLang = lang;
  userPreferences.lang = lang;
  localStorage.setItem('app_lang', lang);
  localStorage.setItem('user_preferences', JSON.stringify(userPreferences));

  applyLanguage();
  renderSitios();
  renderReservas();
  renderHoteles();
  renderTransporte();
}
