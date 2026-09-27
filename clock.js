const canvas = document.getElementById('orloj');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

const ZODIAC = [
  { name: 'Aries', glyph: 'Aries' },
  { name: 'Taurus', glyph: 'Taurus' },
  { name: 'Gemini', glyph: 'Gemini' },
  { name: 'Cancer', glyph: 'Cancer' },
  { name: 'Leo', glyph: 'Leo' },
  { name: 'Virgo', glyph: 'Virgo' },
  { name: 'Libra', glyph: 'Libra' },
  { name: 'Scorpio', glyph: 'Scorpio' },
  { name: 'Sagittarius', glyph: 'Sagit.' },
  { name: 'Capricorn', glyph: 'Capri.' },
  { name: 'Aquarius', glyph: 'Aquar.' },
  { name: 'Pisces', glyph: 'Pisces' }
];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const LABORS = ['Feast','Wood','Prune','Garden','Falcon','Hay','Harvest','Thresh','Vintage','Sow','Slaughter','Bake'];
const APOSTLES = ['Peter','Matthew','John','Andrew','Philip','James M.','James L.','Thomas','Simon','Thaddeus','Bartholomew','Paul'];
const ROMAN24 = ['I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIIII','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIIII'];

let sim = new Date();
let live = true;
let walkT = 0;
let lastHourFired = -1;

