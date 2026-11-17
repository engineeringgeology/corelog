/* IndexedDB storage — everything stays on the device */
'use strict';
window.CL = window.CL || {};

(function () {
  let dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open('corelog', 1);
      r.onupgradeneeded = () => {
        const db = r.result;
        if (!db.objectStoreNames.contains('boreholes')) db.createObjectStore('boreholes', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('photos')) { const s = db.createObjectStore('photos', { keyPath: 'id' }); s.createIndex('bh', 'bhId'); }
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'k' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  function tx(store, mode, fn) {
    return open().then(db => new Promise((res, rej) => {
      const t = db.transaction(store, mode); const s = t.objectStore(store);
      let out; const r = fn(s);
      if (r) r.onsuccess = () => { out = r.result; };
      t.oncomplete = () => res(out); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
    }));
  }
  const DB = {
    all: (store) => tx(store, 'readonly', s => s.getAll()),
    get: (store, key) => tx(store, 'readonly', s => s.get(key)),
    put: (store, val) => tx(store, 'readwrite', s => s.put(val)),
    del: (store, key) => tx(store, 'readwrite', s => s.delete(key)),
    photosFor: (bhId) => tx('photos', 'readonly', s => s.index('bh').getAll(bhId)),
    async delBorehole(id) {
      const ph = await DB.photosFor(id);
      for (const p of ph) await DB.del('photos', p.id);
      await DB.del('boreholes', id);
    },
    async meta(k, v) {
      if (v === undefined) { const r = await DB.get('meta', k); return r ? r.v : undefined; }
      return DB.put('meta', { k, v });
    }
  };
  CL.DB = DB;
})();
