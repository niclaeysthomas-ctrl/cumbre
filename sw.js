/* CUMBRE — service worker : cache offline (app shell) */
const CACHE = 'cumbre-v22';
const ASSETS = [
  'index.html',
  'app.js?v=21',
  'grammar-obligacion.js?v=1',
  'data-hablar.js?v=1',
  'hablar.js?v=1',
  'data.js?v=2',
  'vocab-es.js?v=2',
  'vocab-es2.js?v=2',
  'vocab-es3.js?v=6',
  'vocab-es4.js?v=1',
  'vocab-es5.js?v=1',
  'vocab-es6.js?v=2',
  'translations.js?v=1',
  'translations2.js?v=1',
  'vocab-es7.js?v=1',
  'translations3.js?v=1',
  'data-lecturas.js?v=1',
  'data-shadowing.js?v=1',
  'data-dudas.js?v=1',
  'listening-long.js?v=2',
  'exam-data.js?v=1',
  'advanced-es.js?v=2',
  'advanced-es2.js?v=5',
  'advanced-es3.js?v=1',
  'advanced-es4.js?v=1',
  'register.js?v=1',
  'tenses.js?v=2',
  'data-pron.js?v=1',
  'verbs-conj.js?v=1',
  'data-bonus.js?v=1',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
