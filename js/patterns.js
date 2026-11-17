/* Graphic lithology patterns — same drawing code for canvas (screen) and jsPDF (export).
   Every mark is clipped to the box mathematically, so no graphics clipping is needed. */
'use strict';
window.CL = window.CL || {};

(function () {
  // Background tints (light, print friendly)
  const BG = {
    topsoil: '#d9c7a7', fill: '#e6e2dc', clay: '#c9d8b6', silt: '#e3e3b5', sand: '#f6e7a8', gravel: '#f1d39a', cobbles: '#ecc98f',
    peat: '#a99178', clayey_sand: '#efe2a7', sandy_clay: '#d6dfb0', clayey_gravel: '#e6d29d', sandy_gravel: '#f3dc9f',
    sandstone: '#f2dda0', siltstone: '#e2deae', mudstone: '#c4cdb2', shale: '#b9c1b0', limestone: '#c9dceb', dolomite: '#c8d3ee',
    marl: '#d4dfcf', conglomerate: '#ead3a6', chalk: '#f4f4ee', coal: '#4a4a4a', granite: '#f0c9c9', basalt: '#b7b0c4',
    schist: '#cfe0d0', gneiss: '#e4cfe0', quartzite: '#e9e9f5', flysch: '#d8d6c0', void: '#ffffff', norec: '#ffffff'
  };

  // Liang–Barsky segment clipping
  function clipLine(x1, y1, x2, y2, bx, by, bw, bh) {
    let t0 = 0, t1 = 1; const dx = x2 - x1, dy = y2 - y1;
    const p = [-dx, dx, -dy, dy], q = [x1 - bx, bx + bw - x1, y1 - by, by + bh - y1];
    for (let i = 0; i < 4; i++) {
      if (p[i] === 0) { if (q[i] < 0) return null; }
      else { const r = q[i] / p[i]; if (p[i] < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; } }
    }
    return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
  }

  // Draw pattern `key` into box using pen {line(x1,y1,x2,y2,w), dot(x,y,r), circle(x,y,r), fillRect(x,y,w,h,color), color(c)}
  function draw(pen, key, x, y, w, h, s) {
    if (h <= 0 || w <= 0) return;
    pen.fillRect(x, y, w, h, BG[key] || '#fff');
    const L = (x1, y1, x2, y2, lw) => { const c = clipLine(x1, y1, x2, y2, x, y, w, h); if (c) pen.line(c[0], c[1], c[2], c[3], lw); };
    const inside = (cx, cy, r) => cx - r >= x && cx + r <= x + w && cy - r >= y && cy + r <= y + h;
    const D = (cx, cy, r) => { if (inside(cx, cy, r)) pen.dot(cx, cy, r); };
    const O = (cx, cy, r) => { if (inside(cx, cy, r)) pen.circle(cx, cy, r); };
    const lw = s * 0.06;
    const hlines = (step, off = 0) => { for (let yy = y + step / 2 + off; yy < y + h; yy += step) L(x, yy, x + w, yy, lw); };
    const diag = (step, dir = 1) => { for (let k = -h; k < w + h; k += step) L(x + k, y + (dir > 0 ? h : 0), x + k + h, y + (dir > 0 ? 0 : h), lw); };
    const dashes = (step, len, off = 0) => {
      let row = 0; for (let yy = y + step / 2; yy < y + h; yy += step, row++) for (let xx = x + (row % 2 ? step / 2 : 0) + off; xx < x + w; xx += step) L(xx, yy, xx + len, yy, lw);
    };
    const dots = (step, r) => { let row = 0; for (let yy = y + step / 2; yy < y + h; yy += step, row++) for (let xx = x + (row % 2 ? step : step / 2); xx < x + w; xx += step) D(xx, yy, r); };
    const circles = (step, r) => { let row = 0; for (let yy = y + step / 2; yy < y + h; yy += step, row++) for (let xx = x + (row % 2 ? step : step / 2); xx < x + w; xx += step) O(xx, yy, r); };
    const bricks = (rowH, brickW) => {
      let row = 0; for (let yy = y; yy < y + h; yy += rowH, row++) {
        L(x, yy, x + w, yy, lw);
        for (let xx = x + (row % 2 ? brickW / 2 : 0); xx < x + w; xx += brickW) L(xx, yy, xx, yy + rowH, lw);
      }
    };
    const u = s; // pattern unit
    switch (key) {
      case 'topsoil': hlines(u * 0.9); for (let yy = y + u * 0.45; yy < y + h; yy += u * 1.8) for (let xx = x + u * 0.5; xx < x + w; xx += u * 1.4) { L(xx, yy, xx - u * 0.25, yy - u * 0.35, lw); L(xx, yy, xx + u * 0.25, yy - u * 0.35, lw); } break;
      case 'fill': diag(u * 0.9, 1); diag(u * 0.9, -1); break;
      case 'clay': hlines(u * 0.45); break;
      case 'silt': dashes(u * 0.7, u * 0.35); dots(u * 0.7, u * 0.05); break;
      case 'sand': dots(u * 0.45, u * 0.06); break;
      case 'gravel': circles(u * 0.9, u * 0.22); break;
      case 'cobbles': circles(u * 1.6, u * 0.5); dots(u * 0.8, u * 0.05); break;
      case 'peat': hlines(u * 0.6); for (let yy = y + u * 0.6; yy < y + h; yy += u * 1.2) for (let xx = x + u * 0.4; xx < x + w; xx += u * 0.9) L(xx, yy, xx, yy - u * 0.35, lw); break;
      case 'clayey_sand': dots(u * 0.5, u * 0.06); hlines(u * 1.0); break;
      case 'sandy_clay': hlines(u * 0.5); dots(u * 1.0, u * 0.06); break;
      case 'clayey_gravel': circles(u * 1.0, u * 0.2); hlines(u * 1.0, u * 0.5); break;
      case 'sandy_gravel': circles(u * 1.0, u * 0.2); dots(u * 0.5, u * 0.05); break;
      case 'sandstone': hlines(u * 1.0); dots(u * 0.45, u * 0.06); break;
      case 'siltstone': hlines(u * 1.0); dashes(u * 0.5, u * 0.25, u * 0.1); break;
      case 'mudstone': hlines(u * 0.35); break;
      case 'shale': hlines(u * 0.3); dashes(u * 0.6, u * 0.2); break;
      case 'limestone': bricks(u * 0.7, u * 1.4); break;
      case 'dolomite': bricks(u * 0.7, u * 1.4); for (let yy = y + u * 0.35; yy < y + h; yy += u * 1.4) for (let xx = x + u * 0.7; xx < x + w; xx += u * 1.4) { L(xx - u * 0.15, yy + u * 0.15, xx + u * 0.15, yy - u * 0.15, lw); } break;
      case 'marl': bricks(u * 0.7, u * 1.4); hlines(u * 0.35, u * 0.17); break;
      case 'conglomerate': circles(u * 1.1, u * 0.28); dots(u * 0.45, u * 0.05); break;
      case 'chalk': bricks(u * 0.9, u * 1.8); break;
      case 'coal': break;
      case 'granite': for (let yy = y + u * 0.5, r = 0; yy < y + h; yy += u, r++) for (let xx = x + (r % 2 ? u : u / 2); xx < x + w; xx += u) { L(xx - u * 0.2, yy, xx + u * 0.2, yy, lw * 1.2); L(xx, yy - u * 0.2, xx, yy + u * 0.2, lw * 1.2); } break;
      case 'basalt': for (let yy = y + u * 0.6, r = 0; yy < y + h; yy += u * 0.9, r++) for (let xx = x + (r % 2 ? u : u / 2); xx < x + w; xx += u) { L(xx - u * 0.2, yy + u * 0.15, xx, yy - u * 0.2, lw); L(xx, yy - u * 0.2, xx + u * 0.2, yy + u * 0.15, lw); } break;
      case 'schist': for (let yy = y + u * 0.3; yy < y + h; yy += u * 0.6) for (let xx = x; xx < x + w; xx += u) { L(xx, yy, xx + u * 0.5, yy - u * 0.15, lw); L(xx + u * 0.5, yy - u * 0.15, xx + u, yy, lw); } break;
      case 'gneiss': for (let yy = y + u * 0.4; yy < y + h; yy += u * 0.8) for (let xx = x; xx < x + w; xx += u * 1.2) { L(xx, yy, xx + u * 0.6, yy - u * 0.25, lw * 1.5); L(xx + u * 0.6, yy - u * 0.25, xx + u * 1.2, yy, lw * 1.5); } break;
      case 'quartzite': dots(u * 0.6, u * 0.08); diag(u * 1.5, 1); break;
      case 'flysch': { let r = 0; for (let yy = y; yy < y + h; yy += u * 0.8, r++) { L(x, yy, x + w, yy, lw); if (r % 2) for (let xx = x + u * 0.3; xx < x + w; xx += u * 0.45) D(xx, yy + u * 0.4, u * 0.05); else for (let k = yy + u * 0.2; k < yy + u * 0.8; k += u * 0.2) L(x, k, x + w, k, lw * 0.6); } } break;
      case 'void': L(x, y, x + w, y + h, lw); L(x, y + h, x + w, y, lw); break;
      case 'norec': L(x, y, x + w, y + h, lw); L(x, y + h, x + w, y, lw); break;
    }
  }

  // Canvas pen
  function canvasPen(ctx, color) {
    return {
      line(x1, y1, x2, y2, w) { ctx.strokeStyle = color || '#333'; ctx.lineWidth = Math.max(0.6, w); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); },
      dot(x, y, r) { ctx.fillStyle = color || '#333'; ctx.beginPath(); ctx.arc(x, y, Math.max(0.6, r), 0, 7); ctx.fill(); },
      circle(x, y, r) { ctx.strokeStyle = color || '#333'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); },
      fillRect(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }
    };
  }
  // jsPDF pen (units = mm)
  function pdfPen(doc, color) {
    const rgb = hex(color || '#333333');
    return {
      line(x1, y1, x2, y2, w) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); doc.setLineWidth(Math.max(0.08, w)); doc.line(x1, y1, x2, y2); },
      dot(x, y, r) { doc.setFillColor(rgb[0], rgb[1], rgb[2]); doc.circle(x, y, Math.max(0.1, r), 'F'); },
      circle(x, y, r) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); doc.setLineWidth(0.12); doc.circle(x, y, r, 'S'); },
      fillRect(x, y, w, h, c) { const k = hex(c); doc.setFillColor(k[0], k[1], k[2]); doc.rect(x, y, w, h, 'F'); }
    };
  }
  function hex(c) { c = c.replace('#', ''); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; }

  CL.Patterns = { draw, canvasPen, pdfPen, BG, hex };
})();
