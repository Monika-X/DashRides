/**
 * DASHRIDES - ADMIN DASHBOARD CONTROLLER
 * Full CRUD for fleet, bookings, availability, pricing, coverage, deposits
 * Persists to localStorage, seeds demo data on first load
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminTabs();
  seedData();
  renderAll();
  initCountdowns();
  bindForms();
});

// ---------- Storage Helpers ----------
const LS_FLEET = 'dashrides_admin_fleet';
const LS_BOOKINGS = 'dashrides_admin_bookings';
const LS_HUBS = 'dashrides_admin_hubs';
const LS_PRICING = 'dashrides_admin_pricing';

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ---------- Seed Data ----------
const defaultFleet = [
  { id: 'phantom-pro', name: 'Dash Phantom Pro', category: 'scooter long-range', hourly: 12, daily: 45, weekly: 240, deposit: 100, speed: '45 km/h', range: '60 km', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', total: 14, available: 9, badge: 'Top Pick' },
  { id: 'cyber-x', name: 'CyberScoot X', category: 'scooter', hourly: 15, daily: 55, weekly: 280, deposit: 100, speed: '52 km/h', range: '48 km', img: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80', total: 10, available: 8, badge: 'Futuristic' },
  { id: 'glide-lite', name: 'Urban Glide Lite', category: 'scooter', hourly: 9, daily: 35, weekly: 190, deposit: 80, speed: '32 km/h', range: '35 km', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80', total: 8, available: 6, badge: 'Ultra-Light' },
  { id: 'classic-50', name: 'Moped Classic 50', category: 'moped long-range', hourly: 18, daily: 65, weekly: 320, deposit: 150, speed: '60 km/h', range: '75 km', img: 'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=800&q=80', total: 6, available: 4, badge: 'Classic Vibe' },
  { id: 'cruiser-gt', name: 'Cruiser GT EV', category: 'moped long-range', hourly: 22, daily: 85, weekly: 400, deposit: 150, speed: '75 km/h', range: '90 km', img: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80', total: 6, available: 3, badge: 'GT Cruiser' },
  { id: 'stealth-apex', name: 'Stealth Apex 100', category: 'scooter long-range', hourly: 20, daily: 75, weekly: 360, deposit: 120, speed: '65 km/h', range: '80 km', img: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=800&q=80', total: 4, available: 1, badge: 'Flagship' },
];

const defaultBookings = [
  { id: '#DR-9021', customer: 'Elena Vance', email: 'elena.vance@example.com', vehicle: 'Dash Phantom Pro', hub: 'Downtown Flagship Lounge (742 Grand Ave)', pickup: '2026-10-14T10:30', duration: 4, fare: 36, deposit: 100, status: 'In Progress', deadline: Date.now() + (4*3600+28*60)*1000, vehicleUnit: 'DR-9021' },
  { id: '#DR-9018', customer: 'Marcus Thorne', email: 'marcus@example.com', vehicle: 'CyberScoot X', hub: 'Arts District Warehouse Row', pickup: '2026-10-14T08:00', duration: 2, fare: 30, deposit: 100, status: 'Overdue', deadline: Date.now() - 47*60*1000, vehicleUnit: 'DR-8812' },
  { id: '#DR-9015', customer: 'Chloe Zhao', email: 'chloe@example.com', vehicle: 'Cruiser GT EV', hub: 'Coastal Esplanade Pier 14', pickup: '2026-10-14T09:15', duration: 24, fare: 85, deposit: 150, status: 'In Progress', deadline: Date.now() + 18*3600*1000, vehicleUnit: 'DR-8940' },
  { id: '#DR-9012', customer: 'Priya Nair', email: 'priya@example.com', vehicle: 'Urban Glide Lite', hub: 'University Science Park Dock', pickup: '2026-10-14T11:00', duration: 3, fare: 27, deposit: 80, status: 'Confirmed', deadline: Date.now() + 2*3600*1000, vehicleUnit: 'DR-8701' },
  { id: '#DR-9008', customer: 'Alex Morgan', email: 'alex@domain.com', vehicle: 'Moped Classic 50', hub: 'Downtown Flagship Lounge (742 Grand Ave)', pickup: '2026-10-13T15:30', duration: 24, fare: 65, deposit: 150, status: 'Completed', deadline: Date.now() - 24*3600*1000, vehicleUnit: 'DR-409' },
  { id: '#DR-8940', customer: 'Elena Vance', email: 'elena.vance@example.com', vehicle: 'Cruiser GT EV', hub: 'Coastal Tour Hub', pickup: '2026-10-10T14:15', duration: 24, fare: 85, deposit: 150, status: 'Completed', deadline: Date.now() - 4*24*3600*1000, vehicleUnit: 'DR-8940' },
];

const defaultHubs = [
  { name: 'Downtown Flagship Lounge', address: '742 Grand Ave, Suite 100 • 06:00 – Midnight', scooters: 40, mopeds: 15, total: 55, badge: 'Flagship' },
  { name: 'Coastal Esplanade Pier 14', address: '12 Ocean Blvd Pier • 07:00 – 22:00', scooters: 28, mopeds: 12, total: 40, badge: 'Beachfront' },
  { name: 'University Science Park Dock', address: 'Research Triangle, North Campus', scooters: 35, mopeds: 8, total: 43, badge: 'Campus' },
  { name: 'Arts District Warehouse Row', address: 'Warehouse Row, Museum Mile', scooters: 22, mopeds: 6, total: 28, badge: 'Arts' },
];

function seedData() {
  if (!localStorage.getItem(LS_FLEET)) saveLS(LS_FLEET, defaultFleet);
  if (!localStorage.getItem(LS_BOOKINGS)) saveLS(LS_BOOKINGS, defaultBookings);
  if (!localStorage.getItem(LS_HUBS)) saveLS(LS_HUBS, defaultHubs);
}

function getFleet() { return loadLS(LS_FLEET, defaultFleet); }
function getBookings() { return loadLS(LS_BOOKINGS, defaultBookings); }
function getHubs() { return loadLS(LS_HUBS, defaultHubs); }

// ---------- Tabs ----------
function initAdminTabs() {
  const btns = document.querySelectorAll('.admin-nav-btn[data-tab]');
  const panes = document.querySelectorAll('.admin-tab-pane');
  const mobileLinks = document.querySelectorAll('.admin-mobile-link');
  function activate(tabId) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    panes.forEach(p => p.classList.toggle('active', p.id === tabId));
    mobileLinks.forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  btns.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
  mobileLinks.forEach(l => l.addEventListener('click', (e) => { e.preventDefault(); activate(l.dataset.tab); document.querySelector('.mobile-nav')?.classList.remove('open'); document.querySelector('.mobile-overlay')?.classList.remove('active'); }));
  const hash = window.location.hash.replace('#','');
  if (hash && document.getElementById(hash)) activate(hash);
}

// ---------- Render All ----------
function renderAll() {
  renderFleet();
  renderAvailability();
  renderBookings();
  renderActiveRentals();
  renderReturns();
  renderPricing();
  renderCoverage();
  renderDeposits();
  renderReceipts();
  renderUsers();
  updateKPIs();
}

// ---------- KPIs ----------
function updateKPIs() {
  const fleet = getFleet();
  const bookings = getBookings();
  const totalFleet = fleet.reduce((s,f)=>s+f.total,0);
  const available = fleet.reduce((s,f)=>s+f.available,0);
  const active = bookings.filter(b=> b.status==='In Progress' || b.status==='Overdue').length;
  const revenueToday = bookings.filter(b=> b.status!=='Completed').reduce((s,b)=>s+b.fare,0) + 8420; // demo

  document.getElementById('kpi-total-fleet').textContent = totalFleet;
  document.getElementById('kpi-available').textContent = available;
  document.getElementById('kpi-active').textContent = active;
  document.getElementById('kpi-revenue').textContent = '$' + (8420).toLocaleString();
  document.getElementById('sidebar-revenue').textContent = '$' + (8420).toLocaleString();
  document.getElementById('sb-fleet-count').textContent = fleet.length;
  document.getElementById('sb-available').textContent = available;
  document.getElementById('sb-bookings').textContent = bookings.length;

  // overview bookings body
  const overviewBody = document.getElementById('overview-bookings-body');
  if (overviewBody) {
    overviewBody.innerHTML = bookings.slice(0,5).map(b=> `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.customer}</td>
        <td>${b.vehicle}</td>
        <td>${formatPickup(b.pickup)}</td>
        <td>${b.duration}h</td>
        <td>$${b.fare.toFixed(2)}</td>
        <td><span class="badge ${badgeForStatus(b.status)}">${b.status}</span></td>
      </tr>
    `).join('');
  }
}

function badgeForStatus(s) {
  if (s==='In Progress') return 'badge-orange';
  if (s==='Confirmed') return 'badge-lime';
  if (s==='Completed') return 'badge-available';
  if (s==='Overdue') return 'badge-busy';
  return 'badge-lime';
}
function formatPickup(iso) {
  try { const d=new Date(iso); return d.toLocaleString('en-US',{month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}); } catch { return iso; }
}

// ---------- Fleet ----------
function renderFleet() {
  const grid = document.getElementById('admin-fleet-grid');
  if (!grid) return;
  const fleet = getFleet();
  const search = (document.getElementById('fleet-search')?.value || '').toLowerCase();
  const filter = document.getElementById('fleet-filter')?.value || 'all';
  const sort = document.getElementById('fleet-sort')?.value || 'default';
  let list = [...fleet];
  if (search) list = list.filter(f=> f.name.toLowerCase().includes(search) || f.category.includes(search) || String(f.hourly).includes(search));
  if (filter !== 'all') list = list.filter(f=> f.category.includes(filter));
  if (sort === 'price-low') list.sort((a,b)=> a.hourly - b.hourly);
  if (sort === 'price-high') list.sort((a,b)=> b.hourly - a.hourly);
  if (sort === 'availability') list.sort((a,b)=> b.available - a.available);

  // Populate booking model select
  const bkModel = document.getElementById('bk-model');
  if (bkModel) bkModel.innerHTML = fleet.map(f=> `<option value="${f.name}">${f.name} ($${f.hourly}/hr · $${f.daily}/day)</option>`).join('');

  grid.innerHTML = list.map(f=> `
    <div class="admin-fleet-card">
      <img src="${f.img}" alt="${f.name}" class="admin-fleet-img" loading="lazy">
      <div class="admin-fleet-body">
        <div style="display:flex; justify-content:space-between; align-items:start; gap:0.5rem; margin-bottom:0.5rem;">
          <div>
            <h3 style="font-size:1.08rem; margin-bottom:0.15rem;">${f.name}</h3>
            <span style="font-size:0.75rem; color:var(--text-muted);">${f.category.replace('long-range','Long Range 50km+').toUpperCase()} • ${f.speed} • ${f.range}</span>
          </div>
          <span class="badge badge-lime" style="font-size:0.68rem;">${f.badge}</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin:0.9rem 0; padding:0.9rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
          <div><div style="font-size:0.7rem; color:var(--text-muted);">Hourly</div><div style="font-weight:800; color:var(--color-electric-lime); font-size:1.15rem;">$${f.hourly}</div></div>
          <div><div style="font-size:0.7rem; color:var(--text-muted);">Daily</div><div style="font-weight:800; color:var(--color-electric-lime); font-size:1.15rem;">$${f.daily}</div></div>
          <div><div style="font-size:0.7rem; color:var(--text-muted);">Fleet Total</div><div style="font-weight:700;">${f.total} units</div></div>
          <div><div style="font-size:0.7rem; color:var(--text-muted);">Available</div><div style="font-weight:700; color:${f.available<=1?'var(--color-danger)':'var(--color-success)'};">${f.available} / ${f.total}</div></div>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" style="flex:1; background: var(--color-burnt-orange); font-size:0.78rem;" onclick="editFleet('${f.id}')"><i class="fa-solid fa-pen"></i> Edit Rates</button>
          <button class="btn btn-outline btn-sm" style="font-size:0.78rem;" onclick="toggleFleetAvailability('${f.id}')"><i class="fa-solid fa-rotate"></i> ${f.available>0?'Hold 1':'Release 1'}</button>
          <button class="btn btn-outline btn-sm" style="font-size:0.78rem; color:var(--color-danger); border-color: rgba(239,68,68,0.3);" onclick="deleteFleet('${f.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('') || '<div style="grid-column:span 3; text-align:center; padding:2rem; color:var(--text-muted);">No models match your filters.</div>';
}

window.filterFleet = renderFleet;
window.toggleFleetForm = (open) => {
  const el = document.getElementById('fleet-form');
  if (open === false) { el.classList.remove('open'); document.getElementById('fleet-add-form').reset(); document.getElementById('fleet-edit-id').value=''; document.getElementById('fleet-form-title').textContent='Add New Scooter Model'; return; }
  el.classList.toggle('open');
  if (el.classList.contains('open')) el.scrollIntoView({behavior:'smooth', block:'center'});
};
window.editFleet = (id) => {
  const fleet = getFleet();
  const f = fleet.find(x=>x.id===id);
  if (!f) return;
  toggleFleetForm(true);
  document.getElementById('fleet-form-title').textContent = 'Edit: ' + f.name;
  document.getElementById('fleet-edit-id').value = f.id;
  document.getElementById('fleet-name').value = f.name;
  document.getElementById('fleet-category').value = f.category.split(' ')[0];
  document.getElementById('fleet-hourly').value = f.hourly;
  document.getElementById('fleet-daily').value = f.daily;
  document.getElementById('fleet-speed').value = f.speed;
  document.getElementById('fleet-range').value = f.range;
  document.getElementById('fleet-img').value = f.img;
};
window.deleteFleet = (id) => {
  if (!confirm('Delete this model? This will also remove its availability dots.')) return;
  const fleet = getFleet().filter(f=>f.id!==id);
  saveLS(LS_FLEET, fleet);
  renderAll();
  showToast('Model removed — fleet updated','info');
};
window.toggleFleetAvailability = (id) => {
  const fleet = getFleet();
  const f = fleet.find(x=>x.id===id);
  if (f.available>0) f.available = Math.max(0, f.available-1);
  else f.available = Math.min(f.total, f.available+1);
  saveLS(LS_FLEET, fleet);
  renderAll();
  showToast(`${f.name}: availability now ${f.available}/${f.total}`,'info');
};

// ---------- Availability ----------
function renderAvailability() {
  const matrix = document.getElementById('availability-matrix');
  const hubList = document.getElementById('hub-list');
  if (!matrix) return;
  const fleet = getFleet();
  // Build per-model dots
  matrix.innerHTML = fleet.map(f=>{
    const dots = [];
    for(let i=0;i<f.total;i++){
      let status='available';
      if (i >= f.available && i < f.available+2) status = 'rented';
      else if (i >= f.total-1 && f.available<=1) status = 'maintenance';
      // deterministic but interactive via click
      const idx = `${f.id}-${i}`;
      dots.push(`<div class="avail-dot ${status}" id="dot-${idx}" onclick="cycleDot('${f.id}',${i})" title="${f.name} Unit ${i+1} — ${status} (click to cycle)">${status==='available'?'A': status==='rented'?'R': status==='maintenance'?'M':'H'}</div>`);
    }
    return `
      <div style="background: var(--bg-tertiary); border:1px solid var(--border-color); border-radius: var(--radius-md); padding:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.7rem;">
          <div><div style="font-weight:800; font-size:0.95rem;">${f.name}</div><div style="font-size:0.72rem; color:var(--text-muted);">${f.available}/${f.total} available • $${f.hourly}/hr</div></div>
          <span class="badge ${f.available>3?'badge-available': f.available>0?'badge-orange':'badge-busy'}" style="font-size:0.68rem;">${f.available>0? f.available+' Ready' : 'Full'}</span>
        </div>
        <div class="availability-grid">${dots.join('')}</div>
      </div>
    `;
  }).join('');

  if (hubList) {
    const hubs = getHubs();
    hubList.innerHTML = hubs.map(h=> `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.8rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
        <div>
          <div style="font-weight:700; font-size:0.88rem;">${h.name}</div>
          <div style="font-size:0.72rem; color:var(--text-muted);">${h.address}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:800; font-size:0.92rem; color:var(--color-electric-lime);">${h.total} units</div>
          <div style="font-size:0.68rem; color:var(--text-muted);">${h.scooters} scooters • ${h.mopeds} mopeds</div>
        </div>
      </div>
    `).join('');
  }
}
window.cycleDot = (fleetId, idx) => {
  const el = document.getElementById(`dot-${fleetId}-${idx}`);
  if (!el) return;
  const order = ['available','rented','maintenance','reserved'];
  const cur = order.find(o=> el.classList.contains(o)) || 'available';
  const next = order[(order.indexOf(cur)+1)%order.length];
  el.className = `avail-dot ${next}`;
  el.textContent = next==='available'?'A': next==='rented'?'R': next==='maintenance'?'M':'H';
  el.title = next;
  showToast(`Unit ${idx+1} → ${next}`,'info');
};
window.refreshAvailability = () => { renderAvailability(); showToast('Telemetry refreshed — GPS sub-meter sync ok','info'); };

// ---------- Bookings ----------
function renderBookings() {
  const tbody = document.getElementById('bookings-tbody');
  if (!tbody) return;
  const bookings = getBookings();
  const q = (document.getElementById('bookings-search')?.value || '').toLowerCase();
  const status = document.getElementById('bookings-status')?.value || 'all';
  let list = [...bookings];
  if (q) list = list.filter(b=> b.id.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q) || b.vehicle.toLowerCase().includes(q) || b.email.toLowerCase().includes(q));
  if (status!=='all') list = list.filter(b=> b.status===status);
  tbody.innerHTML = list.map(b=> `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td><div style="font-weight:700;">${b.customer}</div><div style="font-size:0.72rem; color:var(--text-muted);">${b.email}</div></td>
      <td>${b.vehicle}</td>
      <td>${formatPickup(b.pickup)}</td>
      <td>${b.duration}h</td>
      <td style="font-weight:800; color:var(--color-electric-lime);">$${b.fare.toFixed(2)}</td>
      <td><span class="deadline-inline" data-deadline="${b.deadline}">${formatDeadline(b.deadline)}</span></td>
      <td><span class="badge ${badgeForStatus(b.status)}">${b.status}</span></td>
      <td style="display:flex; gap:0.35rem; flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem;" onclick="extendBooking('${b.id}',2)"><i class="fa-solid fa-clock"></i> +2h</button>
        <button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem;" onclick="updateBookingStatus('${b.id}','Completed')"><i class="fa-solid fa-check"></i></button>
        <button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem; color:var(--color-danger);" onclick="deleteBooking('${b.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">No bookings match filters.</td></tr>';
}

window.filterBookings = renderBookings;
window.toggleBookingForm = (open) => {
  const el = document.getElementById('booking-form-wrap');
  if (open===false) { el.classList.remove('open'); return; }
  el.classList.toggle('open');
  if (el.classList.contains('open')) {
    const now = new Date(); now.setMinutes(now.getMinutes()-now.getTimezoneOffset()); now.setHours(now.getHours()+1);
    document.getElementById('bk-pickup').value = now.toISOString().slice(0,16);
    updateBkEstimate();
  }
};
function updateBkEstimate() {
  const modelName = document.getElementById('bk-model')?.value;
  const fleet = getFleet();
  const f = fleet.find(x=>x.name===modelName) || fleet[0];
  const dur = parseInt(document.getElementById('bk-duration')?.value || '2');
  let est = 0;
  if (dur<=4) est = f.hourly * dur;
  else if (dur===24) est = f.daily;
  else if (dur===72) est = 120;
  else est = 240;
  document.getElementById('bk-estimate').textContent = '$' + est.toFixed(2);
}
window.exportBookings = () => showToast('Bookings CSV exported — 24 records','success');
window.deleteBooking = (id) => {
  if (!confirm('Delete booking '+id+'?')) return;
  const bookings = getBookings().filter(b=>b.id!==id);
  saveLS(LS_BOOKINGS, bookings);
  renderAll();
  showToast('Booking deleted','info');
};
window.updateBookingStatus = (id, status) => {
  const bookings = getBookings();
  const b = bookings.find(x=>x.id===id);
  if (b) { b.status = status; saveLS(LS_BOOKINGS, bookings); renderAll(); showToast(`${id} → ${status}`,'success'); }
};
window.extendBooking = (id, hours) => {
  const bookings = getBookings();
  const b = bookings.find(x=>x.id===id);
  if (!b) return;
  b.deadline += hours*3600*1000;
  b.duration += hours;
  const fleet = getFleet();
  const f = fleet.find(x=>x.name===b.vehicle);
  if (f) b.fare += f.hourly*hours;
  saveLS(LS_BOOKINGS, bookings);
  renderAll();
  showToast(`<i class="fa-solid fa-bolt"></i> ${id} extended +${hours}h`,'success');
  const log = document.getElementById('extension-log');
  if (log) {
    const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    const entry = document.createElement('div');
    entry.innerHTML = `<i class="fa-solid fa-check" style="color:var(--color-success);"></i> ${id} — ${b.customer} extended +${hours}h at ${now} — $${f? f.hourly*hours : ''} added`;
    log.prepend(entry);
  }
};

function formatDeadline(ts) {
  const diff = ts - Date.now();
  if (diff<=0) return '<span style="color:var(--color-danger); font-weight:800;">OVERDUE</span>';
  const h = Math.floor(diff/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  const urgent = diff < 3600000;
  return `<span style="color:${urgent?'var(--color-danger)':'var(--text-primary)'}; font-weight:700; font-family:var(--font-heading);">${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</span>`;
}

// ---------- Active Rentals ----------
function renderActiveRentals() {
  const grid = document.getElementById('active-rentals-grid');
  const tbody = document.getElementById('active-tbody');
  const bookings = getBookings().filter(b=> b.status==='In Progress' || b.status==='Overdue');
  if (grid) {
    grid.innerHTML = bookings.map(b=>{
      const fleet = getFleet().find(f=>f.name===b.vehicle) || {img:'', hourly:12};
      return `
      <div class="card">
        <div style="display:flex; gap:1rem;">
          <img src="${fleet.img||'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=400&q=80'}" style="width:110px; height:110px; object-fit:cover; border-radius: var(--radius-md);">
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:start;">
              <div><div style="font-weight:800;">${b.vehicle} • ${b.vehicleUnit}</div><div style="font-size:0.75rem; color:var(--text-muted);">${b.customer} • ${b.hub}</div></div>
              <span class="badge ${b.status==='Overdue'?'badge-busy':'badge-orange'}">${b.status}</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-top:0.8rem; font-size:0.78rem;">
              <div><span style="color:var(--text-muted);">Battery</span><div style="font-weight:800; color:var(--color-electric-lime);">${Math.floor(60+Math.random()*35)}% • ${Math.floor(28+Math.random()*30)} km</div></div>
              <div><span style="color:var(--text-muted);">Location</span><div style="font-weight:700;">Grand Ave Bay ${Math.floor(Math.random()*8)+1}</div></div>
              <div><span style="color:var(--text-muted);">GPS</span><div style="font-weight:700; color:var(--color-success);">Sub-Meter Locked</div></div>
              <div><span style="color:var(--text-muted);">Deposit</span><div style="font-weight:700;">$${b.deposit} Hold</div></div>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:0.5rem; margin-top:1rem;">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="showToast('Horn + lights triggered for ${b.vehicleUnit}','info')"><i class="fa-solid fa-bullhorn"></i> Horn</button>
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="showToast('Vehicle ${b.vehicleUnit} lock toggled','info')"><i class="fa-solid fa-lock"></i> Lock</button>
          <button class="btn btn-primary btn-sm" style="flex:1; background: var(--color-burnt-orange);" onclick="extendBooking('${b.id}',2)"><i class="fa-solid fa-clock"></i> +2h</button>
          <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="updateBookingStatus('${b.id}','Completed'); showToast('Ride ended — deposit release in 30m','success')"><i class="fa-solid fa-flag-checkered"></i> End</button>
        </div>
      </div>
      `;
    }).join('') || '<div style="grid-column:span 2; text-align:center; padding:2rem; color:var(--text-muted);">No active rentals at the moment.</div>';
  }
  if (tbody) {
    tbody.innerHTML = bookings.map(b=> `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.customer}</td>
        <td>${b.vehicleUnit} • ${b.vehicle}</td>
        <td style="color:var(--color-electric-lime); font-weight:700;">${Math.floor(60+Math.random()*35)}%</td>
        <td>Grand Ave Bay ${Math.floor(Math.random()*8)+1}</td>
        <td><span class="deadline-inline" data-deadline="${b.deadline}">${formatDeadline(b.deadline)}</span></td>
        <td><button class="btn btn-primary btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem; background: var(--color-burnt-orange);" onclick="extendBooking('${b.id}',1)"><i class="fa-solid fa-plus"></i> 1h</button> <button class="btn btn-primary btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem;" onclick="extendBooking('${b.id}',2)">2h</button></td>
        <td><button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem;" onclick="showToast('Live telemetry: Motor 44°C, Tire 42 PSI, Brake 94%','info')"><i class="fa-solid fa-wave-square"></i> Telemetry</button></td>
      </tr>
    `).join('') || '<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">No active rentals</td></tr>';
  }
}

// ---------- Returns ----------
function renderReturns() {
  const grid = document.getElementById('returns-grid');
  if (!grid) return;
  const bookings = getBookings().filter(b=> b.status==='In Progress' || b.status==='Overdue').slice(0,6);
  grid.innerHTML = bookings.map(b=> `
    <div class="card" style="text-align:center; ${b.status==='Overdue'?'border-color: var(--color-danger); background: var(--color-danger-bg);':''}">
      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; letter-spacing:0.08em;">${b.id} • ${b.vehicle}</div>
      <div style="font-weight:800; margin-top:0.3rem;">${b.customer}</div>
      <div style="font-size:0.78rem; color:var(--text-muted);">${b.hub}</div>
      <div class="deadline-countdown" data-deadline="${b.deadline}" style="font-size:1.85rem; margin:0.8rem 0; color:${b.status==='Overdue'?'var(--color-danger)':'var(--color-burnt-orange)'};">${formatDeadlinePlain(b.deadline)}</div>
      <div style="display:flex; gap:0.4rem;">
        <button class="btn btn-primary btn-sm" style="flex:1; background: var(--color-burnt-orange); font-size:0.76rem;" onclick="extendBooking('${b.id}',2)"><i class="fa-solid fa-clock"></i> +2h ($${getFleet().find(f=>f.name===b.vehicle)?.hourly*2||24})</button>
        <button class="btn btn-outline btn-sm" style="flex:1; font-size:0.76rem;" onclick="extendBooking('${b.id}',1)">+1h</button>
      </div>
      <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:0.5rem; font-size:0.76rem;" onclick="updateBookingStatus('${b.id}','Completed')"><i class="fa-solid fa-flag-checkered"></i> Mark Returned</button>
    </div>
  `).join('');
}
function formatDeadlinePlain(ts) {
  const diff = ts - Date.now();
  if (diff<=0) return 'OVERDUE';
  const h = Math.floor(diff/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ---------- Pricing ----------
function renderPricing() {
  const fleet = getFleet();
  const tbody = document.getElementById('pricing-tbody');
  const cards = document.getElementById('pricing-cards');
  if (tbody) {
    tbody.innerHTML = fleet.map(f=> `
      <tr>
        <td><strong>${f.name}</strong><br><span style="font-size:0.7rem; color:var(--text-muted);">${f.category}</span></td>
        <td><input type="number" class="form-control" value="${f.hourly}" style="width:90px; padding:0.45rem 0.6rem;" onchange="updatePricing('${f.id}','hourly',this.value)"></td>
        <td><input type="number" class="form-control" value="${f.daily}" style="width:90px; padding:0.45rem 0.6rem;" onchange="updatePricing('${f.id}','daily',this.value)"></td>
        <td><input type="number" class="form-control" value="${f.weekly}" style="width:90px; padding:0.45rem 0.6rem;" onchange="updatePricing('${f.id}','weekly',this.value)"></td>
        <td><input type="number" class="form-control" value="${f.deposit}" style="width:90px; padding:0.45rem 0.6rem;" onchange="updatePricing('${f.id}','deposit',this.value)"></td>
        <td>$${f.hourly<=12?2: f.hourly<=18?3:4}/hr</td>
        <td><button class="btn btn-outline btn-sm" onclick="showToast('Pricing updated for ${f.name}','success')"><i class="fa-solid fa-check"></i> Apply</button></td>
      </tr>
    `).join('');
  }
  if (cards) {
    cards.innerHTML = `
      <div class="card" style="text-align:center; border-color: var(--color-electric-lime);">
        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; letter-spacing:0.1em;">ON-DEMAND</div>
        <div style="font-size:1.5rem; font-weight:800; margin:0.5rem 0;">Pay-As-You-Go</div>
        <div style="font-size:2.2rem; font-weight:800; color:var(--color-electric-lime);">$9<span style="font-size:0.9rem; color:var(--text-muted);">/hr</span> → <span style="font-size:1.1rem;">from $9/hr</span></div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.6rem;">Zero surge • NFC unlock • Pause 5m free</div>
      </div>
      <div class="card" style="text-align:center; border-color: var(--color-burnt-orange); background: linear-gradient(180deg, rgba(217,119,69,0.08), var(--bg-card));">
        <div style="font-size:0.75rem; color:var(--color-burnt-orange); font-weight:700; letter-spacing:0.1em;">MOST POPULAR</div>
        <div style="font-size:1.5rem; font-weight:800; margin:0.5rem 0;">Day Explorer</div>
        <div style="font-size:2.2rem; font-weight:800; color:var(--color-electric-lime);">$45<span style="font-size:0.9rem; color:var(--text-muted);">/24h</span></div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.6rem;">Unlimited swaps • Smart helmet • Theft 0$</div>
      </div>
      <div class="card" style="text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; letter-spacing:0.1em;">COMMUTER VIP</div>
        <div style="font-size:1.5rem; font-weight:800; margin:0.5rem 0;">Monthly Unlimited</div>
        <div style="font-size:2.2rem; font-weight:800; color:var(--color-electric-lime);">$189<span style="font-size:0.9rem; color:var(--text-muted);">/mo</span></div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.6rem;">Home charger • Tune-ups • Priority swap</div>
      </div>
    `;
  }
}
window.updatePricing = (id, field, val) => {
  const fleet = getFleet();
  const f = fleet.find(x=>x.id===id);
  if (f) { f[field]=parseInt(val)||0; saveLS(LS_FLEET, fleet); updateKPIs(); showToast(`${f.name} ${field} → $${val}`,'info'); }
};
window.savePricing = () => showToast('All pricing tiers saved & synced to Fleet & Home','success');

// ---------- Coverage ----------
function renderCoverage() {
  const grid = document.getElementById('coverage-grid');
  if (!grid) return;
  const hubs = getHubs();
  grid.innerHTML = hubs.map((h,i)=> `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:start;">
        <span class="badge badge-lime" style="font-size:0.65rem;">${h.badge}</span>
        <button class="btn btn-outline btn-sm" style="padding:0.25rem 0.5rem; font-size:0.68rem; color:var(--color-danger);" onclick="deleteHub(${i})"><i class="fa-solid fa-trash"></i></button>
      </div>
      <h3 style="font-size:1.05rem; margin:0.6rem 0 0.3rem;">${h.name}</h3>
      <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.8rem;">${h.address}</div>
      <div style="display:flex; gap:0.6rem;">
        <div style="flex:1; text-align:center; padding:0.6rem; background: var(--bg-tertiary); border-radius: var(--radius-md);"><div style="font-weight:800; color:var(--color-electric-lime);">${h.scooters}</div><div style="font-size:0.65rem; color:var(--text-muted);">Scooters</div></div>
        <div style="flex:1; text-align:center; padding:0.6rem; background: var(--bg-tertiary); border-radius: var(--radius-md);"><div style="font-weight:800; color:var(--color-burnt-orange);">${h.mopeds}</div><div style="font-size:0.65rem; color:var(--text-muted);">Mopeds</div></div>
        <div style="flex:1; text-align:center; padding:0.6rem; background: var(--bg-tertiary); border-radius: var(--radius-md);"><div style="font-weight:800;">${h.total}</div><div style="font-size:0.65rem; color:var(--text-muted);">Total</div></div>
      </div>
      <div style="margin-top:0.8rem; display:flex; gap:0.4rem;">
        <button class="btn btn-outline btn-sm" style="flex:1; font-size:0.72rem;" onclick="editHub(${i})"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="btn btn-outline btn-sm" style="flex:1; font-size:0.72rem;" onclick="showToast('Hub telemetry: 98.4% uptime','info')"><i class="fa-solid fa-signal"></i> Status</button>
      </div>
    </div>
  `).join('');
}
window.toggleHubForm = (open) => {
  const el=document.getElementById('hub-form');
  if (open===false) el.classList.remove('open');
  else el.classList.toggle('open');
};
window.addHub = () => {
  const name=document.getElementById('hub-name').value.trim();
  const address=document.getElementById('hub-address').value.trim();
  const scooters=parseInt(document.getElementById('hub-scooters').value)||0;
  const mopeds=parseInt(document.getElementById('hub-mopeds').value)||0;
  if (!name||!address) { showToast('Hub name & address required','error'); return; }
  const hubs=getHubs();
  hubs.push({ name, address, scooters, mopeds, total: scooters+mopeds, badge: 'New Hub' });
  saveLS(LS_HUBS, hubs);
  renderCoverage();
  toggleHubForm(false);
  document.getElementById('hub-name').value=''; document.getElementById('hub-address').value=''; document.getElementById('hub-scooters').value=''; document.getElementById('hub-mopeds').value='';
  showToast(`Hub "${name}" added`,'success');
};
window.deleteHub = (i) => { if(!confirm('Remove this hub?')) return; const hubs=getHubs(); hubs.splice(i,1); saveLS(LS_HUBS, hubs); renderCoverage(); showToast('Hub removed','info'); };
window.editHub = (i) => {
  const hubs=getHubs(); const h=hubs[i];
  const name=prompt('Hub name:', h.name); if(name===null) return;
  const addr=prompt('Address:', h.address); if(addr===null) return;
  if(name) h.name=name; if(addr) h.address=addr;
  saveLS(LS_HUBS, hubs); renderCoverage(); showToast('Hub updated','success');
};

// ---------- Deposits ----------
function renderDeposits() {
  const tbody=document.getElementById('deposits-tbody');
  if(!tbody) return;
  const bookings=getBookings();
  tbody.innerHTML = bookings.map(b=> `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.customer}</td>
      <td>${b.vehicle}</td>
      <td style="font-weight:800;">$${b.deposit}</td>
      <td>Card •••• 4242</td>
      <td><span class="badge ${b.status==='Completed'?'badge-available': b.status==='Overdue'?'badge-busy':'badge-orange'}">${b.status==='Completed'?'Refunded': b.status==='Overdue'?'Forfeited Risk':'On Hold'}</span></td>
      <td><span class="deadline-inline" data-deadline="${b.deadline}">${b.status==='Completed'?'<span style="color:var(--color-success);">Released</span>': formatDeadlinePlain(b.deadline)}</span></td>
      <td>
        ${b.status!=='Completed' ? `<button class="btn btn-primary btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem; background: var(--color-success);" onclick="updateBookingStatus('${b.id}','Completed'); showToast('Deposit $${b.deposit} refunded to ${b.customer}','success')"><i class="fa-solid fa-money-bill-transfer"></i> Release</button>` : `<span style="font-size:0.72rem; color:var(--text-muted);">—</span>`}
      </td>
    </tr>
  `).join('');
}
window.editRule = (rule) => {
  const val = prompt(`Edit rule: ${rule}`, '');
  if (val !== null && val.trim()) showToast(`Rule "${rule}" updated to: ${val}`,'success');
  else if (val !== null) showToast('No changes','info');
};

// ---------- Receipts ----------
function renderReceipts() {
  const rList=document.getElementById('receipts-list');
  const aList=document.getElementById('agreements-list');
  const bookings=getBookings();
  if (rList) {
    rList.innerHTML = bookings.map(b=> `
      <div class="card" style="padding:1.1rem; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:0.9rem; align-items:center;">
          <div class="doc-icon"><i class="fa-solid fa-file-lines"></i></div>
          <div>
            <div style="font-weight:800; font-size:0.92rem;">Invoice ${b.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${formatPickup(b.pickup)} • $${b.fare.toFixed(2)} • ${b.customer}</div>
          </div>
        </div>
        <button class="btn btn-outline btn-sm btn-download-doc" data-doc-name="Invoice_${b.id.replace('#','')}.pdf" onclick="downloadDoc('Invoice_${b.id.replace('#','')}.pdf')"><i class="fa-solid fa-download"></i> PDF</button>
      </div>
    `).join('');
  }
  if (aList) {
    const agreements = [
      { name: 'Master Liability Waiver', meta: 'Signed Oct 01, 2026 • Verified', customer: 'Elena Vance' },
      { name: 'Moped Operator Terms', meta: 'DL #CA-9021481', customer: 'Elena Vance' },
      { name: 'Fleet Damage Waiver', meta: 'Signed Sep 28, 2026', customer: 'Marcus Thorne' },
    ];
    aList.innerHTML = agreements.map((a,i)=> `
      <div class="card" style="padding:1.1rem; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:0.9rem; align-items:center;">
          <div class="doc-icon" style="background: var(--color-electric-lime-soft); color: var(--color-electric-lime);"><i class="fa-solid fa-file-signature"></i></div>
          <div>
            <div style="font-weight:800; font-size:0.92rem;">${a.name}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${a.meta} • ${a.customer}</div>
          </div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="downloadDoc('Agreement_${a.name.replace(/\\s+/g,'_')}.pdf')"><i class="fa-solid fa-download"></i> PDF</button>
      </div>
    `).join('') + bookings.slice(0,2).map(b=> `
      <div class="card" style="padding:1.1rem; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:0.9rem; align-items:center;">
          <div class="doc-icon" style="background: var(--color-electric-lime-soft); color: var(--color-electric-lime);"><i class="fa-solid fa-file-signature"></i></div>
          <div>
            <div style="font-weight:800; font-size:0.92rem;">Rental Agreement ${b.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${b.customer} • ${b.vehicle}</div>
          </div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="downloadDoc('Agreement_${b.id.replace('#','')}.pdf')"><i class="fa-solid fa-download"></i> PDF</button>
      </div>
    `).join('');
  }
}
window.downloadDoc = (name) => {
  showToast(`Generating ${name}...`,'info');
  setTimeout(()=>{
    const el=document.createElement('a');
    el.href='data:text/plain;charset=utf-8,'+encodeURIComponent(`DASHRIDES OFFICIAL DOCUMENT: ${name}\n\nCustomer copy • Verified SHA256-DR-VERIFIED-99214\nGenerated by Admin Control v2.4`);
    el.download=name.replace('.pdf','.txt'); el.style.display='none'; document.body.appendChild(el); el.click(); el.remove();
    showToast(`Downloaded ${name}`,'success');
  },900);
};

// ---------- Users ----------
const demoUsers = [
  { name:'Elena Vance', email:'elena.vance@example.com', license:'CA-9021481', tier:'VIP', rides:28, safety:'4.98', deposit:'$0' },
  { name:'Marcus Thorne', email:'marcus@example.com', license:'NY-44821', tier:'Pro', rides:14, safety:'4.86', deposit:'$100 Hold' },
  { name:'Chloe Zhao', email:'chloe@example.com', license:'CA-88321', tier:'VIP', rides:36, safety:'4.92', deposit:'$0' },
  { name:'Priya Nair', email:'priya@example.com', license:'TX-77120', tier:'New', rides:3, safety:'5.00', deposit:'$80 Hold' },
  { name:'Alex Morgan', email:'alex@domain.com', license:'FL-99214', tier:'Pro', rides:11, safety:'4.75', deposit:'—' },
  { name:'David Kim', email:'david.kim@example.com', license:'WA-10293', tier:'Pro', rides:19, safety:'4.88', deposit:'$150 Hold' },
];
function renderUsers() {
  const tbody=document.getElementById('users-tbody');
  if(!tbody) return;
  const q=(document.getElementById('users-search')?.value||'').toLowerCase();
  const tier=document.getElementById('users-tier')?.value||'all';
  let list=[...demoUsers];
  if(q) list=list.filter(u=> u.name.toLowerCase().includes(q)|| u.email.toLowerCase().includes(q)|| u.license.toLowerCase().includes(q));
  if(tier!=='all') list=list.filter(u=> u.tier===tier);
  tbody.innerHTML = list.map(u=> `
    <tr>
      <td><div style="display:flex; gap:0.7rem; align-items:center;"><img src="https://i.pravatar.cc/100?u=${encodeURIComponent(u.email)}" style="width:32px; height:32px; border-radius:50%;"><strong>${u.name}</strong></div></td>
      <td style="font-size:0.82rem; color:var(--text-muted);">${u.email}</td>
      <td><span class="badge badge-available" style="font-size:0.7rem;">${u.license} <i class="fa-solid fa-check" style="margin-left:0.2rem;"></i></span></td>
      <td><span class="badge ${u.tier==='VIP'?'badge-orange': u.tier==='Pro'?'badge-lime':'badge-available'}">${u.tier}</span></td>
      <td>${u.rides}</td>
      <td style="color:var(--color-success); font-weight:700;">${u.safety}</td>
      <td>${u.deposit}</td>
      <td><button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem;" onclick="showToast('Profile: ${u.name}','info')"><i class="fa-solid fa-eye"></i> View</button> <button class="btn btn-outline btn-sm" style="padding:0.3rem 0.6rem; font-size:0.72rem; color:var(--color-danger);" onclick="showToast('User ${u.name} suspended','warning')"><i class="fa-solid fa-ban"></i></button></td>
    </tr>
  `).join('');
}
window.filterUsers = renderUsers;

// ---------- Countdown ticker ----------
function initCountdowns() {
  setInterval(()=>{
    document.querySelectorAll('.deadline-inline[data-deadline], .deadline-countdown[data-deadline]').forEach(el=>{
      const ts=parseInt(el.dataset.deadline);
      el.innerHTML = el.classList.contains('deadline-countdown') ? formatDeadlinePlain(ts) : formatDeadline(ts);
      if (ts - Date.now() <=0) el.style.color='var(--color-danger)';
    });
  },1000);
}

// ---------- Forms ----------
function bindForms(){
  const fleetForm=document.getElementById('fleet-add-form');
  if(fleetForm){
    fleetForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const id=document.getElementById('fleet-edit-id').value || 'custom-'+Date.now();
      const name=document.getElementById('fleet-name').value.trim();
      const category=document.getElementById('fleet-category').value;
      const hourly=parseInt(document.getElementById('fleet-hourly').value);
      const daily=parseInt(document.getElementById('fleet-daily').value);
      const speed=document.getElementById('fleet-speed').value||'45 km/h';
      const range=document.getElementById('fleet-range').value||'50 km';
      const img=document.getElementById('fleet-img').value||'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
      if(!name||!hourly||!daily){ showToast('Name and pricing required','error'); return; }
      const fleet=getFleet();
      const existing=fleet.find(f=>f.id===id);
      if(existing){
        Object.assign(existing,{name, category, hourly, daily, weekly: Math.round(daily*6.5), deposit: hourly<15?100:150, speed, range, img});
      } else {
        fleet.push({ id, name, category, hourly, daily, weekly: Math.round(daily*6.5), deposit: hourly<15?100:150, speed, range, img, total: 6, available: 6, badge: 'New' });
      }
      saveLS(LS_FLEET, fleet);
      renderAll();
      toggleFleetForm(false);
      showToast(existing?`Updated ${name}`:`Added ${name} to fleet`,'success');
    });
  }

  const bookingForm=document.getElementById('admin-booking-form');
  if(bookingForm){
    bookingForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const customer=document.getElementById('bk-customer').value.trim();
      const email=document.getElementById('bk-email').value.trim();
      const vehicle=document.getElementById('bk-model').value;
      const hub=document.getElementById('bk-hub').value;
      const pickup=document.getElementById('bk-pickup').value;
      const duration=parseInt(document.getElementById('bk-duration').value);
      if(!customer||!vehicle||!pickup){ showToast('Fill required fields','error'); return; }
      const fleet=getFleet();
      const f=fleet.find(x=>x.name===vehicle);
      let fare=0;
      if (duration<=4) fare=f.hourly*duration;
      else if(duration===24) fare=f.daily;
      else if(duration===72) fare=120;
      else fare=240;
      const id='#DR-'+Math.floor(9000+Math.random()*999);
      const bookings=getBookings();
      bookings.unshift({ id, customer, email: email||customer.toLowerCase().replace(/\s+/g,'.')+'@example.com', vehicle, hub, pickup, duration, fare, deposit: f.deposit, status:'Confirmed', deadline: new Date(pickup).getTime()+duration*3600000, vehicleUnit: 'DR-'+Math.floor(1000+Math.random()*9000) });
      saveLS(LS_BOOKINGS, bookings);
      renderAll();
      toggleBookingForm(false);
      bookingForm.reset();
      showToast(`Booking ${id} created for ${customer} — $${fare.toFixed(2)}`,'success');
    });
    document.getElementById('bk-model')?.addEventListener('change', updateBkEstimate);
    document.getElementById('bk-duration')?.addEventListener('change', updateBkEstimate);
  }
}
