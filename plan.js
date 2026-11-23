/* ---------- Shared plan data (source-pixel coordinates from planta-tipo-unidad.png) ---------- */
(function(){
  const PX = 38.5, OX = 336, OY = 181;
  const X = p => (p - OX) / PX, Y = p => (p - OY) / PX;

  // Full-height walls of the unit. ext:true pieces also exist (mirrored) on the neighbouring unit.
  const WALLS = [
    {r:[336,181,348,440],ext:1},{r:[336,499,348,929],ext:1},{r:[362,433,369,505],ext:1},
    {r:[509,181,516,441],ext:1},{r:[509,498,516,929],ext:1},
    {r:[678,433,694,929]},
    {r:[336,181,368,193],ext:1,fac:1},{r:[419,181,447,193],ext:1,fac:1},{r:[498,181,516,193],ext:1,fac:1},
    {r:[336,245,368,256],ext:1},
    {r:[336,917,368,929],ext:1,fac:1},{r:[498,917,526,929],ext:1,fac:1},{r:[656,917,694,929],fac:1}, // Rev. 3: two wide sea openings per unit
    {r:[336,433,473,440]},{r:[466,409,473,433]},
    {r:[336,499,473,505]},{r:[466,477,473,499]},
    {r:[552,433,623,440],ext:1,fac:1},{r:[657,433,694,440],fac:1},
    {r:[552,433,559,505]},{r:[589,433,595,505]},{r:[621,440,625,499]},
    {r:[552,499,623,505]},{r:[657,499,694,505]},
    {r:[336,545,388,553]},{r:[415,545,451,553]},{r:[444,499,452,657]},
    {r:[336,649,393,657]},{r:[426,649,473,657]},
    {r:[657,853,678,861]}
  ];
  // Wall pieces above openings (from 2.40 m) and facade beams (from 2.75 m)
  const LINTELS = [
    [516,433,552,440],[473,433,509,440],[466,440,473,477],[473,499,509,505],[393,649,426,657],[625,499,657,505],[509,441,516,498]
  ];
  const BEAMS = [[336,181,516,193],[336,917,694,929]];
  // Pantry window to the courtyard: sill 0.90, head 2.40
  const WINDOWS = [[623,433,657,440]];
  // Floor-to-ceiling glazing and terrace glass railings
  const GLAZING = [[368,248,509,252],[348,856,509,860],[516,856,657,860]];
  const RAILS = [[368,185,419,189],[447,185,498,189],[368,921,498,925],[526,921,656,925]];
  // Rev. 3: open plaster stair in the courtyard up to the upper unit's door; the landing also shelters the ground-floor door
  const STAIR = {r:[556,200,594,395], landing:[516,395,594,433], risers:19};
  // Doors: hinge h, closed jamb c, open leaf end o
  const DOORS = [
    {n:'Acceso', h:[552,437], c:[516,437], o:[552,473], main:1},
    {n:'Recámara 2', h:[509,437], c:[473,437], o:[509,401]},
    {n:'Baño 2', h:[470,477], c:[470,440], o:[433,477]},
    {n:'Vestidor', h:[509,502], c:[473,502], o:[509,538]},
    {n:'Baño principal', h:[426,653], c:[393,653], o:[426,620]},
    {n:'Bodega', h:[657,502], c:[625,502], o:[657,470]}
  ];
  const ROOMS = [
    {id:'terr2', n:'Terraza', sub:'Recámara 2', r:[348,193,509,250], kind:'terr'},
    {id:'rec2', n:'Recámara 2', r:[348,252,509,433], kind:'priv'},
    {id:'bano2', n:'Baño 2', r:[369,440,466,499], kind:'serv', fs:.22},
    {id:'vest', n:'Vestíbulo', r:[473,440,552,499], kind:'day', fs:.22},
    {id:'lav', n:'Lav.', r:[559,440,589,499], kind:'serv', fs:.17, noTag:1},
    {id:'blan', n:'Blancos', r:[595,440,621,499], kind:'serv', fs:.15, noTag:1},
    {id:'bod', n:'Bod.', r:[625,440,657,499], kind:'serv', fs:.17, noTag:1},
    {id:'banoP', n:'Baño principal', r:[348,505,444,649], kind:'priv', fs:.22},
    {id:'vestidor', n:'Vestidor', r:[452,505,509,657], kind:'priv', fs:.2, vert:1},
    {id:'recP', n:'Recámara principal', r:[348,657,509,858], kind:'priv'},
    {id:'cocina', n:'Cocina · barra · comedor', r:[516,505,678,720], kind:'day'},
    {id:'estancia', n:'Estancia', r:[516,720,678,858], kind:'day'},
    {id:'terrP', n:'Terraza', sub:'Vista al mar', r:[348,860,509,917], kind:'terr'},
    {id:'terrE', n:'Terraza', sub:'Vista al mar', r:[516,860,678,917], kind:'terr'}
  ];
  const PATIO = [516,193,855,433];
  const FURN = [
    {t:'bed', r:[347,292,422,375]}, {t:'night', r:[347,270,363,288]}, {t:'night', r:[347,378,363,397]},
    {t:'closet', r:[347,410,466,433]},
    {t:'shower', r:[369,440,405,499], glass:[404,440,406,478]}, {t:'wc', r:[415,467,428,497], back:'s'}, {t:'vanity', r:[437,477,465,497], wall:'s', sinks:1},
    {t:'shower', r:[348,505,388,545], glass:[387,505,389,530]}, {t:'wc', r:[415,518,442,533], back:'n'},
    {t:'tub', r:[353,563,385,637]}, {t:'vanity', r:[427,555,443,640], wall:'e', sinks:2},
    {t:'closet', r:[452,505,472,649]},
    {t:'bed', r:[347,697,422,780]}, {t:'night', r:[347,675,363,693]}, {t:'night', r:[347,783,363,802]},
    {t:'armchair', r:[473,787,498,815]}, {t:'side', c:[485,830], rad:8},
    {t:'closet', r:[559,442,589,499]}, {t:'closet', r:[595,442,621,499]}, {t:'shelf', r:[657,440,678,499]},
    {t:'fridge', r:[657,507,678,533]}, {t:'counter', r:[657,533,678,720]}, {t:'media', r:[657,720,678,853]}, {t:'tv', r:[675,758,678,818]},
    {t:'island', r:[568,552,610,583]}, {t:'table', r:[568,583,610,678]},
    {t:'chair', r:[553,601,565,613], back:'w'}, {t:'chair', r:[553,626,565,638], back:'w'}, {t:'chair', r:[553,651,565,663], back:'w'},
    {t:'chair', r:[612,601,624,613], back:'e'}, {t:'chair', r:[612,626,624,638], back:'e'}, {t:'chair', r:[612,651,624,663], back:'e'},
    {t:'rug', r:[548,738,635,840]}, {t:'sofa', r:[520,757,548,840], back:'w'}, {t:'coffee', r:[565,783,590,837]},
    {t:'round', c:[561,740], rad:13}, {t:'round', c:[589,740], rad:13}, {t:'cube', r:[520,727,542,753]},
    {t:'plant', c:[367,212], rad:15}, {t:'plant', c:[453,207], rad:12}, {t:'plant', c:[488,217], rad:16},
    {t:'plant', c:[368,893], rad:18}, {t:'plant', c:[393,877], rad:11}, {t:'plant', c:[535,900], rad:12}, {t:'plant', c:[653,890], rad:18}
  ];
  const MIRROR = 1371; // x' = MIRROR - x  (neighbouring unit)
  window.PLAN = {PX, OX, OY, X, Y, WALLS, LINTELS, BEAMS, WINDOWS, GLAZING, RAILS, STAIR, DOORS, ROOMS, PATIO, FURN, MIRROR,
    area: r => ((r[2]-r[0])*(r[3]-r[1]))/(PX*PX),
    dims: r => [((r[2]-r[0])/PX), ((r[3]-r[1])/PX)],
    gross: (((516-336)*(929-181)) + ((694-516)*(929-433)))/(PX*PX)
  };
})();

