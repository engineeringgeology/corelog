/* Data model, calculations and description builder */
'use strict';
window.CL = window.CL || {};

(function () {
  const D = CL.DATA;
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const num = v => (v === '' || v === null || v === undefined || isNaN(+v)) ? null : +v;
  const today = () => new Date().toISOString().slice(0, 10);

  function newBorehole(defaults = {}) {
    return {
      id: uid(), created: Date.now(), updated: Date.now(),
      project: defaults.project || '', projectNo: defaults.projectNo || '', client: defaults.client || '',
      bhId: defaults.bhId || 'BH-01', location: '', lat: null, lon: null, gpsAcc: null, elev: null,
      dateStart: today(), dateEnd: '', driller: defaults.driller || '', geologist: defaults.geologist || '',
      contractor: defaults.contractor || '', rig: defaults.rig || '', method: defaults.method || D.methods[0], diameter: defaults.diameter || '', inclination: '90',
      finalDepth: null, gwFirst: null, gwStanding: null, gwNote: '',
      standard: defaults.standard || 'BS', units: defaults.units || 'm', remarks: '',
      intervals: [], runs: [], discs: [], samples: [], tests: [], levels: [],
      piezo: { installed: false, type: 'Standpipe piezometer', tip: null, screenTop: null, screenBottom: null, sealTop: null, sealBottom: null, stickup: null, dia: '50 mm', notes: '' },
      photoCount: 0, lastBackup: null, changesSinceBackup: 0
    };
  }

  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const join = arr => arr.filter(x => x && String(x).trim()).join(' ');

  function colourOf(iv) { return join([iv.colourMod, iv.colour]); }

  // Build a standard-compliant description from the picked fields
  function describe(iv, std, lang) {
    if (iv.descOverride && iv.desc) return iv.desc;
    const l = lang || (CL.I18N ? CL.I18N.lang : 'en');
    if (l !== 'en' && CL.I18N) return CL.I18N.describe(iv, std, l);
    let s = '';
    if (iv.kind === 'rock') {
      if (std === 'USCS') {
        s = [iv.rockName || 'ROCK', colourOf(iv).replace(/grey/g, 'gray'), iv.grain, iv.weathering, iv.strength, iv.rstructure, iv.fracState].filter(Boolean).join(', ');
      } else {
        s = cap(join([iv.strength, iv.weathering, iv.rstructure, colourOf(iv), iv.grain, iv.rockName || 'ROCK']));
        if (iv.fracState) s += '. ' + cap(iv.fracState);
      }
    } else if (iv.kind === 'soil') {
      if (std === 'USCS') {
        const u = D.uscs.find(x => x[0] === iv.uscs);
        const head = u ? `${u[1]} (${u[0]})` : (iv.principal || 'SOIL');
        const fine = u ? /^(ML|CL|OL|MH|CH|OH|PT|CL-ML)$/.test(u[0]) : /CLAY|SILT|PEAT/.test(head);
        const col = colourOf(iv).replace(/grey/g, 'gray');
        const grad = /graded/i.test(head) ? '' : iv.grading;
        s = head + ': ' + [fine ? iv.consistency : iv.density, col, iv.moisture, fine ? iv.plasticity : grad, iv.shape, iv.secondary, iv.structure].filter(Boolean).join(', ');
      } else {
        const p = iv.principal || 'SOIL';
        const fine = ['CLAY', 'SILT', 'PEAT'].includes(p);
        const state = fine ? iv.consistency : (['SAND', 'GRAVEL'].includes(p) ? iv.density : '');
        const size = p === 'SAND' ? iv.sandSize : '';
        const shape = ['GRAVEL', 'COBBLES', 'BOULDERS'].includes(p) ? iv.shape : '';
        s = cap(join([state, iv.structure, colourOf(iv), iv.secondary, shape, size, p]));
        const extra = [iv.grading, shape ? '' : iv.shape, iv.moisture, fine ? iv.plasticity : ''].filter(Boolean);
        if (extra.length) s += ', ' + extra.join(', ');
      }
    } else {
      s = iv.desc || '';
    }
    if (iv.notes) s += (s ? '. ' : '') + iv.notes.trim();
    return s.replace(/\s+/g, ' ').replace(/[,:]\s*$/, '').trim() + (s && !/[.!?]$/.test(s.trim()) ? '.' : '');
  }

  function patternOf(iv, std) {
    if (iv.pattern) return iv.pattern;
    if (iv.kind === 'rock') return D.rockPattern[iv.rockName] || 'sandstone';
    if (iv.kind === 'soil') {
      if (std === 'USCS') { const u = D.uscs.find(x => x[0] === iv.uscs); if (u) return u[2]; }
      const p = D.principalPattern[iv.principal] || 'clay';
      const sec = iv.secondary || '';
      if (p === 'clay' || p === 'silt') return /sandy|gravelly/.test(sec) && !/slightly/.test(sec) ? 'sandy_clay' : p;
      if (p === 'sand') return /silty|clayey/.test(sec) && !/slightly/.test(sec) ? 'clayey_sand' : p;
      if (p === 'gravel') return /silty|clayey/.test(sec) && !/slightly/.test(sec) ? 'clayey_gravel' : (/sandy/.test(sec) ? 'sandy_gravel' : p);
      return p;
    }
    return 'fill';
  }

  // Units
  function U(bh) {
    const ft = bh.units === 'ft';
    return {
      d: ft ? 'ft' : 'm', piece: ft ? 'in' : 'cm', pieceToD: ft ? 1 / 12 : 1 / 100, rqdMin: ft ? 4 : 10,
      fi: ft ? 'fract./ft' : 'fract./m'
    };
  }

  // Core run calculations
  function runCalc(run, bh) {
    const u = U(bh);
    const len = num(run.to) - num(run.from);
    const pieces = String(run.pieces || '').split(/[\s,;+]+/).map(Number).filter(v => v > 0);
    const rec = num(run.recovered);
    const sumAll = pieces.reduce((a, b) => a + b, 0) * u.pieceToD;
    const sumRqd = pieces.filter(p => p >= u.rqdMin).reduce((a, b) => a + b, 0) * u.pieceToD;
    const ok = len > 0;
    const solid = num(run.solid) !== null ? num(run.solid) : (pieces.length ? sumAll : null);
    const res = {
      len: ok ? len : null,
      tcr: ok && rec !== null ? Math.min(100, rec / len * 100) : null,
      scr: ok && solid !== null ? Math.min(100, solid / len * 100) : null,
      rqd: ok && (pieces.length || num(run.rqdLen) !== null) ? Math.min(100, (num(run.rqdLen) !== null ? num(run.rqdLen) : sumRqd) / len * 100) : null,
      fi: null, nPieces: pieces.length
    };
    const fr = num(run.fractures);
    if (fr !== null && rec) res.fi = fr / rec;
    else if (pieces.length && rec) res.fi = Math.max(0, pieces.length - 1) / rec;
    return res;
  }

  // SPT N from blow string: 6 increments (BS/ISO: 2 seating + 4 test) or 3 increments (ASTM: 1 seating + 2)
  function sptN(s) {
    if (num(s.nOverride) !== null) return num(s.nOverride);
    const b = String(s.blows || '').split(/[\s,\/]+/).map(Number).filter(v => !isNaN(v));
    if (b.length >= 6) return b.slice(2, 6).reduce((a, c) => a + c, 0);
    if (b.length === 3) return b[1] + b[2];
    if (b.length === 4) return b.reduce((a, c) => a + c, 0);
    return null;
  }

  function sortBy(arr, k) { return arr.slice().sort((a, b) => (num(a[k]) ?? 0) - (num(b[k]) ?? 0)); }

  function checks(bh) {
    const w = []; const iv = sortBy(bh.intervals, 'from');
    for (let i = 0; i < iv.length; i++) {
      const a = iv[i];
      if (!(num(a.to) > num(a.from))) w.push(`Layer ${fmt(a.from)}–${fmt(a.to)}: "to" must be deeper than "from"`);
      if (i > 0) {
        const p = iv[i - 1];
        if (num(a.from) < num(p.to) - 1e-6) w.push(`Overlap at ${fmt(a.from)} ${U(bh).d}`);
        else if (num(a.from) > num(p.to) + 1e-6) w.push(`Gap ${fmt(p.to)}–${fmt(a.from)} ${U(bh).d}`);
      }
    }
    return w;
  }
  function fmt(v, d = 2) { const n = num(v); return n === null ? '' : String(parseFloat(n.toFixed(d))); }
  function f2(v) { const n = num(v); return n === null ? '–' : n.toFixed(2); }

  function maxDepth(bh) {
    const ds = [num(bh.finalDepth), ...bh.intervals.map(i => num(i.to)), ...bh.runs.map(r => num(r.to)), ...bh.samples.map(s => num(s.bottom) ?? num(s.top))].filter(v => v !== null);
    return ds.length ? Math.max(...ds) : 0;
  }

  CL.M = { uid, num, today, newBorehole, describe, patternOf, U, runCalc, sptN, sortBy, checks, fmt, f2, maxDepth, cap };
})();
