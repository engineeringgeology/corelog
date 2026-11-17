/* Excel / CSV export, backup & restore, file saving/sharing */
'use strict';
window.CL = window.CL || {};

(function () {
  const M = CL.M, D = CL.DATA;

  function sheets(bh) {
    const u = M.U(bh), std = bh.standard;
    const hdr = [['Field', 'Value'],
      ['Borehole', bh.bhId], ['Project', bh.project], ['Project no.', bh.projectNo], ['Client', bh.client], ['Location', bh.location],
      ['Latitude (WGS84)', bh.lat], ['Longitude (WGS84)', bh.lon], ['GPS accuracy (m)', bh.gpsAcc], [`Ground level (${u.d})`, M.num(bh.elev)],
      ['Date started', bh.dateStart], ['Date completed', bh.dateEnd], ['Method', bh.method], ['Diameter', bh.diameter], ['Inclination (deg)', bh.inclination],
      ['Rig', bh.rig], ['Contractor', bh.contractor], ['Driller', bh.driller], ['Logged by', bh.geologist], ['Standard', D.standards[std]],
      [`Final depth (${u.d})`, M.maxDepth(bh)], [`Water first struck (${u.d})`, M.num(bh.gwFirst)], [`Water standing (${u.d})`, M.num(bh.gwStanding)], ['Units', u.d], ['Remarks', bh.remarks]];
    const en = CL.I18N.lang === 'en';
    const strata = [[`From (${u.d})`, `To (${u.d})`, `Thickness (${u.d})`, 'Type', 'Legend', 'USCS', 'Principal / rock', en ? 'Description' : CL.I18N.T('Description')].concat(en ? [] : ['Description (English)'])]
      .concat(M.sortBy(bh.intervals, 'from').map(i => [M.num(i.from), M.num(i.to), (M.num(i.to) - M.num(i.from)) || null, i.kind, M.patternOf(i, std), i.uscs || '', i.kind === 'rock' ? i.rockName : i.principal, M.describe(i, std)].concat(en ? [] : [M.describe(i, std, 'en')])));
    const runs = [[`From (${u.d})`, `To (${u.d})`, `Run (${u.d})`, `Recovered (${u.d})`, 'TCR %', 'SCR %', 'RQD %', `FI (${u.fi})`, `Pieces (${u.piece})`, 'Fractures']]
      .concat(M.sortBy(bh.runs, 'from').map(r => { const k = M.runCalc(r, bh); const rd = v => v === null ? null : Math.round(v * 10) / 10; return [M.num(r.from), M.num(r.to), k.len, M.num(r.recovered), rd(k.tcr), rd(k.scr), rd(k.rqd), k.fi === null ? null : rd(k.fi), r.pieces || '', M.num(r.fractures)]; }));
    const discs = [[`Depth (${u.d})`, 'Type', 'Dip (deg)', 'Count', 'Spacing', 'Roughness', 'Aperture', 'Infill', 'Notes']]
      .concat(M.sortBy(bh.discs, 'depth').map(d => [M.num(d.depth), d.type, M.num(d.dip), M.num(d.count), d.spacing, d.roughness, d.aperture, d.infill, d.notes]));
    const samples = [[`Top (${u.d})`, `Bottom (${u.d})`, 'Type', 'Ref', 'SPT blows', 'SPT N', 'Notes']]
      .concat(M.sortBy(bh.samples, 'top').map(s => [M.num(s.top), M.num(s.bottom), s.type, s.ref, s.blows, M.sptN(s), s.notes]));
    const tests = [[`Depth (${u.d})`, 'Test', 'Value', 'Notes']]
      .concat(M.sortBy(bh.tests, 'depth').map(x => [M.num(x.depth), (D.testTypes.find(k => k[0] === x.type) || [0, x.type])[1], M.num(x.value) ?? x.value, x.notes]));
    const pz = bh.piezo || {};
    const inst = [['Item', 'Value'], ['Installed', pz.installed ? 'yes' : 'no'], ['Type', pz.type], ['Diameter', pz.dia], [`Screen top (${u.d})`, M.num(pz.screenTop)], [`Screen bottom (${u.d})`, M.num(pz.screenBottom)],
      [`Seal top (${u.d})`, M.num(pz.sealTop)], [`Seal bottom (${u.d})`, M.num(pz.sealBottom)], [`Tip (${u.d})`, M.num(pz.tip)], [`Stick-up (${u.d})`, M.num(pz.stickup)], ['Notes', pz.notes]];
    const levels = [['Date / time', `Depth (${u.d})`, 'Notes']].concat(bh.levels.map(l => [l.date, M.num(l.depth), l.notes]));
    return { Header: hdr, Strata: strata, 'Core runs': runs, Discontinuities: discs, Samples: samples, 'Field tests': tests, Installation: inst, 'Water levels': levels };
  }

  function xlsxBlob(bhs) {
    const wb = XLSX.utils.book_new();
    const usedNames = new Set();
    bhs.forEach(bh => {
      const s = sheets(bh);
      Object.entries(s).forEach(([name, rows]) => {
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = rows[0].map((_, i) => ({ wch: Math.min(60, Math.max(10, ...rows.map(r => String(r[i] ?? '').length))) }));
        let nm = (bhs.length > 1 ? `${bh.bhId} ${name}` : name).replace(/[\\\/\?\*\[\]:]/g, '-').slice(0, 31);
        for (let k = 2; usedNames.has(nm.toLowerCase()); k++) nm = nm.slice(0, 27) + ' (' + k + ')';
        usedNames.add(nm.toLowerCase());
        XLSX.utils.book_append_sheet(wb, ws, nm);
      });
    });
    const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  function csvBlob(bh) {
    const s = sheets(bh); const esc = v => { v = v ?? ''; v = String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    let out = '';
    Object.entries(s).forEach(([name, rows]) => { out += `# ${name}\n` + rows.map(r => r.map(esc).join(',')).join('\n') + '\n\n'; });
    return new Blob(['﻿' + out], { type: 'text/csv;charset=utf-8' });
  }

  async function backupBlob(bh) {
    const photos = await CL.DB.photosFor(bh.id);
    const ph = [];
    for (const p of photos) ph.push({ ...p, blob: undefined, data: await CL.Photo.blobToDataURL(p.blob) });
    return new Blob([JSON.stringify({ app: 'CoreLog Field', format: 1, exported: new Date().toISOString(), borehole: bh, photos: ph })], { type: 'application/json' });
  }

  async function restore(file) {
    const j = JSON.parse(await file.text());
    if (!j || j.app !== 'CoreLog Field' || !j.borehole) throw new Error(CL.I18N.T('This is not a CoreLog backup file'));
    const bh = j.borehole;
    const exists = await CL.DB.get('boreholes', bh.id);
    if (exists && !confirm(CL.I18N.T(`Borehole ${bh.bhId} already exists on this device. Replace it with the backup?`))) return null;
    if (exists) await CL.DB.delBorehole(bh.id);
    await CL.DB.put('boreholes', bh);
    for (const p of j.photos || []) { const blob = await CL.Photo.dataURLToBlob(p.data); delete p.data; await CL.DB.put('photos', { ...p, blob }); }
    return bh;
  }

  // Save a file: share sheet on phones (Drive, email, WhatsApp...), download otherwise
  async function save(blob, name, preferShare) {
    const file = new File([blob], name, { type: blob.type });
    if (preferShare && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: name }); return 'shared'; } catch (e) { if (e.name === 'AbortError') return 'cancelled'; }
    }
    // inside a claude.ai preview frame: use its download prompt
    if (window.claude && window.claude.use) {
      try { const dl = await window.claude.use('downloads'); if (dl) { await dl.save({ filename: name, data: blob }); return 'downloaded'; } }
      catch (e) { if (e && e.code === 'declined') return 'cancelled'; }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    return 'downloaded';
  }

  const safe = s => String(s || 'borehole').replace(/[^\w\-]+/g, '_');
  CL.Export = { xlsxBlob, csvBlob, backupBlob, restore, save, safe };
})();