/* ---------- Area schedule ---------- */
(function(){
  const P = window.PLAN, tb = document.querySelector('#areas tbody');
  const groups = [
    ['Zona privada', ['rec2','recP','banoP','vestidor']],
    ['Zona de día', ['vest','cocina','estancia']],
    ['Servicio', ['bano2','lav','blan','bod']],
    ['Terrazas cubiertas', ['terr2','terrP','terrE']]
  ];
  const label = {lav:'Lavandería', blan:'Clóset de blancos', bod:'Bodega / despensa', terr2:'Terraza recámara 2', terrP:'Terraza recámara principal', terrE:'Terraza estancia'};
  let interior = 0, terr = 0, html = '';
  for (const [g, ids] of groups){
    html += `<tr class="group"><td colspan="3">${g}</td></tr>`;
    for (const id of ids){
      const r = P.ROOMS.find(x => x.id === id), a = P.area(r.r), d = P.dims(r.r);
      if (r.kind === 'terr') terr += a; else interior += a;
      html += `<tr><td>${label[id] || r.n}</td><td class="n">${d[0].toFixed(2)} × ${d[1].toFixed(2)}</td><td class="n">${a.toFixed(2)}</td></tr>`;
    }
  }
  html += `<tr class="total"><td>Interiores netos</td><td></td><td class="n">${interior.toFixed(2)}</td></tr>`;
  html += `<tr><td>Terrazas netas</td><td></td><td class="n">${terr.toFixed(2)}</td></tr>`;
  html += `<tr class="total"><td>Huella bruta (muros + terrazas)</td><td></td><td class="n">≈ ${P.gross.toFixed(2)}</td></tr>`;
  html += `<tr><td>Declarado en lámina</td><td></td><td class="n">150.76</td></tr>`;
  tb.innerHTML = html;
})();

