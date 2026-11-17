/* Core-box photos: resize, stamp (borehole, box, depth, date, GPS), compress to ~300 KB */
'use strict';
window.CL = window.CL || {};

(function () {
  const TARGET = 300 * 1024, MAXSIDE = 2000;

  function loadImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file); const img = new Image();
      img.onload = () => { res(img); setTimeout(() => URL.revokeObjectURL(url), 1000); };
      img.onerror = () => rej(new Error('Could not read the image'));
      img.src = url;
    });
  }
  const toBlob = (c, q) => new Promise(r => c.toBlob(r, 'image/jpeg', q));

  async function stampAndCompress(file, stamp) {
    let img;
    try { img = await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { img = await loadImage(file); }
    let w = img.width, h = img.height;
    let scale = Math.min(1, MAXSIDE / Math.max(w, h));
    let blob = null, attempt = 0, q = 0.82;
    while (attempt < 8) {
      const cw = Math.round(w * scale), ch = Math.round(h * scale);
      const barH = Math.max(40, Math.round(cw * 0.06));
      const c = document.createElement('canvas'); c.width = cw; c.height = ch + barH;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, cw, ch);
      // stamp bar
      ctx.fillStyle = '#10243a'; ctx.fillRect(0, ch, cw, barH);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(0, ch, Math.round(barH * 0.18), barH);
      const fs = Math.round(barH * 0.36);
      ctx.fillStyle = '#fff'; ctx.font = `bold ${fs}px system-ui, sans-serif`; ctx.textBaseline = 'middle';
      const left = `${stamp.bh}  ·  Box ${stamp.box}  ·  ${stamp.from}–${stamp.to} ${stamp.u}`;
      ctx.fillText(left, barH * 0.4, ch + barH * 0.32, cw * 0.95);
      ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`; ctx.fillStyle = '#d6e2ee';
      const right = `${stamp.project ? stamp.project + '  ·  ' : ''}${stamp.date}${stamp.gps ? '  ·  ' + stamp.gps : ''}`;
      ctx.fillText(right, barH * 0.4, ch + barH * 0.72, cw * 0.95);
      // depth scale ticks along top edge is not reliable without calibration — skipped on purpose
      blob = await toBlob(c, q);
      if (blob.size <= TARGET) return { blob, w: c.width, h: c.height };
      if (q > 0.6) q -= 0.1; else scale *= 0.82;
      attempt++;
    }
    return { blob, w: 0, h: 0 };
  }

  function blobToDataURL(blob) {
    return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
  }
  async function dataURLToBlob(d) { return (await fetch(d)).blob(); }

  CL.Photo = { stampAndCompress, blobToDataURL, dataURLToBlob };
})();