function dayOfYear(d) {
  const start = Date.UTC(d.getFullYear(), 0, 0);
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 86400000);
}
function solarLongitude(d) {
  const n = dayOfYear(d) + d.getHours() / 24 + d.getMinutes() / 1440;
  return ((n - 80) / 365.2422) * Math.PI * 2;
}
function lunarPhase(d) {
  const synodic = 29.530588;
  const known = Date.UTC(2000, 0, 6, 18, 14);
  const days = (d.getTime() - known) / 86400000;
  return ((days % synodic) + synodic) % synodic / synodic;
}
function zodiacIndex(d) {
  const lon = ((solarLongitude(d) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(lon / (Math.PI / 6)) % 12;
}

function drawStone() {
  ctx.fillStyle = '#1a120c';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2c2418';
  ctx.fillRect(40, 8, W - 80, 118);
  ctx.fillStyle = '#3a2e20';
  ctx.fillRect(48, 16, W - 96, 102);
}

function drawWindows(t) {
  const open = Math.min(1, Math.max(0, t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1));
  const y = 28, h = 78, w = 88;
  const xs = [W / 2 - 110, W / 2 + 22];
  xs.forEach((x, i) => {
    ctx.fillStyle = '#0a0704';
    ctx.fillRect(x, y, w, h);
    if (t > 0) {
      const idx = Math.floor((t * 12 + i * 0.5) % 12);
      ctx.fillStyle = '#c4a36a';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 34, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a3a22';
      ctx.fillRect(x + w / 2 - 14, y + 48, 28, 26);
      ctx.fillStyle = '#f3e6c4';
      ctx.font = '11px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(APOSTLES[idx], x + w / 2, y + 72);
    }
    ctx.fillStyle = '#5a4630';
    ctx.fillRect(x, y, w * (1 - open) * 0.5, h);
    ctx.fillRect(x + w - w * (1 - open) * 0.5, y, w * (1 - open) * 0.5, h);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  });
  ctx.fillStyle = walkT > 0.85 && walkT < 0.98 ? '#e8c547' : '#6a5040';
  ctx.beginPath();
  ctx.moveTo(W / 2, 18);
  ctx.lineTo(W / 2 - 10, 36);
  ctx.lineTo(W / 2 + 10, 36);
  ctx.closePath();
  ctx.fill();
}

function drawStatues(t) {
  const names = ['Vanity', 'Death', 'Greed', 'Turk'];
  const xs = [58, 168, W - 210, W - 100];
  names.forEach((n, i) => {
    const shake = t > 0 ? Math.sin(t * 40 + i) * 2 : 0;
    ctx.fillStyle = i === 1 ? '#cfc6b8' : '#7a5a38';
    ctx.beginPath();
    ctx.arc(xs[i] + shake, 86, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(xs[i] - 8 + shake, 96, 16, 22);
    ctx.fillStyle = '#d4af37';
    ctx.font = '10px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(n, xs[i], 128);
  });
  if (t > 0.15 && t < 0.9) {
    ctx.strokeStyle = '#e8e0c8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(168, 70);
    ctx.lineTo(168, 54);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(168, 54, 7, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawAstrolabe(d) {
  const CX = W / 2, CY = 430, R = 250;
  ctx.save();
  ctx.translate(CX, CY);
  ctx.beginPath();
  ctx.arc(0, 0, R + 36, 0, Math.PI * 2);
  ctx.fillStyle = '#24180e';
  ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, R, Math.PI, 0);
  ctx.fillStyle = '#3a6ea5';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI);
  ctx.fillStyle = '#3a2414';
  ctx.fill();
  ctx.fillStyle = '#6b4a28';
  ctx.fillRect(-R, -18, R * 2, 36);
  [0.42, 0.68, 0.92].forEach((k, i) => {
    ctx.beginPath();
    ctx.arc(0, 0, R * k, 0, Math.PI * 2);
    ctx.strokeStyle = i === 1 ? 'rgba(243,230,196,0.55)' : 'rgba(212,175,55,0.35)';
    ctx.lineWidth = i === 1 ? 1.6 : 1;
    ctx.stroke();
  });
  for (let i = 1; i < 12; i++) {
    const tilt = (i - 6) * 0.09;
    ctx.beginPath();
    ctx.moveTo(-R * 0.15, 0);
    ctx.quadraticCurveTo(0, -R * tilt, R * 0.92, -R * 0.55 + i * 18);
    ctx.strokeStyle = 'rgba(243,230,196,0.18)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.font = '11px Georgia';
  ctx.fillStyle = '#f3e6c4';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ROMAN24.forEach((lab, i) => {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const rr = R + 22;
    ctx.fillText(lab, Math.cos(a) * rr, Math.sin(a) * rr);
  });
  const lon = solarLongitude(d);
  ctx.save();
  ctx.rotate(lon - Math.PI / 2);
  ctx.beginPath();
  ctx.ellipse(0, 0, R * 0.78, R * 0.52, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#e8c547';
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ZODIAC.forEach((z, i) => {
    const a = (i / 12) * Math.PI * 2;
    ctx.fillStyle = '#f3e6c4';
    ctx.font = '11px Georgia';
    ctx.fillText(z.glyph, Math.cos(a) * R * 0.78, Math.sin(a) * R * 0.52);
  });
  ctx.restore();
  const hours = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  const hourAng = (hours / 24) * Math.PI * 2 - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(hourAng) * (R - 18), Math.sin(hourAng) * (R - 18));
  ctx.strokeStyle = '#f3e6c4';
  ctx.lineWidth = 2;
  ctx.stroke();
  const sunR = R * 0.62;
  const sx = Math.cos(hourAng) * sunR;
  const sy = Math.sin(hourAng) * sunR;
  ctx.beginPath();
  ctx.arc(sx, sy, 11, 0, Math.PI * 2);
  ctx.fillStyle = '#f0d060';
  ctx.fill();
  ctx.strokeStyle = '#fff3b0';
  ctx.lineWidth = 2;
  ctx.stroke();
  const phase = lunarPhase(d);
  const moonAng = hourAng + phase * Math.PI * 2 * 0.9;
  const mx = Math.cos(moonAng) * (R * 0.54);
  const my = Math.sin(moonAng) * (R * 0.54);
  ctx.beginPath();
  ctx.arc(mx, my, 9, 0, Math.PI * 2);
  ctx.fillStyle = '#e8e0c8';
  ctx.fill();
  ctx.fillStyle = '#2a2218';
  ctx.beginPath();
  ctx.arc(mx + Math.cos(phase * Math.PI * 2) * 4, my, 9, 0, Math.PI * 2);
  ctx.fill();
  const sid = ((hours * 1.0027379) % 24) / 24 * Math.PI * 2 - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(Math.cos(sid) * 16, Math.sin(sid) * 16);
  ctx.lineTo(Math.cos(sid) * (R - 8), Math.sin(sid) * (R - 8));
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#d4af37';
  ctx.fill();
  ctx.restore();
}

function drawCalendar(d) {
  const CX = W / 2, CY = 800, R = 148;
  ctx.save();
  ctx.translate(CX, CY);
  ctx.beginPath();
  ctx.arc(0, 0, R + 22, 0, Math.PI * 2);
  ctx.fillStyle = '#24180e';
  ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.stroke();
  const doy = dayOfYear(d);
  ctx.rotate(-(doy / 365) * Math.PI * 2);
  for (let i = 0; i < 12; i++) {
    const a0 = (i / 12) * Math.PI * 2;
    const a1 = ((i + 1) / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, a0 - Math.PI / 2, a1 - Math.PI / 2);
    ctx.closePath();
    ctx.fillStyle = i % 2 ? '#3a2a18' : '#2a1c10';
    ctx.fill();
    const mid = (a0 + a1) / 2 - Math.PI / 2;
    ctx.fillStyle = '#f3e6c4';
    ctx.font = '11px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(ZODIAC[i].glyph, Math.cos(mid) * (R * 0.78), Math.sin(mid) * (R * 0.78));
    ctx.font = '10px Georgia';
    ctx.fillText(LABORS[i], Math.cos(mid) * (R * 0.52), Math.sin(mid) * (R * 0.52) + 10);
  }
  ctx.restore();
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.moveTo(CX, CY - R - 6);
  ctx.lineTo(CX - 7, CY - R - 20);
  ctx.lineTo(CX + 7, CY - R - 20);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f3e6c4';
  ctx.font = '13px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText(MONTHS[d.getMonth()] + '  ' + d.getDate(), CX, CY + 4);
  ctx.font = '11px Georgia';
  ctx.fillStyle = '#d4af37';
  ctx.fillText(ZODIAC[zodiacIndex(d)].name, CX, CY + 20);
}

function updateReadout(d) {
  const z = ZODIAC[zodiacIndex(d)];
  const phase = lunarPhase(d);
  const names = ['New','Waxing crescent','First quarter','Waxing gibbous','Full','Waning gibbous','Last quarter','Waning crescent'];
  const pname = names[Math.floor(phase * 8) % 8];
  const mode = (live ? 'live' : 'stopped') + (walkT > 0 ? ' / procession' : '');
  document.getElementById('readout').innerHTML =
    '<div><span>Civil time</span><b>' + d.toLocaleString() + '</b></div>' +
    '<div><span>Zodiac</span><b>' + z.name + '</b></div>' +
    '<div><span>Moon</span><b>' + pname + '</b></div>' +
    '<div><span>Mode</span><b>' + mode + '</b></div>';
}

function tick() {
  if (live) sim = new Date();
  if (walkT > 0) {
    walkT += 0.006;
    if (walkT >= 1) walkT = 0;
  } else if (live && sim.getMinutes() === 0 && sim.getSeconds() < 2) {
    const h = sim.getHours();
    if (h !== lastHourFired && h >= 9 && h <= 21) {
      walkT = 0.001;
      lastHourFired = h;
    }
  }
  drawStone();
  drawWindows(walkT);
  drawStatues(walkT);
  drawAstrolabe(sim);
  drawCalendar(sim);
  updateReadout(sim);
}

document.getElementById('btnLive').onclick = function () { live = true; sim = new Date(); };
document.getElementById('btnHour').onclick = function () { live = false; sim = new Date(sim.getTime() + 3600000); };
document.getElementById('btnDay').onclick = function () { live = false; sim = new Date(sim.getTime() + 86400000); };
document.getElementById('btnWalk').onclick = function () { walkT = 0.001; };

tick();
setInterval(tick, 40);