/* ---------- Blueprint (SVG, units = metres) ---------- */
(function(){
  const P = window.PLAN, {X, Y} = P, svg = document.getElementById('bp');
  const NS = 'http://www.w3.org/2000/svg';
  const INK = '#e9f1fc', FAINT = 'rgba(233,241,252,.55)', GLASS = '#9fd3ff', ROSE = '#f2c6bb';
  const VB = [-3.6, -3.4, 35.6, 26.2];
  svg.setAttribute('viewBox', VB.join(' '));
  const el = (tag, attrs, parent = svg) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  const R = r => ({x:X(r[0]), y:Y(r[1]), width:X(r[2])-X(r[0]), height:Y(r[3])-Y(r[1])});
  const txt = (s, x, y, o = {}, parent = svg) => { const t = el('text', {x, y, fill:o.fill || INK, 'font-size':o.fs || .3, 'font-family':o.ff || 'IBM Plex Sans Condensed, Arial Narrow, sans-serif', 'text-anchor':o.anchor || 'middle', 'letter-spacing':o.ls ?? .03, 'font-weight':o.fw || 400, ...(o.rot ? {transform:`rotate(${o.rot} ${x} ${y})`} : {})}, parent); t.textContent = s; return t; };

  // Sheet: grid + borders
  const defs = el('defs', {});
  const p1 = el('pattern', {id:'g1', width:1, height:1, patternUnits:'userSpaceOnUse'}, defs);
  el('path', {d:'M1 0H0V1', fill:'none', stroke:'rgba(233,241,252,.07)', 'stroke-width':.02}, p1);
  const p5 = el('pattern', {id:'g5', width:5, height:5, patternUnits:'userSpaceOnUse'}, defs);
  el('rect', {width:5, height:5, fill:'url(#g1)'}, p5);
  el('path', {d:'M5 0H0V5', fill:'none', stroke:'rgba(233,241,252,.14)', 'stroke-width':.03}, p5);
  el('rect', {x:VB[0], y:VB[1], width:VB[2], height:VB[3], fill:'#173f73'});
  el('rect', {x:VB[0], y:VB[1], width:VB[2], height:VB[3], fill:'url(#g5)'});
  el('rect', {x:-3.3, y:-3.1, width:35, height:25.6, fill:'none', stroke:INK, 'stroke-width':.06});
  el('rect', {x:-3.15, y:-2.95, width:34.7, height:25.3, fill:'none', stroke:FAINT, 'stroke-width':.02});

  // Neighbour (mirrored exterior walls) + courtyard
  const gN = el('g', {id:'bp-neighbour'});
  for (const w of P.WALLS.filter(w => w.ext)){
    const r = [P.MIRROR - w.r[2], w.r[1], P.MIRROR - w.r[0], w.r[3]];
    el('rect', {...R(r), fill:'none', stroke:FAINT, 'stroke-width':.025, 'stroke-dasharray':'.12 .08'}, gN);
  }
  txt('UNIDAD VECINA', X(945), Y(640), {fs:.42, fill:FAINT, ls:.12}, gN);
  txt('(EN ESPEJO)', X(945), Y(640)+.55, {fs:.3, fill:FAINT, ls:.1}, gN);

  const pr = R(P.PATIO);
  // courtyard palm, drawn as radiating fronds
  const pc = [X(640), Y(300)], palm = el('g', {}, svg);
  for (let i = 0; i < 14; i++){
    const a = i / 14 * Math.PI * 2 + .2, L = 2.1 + (i % 3) * .25;
    const ex = pc[0] + Math.cos(a) * L, ey = pc[1] + Math.sin(a) * L;
    const mx = pc[0] + Math.cos(a + .18) * L * .55, my = pc[1] + Math.sin(a + .18) * L * .55;
    el('path', {d:`M${pc[0]} ${pc[1]} Q${mx} ${my} ${ex} ${ey}`, fill:'none', stroke:'rgba(233,241,252,.35)', 'stroke-width':.03}, palm);
  }
  el('circle', {cx:pc[0], cy:pc[1], r:.18, fill:'none', stroke:FAINT, 'stroke-width':.03}, palm);
  txt('PATIO DE ACCESO', pr.x + pr.width/2 + 1.6, Y(395), {fs:.34, fill:FAINT, ls:.12});
  // stair to the upper floor: treads, landing and the walking line
  {
    const st = P.STAIR, b = R(st.r), n = st.risers - 1, run = b.height / n;
    el('rect', {...b, fill:'rgba(233,241,252,.06)', stroke:INK, 'stroke-width':.03});
    for (let i = 1; i < n; i++) el('line', {x1:b.x, y1:b.y + run * i, x2:b.x + b.width, y2:b.y + run * i, stroke:FAINT, 'stroke-width':.018});
    el('rect', {...R(st.landing), fill:'rgba(233,241,252,.06)', stroke:INK, 'stroke-width':.03});
    const mx = b.x + b.width / 2;
    el('line', {x1:mx, y1:b.y + .3, x2:mx, y2:b.y + b.height + .5, stroke:INK, 'stroke-width':.025});
    el('path', {d:`M${mx - .14} ${b.y + b.height + .28} L${mx} ${b.y + b.height + .5} L${mx + .14} ${b.y + b.height + .28}`, fill:'none', stroke:INK, 'stroke-width':.025});
    txt('SUBE', mx + .05, b.y + .1, {fs:.22, ls:.1, fill:FAINT});
  }

  // Floors: terrace decking hatch
  const gT = el('g', {});
  for (const rm of P.ROOMS.filter(r => r.kind === 'terr')){
    const b = R(rm.r);
    for (let x = b.x + .25; x < b.x + b.width; x += .25) el('line', {x1:x, y1:b.y, x2:x, y2:b.y + b.height, stroke:'rgba(233,241,252,.12)', 'stroke-width':.015}, gT);
  }

  // Furniture
  const gF = el('g', {id:'bp-furn', fill:'none', stroke:FAINT, 'stroke-width':.022});
  const rect = (r, extra = {}) => el('rect', {...R(r), fill:'none', ...extra}, gF);
  for (const f of P.FURN){
    if (f.r){
      const b = R(f.r);
      if (f.t === 'bed'){ rect(f.r); el('rect', {x:b.x+.08, y:b.y+.12, width:.5, height:b.height/2-.2, rx:.06}, gF); el('rect', {x:b.x+.08, y:b.y+b.height/2+.08, width:.5, height:b.height/2-.2, rx:.06}, gF); el('line', {x1:b.x+.75, y1:b.y, x2:b.x+.75, y2:b.y+b.height}, gF); el('line', {x1:b.x+1.25, y1:b.y, x2:b.x+1.25, y2:b.y+b.height, 'stroke-dasharray':'.06 .05'}, gF); }
      else if (f.t === 'closet' || f.t === 'shelf'){ rect(f.r); el('line', {x1:b.x, y1:b.y, x2:b.x+b.width, y2:b.y+b.height, 'stroke-dasharray':'.08 .06'}, gF); }
      else if (f.t === 'shower'){ rect(f.r); el('line', {x1:b.x, y1:b.y, x2:b.x+b.width, y2:b.y+b.height}, gF); el('line', {x1:b.x+b.width, y1:b.y, x2:b.x, y2:b.y+b.height}, gF); }
      else if (f.t === 'tub'){ el('rect', {...b, rx:.12}, gF); el('rect', {x:b.x+.08, y:b.y+.1, width:b.width-.16, height:b.height-.2, rx:.2}, gF); }
      else if (f.t === 'wc'){ rect(f.r); }
      else if (f.t === 'vanity'){ rect(f.r); const n = f.sinks; for (let i = 0; i < n; i++){ const cy = b.y + b.height*(i+.5)/n, cx = b.x + b.width/2; el('ellipse', {cx, cy, rx:Math.min(b.width,b.height/n)*.32, ry:Math.min(b.width,b.height/n)*.26}, gF); } }
      else if (f.t === 'counter'){ rect(f.r); el('rect', {x:b.x+.1, y:b.y+1.1, width:b.width-.2, height:.75, rx:.05}, gF); for (const dy of [3.0, 3.35]) for (const dx of [.17, .38]) el('circle', {cx:b.x+dx, cy:b.y+dy, r:.09}, gF); }
      else if (f.t === 'fridge'){ rect(f.r); el('line', {x1:b.x, y1:b.y, x2:b.x+b.width, y2:b.y+b.height}, gF); }
      else if (f.t === 'rug'){ rect(f.r, {'stroke-dasharray':'.1 .07'}); }
      else if (f.t === 'sofa'){ rect(f.r); el('line', {x1:b.x+.22, y1:b.y, x2:b.x+.22, y2:b.y+b.height}, gF); for (let i = 1; i < 3; i++) el('line', {x1:b.x+.22, y1:b.y+b.height*i/3, x2:b.x+b.width, y2:b.y+b.height*i/3}, gF); }
      else if (f.t === 'chair'){ rect(f.r); const bx = f.back === 'w' ? b.x+.06 : b.x+b.width-.06; el('line', {x1:bx, y1:b.y, x2:bx, y2:b.y+b.height}, gF); }
      else if (f.t === 'table' || f.t === 'island'){ rect(f.r, f.t === 'island' ? {'stroke-width':.035} : {}); }
      else rect(f.r);
    } else {
      const cx = X(f.c[0]), cy = Y(f.c[1]), rr = f.rad / P.PX;
      if (f.t === 'plant'){ el('circle', {cx, cy, r:rr, stroke:'rgba(190,230,200,.55)'}, gF); for (let i = 0; i < 7; i++){ const a = i/7*Math.PI*2; el('line', {x1:cx, y1:cy, x2:cx+Math.cos(a)*rr*.85, y2:cy+Math.sin(a)*rr*.85, stroke:'rgba(190,230,200,.45)'}, gF); } }
      else el('circle', {cx, cy, r:rr}, gF);
    }
  }

  // Glazing (double line + mid line), railings, windows
  for (const g of P.GLAZING){ const b = R(g); el('rect', {...b, fill:'rgba(159,211,255,.18)', stroke:GLASS, 'stroke-width':.02}); const my = b.y + b.height/2; el('line', {x1:b.x, y1:my, x2:b.x+b.width, y2:my, stroke:GLASS, 'stroke-width':.015}); }
  for (const g of P.RAILS){ const b = R(g); el('line', {x1:b.x, y1:b.y+b.height/2, x2:b.x+b.width, y2:b.y+b.height/2, stroke:GLASS, 'stroke-width':.03}); }
  for (const g of P.WINDOWS){ const b = R(g); el('rect', {...b, fill:'none', stroke:INK, 'stroke-width':.02}); el('line', {x1:b.x, y1:b.y+b.height/2, x2:b.x+b.width, y2:b.y+b.height/2, stroke:GLASS, 'stroke-width':.03}); }

  // Walls (solid) with a rose cut fill like the architect's sheet
  const gW = el('g', {});
  for (const w of P.WALLS) el('rect', {...R(w.r), fill:INK, stroke:INK, 'stroke-width':.01}, gW);

  // Doors: leaf + swing arc
  for (const d of P.DOORS){
    const h = [X(d.h[0]), Y(d.h[1])], c = [X(d.c[0]), Y(d.c[1])], o = [X(d.o[0]), Y(d.o[1])];
    const r = Math.hypot(c[0]-h[0], c[1]-h[1]);
    const cross = (o[0]-h[0])*(c[1]-h[1]) - (o[1]-h[1])*(c[0]-h[0]);
    el('line', {x1:h[0], y1:h[1], x2:o[0], y2:o[1], stroke:INK, 'stroke-width':d.main ? .06 : .04});
    el('path', {d:`M${o[0]} ${o[1]} A${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${c[0]} ${c[1]}`, fill:'none', stroke:FAINT, 'stroke-width':.02, 'stroke-dasharray':'.07 .05'});
  }
  // Entry marker
  txt('▲ ACCESO', X(534), Y(433) - .32, {fs:.24, fw:600, ls:.08, fill:ROSE});

  // Room labels: placed in open floor, each on a small ground-coloured plate so drawing lines never cut through them
  const LBL = {
    rec2:{lines:['RECÁMARA 2'], at:[466, 330], fs:.26},
    recP:{lines:['RECÁMARA', 'PRINCIPAL'], at:[466, 716], fs:.26},
    banoP:{lines:['BAÑO', 'PRINCIPAL'], at:[406, 588], fs:.19},
    bano2:{lines:['BAÑO 2'], at:[386, 462], fs:.18, noArea:1},
    vest:{lines:['VESTÍBULO'], at:[512, 478], fs:.2},
    cocina:{lines:['COCINA', 'BARRA · COMEDOR'], at:[597, 522], fs:.24},
    estancia:{lines:['ESTANCIA'], at:[612, 700], fs:.26}
  };
  const gL = el('g', {});
  for (const rm of P.ROOMS){
    const b = R(rm.r), a = P.area(rm.r);
    if (['lav','blan','bod'].includes(rm.id)){ txt(rm.n.toUpperCase(), b.x + b.width/2 + .06, b.y + b.height/2, {fs:.15, fw:600, ls:.03, rot:-90}, gL); continue; }
    if (rm.vert){ txt(rm.n.toUpperCase(), b.x + b.width/2 + .07, b.y + b.height/2, {fs:rm.fs, fw:600, ls:.06, rot:-90}, gL); continue; }
    const o = LBL[rm.id] || {lines:[rm.n.toUpperCase()], at:[(rm.r[0]+rm.r[2])/2, (rm.r[1]+rm.r[3])/2 - 4], fs:.24};
    const fs = o.fs, lx = X(o.at[0]), n = o.lines.length + (o.noArea ? 0 : 1);
    const h = n * fs * 1.2, w = Math.max(...o.lines.map(s => s.length)) * fs * .62 + .3;
    const top = Y(o.at[1]) - h/2;
    el('rect', {x:lx - w/2, y:top - .08, width:w, height:h + .12, fill:'#173f73', opacity:.88, rx:.04}, gL);
    o.lines.forEach((s, i) => txt(s, lx, top + fs * (i + 1) * 1.1, {fs, fw:600, ls:.05}, gL));
    if (!o.noArea) txt(`${a.toFixed(2)} m²`, lx, top + fs * (o.lines.length + 1) * 1.1, {fs:fs * .82, ff:'IBM Plex Mono, monospace', fill:FAINT, ls:0}, gL);
  }

  // Dimension chains
  const dim = (a, b, at, vertical, label, off = 0) => {
    const g = el('g', {stroke:FAINT, 'stroke-width':.018});
    if (!vertical){
      el('line', {x1:a, y1:at, x2:b, y2:at}, g);
      for (const x of [a, b]){ el('line', {x1:x, y1:at-.25, x2:x, y2:at+.25}, g); el('line', {x1:x-.12, y1:at+.12, x2:x+.12, y2:at-.12, stroke:INK, 'stroke-width':.035}, g); }
      txt(label, (a+b)/2, at - .14 + off, {fs:.27, ff:'IBM Plex Mono, monospace', ls:0});
    } else {
      el('line', {x1:at, y1:a, x2:at, y2:b}, g);
      for (const y of [a, b]){ el('line', {x1:at-.25, y1:y, x2:at+.25, y2:y}, g); el('line', {x1:at-.12, y1:y+.12, x2:at+.12, y2:y-.12, stroke:INK, 'stroke-width':.035}, g); }
      txt(label, at - .14, (a+b)/2, {fs:.27, ff:'IBM Plex Mono, monospace', ls:0, rot:-90});
    }
  };
  const fm = v => v.toFixed(2);
  // top: bay 1
  dim(X(336), X(516), -1.1, false, fm((516-336)/P.PX));
  dim(X(516), X(694), Y(433) - 1.05, false, fm((694-516)/P.PX));
  // bottom: bays + overall
  const yb = Y(929);
  dim(X(336), X(516), yb + .9, false, fm((516-336)/P.PX));
  dim(X(516), X(694), yb + .9, false, fm((694-516)/P.PX));
  dim(X(336), X(694), yb + 1.8, false, fm((694-336)/P.PX));
  // left chain
  const ys = [181, 250, 437, 502, 653, 858, 929];
  for (let i = 0; i < ys.length - 1; i++) dim(Y(ys[i]), Y(ys[i+1]), -1.1, true, fm((ys[i+1]-ys[i])/P.PX));
  dim(Y(181), Y(929), -2.1, true, fm((929-181)/P.PX));

  // Sea indicator
  const sy = yb + 2.75;
  txt('VISTA AL MAR', X(515), sy + .05, {fs:.3, fw:600, ls:.2, fill:GLASS});
  for (let k = 0; k < 2; k++){
    let d = `M${X(336)} ${sy + .35 + k*.22}`;
    for (let x = X(336); x < X(694); x += .5) d += ` q.125 -.1 .25 0 t.25 0`;
    el('path', {d, fill:'none', stroke:'rgba(159,211,255,.45)', 'stroke-width':.025});
  }

  // Title block
  const tx = 21.6, tw = 9.7;
  const tb = el('g', {});
  el('rect', {x:tx, y:-2.95, width:tw, height:25.3, fill:'rgba(10,30,60,.25)', stroke:INK, 'stroke-width':.03}, tb);
  const L = (s, y, o = {}) => txt(s, tx + .45, y, {anchor:'start', ...o}, tb);
  const hr = y => el('line', {x1:tx, y1:y, x2:tx+tw, y2:y, stroke:FAINT, 'stroke-width':.02}, tb);
  L('ELYSIAN', -1.4, {fs:1.05, ff:'Marcellus, Georgia, serif', ls:.32});
  L('PRIVATE ESTATES · MAYTO', -.55, {fs:.3, ls:.08, fill:FAINT});
  L('El privilegio de pertenecer.', .2, {fs:.34, ff:'Marcellus, Georgia, serif', ls:.01, fill:ROSE});
  hr(.85);
  const rows = [['PLANO', 'PLANTA TIPO · PB Y PA'], ['SUPERFICIE', '150.76 m² POR UNIDAD'], ['HUELLA BRUTA', `≈ ${P.gross.toFixed(2)} m²`], ['PROGRAMA', '2 REC. · 2 BAÑOS · 3 TERRAZAS'], ['NIVELES', '2 · 4 UNIDADES POR EDIFICIO'], ['LÁMINA', 'A-01'], ['REVISIÓN', 'REV. 3 · PRESENTACIÓN'], ['FECHA', '23.11.2026']];
  rows.forEach(([k, v], i) => { const y = 1.6 + i * 1.05; L(k, y, {fs:.22, ls:.05, fill:FAINT}); L(v, y + .4, {fs:.3, ff:'IBM Plex Mono, monospace', ls:0}); });
  hr(10.2);
  // Legend
  L('SIMBOLOGÍA', 10.95, {fs:.22, ls:.05, fill:FAINT});
  const lg = [[11.6, 'Muro', () => el('rect', {x:tx+.45, y:11.45, width:1.1, height:.2, fill:INK}, tb)],
    [12.35, 'Cancel de vidrio', () => { el('rect', {x:tx+.45, y:12.22, width:1.1, height:.12, fill:'rgba(159,211,255,.18)', stroke:GLASS, 'stroke-width':.02}, tb); }],
    [13.1, 'Barandal de vidrio', () => el('line', {x1:tx+.45, y1:13.03, x2:tx+1.55, y2:13.03, stroke:GLASS, 'stroke-width':.03}, tb)],
    [13.85, 'Puerta abatible', () => { el('line', {x1:tx+.45, y1:13.95, x2:tx+.45, y2:13.45, stroke:INK, 'stroke-width':.04}, tb); el('path', {d:`M${tx+.45} ${13.45} A.5 .5 0 0 1 ${tx+.95} ${13.95}`, fill:'none', stroke:FAINT, 'stroke-width':.02, 'stroke-dasharray':'.07 .05'}, tb); }],
    [14.6, 'Unidad vecina (referencia)', () => el('rect', {x:tx+.45, y:14.45, width:1.1, height:.2, fill:'none', stroke:FAINT, 'stroke-width':.025, 'stroke-dasharray':'.12 .08'}, tb)]];
  for (const [y, s, draw] of lg){ draw(); txt(s, tx + 1.85, y + .05, {anchor:'start', fs:.26}, tb); }
  hr(15.4);
  // Graphic scale
  L('ESCALA GRÁFICA (m)', 16.15, {fs:.22, ls:.05, fill:FAINT});
  const sx = tx + .45, sy2 = 16.75;
  for (let i = 0; i < 5; i++) el('rect', {x:sx + i, y:sy2, width:1, height:.18, fill:i % 2 ? 'none' : INK, stroke:INK, 'stroke-width':.02}, tb);
  [0, 1, 2, 5].forEach(v => txt(String(v), sx + v, sy2 + .55, {fs:.24, ff:'IBM Plex Mono, monospace', ls:0}, tb));
  txt('1 m ≈ 38.5 px del original', sx, sy2 + 1.15, {anchor:'start', fs:.22, fill:FAINT, ls:0}, tb);
  hr(18.6);
  L('NOTAS', 19.35, {fs:.22, ls:.05, fill:FAINT});
  ['Cotas en metros, a paño de muro.', 'Escala deducida de la superficie', 'declarada. Verificar con cotas', 'del arquitecto antes de obra.'].forEach((s, i) => L(s, 19.95 + i * .45, {fs:.25, fill:INK}));

  // Toggles
  const furnBox = document.getElementById('bp-furn'), neighBox = document.getElementById('bp-neigh');
  furnBox.addEventListener('change', () => { gF.style.display = furnBox.checked ? '' : 'none'; });
  neighBox.addEventListener('change', () => { gN.style.display = neighBox.checked ? '' : 'none'; });
})();
