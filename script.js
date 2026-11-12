// ===== Emoji melayang =====
const floatBox = document.getElementById('float');
const floaters = ['🌸','💖','✨','🎀','🍓','🦄','☁️','🍭'];
for (let i = 0; i < 18; i++) {
  const s = document.createElement('span');
  s.textContent = floaters[i % floaters.length];
  s.style.left = Math.random() * 100 + '%';
  s.style.fontSize = 16 + Math.random() * 24 + 'px';
  s.style.animationDuration = 9 + Math.random() * 12 + 's';
  s.style.animationDelay = -Math.random() * 15 + 's';
  floatBox.appendChild(s);
}

// ===== Tema terang/gelap =====
const root = document.documentElement;
const themeBtn = document.getElementById('theme');
if (matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark'; themeBtn.textContent = '☀️';
}
themeBtn.onclick = () => {
  const dark = root.dataset.theme === 'dark';
  root.dataset.theme = dark ? 'light' : 'dark';
  themeBtn.textContent = dark ? '🌙' : '☀️';
};

// ===== Avatar / Foto =====
// Taruh fotomu di folder yang sama, beri nama foto.jpg
// (kalau tidak ada, yang tampil emoji lucu).
const faces = ['🐰','🐱','🦄','🐻','🐥','🐹','🦋'];
let fi = 0;
const avatar = document.getElementById('avatar');
const photo = document.getElementById('photo');
const emoji = document.getElementById('emoji');
photo.onload = () => { photo.hidden = false; emoji.hidden = true; };
if (photo.complete && photo.naturalWidth) photo.onload();

avatar.onclick = () => {
  if (emoji.hidden) {            // ada foto -> hujan hati
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('span');
      h.className = 'heart';
      h.textContent = ['💖','💗','💕','🌸'][i % 4];
      h.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      avatar.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
  } else {                       // tidak ada foto -> ganti emoji
    fi = (fi + 1) % faces.length;
    emoji.textContent = faces[fi];
  }
};

// ===== Hobi (ubah sesukamu!) =====
const hobbies = [
  ['🍜','Jajan','Hidup jajan 🍜'],
  ['🎧','Dengerin musik','NIKI, TS, LANY, Olivia 🎶'],
  ['📚','Ngedrakor','ILOVEE 📖'],
  ['🎮','Main game','Info masbar rosblox 🎮'],
  ['🧋','Ice Cream','HARUS VANILLA 🧋'],
  ['🌷','Dance','Biar sehat 🌷'],
  ['🐈','Kucing','Tapi alergi 😸'],
  ['🎨','Menggambar','Kalo mut 🎨'],
];
const chips = document.getElementById('chips');
hobbies.forEach(([icon, label, hover]) => {
  const c = document.createElement('div');
  c.className = 'chip';
  c.textContent = `${icon} ${label}`;
  c.onclick = () => {
    c.textContent = hover;
    setTimeout(() => (c.textContent = `${icon} ${label}`), 2200);
  };
  chips.appendChild(c);
});

// ===== Level kelucuan (ubah sesukamu!) =====
const stats = [['Imut 🥰',99], ['Suka tidur 😴',85], ['Baking 🍳',89], ['Ngemil 🍿',92]];
const bars = document.getElementById('bars');
stats.forEach(([label, val]) => {
  const d = document.createElement('div');
  d.className = 'bar';
  d.innerHTML = `<label><span>${label}</span><span>${val}%</span></label>
                 <div class="track"><div class="fill" data-w="${val}"></div></div>`;
  bars.appendChild(d);
});
setTimeout(() => document.querySelectorAll('.fill').forEach(f => (f.style.width = f.dataset.w + '%')), 400);

// ===== Fakta random (ubah sesukamu!) =====
const facts = [
  'SUKA PINK',
  'Gampang kedistract',
  'Aku takut sama cicak, tapi berani nonton film horor ',
  'Kalo tidur harus dingin',
  'Gampang ovt, gampang sedih',
  'Terlalu detail',
];
let lastFact = -1;
document.getElementById('factBtn').onclick = () => {
  let n;
  do { n = Math.floor(Math.random() * facts.length); } while (n === lastFact);
  lastFact = n;
  document.getElementById('fact').textContent = facts[n];
};

