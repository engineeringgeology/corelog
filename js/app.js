/* CoreLog Field — UI */
'use strict';
(function () {
  const M = CL.M, D = CL.DATA, DB = CL.DB;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const app = () => $('#app');
  const S = { bh: null, tab: 'info', list: [], settings: {} };

  // ---------- helpers ----------
  function toast(msg, ms = 2600) {
    const t = $('#toast'); t.textContent = T(msg); t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), ms);
  }
  let saveT = null;
  function saveBh(now) {
    if (!S.bh) return;
    S.bh.updated = Date.now(); S.bh.changesSinceBackup = (S.bh.changesSinceBackup || 0) + 1;
    clearTimeout(saveT);
    const b = S.bh; const run = () => DB.put('boreholes', b).catch(e => toast('Save failed: ' + e.message));
    if (now) return run(); saveT = setTimeout(run, 300);
  }
  const optLabel = (l, cat, g) => { if (l === '') return '—'; if (cat === 'noun') return CL.I18N.nounLabel(l); if (cat) { const r = TM(cat, l, g); if (r !== l) return r; } return T(l); };
  const optsHTML = (opts, val, cat, g) => opts.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}"${String(v) === String(val ?? '') ? ' selected' : ''}>${esc(optLabel(l, cat, g))}</option>`; }).join('');
  const numIn = v => { if (v === '' || v == null) return null; const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? null : n; };
  const ud = () => M.U(S.bh).d;
  const T = s => CL.I18N.T(s), TM = (c, v, g) => CL.I18N.term(c, v, g), ask = s => confirm(T(s));

  // ---------- generic form ----------
  // field: {k, l, t:'text'|'num'|'sel'|'date'|'area'|'seg'|'html'|'colour'|'check', o:opts, hint, show(obj), full, rr (rerender on change)}
  function fieldHTML(f, obj) {
    if (f.show && !f.show(obj)) return '';
    const v = obj[f.k]; const id = 'f_' + f.k;
    const lab = f.l ? `<label for="${id}">${esc(T(f.l))}${f.hint ? `<small>${esc(T(typeof f.hint === 'function' ? f.hint(obj) : f.hint))}</small>` : ''}</label>` : '';
    let inp = '';
    switch (f.t) {
      case 'num': inp = `<input id="${id}" data-k="${f.k}" data-t="num" type="text" inputmode="decimal" autocomplete="off" value="${v == null ? '' : esc(v)}" placeholder="${esc(f.ph || '')}">`; break;
      case 'sel': inp = `<select id="${id}" data-k="${f.k}">${optsHTML(typeof f.o === 'function' ? f.o(obj) : f.o, v, f.cat, CL.I18N.genderOf(obj, S.bh && S.bh.standard))}</select>`; break;
      case 'date': inp = `<input id="${id}" data-k="${f.k}" type="date" value="${esc(v || '')}">`; break;
      case 'dt': inp = `<input id="${id}" data-k="${f.k}" type="datetime-local" value="${esc(v || '')}">`; break;
      case 'area': inp = `<textarea id="${id}" data-k="${f.k}" rows="${f.rows || 3}" placeholder="${esc(f.ph || '')}">${esc(v || '')}</textarea>`; break;
      case 'check': return `<div class="fld ${f.full ? 'full' : ''}"><label class="chk"><input type="checkbox" data-k="${f.k}" data-t="bool"${v ? ' checked' : ''}> ${esc(T(f.l))}</label></div>`;
      case 'seg': inp = `<div class="seg" data-k="${f.k}">${f.o.map(o => `<button type="button" data-v="${esc(o[0])}" class="${String(v) === String(o[0]) ? 'on' : ''}">${esc(T(o[1]))}</button>`).join('')}</div>`; break;
      case 'colour': inp = `<div class="row2"><select data-k="colourMod">${optsHTML(D.colourMod, obj.colourMod, 'colourMod')}</select><select data-k="colour">${optsHTML([''].concat(D.colourMain), obj.colour, 'colourMain')}</select></div>`; break;
      case 'html': return `<div class="fld full">${f.html(obj)}</div>`;
      default: inp = `<input id="${id}" data-k="${f.k}" type="text" value="${esc(v || '')}" placeholder="${esc(f.ph || '')}" autocomplete="off">`;
    }
    return `<div class="fld ${f.full ? 'full' : ''}">${lab}${inp}</div>`;
  }
  function bindForm(root, fields, obj, onChange) {
    const byK = {}; fields.forEach(f => byK[f.k] = f);
    root.addEventListener('input', e => {
      const el = e.target; const k = el.dataset.k; if (!k) return;
      obj[k] = el.dataset.t === 'num' ? numIn(el.value) : el.dataset.t === 'bool' ? el.checked : el.value;
      onChange(k, byK[k] && byK[k].rr, e.type);
    });
    root.addEventListener('change', e => {
      const el = e.target; const k = el.dataset.k; if (!k) return;
      if (el.tagName === 'SELECT' || el.type === 'checkbox') onChange(k, byK[k] && byK[k].rr, 'change');
    });
    root.addEventListener('click', e => {
      const b = e.target.closest('.seg button'); if (!b) return;
      const k = b.parentElement.dataset.k; obj[k] = b.dataset.v;
      $$('button', b.parentElement).forEach(x => x.classList.toggle('on', x === b));
      onChange(k, true, 'change');
    });
  }

  // ---------- bottom sheet editor ----------
  function sheet({ title, fields, obj, preview, onSave, onDelete, saveLabel, extra, onNext, nextLabel }) {
    const work = JSON.parse(JSON.stringify(obj));
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="sheet" role="dialog" aria-label="${esc(T(title))}">
      <div class="sh-head"><button class="ghost" data-a="x" aria-label="${T('Close')}">✕</button><h3>${esc(T(title))}</h3><button class="primary sm" data-a="ok">${esc(T(saveLabel || 'Save'))}</button></div>
      <div class="sh-body"><div class="pv"></div><div class="form"></div>${onNext ? `<button class="btn wide" data-a="next">${esc(T(nextLabel || 'Save and add next'))}</button>` : ''}${onDelete ? `<button class="danger wide" data-a="del">${T('Delete')}</button>` : ''}</div></div>`;
    document.body.appendChild(ov);
    const form = $('.form', ov), pv = $('.pv', ov);
    const render = () => { form.innerHTML = fields.map(f => fieldHTML(f, work)).join(''); upd(); };
    const upd = () => { pv.innerHTML = preview ? preview(work) : ''; };
    bindForm(form, fields, work, (k, rr, type) => { if (rr && type === 'change') render(); else upd(); });
    if (extra) extra(ov, work, render);
    render();
    const close = () => new Promise(res => {
      ov.classList.add('out'); setTimeout(() => ov.remove(), 180);
      if (history.state && history.state.sheet) { const once = () => { window.removeEventListener('popstate', once); res(); }; window.addEventListener('popstate', once); history.back(); } else res();
    });
    history.pushState({ sheet: 1 }, ''); const pop = () => { window.removeEventListener('popstate', pop); ov.remove(); }; window.addEventListener('popstate', pop);
    ov.addEventListener('click', async e => {
      const a = e.target.closest('[data-a]'); if (!a) return; // tapping outside never discards what was typed
      if (a.dataset.a === 'x') close();
      if (a.dataset.a === 'ok') { const err = await onSave(work); if (err) { toast(err); return; } close(); }
      if (a.dataset.a === 'next') { const err = await onSave(work); if (err) { toast(err); return; } await close(); onNext(); }
      if (a.dataset.a === 'del' && ask('Delete this entry?')) { onDelete(); close(); }
    });
    setTimeout(() => { const f = $('input,select', form); if (f && !('ontouchstart' in window)) f.focus(); }, 200);
    return ov;
  }

  // ---------- views ----------
  async function route() {
    const h = location.hash.replace(/^#\/?/, '').split('/');
    if (h[0] === 'bh' && h[1]) {
      if (!S.bh || S.bh.id !== h[1]) { S.bh = await DB.get('boreholes', h[1]); if (!S.bh) { location.hash = '#/'; return; } migrate(S.bh); }
      S.tab = h[2] || 'info'; renderBh();
    } else if (h[0] === 'settings') { S.bh = null; renderSettings(); }
    else { S.bh = null; renderHome(); }
    window.scrollTo(0, 0);
  }
  function migrate(bh) { const n = M.newBorehole(); Object.keys(n).forEach(k => { if (bh[k] === undefined) bh[k] = n[k]; }); }

  function topbar(left, title, right, sub) {
    return `<header class="top"><div class="tl">${left || ''}</div><div class="tt"><div class="t1">${title}</div><div class="t2">${sub || ''}</div></div><div class="tr">${right || ''}</div></header>`;
  }

  async function renderHome() {
    S.list = (await DB.all('boreholes')).sort((a, b) => b.updated - a.updated);
    const lic = CL.License.state;
    const badge = lic.licensed ? `<span class="badge ok">${T('Licensed')}</span>` : `<span class="badge demo">${T('Demo')}</span>`;
    app().innerHTML = topbar(`<div class="logo">${logoSVG()}</div>`, 'CoreLog Field', `<button class="ghost" onclick="location.hash='#/settings'" aria-label="${T('Settings')}">${ico('gear')}</button>`, `Engineering Geology · ${badge}`) +
      `<main class="home">
        ${!lic.licensed ? `<div class="note">${T(`Demo mode: up to ${CL.License.DEMO_LIMIT} boreholes, PDF has a watermark.`)} <a href="#/settings">${T('Activate licence')}</a></div>` : ''}
        ${S.list.length ? S.list.map(b => {
          const d = M.maxDepth(b); const needBk = (b.changesSinceBackup || 0) > 0 && (!b.lastBackup || Date.now() - b.lastBackup > 864e5);
          return `<a class="card bh" href="#/bh/${b.id}/log">
          <div class="bh-mini"><canvas data-col="${b.id}" width="28" height="64"></canvas></div>
          <div class="bh-txt"><div class="bh-id">${esc(b.bhId || T('Untitled'))}</div><div class="bh-p">${esc(b.project || T('No project'))}</div>
          <div class="bh-m">${M.f2(d)} ${M.U(b).d} · ${T(`${b.intervals.length} layers`)} · ${T(`${b.photoCount || 0} photos`)} · ${esc(b.dateStart || '')}${needBk ? ' · <span class="warn">' + T('backup!') + '</span>' : ''}</div></div></a>`;
        }).join('') : `<div class="empty">${logoSVG(64)}<h2>${T('No boreholes yet')}</h2><p>${T('Tap <b>New borehole</b> to start logging. Everything is saved on this phone and works without signal.')}</p></div>`}
        <div class="actions"><button class="primary wide" id="newBh">${ico('plus')} ${T('New borehole')}</button>
        <label class="btn wide">${ico('upload')} ${T('Restore from backup')}<input type="file" id="restore" accept=".json,application/json" hidden></label></div>
      </main>`;
    $$('canvas[data-col]').forEach(c => miniCol(c, S.list.find(b => b.id === c.dataset.col)));
    $('#newBh').onclick = newBh;
    $('#restore').onchange = async e => { const f = e.target.files[0]; if (!f) return; try { const bh = await CL.Export.restore(f); if (bh) { toast(`Restored ${bh.bhId}`); renderHome(); } } catch (err) { toast(err.message); } };
  }

  async function newBh() {
    const lic = CL.License.state;
    if (!lic.licensed && S.list.length >= CL.License.DEMO_LIMIT) { toast(`Demo allows ${CL.License.DEMO_LIMIT} boreholes. Activate your licence in Settings.`, 4000); return; }
    const st = S.settings; const last = S.list[0];
    const next = last && last.bhId ? last.bhId.replace(/(\d+)(?!.*\d)/, m => String(+m + 1).padStart(m.length, '0')) : 'BH-01';
    const bh = M.newBorehole({ ...st, project: last ? last.project : '', projectNo: last ? last.projectNo : '', client: last ? last.client : '', bhId: next, driller: last ? last.driller : '', rig: last ? last.rig : '', method: last ? last.method : st.method, diameter: last ? last.diameter : '', contractor: last ? last.contractor : '' });
    await DB.put('boreholes', bh); S.bh = bh; location.hash = `#/bh/${bh.id}/info`;
  }

  const TABS = [['info', 'Info', 'info'], ['log', 'Log', 'layers'], ['runs', 'Core', 'core'], ['disc', 'Joints', 'joint'], ['samples', 'Samples', 'flask'], ['photos', 'Photos', 'cam'], ['export', 'Export', 'share']];
  function renderBh() {
    const bh = S.bh;
    app().innerHTML = topbar(`<button class="ghost" onclick="location.hash='#/'" aria-label="${T('Back')}">${ico('back')}</button>`, esc(bh.bhId || T('Borehole')), '', esc(bh.project || '')) +
      `<nav class="tabs">${TABS.map(t => `<a href="#/bh/${bh.id}/${t[0]}" class="${S.tab === t[0] ? 'on' : ''}">${ico(t[2])}<span>${T(t[1])}</span></a>`).join('')}</nav><main class="pane" id="pane"></main>`;
    ({ info: tabInfo, log: tabLog, runs: tabRuns, disc: tabDisc, samples: tabSamples, photos: tabPhotos, export: tabExport })[S.tab]();
  }

  // ----- Info tab
  function tabInfo() {
    const bh = S.bh; const u = () => ud();
    const fields = [
      { k: 'bhId', l: 'Borehole ID' }, { k: 'project', l: 'Project' }, { k: 'projectNo', l: 'Project no.' }, { k: 'client', l: 'Client' },
      { k: 'location', l: 'Location / chainage', full: true },
      { k: '_gps', t: 'html', html: o => `<div class="gps"><div><b>GPS</b> <span id="gpsTxt">${o.lat != null ? `${(+o.lat).toFixed(6)}, ${(+o.lon).toFixed(6)}${o.gpsAcc ? ` <small>±${Math.round(o.gpsAcc)} m</small>` : ''}` : '<small>' + T('not recorded') + '</small>'}</span></div><button class="btn sm" id="gpsBtn">${ico('pin')} ${T('Get GPS')}</button></div>` },
      { k: 'lat', l: 'Latitude', t: 'num' }, { k: 'lon', l: 'Longitude', t: 'num' },
      { k: 'elev', l: `Ground level (${u()})`, t: 'num', hint: 'from survey or GPS' }, { k: 'inclination', l: 'Inclination (°)', t: 'num' },
      { k: 'dateStart', l: 'Date started', t: 'date' }, { k: 'dateEnd', l: 'Date completed', t: 'date' },
      { k: 'method', l: 'Drilling method', t: 'sel', o: D.methods, cat: 'method' }, { k: 'diameter', l: 'Core / hole size', t: 'sel', o: D.coreSizes.includes(bh.diameter) ? D.coreSizes : D.coreSizes.concat([bh.diameter]) },
      { k: 'rig', l: 'Rig' }, { k: 'contractor', l: 'Contractor' }, { k: 'driller', l: 'Driller' }, { k: 'geologist', l: 'Logged by' },
      { k: 'finalDepth', l: `Final depth (${u()})`, t: 'num', hint: 'blank = deepest entry' },
      { k: 'standard', l: 'Description standard', t: 'sel', o: Object.entries(D.standards), rr: true },
      { k: 'units', l: 'Depth units', t: 'seg', o: [['m', 'metres'], ['ft', 'feet']], rr: true },
      { k: '_w', t: 'html', html: () => '<h4>' + T('Groundwater') + '</h4>' },
      { k: 'gwFirst', l: `Water first struck (${u()})`, t: 'num' }, { k: 'gwStanding', l: `Standing level (${u()})`, t: 'num' },
      { k: 'gwNote', l: 'Water notes', full: true, ph: 'e.g. rose to 2.10 m after 20 min' },
      { k: 'remarks', l: 'Remarks', t: 'area', full: true }
    ];
    const old = $('#pane'); const pane = old.cloneNode(false); old.replaceWith(pane);
    const render = () => {
      pane.innerHTML = `<div class="form">${fields.map(f => fieldHTML(f, bh)).join('')}</div>
        <section class="block"><div class="bhead"><h4>${T('Piezometer / standpipe')}</h4><button class="btn sm" id="pzBtn">${T(bh.piezo.installed ? 'Edit' : '+ Add')}</button></div>
        ${bh.piezo.installed ? `<p class="muted">${esc(TM('piezo', bh.piezo.type))} · ${T('screen')} ${M.f2(bh.piezo.screenTop)}–${M.f2(bh.piezo.screenBottom)} ${ud()} · ${T('seal')} ${M.f2(bh.piezo.sealTop)}–${M.f2(bh.piezo.sealBottom)} ${ud()}</p>` : `<p class="muted">${T('None installed')}</p>`}
        <div class="bhead"><h4>${T('Water level readings')}</h4><button class="btn sm" id="lvBtn">${T('+ Reading')}</button></div>
        ${bh.levels.map((l, i) => `<div class="li" data-lv="${i}"><b>${M.f2(l.depth)} ${ud()}</b><span>${esc((l.date || '').replace('T', ' '))}</span><small>${esc(l.notes || '')}</small></div>`).join('') || `<p class="muted">${T('No readings')}</p>`}</section>
        <button class="danger wide" id="delBh">${T('Delete borehole')}</button>`;
      $('#gpsBtn').onclick = getGPS;
      $('#pzBtn').onclick = editPiezo;
      $('#lvBtn').onclick = () => editLevel(null);
      $$('[data-lv]').forEach(el => el.onclick = () => editLevel(+el.dataset.lv));
      $('#delBh').onclick = async () => { if (ask(`Delete borehole ${bh.bhId} and all its photos? This cannot be undone. Make a backup first if unsure.`)) { await DB.delBorehole(bh.id); S.bh = null; location.hash = '#/'; } };
    };
    bindForm(pane, fields, bh, (k, rr, type) => { saveBh(); if (k === 'bhId' || k === 'project') { $('.t1').textContent = bh.bhId; $('.t2').textContent = bh.project; } if (rr && type === 'change') render(); });
    render();
  }

  function getGPS() {
    if (!navigator.geolocation) return toast('GPS not available on this device');
    const t = $('#gpsTxt'); t.innerHTML = `<small>${T('Locating… (stand still, open sky)')}</small>`;
    let best = null; const t0 = Date.now();
    const wid = navigator.geolocation.watchPosition(p => {
      if (!best || p.coords.accuracy < best.coords.accuracy) best = p;
      t.innerHTML = `<small>${T(`±${Math.round(best.coords.accuracy)} m… improving`)}</small>`;
      if (best.coords.accuracy <= 5 || Date.now() - t0 > 20000) finish();
    }, err => { navigator.geolocation.clearWatch(wid); t.innerHTML = '<small>' + esc(T('GPS failed: ' + err.message)) + '</small>'; if (err.code === 1) toast('Allow location for this app in phone settings'); }, { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
    const stop = setTimeout(finish, 25000);
    function finish() {
      clearTimeout(stop); navigator.geolocation.clearWatch(wid); if (!best) return;
      const c = best.coords; Object.assign(S.bh, { lat: +c.latitude.toFixed(7), lon: +c.longitude.toFixed(7), gpsAcc: c.accuracy });
      if (c.altitude != null && (S.bh.elev == null || S.bh.elev === '')) S.bh.elev = +(S.bh.units === 'ft' ? c.altitude * 3.28084 : c.altitude).toFixed(1);
      saveBh(true); tabInfo(); toast(`GPS saved (±${Math.round(c.accuracy)} m)`);
    }
  }

  function editPiezo() {
    const bh = S.bh; const p = { ...bh.piezo, installed: true }; const u = ud();
    sheet({ title: 'Piezometer', obj: p, fields: [
      { k: 'type', l: 'Type', t: 'sel', o: ['Standpipe piezometer', 'Standpipe (casagrande)', 'Monitoring well', 'Vibrating wire piezometer', 'Gas monitoring well', 'Inclinometer casing'], cat: 'piezo' },
      { k: 'dia', l: 'Pipe diameter' }, { k: 'tip', l: `Base / tip (${u})`, t: 'num' }, { k: 'stickup', l: `Stick-up (${u})`, t: 'num', hint: '+ above ground' },
      { k: 'screenTop', l: `Screen top (${u})`, t: 'num' }, { k: 'screenBottom', l: `Screen bottom (${u})`, t: 'num' },
      { k: 'sealTop', l: `Bentonite seal top (${u})`, t: 'num' }, { k: 'sealBottom', l: `Seal bottom (${u})`, t: 'num' },
      { k: 'notes', l: 'Notes', t: 'area', full: true, ph: 'filter sand, cover, lockable cap…' }],
      onSave: w => { bh.piezo = w; saveBh(true); tabInfo(); },
      onDelete: bh.piezo.installed ? () => { bh.piezo.installed = false; saveBh(true); tabInfo(); } : null });
  }
  function editLevel(i) {
    const bh = S.bh; const isNew = i === null;
    const o = isNew ? { date: new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 16), depth: null, notes: '' } : bh.levels[i];
    sheet({ title: 'Water level reading', obj: o, fields: [{ k: 'date', l: 'Date / time', t: 'dt' }, { k: 'depth', l: `Depth to water (${ud()})`, t: 'num' }, { k: 'notes', l: 'Notes', full: true, ph: 'dip from top of pipe / ground' }],
      onSave: w => { if (w.depth == null) return 'Enter the depth'; isNew ? bh.levels.push(w) : bh.levels[i] = w; saveBh(true); tabInfo(); },
      onDelete: isNew ? null : () => { bh.levels.splice(i, 1); saveBh(true); tabInfo(); } });
  }

  // ----- Log tab (strata)
  function tabLog() {
    const bh = S.bh, std = bh.standard; const iv = M.sortBy(bh.intervals, 'from'); const w = M.checks(bh);
    $('#pane').innerHTML = `${w.length ? `<div class="note warnbox">${w.map(x => esc(T(x))).join('<br>')}</div>` : ''}
      <div class="std">${esc(D.standards[std])} · ${T('tap a layer to edit')}</div>
      <div class="strata">${iv.map(i => `<div class="stratum" data-id="${i.id}" style="--h:${Math.max(56, Math.min(170, (M.num(i.to) - M.num(i.from)) * (bh.units === 'ft' ? 14 : 44)))}px">
        <canvas class="pat" data-pat="${M.patternOf(i, std)}"></canvas>
        <div class="dep"><b>${M.f2(i.from)}</b><small>${M.f2(M.num(i.to) - M.num(i.from))} ${ud()}</small><b>${M.f2(i.to)}</b></div>
        <div class="dsc">${esc(M.describe(i, std))}</div></div>`).join('') || `<div class="empty sm"><p>${T('No layers yet. Tap <b>+ Layer</b> and start from the top.')}</p></div>`}</div>
      <button class="fab" id="addIv">${ico('plus')} ${T('Layer')}</button>`;
    $$('canvas.pat').forEach(c => patCanvas(c));
    $$('.stratum').forEach(el => el.onclick = () => editInterval(bh.intervals.find(x => x.id === el.dataset.id)));
    $('#addIv').onclick = () => editInterval(null);
  }

  function intervalFields(bh) {
    const std = bh.standard, u = ud(), us = std === 'USCS';
    const isFine = o => us ? /^(ML|CL|OL|MH|CH|OH|PT|CL-ML)$/.test(o.uscs || '') : ['CLAY', 'SILT', 'PEAT'].includes(o.principal);
    const isCoarse = o => us ? /^(G|S)/.test(o.uscs || '') : ['SAND', 'GRAVEL', 'COBBLES', 'BOULDERS'].includes(o.principal);
    const soil = o => o.kind === 'soil', rock = o => o.kind === 'rock';
    return [
      { k: 'from', l: `From (${u})`, t: 'num' }, { k: 'to', l: `To (${u})`, t: 'num' },
      { k: 'kind', l: 'Material', t: 'seg', full: true, o: [['soil', 'Soil'], ['rock', 'Rock'], ['other', 'Fill / other']] },
      // soil
      { k: 'uscs', l: 'USCS group', t: 'sel', o: [['', '—']].concat(D.uscs.map(x => [x[0], `${x[0]} – ${CL.I18N.uscsLabel(x[0], x[1])}`])), show: o => soil(o) && us, rr: true, full: true },
      { k: 'principal', l: 'Principal soil type', t: 'sel', o: [''].concat(D.principalSoil), cat: 'noun', show: o => soil(o) && !us, rr: true },
      { k: 'secondary', l: 'Secondary constituents', t: 'sel', o: us ? ['', 'with sand', 'sandy', 'with gravel', 'gravelly', 'with silt', 'with clay', 'with organics', 'trace sand', 'trace gravel'] : D.secondary, cat: 'secondary', show: soil },
      { k: 'consistency', l: 'Consistency', t: 'sel', o: [''].concat(D.consistency[std]), cat: 'consistency', show: o => soil(o) && isFine(o), hint: o => D.consistencyHint[o.consistency] || '' },
      { k: 'density', l: 'Relative density', t: 'sel', o: [''].concat(D.density), cat: 'density', show: o => soil(o) && isCoarse(o), hint: o => D.densityHint[o.density] || '' },
      { k: 'sandSize', l: 'Sand size', t: 'sel', o: D.sandSize, cat: 'sandSize', show: o => soil(o) && (o.principal === 'SAND' || /^S/.test(o.uscs || '')) },
      { k: 'colour', l: 'Colour', t: 'colour', full: true, show: o => o.kind !== 'other' },
      { k: 'moisture', l: 'Moisture', t: 'sel', o: [''].concat(D.moisture), cat: 'moisture', show: soil },
      { k: 'plasticity', l: 'Plasticity', t: 'sel', o: [''].concat(D.plasticity), cat: 'plasticity', show: o => soil(o) && isFine(o) },
      { k: 'grading', l: 'Grading', t: 'sel', o: D.grading, cat: 'grading', show: o => soil(o) && isCoarse(o) },
      { k: 'shape', l: 'Particle shape', t: 'sel', o: D.particleShape, cat: 'shape', show: o => soil(o) && isCoarse(o) },
      { k: 'structure', l: 'Structure', t: 'sel', o: D.soilStructure, cat: 'soilStructure', show: soil },
      // rock
      { k: 'rockName', l: 'Rock name', t: 'sel', o: [''].concat(D.rockNames), cat: 'noun', show: rock, rr: true },
      { k: 'strength', l: 'Strength', t: 'sel', o: [['', '—']].concat((us ? D.strengthUS : D.strength)  .map(x => [x[0], x[0]])), cat: 'strength', show: rock, hint: o => ((us ? D.strengthUS : D.strength).find(x => x[0] === o.strength) || [])[1] || '' },
      { k: 'weathering', l: 'Weathering', t: 'sel', o: [['', '—']].concat(D.weathering.map(x => [x[0], x[0]])), cat: 'weathering', show: rock, hint: o => (D.weathering.find(x => x[0] === o.weathering) || [])[1] || '' },
      { k: 'grain', l: 'Grain size', t: 'sel', o: D.grainSize, cat: 'grain', show: rock },
      { k: 'rstructure', l: 'Structure / bedding', t: 'sel', o: D.rockStructure, cat: 'rockStructure', show: rock },
      { k: 'fracState', l: 'Fracture state', t: 'sel', o: D.fractureState, cat: 'fracture', show: rock },
      // other
      { k: 'desc', l: 'Description', t: 'area', full: true, show: o => o.kind === 'other' || o.descOverride, rows: 4 },
      { k: 'notes', l: 'Additional notes', t: 'area', rows: 2, full: true, show: o => !o.descOverride && o.kind !== 'other', ph: 'e.g. occasional subangular fine gravel of limestone' },
      { k: 'pattern', l: 'Graphic legend', t: 'sel', o: [['', 'Automatic']].concat(D.lith), cat: 'lith', full: true, rr: true },
      { k: 'descOverride', l: 'Write the description myself', t: 'check', full: true, show: o => o.kind !== 'other', rr: true }
    ];
  }

  function editInterval(iv) {
    const bh = S.bh; const isNew = !iv;
    if (isNew) {
      const last = M.sortBy(bh.intervals, 'to').pop();
      const prevKind = last ? last.kind : 'soil';
      iv = { id: M.uid(), from: last ? M.num(last.to) : 0, to: null, kind: prevKind, uscs: '', principal: '', secondary: '', consistency: '', density: '', sandSize: '', colourMod: '', colour: '', moisture: '', plasticity: '', grading: '', shape: '', structure: '', rockName: last && last.kind === 'rock' ? last.rockName : '', strength: '', weathering: '', grain: '', rstructure: '', fracState: '', notes: '', desc: '', descOverride: false, pattern: '' };
    }
    const fields = intervalFields(bh);
    sheet({
      title: isNew ? 'New layer' : `Layer ${M.f2(iv.from)}–${M.f2(iv.to)} ${ud()}`, obj: iv, fields,
      preview: o => `<div class="preview"><canvas class="pat big" data-pat="${M.patternOf(o, bh.standard)}"></canvas><div><small>${esc(D.standards[bh.standard])}</small><p>${esc(M.describe({ ...o, descOverride: false }, bh.standard) || '…')}</p></div></div>`,
      extra: (ov, work) => {
        // redraw pattern after each preview update + keep override text in sync
        const obs = new MutationObserver(() => { $$('canvas.pat', ov).forEach(c => patCanvas(c)); }); obs.observe($('.pv', ov), { childList: true, subtree: true });
        ov.addEventListener('change', e => { if (e.target.dataset.k === 'descOverride' && work.descOverride && !work.desc) { work.desc = M.describe({ ...work, descOverride: false }, bh.standard); } });
      },
      onSave: w => {
        if (w.from == null || w.to == null) return 'Enter From and To depths';
        if (w.to <= w.from) return '"To" must be deeper than "From"';
        if (w.descOverride && !w.desc) w.desc = M.describe({ ...w, descOverride: false }, bh.standard);
        const i = bh.intervals.findIndex(x => x.id === w.id); i >= 0 ? bh.intervals[i] = w : bh.intervals.push(w);
        saveBh(true); tabLog();
      },
      onNext: isNew ? () => editInterval(null) : null,
      onDelete: isNew ? null : () => { bh.intervals = bh.intervals.filter(x => x.id !== iv.id); saveBh(true); tabLog(); }
    });
  }

  // ----- Core runs tab
  function tabRuns() {
    const bh = S.bh; const runs = M.sortBy(bh.runs, 'from'); const u = M.U(bh);
    const pc = v => v == null ? '–' : Math.round(v);
    $('#pane').innerHTML = `<div class="std">${T(`TCR · SCR · RQD calculated automatically (RQD counts pieces ≥ ${u.rqdMin} ${u.piece})`)}</div>
      <div class="tbl runs"><div class="tr th"><span>${T(`Run (${u.d})`)}</span><span>TCR</span><span>SCR</span><span>RQD</span><span>FI</span></div>
      ${runs.map(r => { const k = M.runCalc(r, bh); return `<div class="tr" data-id="${r.id}"><span><b>${M.f2(r.from)}–${M.f2(r.to)}</b></span><span>${bar(k.tcr, '#4f8fc0')}</span><span>${bar(k.scr, '#5aa36b')}</span><span>${bar(k.rqd, '#e0912f')}</span><span>${k.fi == null ? '–' : k.fi.toFixed(1)}</span></div>`; }).join('') || `<p class="muted pad">${T('No core runs yet.')}</p>`}</div>
      <button class="fab" id="addRun">${ico('plus')} ${T('Core run')}</button>`;
    function bar(v, c) { return `<i class="bar"><i style="width:${v == null ? 0 : v}%;background:${c}"></i><em>${pc(v)}</em></i>`; }
    $$('.runs [data-id]').forEach(el => el.onclick = () => editRun(bh.runs.find(x => x.id === el.dataset.id)));
    $('#addRun').onclick = () => editRun(null);
  }
  function editRun(r) {
    const bh = S.bh; const isNew = !r; const u = M.U(bh);
    if (isNew) { const last = M.sortBy(bh.runs, 'to').pop(); const L = last ? M.num(last.to) - M.num(last.from) : (u.d === 'ft' ? 5 : 1.5); const f = last ? M.num(last.to) : 0; r = { id: M.uid(), from: f, to: +(f + L).toFixed(2), recovered: null, pieces: '', solid: null, rqdLen: null, fractures: null, notes: '' }; }
    sheet({ title: isNew ? 'New core run' : `Run ${M.f2(r.from)}–${M.f2(r.to)}`, obj: r, fields: [
      { k: 'from', l: `From (${u.d})`, t: 'num' }, { k: 'to', l: `To (${u.d})`, t: 'num' },
      { k: 'recovered', l: `Total core recovered (${u.d})`, t: 'num', full: true, hint: 'all core incl. broken' },
      { k: 'pieces', l: `Solid core piece lengths (${u.piece})`, full: true, ph: 'e.g. 12 8 25 31 4 17', hint: 'full-diameter pieces, separated by spaces' },
      { k: 'fractures', l: 'Natural fractures (count)', t: 'num', hint: 'exclude drilling breaks; blank = pieces − 1' },
      { k: 'solid', l: `Solid core total (${u.d})`, t: 'num', hint: 'optional, overrides pieces' },
      { k: 'rqdLen', l: `Pieces ≥${u.rqdMin} ${u.piece} total (${u.d})`, t: 'num', hint: 'optional, overrides pieces' },
      { k: 'notes', l: 'Notes', full: true, ph: 'core loss, mechanical breaks, barrel…' }],
      preview: o => { const k = M.runCalc(o, bh); const f = v => v == null ? '–' : v.toFixed(0) + ' %'; return `<div class="calc"><div><small>TCR</small><b>${f(k.tcr)}</b></div><div><small>SCR</small><b>${f(k.scr)}</b></div><div><small>RQD</small><b>${f(k.rqd)}</b></div><div><small>FI ${u.fi}</small><b>${k.fi == null ? '–' : k.fi.toFixed(1)}</b></div></div><p class="muted">${T(`${k.nPieces} pieces · run ${M.f2(k.len)} ${u.d}`)}</p>`; },
      onSave: w => { if (w.from == null || w.to == null || w.to <= w.from) return 'Check From / To'; if (w.recovered != null && w.recovered > (w.to - w.from) + 1e-6) return 'Recovered core is longer than the run'; { const k = M.runCalc(w, bh); if (w.recovered != null && k.scr != null && k.scr > k.tcr + 0.5) return 'Solid core pieces add up to more than the recovered core — check the lengths'; } const i = bh.runs.findIndex(x => x.id === w.id); i >= 0 ? bh.runs[i] = w : bh.runs.push(w); saveBh(true); tabRuns(); },
      onNext: isNew ? () => editRun(null) : null,
      onDelete: isNew ? null : () => { bh.runs = bh.runs.filter(x => x.id !== r.id); saveBh(true); tabRuns(); } });
  }

  // ----- Discontinuities
  function tabDisc() {
    const bh = S.bh; const ds = M.sortBy(bh.discs, 'depth');
    $('#pane').innerHTML = `<div class="std">${T('Discontinuities (EN ISO 14689 / ISRM terms). Dip = angle from core axis normal (0° = perpendicular to core).')}</div>
      ${ds.map(d => `<div class="li" data-id="${d.id}"><b>${M.f2(d.depth)} ${ud()}</b><span>${esc(TM('discType', d.type))}${d.dip != null ? ' · ' + d.dip + '°' : ''}${d.count ? ' · ×' + d.count : ''}</span><small>${esc([TM('spacing', d.spacing), TM('roughness', d.roughness), TM('aperture', d.aperture), TM('infill', d.infill)].filter(Boolean).join(' · '))}</small></div>`).join('') || `<p class="muted pad">${T('None recorded.')}</p>`}
      <button class="fab" id="addD">${ico('plus')} ${T('Discontinuity')}</button>`;
    $$('[data-id]').forEach(el => el.onclick = () => editDisc(bh.discs.find(x => x.id === el.dataset.id)));
    $('#addD').onclick = () => editDisc(null);
  }
  function editDisc(d) {
    const bh = S.bh; const isNew = !d;
    if (isNew) { const last = M.sortBy(bh.discs, 'depth').pop(); d = { id: M.uid(), depth: last ? last.depth : null, type: last ? last.type : 'joint', dip: null, count: 1, spacing: '', roughness: last ? last.roughness : '', aperture: last ? last.aperture : '', infill: last ? last.infill : '', notes: '' }; }
    sheet({ title: isNew ? 'New discontinuity' : 'Discontinuity', obj: d, fields: [
      { k: 'depth', l: `Depth (${ud()})`, t: 'num' }, { k: 'type', l: 'Type', t: 'sel', o: D.discType, cat: 'discType' },
      { k: 'dip', l: 'Dip to core axis normal (°)', t: 'num' }, { k: 'count', l: 'Count / set (no.)', t: 'num', hint: 'per metre or zone' },
      { k: 'spacing', l: 'Spacing', t: 'sel', o: [['', '—']].concat(D.spacing.map(s => [s[0], `${TM('spacing', s[0])} (${s[1]})`])), full: true },
      { k: 'roughness', l: 'Roughness', t: 'sel', o: D.roughness, cat: 'roughness' }, { k: 'aperture', l: 'Aperture', t: 'sel', o: D.aperture, cat: 'aperture' },
      { k: 'infill', l: 'Infill / coating', t: 'sel', o: D.infill, cat: 'infill' }, { k: 'notes', l: 'Notes', ph: 'persistence, JRC, slickensides…' }],
      onSave: w => { if (w.depth == null) return 'Enter the depth'; const i = bh.discs.findIndex(x => x.id === w.id); i >= 0 ? bh.discs[i] = w : bh.discs.push(w); saveBh(true); tabDisc(); },
      onNext: isNew ? () => editDisc(null) : null,
      onDelete: isNew ? null : () => { bh.discs = bh.discs.filter(x => x.id !== d.id); saveBh(true); tabDisc(); } });
  }

  // ----- Samples & tests
  function tabSamples() {
    const bh = S.bh; const ss = M.sortBy(bh.samples, 'top'); const ts = M.sortBy(bh.tests, 'depth');
    $('#pane').innerHTML = `<div class="bhead"><h4>${T('Samples &amp; SPT')}</h4><button class="btn sm" id="addS">${T('+ Sample')}</button></div>
      ${ss.map(s => { const n = M.sptN(s); return `<div class="li" data-s="${s.id}"><b>${M.f2(s.top)}${s.bottom != null ? '–' + M.f2(s.bottom) : ''} ${ud()}</b><span>${esc(s.type)} ${esc(s.ref || '')}${n != null ? ` · <b>N = ${n}</b>` : ''}</span><small>${esc(s.blows || '')} ${esc(s.notes || '')}</small></div>`; }).join('') || `<p class="muted pad">${T('No samples.')}</p>`}
      <div class="bhead"><h4>${T('Field tests')}</h4><button class="btn sm" id="addT">${T('+ Test')}</button></div>
      ${ts.map(x => `<div class="li" data-t="${x.id}"><b>${M.f2(x.depth)} ${ud()}</b><span>${esc(TM('testType', (D.testTypes.find(k => k[0] === x.type) || [0, x.type])[1]))}: <b>${esc(x.value ?? '')}</b></span><small>${esc(x.notes || '')}</small></div>`).join('') || `<p class="muted pad">${T('No tests.')}</p>`}`;
    $$('[data-s]').forEach(el => el.onclick = () => editSample(bh.samples.find(x => x.id === el.dataset.s)));
    $$('[data-t]').forEach(el => el.onclick = () => editTest(bh.tests.find(x => x.id === el.dataset.t)));
    $('#addS').onclick = () => editSample(null); $('#addT').onclick = () => editTest(null);
  }
  function editSample(s) {
    const bh = S.bh; const isNew = !s;
    if (isNew) { const last = M.sortBy(bh.samples, 'top').pop(); const n = bh.samples.length + 1; s = { id: M.uid(), top: null, bottom: null, type: last ? last.type : 'D', ref: String(n), blows: '', nOverride: null, notes: '' }; }
    const spt = bh.standard === 'USCS' ? '3 × 150 mm (6 in) increments: e.g. 4 6 8 → N = 14' : 'Seating + test drive, 6 × 75 mm: e.g. 2 3 4 5 6 7 → N = 22';
    sheet({ title: isNew ? 'New sample' : 'Sample', obj: s, fields: [
      { k: 'top', l: `Top (${ud()})`, t: 'num' }, { k: 'bottom', l: `Bottom (${ud()})`, t: 'num' },
      { k: 'type', l: 'Type', t: 'sel', o: D.sampleTypes.map(x => [x[0], `${x[0]} – ${TM('sampleType', x[1])}`]), rr: true }, { k: 'ref', l: 'Sample no. / ref' },
      { k: 'blows', l: 'SPT blows per increment', full: true, ph: '2 3 4 5 6 7', hint: spt },
      { k: 'nOverride', l: 'N (manual / refusal)', t: 'num', hint: 'e.g. 50 for 50/100 mm' },
      { k: 'notes', l: 'Notes', full: true, ph: 'recovery, SPT(C), refusal 50/25 mm…' }],
      preview: o => { const n = M.sptN(o); return n != null ? `<div class="calc one"><div><small>SPT N</small><b>${n}</b></div></div>` : ''; },
      onSave: w => { if (w.top == null) return 'Enter the top depth'; const i = bh.samples.findIndex(x => x.id === w.id); i >= 0 ? bh.samples[i] = w : bh.samples.push(w); saveBh(true); tabSamples(); },
      onNext: isNew ? () => editSample(null) : null,
      onDelete: isNew ? null : () => { bh.samples = bh.samples.filter(x => x.id !== s.id); saveBh(true); tabSamples(); } });
  }
  function editTest(x) {
    const bh = S.bh; const isNew = !x;
    if (isNew) { const last = M.sortBy(bh.tests, 'depth').pop(); x = { id: M.uid(), depth: null, type: last ? last.type : 'PP', value: null, notes: '' }; }
    sheet({ title: isNew ? 'New field test' : 'Field test', obj: x, fields: [
      { k: 'depth', l: `Depth (${ud()})`, t: 'num' }, { k: 'type', l: 'Test', t: 'sel', o: D.testTypes, cat: 'testType' },
      { k: 'value', l: 'Result', t: 'num' }, { k: 'notes', l: 'Notes', ph: 'Lugeon stages, readings…' }],
      onSave: w => { if (w.depth == null) return 'Enter the depth'; const i = bh.tests.findIndex(k => k.id === w.id); i >= 0 ? bh.tests[i] = w : bh.tests.push(w); saveBh(true); tabSamples(); },
      onDelete: isNew ? null : () => { bh.tests = bh.tests.filter(k => k.id !== x.id); saveBh(true); tabSamples(); } });
  }

  // ----- Photos
  async function tabPhotos() {
    const bh = S.bh; const ph = (await DB.photosFor(bh.id)).sort((a, b) => a.box - b.box);
    bh.photoCount = ph.length;
    const pane = $('#pane');
    pane.innerHTML = `<div class="std">${T('Each photo gets a stamp: borehole, box no., depth, date and GPS. Saved at ~300 KB.')}</div>
      <div class="grid">${ph.map(p => `<figure data-id="${p.id}"><img alt="Box ${p.box}" data-blob="${p.id}"><figcaption>${T(`Box ${p.box}`)} · ${M.f2(p.from)}–${M.f2(p.to)}</figcaption></figure>`).join('') || `<p class="muted pad">${T('No photos yet.')}</p>`}</div>
      <button class="fab" id="addP">${ico('cam')} ${T('Core box photo')}</button>`;
    const urls = [];
    ph.forEach(p => { const img = $(`img[data-blob="${p.id}"]`); const u = URL.createObjectURL(p.blob); urls.push(u); img.src = u; });
    $$('figure').forEach(f => f.onclick = () => viewPhoto(ph.find(p => p.id === f.dataset.id)));
    $('#addP').onclick = () => addPhoto(ph);
  }
  function addPhoto(ph) {
    const bh = S.bh; const last = ph[ph.length - 1];
    const runsTo = M.sortBy(bh.runs, 'to').pop();
    const o = { box: last ? last.box + 1 : 1, from: last ? last.to : 0, to: runsTo ? M.num(runsTo.to) : null };
    sheet({ title: 'Core box photo', obj: o, saveLabel: 'Camera', fields: [
      { k: 'box', l: 'Box no.', t: 'num' }, { k: '_s', t: 'html', html: () => '' },
      { k: 'from', l: `Depth from (${ud()})`, t: 'num' }, { k: 'to', l: `Depth to (${ud()})`, t: 'num' },
      { k: '_h', t: 'html', html: () => `<p class="muted">${T('Tip: shoot straight down, whole box in frame, label board visible. You can also pick an existing photo from the gallery.')}</p><label class="btn wide">${ico('upload')} ${T('Choose from gallery')}<input type="file" accept="image/*" id="gal" hidden></label>` }],
      extra: (ov, work) => { ov.addEventListener('change', e => { if (e.target.id === 'gal' && e.target.files[0]) { processPhoto(e.target.files[0], work); ov.querySelector('[data-a=x]').click(); } }); },
      onSave: w => {
        if (w.box == null || w.from == null || w.to == null) return 'Enter box number and depths';
        const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment';
        inp.onchange = () => inp.files[0] && processPhoto(inp.files[0], w); inp.click();
      } });
  }
  async function processPhoto(file, w) {
    const bh = S.bh; toast('Processing photo…', 8000);
    try {
      const date = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const gps = bh.lat != null ? `${(+bh.lat).toFixed(5)}, ${(+bh.lon).toFixed(5)}` : '';
      const r = await CL.Photo.stampAndCompress(file, { bh: bh.bhId, box: w.box, from: M.f2(w.from), to: M.f2(w.to), u: ud(), date, gps, project: bh.project });
      await DB.put('photos', { id: M.uid(), bhId: bh.id, box: w.box, from: w.from, to: w.to, date, blob: r.blob, w: r.w, h: r.h, size: r.blob.size });
      bh.photoCount = (bh.photoCount || 0) + 1; saveBh(true);
      toast(`Photo saved (${Math.round(r.blob.size / 1024)} KB)`); if (S.tab === 'photos') tabPhotos();
    } catch (e) { toast('Photo failed: ' + e.message, 5000); }
  }
  function viewPhoto(p) {
    const ov = document.createElement('div'); ov.className = 'overlay viewer'; const u = URL.createObjectURL(p.blob);
    ov.innerHTML = `<img src="${u}" alt=""><div class="vbar"><button class="btn" data-a="close">${T('Close')}</button><button class="btn" data-a="share">${ico('share')} ${T('Share')}</button><button class="danger" data-a="del">${T('Delete')}</button></div>`;
    document.body.appendChild(ov);
    ov.onclick = async e => {
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'close') { ov.remove(); URL.revokeObjectURL(u); }
      if (a.dataset.a === 'share') CL.Export.save(p.blob, `${CL.Export.safe(S.bh.bhId)}_box${p.box}.jpg`, true);
      if (a.dataset.a === 'del' && ask('Delete this photo?')) { await DB.del('photos', p.id); S.bh.photoCount = Math.max(0, (S.bh.photoCount || 1) - 1); saveBh(true); ov.remove(); tabPhotos(); }
    };
  }

  // ----- Export
  function tabExport() {
    const bh = S.bh; const lic = CL.License.state;
    const bk = bh.lastBackup ? new Date(bh.lastBackup).toLocaleString() : T('never');
    $('#pane').innerHTML = `
      <section class="block"><h4>${ico('pdf')} ${T('Borehole log (PDF)')}</h4><p class="muted">${T('A4 log with graphic column, legend, TCR/SCR/RQD, samples, SPT, water, and data tables.')}${lic.licensed ? '' : ` <b>${T('Demo: watermark.')}</b>`}</p>
        <div class="fld"><label for="perSheet">${T('Depth per sheet')}</label><select id="perSheet">${(bh.units === 'ft' ? [[40, '40 ft per sheet (1 in = 5 ft)'], [80, '80 ft per sheet (1 in = 10 ft)'], [200, '200 ft per sheet (1 in = 25 ft)']] : [[10, '10 m per sheet (1:50)'], [20, '20 m per sheet (1:100)'], [50, '50 m per sheet (1:250)']]).map(o => `<option value="${o[0]}"${+bh.pdfPerSheet === o[0] ? ' selected' : ''}>${T(o[1])}</option>`).join('')}</select></div>
        <p class="muted" id="sheetsInfo"></p>
        <label class="chk"><input type="checkbox" id="incPh" checked> ${T('Include core photos')}</label>
        ${CL.I18N.lang !== 'en' ? `<label class="chk"><input type="checkbox" id="biEn"${bh.pdfBilingual ? ' checked' : ''}> ${T('English translation under each description')}</label>` : ''}
        <div class="row2"><button class="primary" id="pdfOpen">${T('Preview')}</button><button class="btn" id="pdfShare">${ico('share')} ${T('Save / share')}</button></div></section>
      <section class="block"><h4>${ico('xls')} ${T('Excel &amp; CSV')}</h4><p class="muted">${T('All data in sheets: header, strata, core runs, discontinuities, samples, tests, installation, water levels.')}</p>
        <div class="row2"><button class="btn" id="xls">Excel (.xlsx)</button><button class="btn" id="csv">CSV</button></div></section>
      <section class="block"><h4>${ico('save')} ${T('Backup')}</h4><p class="muted">${T(`Last backup: <b>${esc(bk)}</b>. One file with everything incl. photos. Send it to Google Drive, e-mail or WhatsApp. Restore it from the home screen on any phone.`)}</p>
        <button class="primary wide" id="bk">${T('Back up this borehole')}</button></section>`;
    const pdf = async (share) => {
      toast('Building PDF…', 10000);
      try {
        const photos = $('#incPh').checked ? await DB.photosFor(bh.id) : [];
        const doc = await CL.PDF.build(bh, { photos, perSheet: +$('#perSheet').value, bilingual: !!($('#biEn') && $('#biEn').checked), licensee: lic.licensed ? lic.name : '', demo: !lic.licensed });
        const blob = doc.output('blob'); const name = `${CL.Export.safe(bh.bhId)}_log.pdf`;
        toast('PDF ready');
        if (share) await CL.Export.save(blob, name, true);
        else { const u = URL.createObjectURL(blob); const w = (window.claude ? null : window.open(u, '_blank')); if (!w) CL.Export.save(blob, name, false); }
      } catch (e) { console.error(e); toast('PDF failed: ' + e.message, 5000); }
    };
    const si = () => { const n = Math.max(1, Math.ceil(M.maxDepth(bh) / +$('#perSheet').value - 1e-9)); $('#sheetsInfo').textContent = T(`${M.f2(M.maxDepth(bh))} ${ud()} → ${n} log sheet${n > 1 ? 's' : ''} + data tables`); };
    if ($('#biEn')) $('#biEn').onchange = () => { bh.pdfBilingual = $('#biEn').checked; saveBh(); };
    $('#perSheet').onchange = () => { bh.pdfPerSheet = +$('#perSheet').value; saveBh(); si(); }; si();
    $('#pdfOpen').onclick = () => pdf(false); $('#pdfShare').onclick = () => pdf(true);
    $('#xls').onclick = () => CL.Export.save(CL.Export.xlsxBlob([bh]), `${CL.Export.safe(bh.bhId)}.xlsx`, true);
    $('#csv').onclick = () => CL.Export.save(CL.Export.csvBlob(bh), `${CL.Export.safe(bh.bhId)}.csv`, true);
    $('#bk').onclick = async () => {
      const blob = await CL.Export.backupBlob(bh); const d = new Date().toISOString().slice(0, 10);
      const r = await CL.Export.save(blob, `${CL.Export.safe(bh.bhId)}_backup_${d}.corelog.json`, true);
      if (r !== 'cancelled') { bh.lastBackup = Date.now(); bh.changesSinceBackup = 0; await DB.put('boreholes', bh); toast('Backup saved'); tabExport(); }
    };
  }

  // ----- Settings
  async function renderSettings() {
    const lic = CL.License.state; const st = S.settings;
    let persisted = false, est = null;
    try { persisted = navigator.storage && await navigator.storage.persisted(); est = navigator.storage && await navigator.storage.estimate(); } catch (e) { }
    app().innerHTML = topbar(`<button class="ghost" onclick="location.hash='#/'" aria-label="${T('Back')}">${ico('back')}</button>`, T('Settings'), '') + `<main class="pane">
      <section class="block"><h4>${T('Language')}${CL.I18N.lang !== 'en' ? ' / Language' : ''}</h4><select id="langSel">${CL.I18N.LANGS.map(l => `<option value="${l[0]}"${l[0] === CL.I18N.lang ? ' selected' : ''}>${l[1]}</option>`).join('')}</select></section>
      <section class="block"><h4>${T('Licence')}</h4>${lic.licensed
        ? `<p>${T('Licensed to')} <b>${esc(lic.name)}</b><br><small class="muted">${esc(lic.email || '')} · ${T('key')} …${esc((lic.key || '').slice(-5))}</small></p><button class="btn" id="deact">${T('Remove licence from this device')}</button>`
        : `<p class="muted">${T('Enter the licence key from your Payhip receipt. Needs internet once, then works offline. One licence = 2 devices.')}</p>
          <div class="form"><div class="fld full"><label>${T('Licence key')}</label><input id="lk" placeholder="XXXXX-XXXXX-XXXXX-XXXXX" autocapitalize="characters" autocomplete="off"></div>
          <div class="fld full"><label>${T('Name or company shown on logs')}</label><input id="ln" placeholder="${T('e.g. GeoTech Ltd')}"></div></div>
          <button class="primary wide" id="act">${T('Activate')}</button>`}</section>
      <section class="block"><h4>${T('Defaults for new boreholes')}</h4><div class="form" id="defs"></div></section>
      <section class="block"><h4>${T('Storage')}</h4><p class="muted">${T(persisted ? '✅ Protected storage is ON (the phone will not auto-delete your logs).' : '⚠️ Protected storage not granted yet. Install the app to the home screen and make regular backups.')}${est ? `<br>${T(`Used: ${(est.usage / 1048576).toFixed(1)} MB`)}` : ''}</p>
        <button class="btn" id="persist">${T('Request protected storage')}</button> <button class="btn" id="xlsAll">${T('Export all boreholes to Excel')}</button></section>
      <section class="block"><h4>${T('About')}</h4><p class="muted">CoreLog Field v${CL.VERSION} · Engineering Geology.<br>${T('Terms follow USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 and EN ISO 14688-1 / 14689. Always check descriptions against the current edition of the standard used on your project.')}</p></section></main>`;
    const defFields = [{ k: 'geologist', l: 'Logged by (your name)' }, { k: 'standard', l: 'Standard', t: 'sel', o: Object.entries(D.standards) }, { k: 'units', l: 'Units', t: 'sel', o: [['m', 'metres'], ['ft', 'feet']] }, { k: 'method', l: 'Method', t: 'sel', o: D.methods, cat: 'method' }];
    const defs = $('#defs'); defs.innerHTML = defFields.map(f => fieldHTML(f, st)).join('');
    bindForm(defs, defFields, st, () => DB.meta('settings', st));
    $('#langSel').onchange = async e => { st.lang = e.target.value; CL.I18N.set(st.lang); await DB.meta('settings', st); $('#installBtn').textContent = T('Install app'); renderSettings(); };
    if ($('#act')) $('#act').onclick = async () => { const b = $('#act'); b.disabled = true; b.textContent = T('Checking…'); try { await CL.License.activate($('#lk').value, $('#ln').value); toast('Licence activated. Thank you!'); renderSettings(); } catch (e) { toast(e.message, 5000); b.disabled = false; b.textContent = T('Activate'); } };
    if ($('#deact')) $('#deact').onclick = async () => { if (ask('Remove the licence from this device? You can activate it again later.')) { await CL.License.deactivate(); renderSettings(); } };
    $('#persist').onclick = async () => { const ok = navigator.storage && navigator.storage.persist && await navigator.storage.persist(); toast(ok ? 'Protected storage ON' : 'The browser refused. Install the app to the home screen first.', 4000); renderSettings(); };
    $('#xlsAll').onclick = async () => { const all = await DB.all('boreholes'); if (!all.length) return toast('No boreholes'); CL.Export.save(CL.Export.xlsxBlob(all), `CoreLog_all_${M.today()}.xlsx`, true); };
  }

  // ---------- canvas helpers ----------
  function patCanvas(c) {
    const r = c.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
    const w = Math.max(10, r.width), h = Math.max(10, r.height);
    c.width = w * dpr; c.height = h * dpr; const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    CL.Patterns.draw(CL.Patterns.canvasPen(ctx, '#2b2b2b'), c.dataset.pat, 0, 0, w, h, 12);
  }
  function miniCol(c, bh) {
    if (!bh) return; const ctx = c.getContext('2d'); const d = Math.max(M.maxDepth(bh), 1); const H = c.height;
    ctx.fillStyle = '#eef2f6'; ctx.fillRect(0, 0, c.width, H);
    M.sortBy(bh.intervals, 'from').forEach(i => { const a = M.num(i.from) / d * H, b = M.num(i.to) / d * H; if (b > a) CL.Patterns.draw(CL.Patterns.canvasPen(ctx, '#444'), M.patternOf(i, bh.standard), 0, a, c.width, b - a, 7); });
    ctx.strokeStyle = '#10243a'; ctx.strokeRect(0.5, 0.5, c.width - 1, H - 1);
  }

  // ---------- icons ----------
  function ico(n) {
    const p = {
      plus: '<path d="M12 5v14M5 12h14"/>', back: '<path d="M15 18l-6-6 6-6"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>', layers: '<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 9h12M6 14h12"/>',
      core: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M4 14h16M9 4v5M14 9v5M11 14v6"/>', joint: '<rect x="8" y="2" width="8" height="20" rx="1"/><path d="M8 8l8 3M8 15l8-2"/>',
      flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>', cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
      share: '<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>', upload: '<path d="M12 15V3M7 8l5-5 5 5M5 14v6h14v-6"/>', pin: '<path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
      pdf: '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/>', xls: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 10h16M4 15h16M10 4v16"/>', save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'
    }[n] || '';
    return `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }
  function logoSVG(s = 34) {
    return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#10243a"/><rect x="22" y="8" width="20" height="48" rx="3" fill="#ffd166"/><path d="M22 20h20M22 33h20M22 44h20" stroke="#10243a" stroke-width="3"/><path d="M26 26l12 3M26 38l12-2" stroke="#10243a" stroke-width="2"/></svg>`;
  }

  // ---------- boot ----------
  CL.VERSION = '1.1.3';
  async function boot() {
    try {
      S.settings = (await DB.meta('settings')) || { standard: 'BS', units: 'm', method: D.methods[0], geologist: '' };
      CL.I18N.set(S.settings.lang || CL.I18N.detect()); $('#installBtn').textContent = T('Install app');
      await CL.License.load();
      if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => { if (!p) navigator.storage.persist(); });
    } catch (e) { console.error(e); }
    window.addEventListener('hashchange', route);
    route();
    if ('serviceWorker' in navigator && location.protocol === 'https:' || location.hostname === 'localhost') {
      if (navigator.serviceWorker) {
        const had = !!navigator.serviceWorker.controller; let reloaded = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => { if (had && !reloaded) { reloaded = true; location.reload(); } });
        navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(r => r.update()).catch(() => { });
      }
    }
    // install prompt (Android)
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); CL._ip = e; const b = $('#installBtn'); if (b) b.hidden = false; });
    $('#installBtn').onclick = async () => { if (CL._ip) { CL._ip.prompt(); CL._ip = null; $('#installBtn').hidden = true; } };
  }
  boot();
})();
