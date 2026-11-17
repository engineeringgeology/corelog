/* PDF borehole log (A4 portrait) with graphic column, legend, core quality, samples, water, appendices and photos */
'use strict';
window.CL = window.CL || {};

(function () {
  const M = CL.M, P = CL.Patterns, D = CL.DATA;
  const t = s => String(s ?? '').replace(/[–—]/g, '-').replace(/≥/g, '>=').replace(/≤/g, '<=').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x00-\xFF]/g, '');
  const lithName = k => (D.lith.find(x => x[0] === k) || [k, k])[1];

  async function build(bh, opts = {}) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const u = M.U(bh);
    const std = bh.standard;
    const W = 210, ML = 10, MR = 200;
    const Y0 = 56, Y1 = 254;                    // body top/bottom
    const mm = u.d === 'ft' ? 5 : 20;           // mm per depth unit (1:50 metric, ~1:61 for feet)
    const perPage = (Y1 - Y0) / mm;
    const depth = Math.max(M.maxDepth(bh), 1);
    const pages = Math.max(1, Math.ceil(depth / perPage - 1e-9));
    const ivs = M.sortBy(bh.intervals, 'from');
    const runs = M.sortBy(bh.runs, 'from');
    const samples = M.sortBy(bh.samples, 'top');
    const tests = M.sortBy(bh.tests, 'depth');
    const used = [...new Set(ivs.map(i => M.patternOf(i, std)))];
    const truncated = [];

    // columns
    const cols = [
      ['depth', `Depth\n(${u.d})`, 11], ['elev', `Level\n(${u.d})`, 11], ['leg', 'Legend', 14], ['desc', 'Description of strata', 72],
      ['wat', 'Water', 7], ['smp', 'Samples', 20], ['spt', 'Tests\nSPT N', 14], ['tcr', 'TCR\n%', 10], ['scr', 'SCR\n%', 10], ['rqd', 'RQD\n%', 10], ['fi', `FI\n${u.d === 'ft' ? '/ft' : '/m'}`, 11]
    ];
    let x = ML; const C = {};
    cols.forEach(c => { C[c[0]] = { x, w: c[2], label: c[1] }; x += c[2]; });

    const elev = M.num(bh.elev);
    const yOf = (d, pg) => Y0 + (d - pg * perPage) * mm;

    for (let pg = 0; pg < pages; pg++) {
      if (pg) doc.addPage();
      const dTop = pg * perPage, dBot = (pg + 1) * perPage;
      header(doc, bh, pg + 1, pages, opts);
      // column headings
      doc.setFillColor(238, 242, 246); doc.rect(ML, 46, MR - ML, Y0 - 46, 'F');
      doc.setDrawColor(40); doc.setLineWidth(0.25); doc.rect(ML, 46, MR - ML, Y1 - 46);
      doc.setFontSize(6.5); doc.setTextColor(20); doc.setFont('helvetica', 'bold');
      cols.forEach(c => { const k = C[c[0]]; doc.text(t(k.label).split('\n'), k.x + k.w / 2, 49.5, { align: 'center' }); if (k.x > ML) doc.line(k.x, 46, k.x, Y1); });
      doc.line(ML, Y0, MR, Y0);
      doc.setFont('helvetica', 'normal');

      // depth scale
      const step = u.d === 'ft' ? 1 : 0.5, major = u.d === 'ft' ? 5 : 1;
      for (let d = Math.ceil(dTop / step) * step; d <= dBot + 1e-6; d += step) {
        const y = yOf(d, pg); const isMaj = Math.abs(d / major - Math.round(d / major)) < 1e-6;
        doc.setLineWidth(0.15); doc.line(C.depth.x + C.depth.w - (isMaj ? 2.5 : 1.2), y, C.depth.x + C.depth.w, y);
        const nearB = ivs.some(iv => Math.abs((M.num(iv.to) - d) * mm) < 3.2);
        if (isMaj && !nearB && y > Y0 + 1 && y < Y1 - 1) { doc.setFontSize(6.5); doc.text(String(+d.toFixed(2)), C.depth.x + C.depth.w - 3, y + 1, { align: 'right' }); }
      }

      // strata
      ivs.forEach(iv => {
        const a = M.num(iv.from), b = M.num(iv.to); if (a === null || b === null || b <= a) return;
        if (b <= dTop || a >= dBot) return;
        const ya = yOf(Math.max(a, dTop), pg), yb = yOf(Math.min(b, dBot), pg);
        P.draw(P.pdfPen(doc, '#333333'), M.patternOf(iv, std), C.leg.x + 0.3, ya, C.leg.w - 0.6, yb - ya, 3.2);
        doc.setDrawColor(40); doc.setLineWidth(0.25);
        if (a >= dTop) { doc.line(C.depth.x, ya, C.desc.x + C.desc.w, ya); }
        if (b <= dBot) {
          doc.line(C.depth.x, yb, C.desc.x + C.desc.w, yb);
          doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
          doc.text(M.f2(b), C.depth.x + 1, yb - 0.8);
          if (elev !== null) doc.text((elev - b).toFixed(2), C.elev.x + 1, yb - 0.8);
          doc.setFont('helvetica', 'normal');
        }
        // description: only on the page where the layer starts (continuation note otherwise)
        const desc = t(M.describe(iv, std));
        const boxTop = ya + 0.6, boxH = yb - ya - 1.2, tw = C.desc.w - 3;
        if (a >= dTop) {
          let fs = 7, lines, lh;
          for (; fs >= 5.5; fs -= 0.5) { doc.setFontSize(fs); lines = doc.splitTextToSize(desc, tw); lh = fs * 0.36; if (lines.length * lh <= boxH) break; }
          doc.setFontSize(Math.max(fs, 5.5)); lh = Math.max(fs, 5.5) * 0.36;
          const maxL = Math.max(1, Math.floor(boxH / lh));
          if (lines.length > maxL) { lines = lines.slice(0, maxL); lines[maxL - 1] = lines[maxL - 1].replace(/\s*\S*$/, '') + ' ...[*]'; truncated.push(iv); }
          doc.setTextColor(15); doc.text(lines, C.desc.x + 1.5, boxTop + lh * 0.8);
        } else if (yb - ya > 6) {
          doc.setFontSize(6); doc.setTextColor(110); doc.text('(continued)', C.desc.x + 1.5, ya + 3); doc.setTextColor(15);
        }
      });

      // water strikes
      const wDraw = (d, filled, label) => {
        d = M.num(d); if (d === null || d < dTop || d > dBot) return;
        const y = yOf(d, pg), cx = C.wat.x + C.wat.w / 2;
        doc.setDrawColor(20, 90, 180); doc.setFillColor(20, 90, 180); doc.setLineWidth(0.3);
        doc.triangle(cx - 2, y - 2.6, cx + 2, y - 2.6, cx, y, filled ? 'FD' : 'S');
        doc.line(C.wat.x + 0.5, y, C.wat.x + C.wat.w - 0.5, y);
        doc.setFontSize(5); doc.setTextColor(20, 90, 180); doc.text(label, cx, y + 2.2, { align: 'center' }); doc.setTextColor(15); doc.setDrawColor(40);
      };
      wDraw(bh.gwFirst, true, M.f2(bh.gwFirst)); wDraw(bh.gwStanding, false, M.f2(bh.gwStanding));

      // samples
      samples.forEach(s => {
        const a = M.num(s.top), b = M.num(s.bottom) ?? a; if (a === null || a > dBot || b < dTop) return;
        const ya = yOf(Math.max(a, dTop), pg), yb = yOf(Math.min(b, dBot), pg);
        doc.setFillColor(60); doc.rect(C.smp.x + 1, ya, 1.6, Math.max(0.6, yb - ya), 'F');
        doc.setFontSize(5.8); doc.text(t(`${s.type || ''}${s.ref ? ' ' + s.ref : ''}`), C.smp.x + 3.4, ya + 2);
        doc.setFontSize(5); doc.setTextColor(90); doc.text(`${M.f2(a)}${b !== a ? '-' + M.f2(b) : ''}`, C.smp.x + 3.4, ya + 4.2); doc.setTextColor(15);
        const n = M.sptN(s);
        if (n !== null || s.blows) {
          doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.text(`N=${n ?? '?'}`, C.spt.x + 1, ya + 2.2); doc.setFont('helvetica', 'normal');
          if (s.blows) { doc.setFontSize(4.6); doc.setTextColor(90); doc.text(t(String(s.blows)).slice(0, 18), C.spt.x + 1, ya + 4.3); doc.setTextColor(15); }
        }
      });
      // field tests
      tests.forEach(ts => {
        const d = M.num(ts.depth); if (d === null || d < dTop || d > dBot) return;
        const y = yOf(d, pg);
        doc.setFontSize(5.6); doc.setTextColor(120, 40, 20); doc.text(t(`${ts.type} ${ts.value ?? ''}`).slice(0, 14), C.spt.x + 1, y + 1); doc.setTextColor(15);
      });

      // core runs
      runs.forEach(r => {
        const a = M.num(r.from), b = M.num(r.to); if (a === null || b === null || b <= a || b <= dTop || a >= dBot) return;
        const ya = yOf(Math.max(a, dTop), pg), yb = yOf(Math.min(b, dBot), pg);
        const k = M.runCalc(r, bh);
        doc.setDrawColor(150); doc.setLineWidth(0.15);
        ['tcr', 'scr', 'rqd', 'fi'].forEach(c => { doc.line(C[c].x, ya, C[c].x + C[c].w, ya); doc.line(C[c].x, yb, C[c].x + C[c].w, yb); });
        const bar = (col, v, rgb) => {
          if (v === null) return; const cc = C[col];
          doc.setFillColor(...rgb); doc.rect(cc.x + 0.4, ya + 0.4, (cc.w - 0.8) * v / 100, Math.max(0.4, yb - ya - 0.8), 'F');
          if (yb - ya > 3) { doc.setFontSize(6.2); doc.setTextColor(10); doc.text(String(Math.round(v)), cc.x + cc.w / 2, (ya + yb) / 2 + 1, { align: 'center' }); }
        };
        bar('tcr', k.tcr, [200, 222, 240]); bar('scr', k.scr, [210, 232, 205]); bar('rqd', k.rqd, [250, 220, 180]);
        if (k.fi !== null && yb - ya > 3) { doc.setFontSize(6.2); doc.text(k.fi.toFixed(1), C.fi.x + C.fi.w / 2, (ya + yb) / 2 + 1, { align: 'center' }); }
        doc.setDrawColor(40);
      });

      // end of borehole
      const fd = M.maxDepth(bh);
      if (fd > dTop && fd <= dBot) {
        const y = yOf(fd, pg);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        doc.text(t(`End of borehole at ${M.f2(fd)} ${u.d}`), C.desc.x + 1.5, y + 4); doc.setFont('helvetica', 'normal');
      }
      footer(doc, bh, used, opts, pg === pages - 1);
    }

    // appendices
    appendix(doc, bh, truncated, opts);
    if (opts.photos && opts.photos.length) await photoPages(doc, bh, opts);
    if (opts.demo) watermark(doc);
    return doc;
  }

  function header(doc, bh, pg, pages, opts) {
    const u = M.U(bh);
    doc.setFillColor(16, 36, 58); doc.rect(10, 8, 190, 9, 'F');
    doc.setTextColor(255); doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    doc.text('BOREHOLE LOG', 12, 14);
    doc.setFontSize(10); doc.text(t(bh.bhId || ''), 105, 14, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.text(`Sheet ${pg} of ${pages}`, 198, 14, { align: 'right' });
    doc.setTextColor(15);
    const coord = (bh.lat != null && bh.lon != null) ? `${(+bh.lat).toFixed(6)}, ${(+bh.lon).toFixed(6)} (WGS84${bh.gpsAcc ? ', +/-' + Math.round(bh.gpsAcc) + ' m' : ''})` : '';
    const F = [
      ['Project', bh.project], ['Project no.', bh.projectNo], ['Client', bh.client],
      ['Location', bh.location], ['Coordinates', coord], ['Ground level', bh.elev != null && bh.elev !== '' ? `${bh.elev} ${u.d}` : ''],
      ['Method', bh.method], ['Core / hole dia.', bh.diameter], ['Inclination', bh.inclination ? bh.inclination + ' deg' : ''],
      ['Rig', bh.rig], ['Contractor / driller', [bh.contractor, bh.driller].filter(Boolean).join(' / ')], ['Logged by', bh.geologist],
      ['Date started', bh.dateStart], ['Date completed', bh.dateEnd], ['Standard', D.standards[bh.standard]],
      ['Final depth', `${M.f2(M.maxDepth(bh))} ${u.d}`], ['Water first struck', bh.gwFirst != null && bh.gwFirst !== '' ? `${M.f2(bh.gwFirst)} ${u.d}` : 'not recorded'], ['Water standing', bh.gwStanding != null && bh.gwStanding !== '' ? `${M.f2(bh.gwStanding)} ${u.d}` : 'not recorded']
    ];
    const cw = 190 / 3; doc.setDrawColor(170); doc.setLineWidth(0.15);
    F.forEach((f, i) => {
      const r = Math.floor(i / 3), c = i % 3; const x = 10 + c * cw, y = 18 + r * 4.6;
      doc.rect(x, y, cw, 4.6);
      doc.setFontSize(5.6); doc.setTextColor(100); doc.text(t(f[0]), x + 1, y + 3.1);
      let val = t(f[1] || ''), fs = 6.8; doc.setFontSize(fs);
      while (fs > 5 && doc.getTextWidth(val) > cw - 21) { fs -= 0.3; doc.setFontSize(fs); }
      while (val.length > 3 && doc.getTextWidth(val) > cw - 21) val = val.slice(0, -2);
      doc.setTextColor(10); doc.text(val, x + 20, y + 3.2);
    });
  }

  function footer(doc, bh, used, opts, last) {
    const y = 256; doc.setDrawColor(40); doc.setLineWidth(0.25); doc.rect(10, y, 190, 31);
    doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.text('LEGEND', 12, y + 3.5); doc.setFont('helvetica', 'normal');
    const sw = 7, sh = 4.5; let lx = 12, ly = y + 5.5;
    used.slice(0, 15).forEach(k => {
      P.draw(P.pdfPen(doc, '#333333'), k, lx, ly, sw, sh, 2.4); doc.setDrawColor(60); doc.setLineWidth(0.15); doc.rect(lx, ly, sw, sh);
      doc.setFontSize(5.8); doc.text(t(lithName(k)).slice(0, 26), lx + sw + 1, ly + 3.2);
      lx += 38; if (lx > 160) { lx = 12; ly += 5.6; }
    });
    // symbols
    const sy = y + 23.5;
    doc.setDrawColor(20, 90, 180); doc.setFillColor(20, 90, 180); doc.triangle(12, sy - 2.2, 15, sy - 2.2, 13.5, sy, 'FD');
    doc.triangle(36, sy - 2.2, 39, sy - 2.2, 37.5, sy, 'S'); doc.setDrawColor(40);
    doc.setFontSize(5.6); doc.text('Water first struck', 16, sy - 0.3); doc.text('Water standing level', 40, sy - 0.3);
    doc.text('TCR total core recovery · SCR solid core recovery · RQD rock quality designation · FI fracture index', 70, sy - 0.3);
    doc.text('Samples: D disturbed · B bulk · U/ST undisturbed · SS split spoon · C core · W water · ES environmental', 12, sy + 3);
    if (bh.remarks) { doc.setFontSize(5.8); doc.text(t('Remarks: ' + bh.remarks).slice(0, 160), 12, sy + 6); }
    doc.setFontSize(5.2); doc.setTextColor(120);
    doc.text(t(`CoreLog Field · Engineering Geology${opts.licensee ? ' · Licensed to ' + opts.licensee : ''}`), 198, 290, { align: 'right' });
    doc.text(t(`Generated ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`), 10, 290);
    doc.setTextColor(15);
  }

  // simple table helper
  function table(doc, x, y, widths, head, rows, opts = {}) {
    const lh = 4.2;
    const drawHead = () => {
      doc.setFillColor(238, 242, 246); doc.rect(x, y, widths.reduce((a, b) => a + b), lh + 1, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5); let cx = x;
      head.forEach((h, i) => { doc.text(t(h), cx + 1, y + 3.4); cx += widths[i]; }); doc.setFont('helvetica', 'normal'); y += lh + 1;
    };
    drawHead();
    rows.forEach(r => {
      doc.setFontSize(6.5);
      const cells = r.map((c, i) => doc.splitTextToSize(t(c ?? ''), widths[i] - 2));
      const h = Math.max(...cells.map(c => c.length)) * 3 + 1.5;
      if (y + h > 280) { doc.addPage(); y = 16; if (opts.title) { doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text(t(opts.title + ' (cont.)'), x, y - 3); doc.setFont('helvetica', 'normal'); } drawHead(); }
      let cx = x; doc.setDrawColor(200); doc.setLineWidth(0.1); doc.line(x, y + h, x + widths.reduce((a, b) => a + b), y + h);
      cells.forEach((c, i) => { doc.text(c, cx + 1, y + 3); cx += widths[i]; });
      y += h;
    });
    return y + 6;
  }

  function appendix(doc, bh, truncated, opts) {
    const u = M.U(bh), std = bh.standard;
    const blocks = [];
    if (truncated.length) blocks.push(['Full stratum descriptions [*]', [16, 16, 158], [`From (${u.d})`, `To (${u.d})`, 'Description'],
      truncated.map(i => [M.f2(i.from), M.f2(i.to), M.describe(i, std)])]);
    if (bh.runs.length) blocks.push(['Core runs', [18, 18, 18, 22, 18, 18, 18, 18, 42], [`From`, `To`, `Run (${u.d})`, `Recovered (${u.d})`, 'TCR %', 'SCR %', 'RQD %', 'FI', `Pieces (${u.piece})`],
      M.sortBy(bh.runs, 'from').map(r => { const k = M.runCalc(r, bh); const f = v => v === null ? '-' : Math.round(v); return [M.f2(r.from), M.f2(r.to), M.f2(k.len), M.f2(r.recovered), f(k.tcr), f(k.scr), f(k.rqd), k.fi === null ? '-' : k.fi.toFixed(1), r.pieces || '']; })]);
    if (bh.discs.length) blocks.push(['Discontinuities', [16, 24, 14, 12, 22, 30, 26, 22, 24], [`Depth (${u.d})`, 'Type', 'Dip (deg)', 'Count', 'Spacing', 'Roughness', 'Aperture', 'Infill', 'Notes'],
      M.sortBy(bh.discs, 'depth').map(d => [M.f2(d.depth), d.type, d.dip, d.count, d.spacing, d.roughness, d.aperture, d.infill, d.notes])]);
    if (bh.samples.length) blocks.push(['Samples & SPT', [18, 18, 14, 22, 34, 14, 70], [`Top (${u.d})`, `Bottom (${u.d})`, 'Type', 'Ref.', 'SPT blows', 'N', 'Notes'],
      M.sortBy(bh.samples, 'top').map(s => [M.f2(s.top), M.f2(s.bottom), s.type, s.ref, s.blows, M.sptN(s) ?? '', s.notes])]);
    if (bh.tests.length) blocks.push(['Field tests', [18, 50, 24, 98], [`Depth (${u.d})`, 'Test', 'Value', 'Notes'],
      M.sortBy(bh.tests, 'depth').map(x => [M.f2(x.depth), (D.testTypes.find(k => k[0] === x.type) || [0, x.type])[1], x.value, x.notes])]);
    const pz = bh.piezo || {};
    if (pz.installed) blocks.push(['Installation', [60, 130], ['Item', 'Value'], [
      ['Type', pz.type], ['Pipe diameter', pz.dia], [`Response zone / screen (${u.d})`, `${M.f2(pz.screenTop)} - ${M.f2(pz.screenBottom)}`],
      [`Seal (${u.d})`, `${M.f2(pz.sealTop)} - ${M.f2(pz.sealBottom)}`], [`Tip depth (${u.d})`, M.f2(pz.tip)], [`Stick-up (${u.d})`, M.f2(pz.stickup)], ['Notes', pz.notes]]]);
    if (bh.levels.length) blocks.push(['Water level readings', [40, 40, 110], ['Date / time', `Depth (${u.d})`, 'Notes'],
      bh.levels.map(l => [l.date, M.f2(l.depth), l.notes])]);
    if (!blocks.length) return;
    doc.addPage(); let y = 16;
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.text(t(`${bh.bhId} - Log data`), 10, 11); doc.setFont('helvetica', 'normal');
    blocks.forEach(b => {
      if (y > 250) { doc.addPage(); y = 16; }
      doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text(t(b[0]), 10, y); doc.setFont('helvetica', 'normal');
      y = table(doc, 10, y + 2, b[1], b[2], b[3], { title: b[0] });
    });
    doc.setFontSize(5.2); doc.setTextColor(120); doc.text(t(`CoreLog Field · Engineering Geology${opts.licensee ? ' · Licensed to ' + opts.licensee : ''}`), 198, 290, { align: 'right' }); doc.setTextColor(15);
  }

  async function photoPages(doc, bh, opts) {
    const list = opts.photos.slice().sort((a, b) => (M.num(a.from) ?? 0) - (M.num(b.from) ?? 0));
    let slot = 0;
    for (const p of list) {
      if (slot % 2 === 0) { doc.addPage(); doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.text(t(`${bh.bhId} - Core photographs`), 10, 11); doc.setFont('helvetica', 'normal'); }
      const url = await CL.Photo.blobToDataURL(p.blob);
      const maxW = 190, maxH = 125; let w = maxW, h = p.h && p.w ? maxW * p.h / p.w : 100;
      if (h > maxH) { h = maxH; w = maxH * p.w / p.h; }
      const y = slot % 2 === 0 ? 16 : 150;
      doc.addImage(url, 'JPEG', 10 + (maxW - w) / 2, y, w, h, undefined, 'FAST');
      doc.setFontSize(7); doc.text(t(`Box ${p.box} · ${M.f2(p.from)}-${M.f2(p.to)} ${M.U(bh).d} · ${p.date || ''}`), 10, y + h + 4);
      slot++;
    }
  }

  function watermark(doc) {
    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) {
      doc.setPage(i);
      doc.saveGraphicsState(); doc.setGState(new doc.GState({ opacity: 0.12 }));
      doc.setFontSize(70); doc.setTextColor(200, 0, 0); doc.setFont('helvetica', 'bold');
      doc.text('DEMO VERSION', 105, 160, { align: 'center', angle: 35 });
      doc.restoreGraphicsState(); doc.setTextColor(15); doc.setFont('helvetica', 'normal');
    }
  }

  CL.PDF = { build };
})();