// ===== Papan pesan (disimpan di localStorage browser) =====
const emojiList = ['💖','🌸','🥰','🍓','✨','😸','🦄','🎉'];
let picked = '💖';
const emojiBox = document.getElementById('emojis');
emojiList.forEach(e => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = e;
  if (e === picked) b.className = 'on';
  b.onclick = () => {
    picked = e;
    emojiBox.querySelectorAll('button').forEach(x => (x.className = ''));
    b.className = 'on';
  };
  emojiBox.appendChild(b);
});

const KEY = 'aboutme-messages';
const notes = document.getElementById('notes');
const status = document.getElementById('status');
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const save = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {} };

function render() {
  const list = load().sort((a, b) => b.t - a.t).slice(0, 60);
  notes.innerHTML = '';
  if (!list.length) {
    notes.innerHTML = '<p class="status">Belum ada pesan.🥺</p>';
    return;
  }
  list.forEach((m, i) => {
    const n = document.createElement('div');
    n.className = 'note';
    n.style.setProperty('--r', ((i * 37) % 7) - 3 + 'deg');
    const b = document.createElement('b');  b.textContent = `${m.e} ${m.n}`;
    const p = document.createElement('p');  p.textContent = m.m;
    const s = document.createElement('small');
    s.textContent = new Date(m.t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    n.append(b, p, s);
    notes.appendChild(n);
  });
}

document.getElementById('send').onclick = () => {
  const name = document.getElementById('name').value.trim() || 'Anonim';
  const text = document.getElementById('text').value.trim();
  if (!text) { status.textContent = 'Pesannya masih kosong nih 🙈'; return; }
  const list = load();
  list.push({ n: name.slice(0, 24), m: text.slice(0, 200), e: picked, t: Date.now() });
  save(list);
  document.getElementById('text').value = '';
  status.textContent = 'Terkirim! Makasih ya 💕';
  render();
};
render();

// ===== Pemutar lagu =====
// Cara pakai: taruh file lagumu di folder yang sama, beri nama lagu.mp3
// lalu ganti judulnya di bawah ini. Kalau lagu.mp3 tidak ada,
// akan diputar melodi manis bawaan.
const SONG_FILE  = 'you.mp3';
const SONG_TITLE = 'YOU! - LANY';

const playBtn = document.getElementById('playBtn');
const disc = document.getElementById('disc');
const vol = document.getElementById('vol');
document.getElementById('songTitle').textContent = SONG_TITLE;

const audio = new Audio(SONG_FILE);
audio.loop = true;
audio.volume = vol.value;

// Melodi bawaan (dibuat dengan Web Audio, tanpa file)
let ctx, timer, step = 0, usingSynth = false;
const melody = [523,659,784,659,587,698,880,698,659,784,988,784,698,659,587,523];
function noteTick() {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = melody[step++ % melody.length];
  g.gain.setValueAtTime(vol.value * 0.3, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  o.connect(g); g.connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + 0.4);
}
function startSynth() {
  usingSynth = true;
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume();
  timer = setInterval(noteTick, 330);
}
function setPlaying(on) {
  playBtn.textContent = on ? '⏸ Jeda' : '▶ Putar Lagu';
  disc.classList.toggle('spin', on);
}

let playing = false;
playBtn.onclick = async () => {
  if (playing) {
    audio.pause(); clearInterval(timer);
    playing = false; setPlaying(false);
    return;
  }
  playing = true; setPlaying(true);
  if (usingSynth) { startSynth(); return; }
  try { await audio.play(); }
  catch { startSynth(); }   // file lagu tidak ditemukan -> pakai melodi bawaan
};
vol.oninput = () => { audio.volume = vol.value; };