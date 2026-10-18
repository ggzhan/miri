// Stick-figure model of "Miri" (from img/sketches/jump.svg) and the scenes drawn with it.
// Run: node tools/sketches.mjs  → writes img/sketches/<scene>.svg
//
// Style rules taken from the original drawings:
//   Miri   — round head, bun on top, two hair strands over the crown, closed "happy" dash eyes
//            (front view) or a dot eye (side view), wide smile, outlined shirt, wide outlined
//            trousers, single-line arms ending in filled oval "mitten" hands.
//   others — round head with 3–4 spiky hair tufts, outlined narrow torso, single-line limbs.
//   every line is drawn with a slight hand wobble, round caps, one stroke weight.
import { writeFileSync } from 'node:fs';

/* ---------------- drawing primitives ---------------- */
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const J = (a = 1) => (rnd() - 0.5) * 2 * a;
const f = n => Math.round(n * 10) / 10;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];

// smooth path through points (Catmull-Rom → cubic Bézier)
function spline(pts, closed = false) {
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}
// long straight runs get extra points so they wobble like a hand-drawn line
function resample(pts, step = 22) {
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, b] = [pts[i], pts[i + 1]], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let k = 1; k <= n; k++) out.push(lerp(a, b, k / n));
  }
  return out;
}

class Sketch {
  constructor(w, h, sw = 5) { this.w = w; this.h = h; this.sw = sw; this.parts = []; }
  // a stroked line through points; `wob` = hand wobble in px
  line(pts, { wob = 1, w = 1, straight = false, fill } = {}) {
    const p = (straight ? resample(pts) : pts).map((q, i, a) => (i === 0 || i === a.length - 1) ? add(q, [J(wob * .4), J(wob * .4)]) : add(q, [J(wob), J(wob)]));
    this.parts.push(`<path d="${spline(p)}"${fill ? ` fill="${fill}"` : ''}${w !== 1 ? ` stroke-width="${f(this.sw * w)}"` : ''}/>`);
    return this;
  }
  // wobbly closed outline (circle/ellipse); fill=true for dots and mitten hands
  ellipse(c, rx, ry = rx, { rot = 0, fill = false, wob = .035, w = 1 } = {}) {
    const n = 14, pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, k = 1 + J(wob);
      const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k;
      pts.push([c[0] + x * Math.cos(rot) - y * Math.sin(rot), c[1] + x * Math.sin(rot) + y * Math.cos(rot)]);
    }
    this.parts.push(`<path d="${spline(pts, true)}"${fill ? ' fill="currentColor"' : ''}${w !== 1 ? ` stroke-width="${f(this.sw * w)}"` : ''}/>`);
    return this;
  }
  // outlined tube along a centerline (sleeves, trousers): two offset edges + optional hem
  tube(center, w0, w1 = w0, { hem = true } = {}) {
    const n = center.length, L = [], R = [];
    for (let i = 0; i < n; i++) {
      const a = center[Math.max(0, i - 1)], b = center[Math.min(n - 1, i + 1)];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
      const w = w0 + (w1 - w0) * (i / (n - 1));
      L.push([center[i][0] + nx * w, center[i][1] + ny * w]); R.push([center[i][0] - nx * w, center[i][1] - ny * w]);
    }
    this.line(L, { straight: true }).line(R, { straight: true });
    if (hem) this.line([L[n - 1], R[n - 1]]);
    return this;
  }
  group(transform, draw) { this.parts.push(`<g transform="${transform}">`); draw(); this.parts.push('</g>'); return this; }
  svg(title) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" role="img"><title>${title}</title>` +
      `<g fill="none" stroke="currentColor" stroke-width="${this.sw}" stroke-linecap="round" stroke-linejoin="round">${this.parts.join('')}</g></svg>\n`;
  }
}

/* ---------------- characters ---------------- */
// Miri. face: 'front' | 'left' | 'right'. Joints are absolute coordinates.
function miri(s, o) {
  const { head: h, r = 30, face = 'front', mouth = 'smile' } = o;
  const dir = face === 'right' ? 1 : face === 'left' ? -1 : 0;
  // head + bun (on top; shifted to the back of the head in side view)
  s.ellipse(h, r, r * 1.04);
  const bun = dir ? [h[0] - dir * r * .38, h[1] - r * 1.22] : [h[0] + r * .2, h[1] - r * 1.25];
  s.ellipse(bun, r * .3, r * .38, { rot: dir ? -dir * .5 : .25 });
  s.line([add(bun, [-r * .08, -r * .2]), add(bun, [r * .06, r * .1])], { w: .7 });
  // two hair strands over the crown
  if (dir) {
    const top = [h[0] - dir * r * .3, h[1] - r * .95];
    s.line([top, [h[0] + dir * r * .25, h[1] - r * .82], [h[0] + dir * r * .7, h[1] - r * .52]], { w: .75, wob: .4 });
    s.line([top, [h[0] - dir * r * .62, h[1] - r * .7], [h[0] - dir * r * .86, h[1] - r * .38]], { w: .75, wob: .4 });
  } else {
    const top = [h[0] + r * .05, h[1] - r * .98];
    s.line([top, [h[0] - r * .45, h[1] - r * .72], [h[0] - r * .82, h[1] - r * .42]], { w: .75, wob: .5 });
    s.line([top, [h[0] + r * .45, h[1] - r * .74], [h[0] + r * .8, h[1] - r * .45]], { w: .75, wob: .5 });
  }
  if (!dir) {
    s.line([[h[0] - r * .5, h[1] - r * .08], [h[0] - r * .22, h[1] - r * .1]], { w: .8, wob: .4 });
    s.line([[h[0] + r * .22, h[1] - r * .1], [h[0] + r * .5, h[1] - r * .08]], { w: .8, wob: .4 });
    if (mouth === 'smile') s.line([[h[0] - r * .45, h[1] + r * .22], [h[0], h[1] + r * .6], [h[0] + r * .45, h[1] + r * .22]], { wob: .5 });
    else s.ellipse([h[0], h[1] + r * .4], r * .16, r * .12, { w: .8 });
  } else {
    s.ellipse([h[0] + dir * r * .4, h[1] - r * .12], r * .09, r * .1, { fill: true, w: .6 });
    if (mouth === 'smile') s.line([[h[0] + dir * r * .05, h[1] + r * .3], [h[0] + dir * r * .38, h[1] + r * .56], [h[0] + dir * r * .72, h[1] + r * .28]], { wob: .5 });
    else s.ellipse([h[0] + dir * r * .5, h[1] + r * .38], r * .14, r * .11, { w: .8 });
  }
  // neck, shirt (shoulder line, two sides, waist)
  const neckTop = [h[0] - dir * r * .1, h[1] + r * 1.02];
  s.line([neckTop, o.neck]);
  const [shL, shR] = o.sh, [hipL, hipR] = o.hip;
  s.line([shL, lerp(shL, o.neck, .5), o.neck, lerp(o.neck, shR, .5), shR]);
  s.line([shL, lerp(shL, hipL, .5).map((v, i) => v + (i ? 0 : -2)), hipL]);
  s.line([shR, lerp(shR, hipR, .5).map((v, i) => v + (i ? 0 : 2)), hipR]);
  s.line([hipL, hipR], { straight: true });
  for (const a of o.arms || []) miriArm(s, a, r);
  // wide trousers + feet
  for (const leg of o.legs || []) {
    s.tube(leg.c, leg.w0 ?? r * .36, leg.w1 ?? r * .46);
    if (leg.foot) s.line(leg.foot, { w: 1.5 });
  }
}

// one of Miri's arms: a single line ending in a filled oval "mitten" hand
function miriArm(s, arm, r = 30) {
  s.line(arm);
  const [a, b] = arm.slice(-2), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  s.ellipse(add(b, [Math.cos(ang) * r * .14, Math.sin(ang) * r * .14]), r * .26, r * .18, { rot: ang, fill: true, w: .6 });
}

// everyone else: spiky hair, narrow outlined torso, single-line limbs
function person(s, o) {
  const { head: h, r = 28, face = 'front', mouth = 'smile', eyes = 'open' } = o;
  const dir = face === 'right' ? 1 : face === 'left' ? -1 : 0;
  s.ellipse(h, r, r * 1.03);
  const tufts = dir ? [-.55, -.2, .15] : [-.45, -.12, .2, .5];
  for (const t of tufts) {
    const a = -Math.PI / 2 + (t - dir * .25) * 1.3;
    const p0 = [h[0] + Math.cos(a) * r, h[1] + Math.sin(a) * r];
    s.line([p0, [h[0] + Math.cos(a) * r * 1.42, h[1] + Math.sin(a) * r * 1.42]], { w: .85, wob: .6 });
  }
  const ex = dir ? [dir * .38] : [-.32, .32];
  for (const x of ex) {
    if (eyes === 'closed') s.line([[h[0] + (x - .13) * r, h[1] - r * .08], [h[0] + x * r, h[1] - r * .02], [h[0] + (x + .13) * r, h[1] - r * .08]], { w: .7, wob: .3 });
    else s.ellipse([h[0] + x * r, h[1] - r * .1], r * .09, r * .1, { fill: true, w: .6 });
  }
  const mx = dir ? dir * .32 : 0;
  if (mouth === 'smile') s.line([[h[0] + (mx - .3) * r, h[1] + r * .3], [h[0] + mx * r, h[1] + r * .52], [h[0] + (mx + .3) * r, h[1] + r * .3]], { w: .85, wob: .4 });
  else if (mouth === 'flat') s.line([[h[0] + (mx - .22) * r, h[1] + r * .42], [h[0] + (mx + .22) * r, h[1] + r * .4]], { w: .85, wob: .3 });
  s.line([[h[0] - dir * r * .1, h[1] + r * 1.02], o.neck]);
  const [shL, shR] = o.sh, [hipL, hipR] = o.hip;
  s.line([shL, o.neck, shR]);
  s.line([shL, hipL]).line([shR, hipR]).line([hipL, hipR], { straight: true });
  for (const arm of o.arms || []) s.line(arm);
  for (const leg of o.legs || []) s.line(leg);
}

/* ---------------- props ---------------- */
// chair seen from the side; dir = the way the sitter faces
function chair(s, x, seatY, floorY, dir) {
  const back = x - dir * 36, front = x + dir * 34;
  s.line([[back, seatY], [front, seatY]], { straight: true });
  s.line([[back - dir * 2, seatY - 98], [back, seatY], [back + dir * 1, floorY]], { straight: true });
  s.line([[front, seatY + 2], [front + dir * 2, floorY]], { straight: true });
  s.line([[back, seatY + 12], [front, seatY + 12]], { straight: true, w: .8 });
}
// potted snake plant, like the one in the massage drawing
function plant(s, x, floorY, hgt = 80) {
  s.line([[x - 15, floorY - 26], [x + 15, floorY - 26], [x + 12, floorY], [x - 12, floorY], [x - 15, floorY - 26]], { straight: true });
  const leaves = [[-9, .72, -.18], [-3, 1, -.05], [4, .88, .12], [9, .6, .26]];
  for (const [dx, k, lean] of leaves) {
    const b = [x + dx, floorY - 26], t = [x + dx + lean * hgt, floorY - 26 - hgt * k];
    s.line([b, lerp(b, t, .5).map((v, i) => v + (i ? 0 : -lean * 14)), t], { w: .8, wob: .5 });
  }
}
function floor(s, x0, x1, y) { s.line([[x0, y], [x1, y]], { straight: true }); }
function heart(s, c, k = 1) {
  s.line([[c[0], c[1] + 10 * k], [c[0] - 12 * k, c[1] - 2 * k], [c[0] - 9 * k, c[1] - 11 * k], [c[0] - 2 * k, c[1] - 9 * k], [c[0], c[1] - 4 * k],
    [c[0] + 2 * k, c[1] - 9 * k], [c[0] + 9 * k, c[1] - 11 * k], [c[0] + 12 * k, c[1] - 2 * k], [c[0], c[1] + 10 * k]], { w: .8, wob: .4 });
}
function bubble(s, c, rx, ry, tailTo) {
  s.ellipse(c, rx, ry, { wob: .02, w: .8 });
  const t1 = lerp(c, tailTo, .55), t2 = lerp(c, tailTo, .8);
  s.ellipse(t1, 5, 4.5, { w: .7 }).ellipse(t2, 3, 3, { w: .7 });
}

// massage table, long side towards the viewer
function table(s, x0, x1, top, floorY, { drape = 0 } = {}) {
  const low = top + 14 + drape;
  for (const x of [x0 + 26, x1 - 26]) s.line([[x, low], [x + J(2), floorY]], { straight: true });
  if (drape) s.line([[x0 - 4, top + 14], [x1 + 4, top + 14], [x1 + 8, low], [x0 - 8, low], [x0 - 4, top + 14]], { straight: true, fill: '#fff' });
  s.line([[x0, top], [x1, top], [x1 + 4, top + 14], [x0 - 4, top + 14], [x0, top]], { straight: true, fill: '#fff' });
}
function stool(s, x, seatY, floorY) {
  s.line([[x - 28, seatY], [x + 28, seatY]], { straight: true });
  s.line([[x - 20, seatY], [x - 26, floorY]], { straight: true }).line([[x + 20, seatY], [x + 26, floorY]], { straight: true });
  s.line([[x - 22, seatY + 34], [x + 22, seatY + 34]], { straight: true, w: .8 });
}
// client lying face down, head to the left and turned to the viewer: no hair, one closed eye,
// a sideways smile towards the body — copied from the original massage drawing
function lying(s, headX, top) {
  const r = 24, hy = top - r * .96 - 3, h = [headX, hy];
  s.ellipse(h, r * 1.04, r * .96);
  // features copied from the original (mirrored, since the head is on the left): the eye is a short
  // stroke that hooks down at its end, the mouth a tall arc in the lower face on the body side
  s.line([[h[0] - r * .14, h[1] + r * .06], [h[0] - r * .34, h[1] + r * .02], [h[0] - r * .5, h[1] + r * .12], [h[0] - r * .56, h[1] + r * .26]], { w: .85, wob: .2 });
  s.line([[h[0] + r * .3, h[1] - r * .04], [h[0] + r * .43, h[1] + r * .34], [h[0] + r * .32, h[1] + r * .64], [h[0] + r * .1, h[1] + r * .76]], { w: 1, wob: .2 });
  const sx = headX + r + 12, hx = sx + 96, b = top - 3;
  s.line([[headX + r * .9, hy + 8], [sx, b - 16]]);                                                       // neck
  s.line([[sx, b], [sx - 2, b - 30], [hx, b - 28], [hx + 2, b], [sx, b]], { fill: '#fff' });              // back (opaque)
  s.line([[sx + 6, b - 16], [sx + 50, b - 13], [sx + 92, b - 12]], { w: .9 });                             // arm along the body
  s.line([[hx, b - 10], [hx + 108, b - 10]], { straight: true });                                           // legs
  s.line([[hx, b - 22], [hx + 104, b - 21]], { straight: true });
  // face down: the ankles stretch, so the feet point down to the table (toes on the table, soles to the back)
  s.line([[hx + 108, b - 10], [hx + 121, b + 1]], { w: 1.3 }).line([[hx + 104, b - 21], [hx + 118, b - 10]], { w: 1.3 });
}
// small energy marks: three short arcs fanning out from a point
function sparkle(s, c, k = 1, a0 = -2.4, a1 = -.7) {
  for (let i = 0; i < 3; i++) {
    const a = a0 + (a1 - a0) * (i / 2), p0 = [c[0] + Math.cos(a) * 14 * k, c[1] + Math.sin(a) * 14 * k];
    s.line([p0, [c[0] + Math.cos(a) * 26 * k, c[1] + Math.sin(a) * 26 * k]], { w: .75, wob: .4 });
  }
}
function waves(s, x0, x1, y, amp = 7, n = 4) {
  const pts = []; for (let i = 0; i <= n * 4; i++) pts.push([x0 + (x1 - x0) * i / (n * 4), y + Math.sin(i * Math.PI / 2) * amp]);
  s.line(pts, { w: .8, wob: .6 });
}
// Miri standing, front view: returns the joints so a scene only has to pose the arms
function miriStanding(s, cx, footY, arms, { mouth = 'smile', legs } = {}) {
  const r = 30, hy = footY - 262, ny = hy + r + 16;
  const sh = [[cx - 27, ny + 6], [cx + 27, ny + 6]];
  miri(s, {
    head: [cx, hy], r, face: 'front', mouth, neck: [cx, ny], sh, hip: [[cx - 28, ny + 92], [cx + 28, ny + 92]],
    arms: arms(sh, [cx, hy]),
    legs: legs || [
      { c: [[cx - 14, ny + 92], [cx - 18, ny + 150], [cx - 24, footY - 8]], w0: 13, w1: 18, foot: [[cx - 30, footY - 2], [cx - 50, footY]] },
      { c: [[cx + 14, ny + 92], [cx + 18, ny + 150], [cx + 24, footY - 8]], w0: 13, w1: 18, foot: [[cx + 30, footY - 2], [cx + 50, footY]] },
    ],
  });
  return { sh, head: [cx, hy], ny };
}

/* ---------------- scenes ---------------- */
const scenes = {
  // Polarity: begleitendes Gespräch — Miri and a client sitting face to face
  gespraech() {
    const s = new Sketch(640, 400), F = 378;
    floor(s, 40, 600, F);
    plant(s, 322, F - 2, 70);
    // client, left, facing right
    chair(s, 196, 300, F, 1);
    person(s, {
      head: [194, 160], face: 'right', mouth: 'smile', neck: [192, 206],
      sh: [[176, 214], [206, 214]], hip: [[178, 294], [208, 294]],
      arms: [[[204, 222], [214, 262], [240, 284]], [[182, 222], [192, 264], [226, 288]]],
      legs: [[[194, 294], [262, 292], [268, 376], [290, 376]]],
    });
    // Miri, right, facing left, open hand towards the client
    chair(s, 446, 300, F, -1);
    miri(s, {
      head: [450, 156], face: 'left', neck: [452, 204],
      sh: [[434, 212], [468, 212]], hip: [[436, 294], [470, 294]],
      arms: [[[438, 218], [418, 258], [390, 242]], [[464, 220], [466, 262], [430, 284]]],
      legs: [{ c: [[456, 284], [382, 286], [378, 368]], w0: 12, w1: 15, foot: [[378, 377], [356, 377]] }],
    });
    bubble(s, [322, 92], 34, 26, [410, 132]);
    heart(s, [322, 94], 1.1);
    return s.svg('Miri im begleitenden Gespräch mit einer Klientin, beide sitzen auf Stühlen');
  },

  // Ganzheitliche Massage / Reflexzonen: Miri sits at the foot end and holds the feet
  fuesse() {
    const s = new Sketch(640, 400), F = 378, top = 262;
    floor(s, 30, 610, F);
    plant(s, 52, F - 2, 66);
    table(s, 96, 420, top, F);
    lying(s, 128, top);
    stool(s, 500, 300, F);
    miri(s, {
      head: [496, 150], face: 'left', neck: [494, 198],
      sh: [[478, 206], [510, 206]], hip: [[480, 292], [514, 292]],
      arms: [[[482, 214], [440, 240], [392, 232]], [[504, 214], [460, 258], [394, 252]]],
      legs: [{ c: [[500, 284], [436, 288], [432, 368]], w0: 12, w1: 15, foot: [[430, 377], [408, 377]] }],
    });
    sparkle(s, [378, 204], .9, -2.4, -.9);
    return s.svg('Miri massiert die Füsse einer liegenden Person (Reflexzonen)');
  },

  // Hawaiianische Ganzkörpermassage (Lomi Lomi): Miri leans in from behind the table, elbow on the back
  hawaii() {
    const s = new Sketch(640, 400), F = 378, top = 262;
    floor(s, 30, 610, F);
    // Miri first — the drape, the table and the client in front of her hide her lower body
    miri(s, {
      head: [192, 136], face: 'left', neck: [206, 180],
      sh: [[188, 190], [222, 194]], hip: [[240, 258], [274, 256]],
      arms: [[[218, 200], [262, 222], [302, 236]]],
      legs: [
        { c: [[248, 254], [244, 320], [240, 368]], w0: 12, w1: 16, foot: [[236, 377], [214, 377]] },
        { c: [[264, 252], [270, 320], [276, 368]], w0: 12, w1: 16, foot: [[278, 377], [256, 377]] },
      ],
    });
    table(s, 70, 420, top, F, { drape: 52 });
    lying(s, 110, top);
    miriArm(s, [[190, 196], [168, 214], [156, 226], [166, 196], [174, 176]]);   // elbow pressing into the back, forearm up
    s.line([[140, 222], [134, 214]], { w: .7 }).line([[146, 216], [142, 207]], { w: .7 });       // pressure marks at the elbow
    waves(s, 300, 420, 168, 6, 3);
    waves(s, 320, 440, 194, 5, 3);
    plant(s, 590, F - 2, 70);
    return s.svg('Miri gibt eine hawaiianische Ganzkörpermassage (Lomi Lomi) und massiert mit dem Ellbogen den Rücken');
  },

  // Yoga: Miri in the tree pose
  yoga() {
    const s = new Sketch(360, 420), F = 392, cx = 180;
    s.line([[70, F], [290, F]], { straight: true }).line([[76, F - 10], [284, F - 10]], { straight: true, w: .8 });
    const r = 30, hy = F - 10 - 262, ny = hy + r + 16;
    miri(s, {
      head: [cx, hy], r, face: 'front', neck: [cx, ny], sh: [[cx - 27, ny + 6], [cx + 27, ny + 6]], hip: [[cx - 28, ny + 92], [cx + 28, ny + 92]],
      arms: [[[cx - 26, ny + 8], [cx - 34, hy - 30], [cx - 6, hy - 78]], [[cx + 26, ny + 8], [cx + 34, hy - 30], [cx + 6, hy - 78]]],
      legs: [
        { c: [[cx - 12, ny + 92], [cx - 12, ny + 160], [cx - 10, F - 18]], w0: 13, w1: 16, foot: [[cx - 14, F - 12], [cx - 36, F - 12]] },
        { c: [[cx + 16, ny + 92], [cx + 62, ny + 128], [cx + 6, ny + 160]], w0: 13, w1: 13, hem: false },
      ],
    });
    sparkle(s, [cx, hy - 86], 1, -2.6, -.5);
    return s.svg('Miri macht Yoga in der Baumhaltung');
  },

  // Gutschein: Miri holds a wrapped present
  gutschein() {
    const s = new Sketch(360, 420), F = 400, cx = 180;
    const box = [[136, 236], [224, 236], [224, 304], [136, 304]];
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 46, 240], [140, 262]], [sh[1], [cx + 46, 240], [220, 262]]]);
    s.line([...box, box[0]], { straight: true, fill: '#fff' });
    s.line([[132, 236], [228, 236], [228, 252], [132, 252], [132, 236]], { straight: true, fill: '#fff' });
    s.line([[180, 236], [180, 304]], { straight: true, w: .9 });
    for (const [x, rot] of [[134, 1.9], [226, 1.25]]) s.ellipse([x, 268], 8, 5.5, { rot, fill: true, w: .6 }); // hands on the box
    s.line([[180, 236], [156, 214], [150, 228], [180, 236]], { w: .8 }).line([[180, 236], [204, 214], [210, 228], [180, 236]], { w: .8 });
    heart(s, [276, 120], 1.1);
    return s.svg('Miri hält ein Geschenk – einen Gutschein für eine Massage');
  },

  // Termin: Miri points at a calendar page
  termin() {
    const s = new Sketch(460, 420), F = 400;
    miriStanding(s, 140, F, sh => [[sh[0], [104, 222], [88, 262]], [sh[1], [210, 170], [262, 150]]]);
    const [x0, y0, x1, y1] = [290, 110, 420, 250];
    s.line([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], { straight: true });
    s.line([[x0, y0 + 28], [x1, y0 + 28]], { straight: true });
    for (const x of [318, 392]) s.line([[x, y0 - 12], [x, y0 + 10]], { w: 1.1 });
    for (let i = 1; i < 4; i++) s.line([[x0 + (x1 - x0) * i / 4, y0 + 40], [x0 + (x1 - x0) * i / 4, y1 - 10]], { straight: true, w: .5, wob: .5 });
    for (let j = 1; j < 3; j++) s.line([[x0 + 8, y0 + 28 + (y1 - y0 - 28) * j / 3], [x1 - 8, y0 + 28 + (y1 - y0 - 28) * j / 3]], { straight: true, w: .5, wob: .5 });
    s.line([[356, 176], [366, 188], [384, 160]], { w: 1.1 });
    return s.svg('Miri zeigt auf einen Kalender mit einem eingetragenen Termin');
  },

  // Miri waves goodbye ("Bis bald!"), the other hand on her heart
  winken() {
    const s = new Sketch(320, 420), F = 400, cx = 150;
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 66, 152], [cx - 74, 96]], [sh[1], [cx + 34, 214], [cx + 8, 196]]]);
    for (const [a, b] of [[[cx - 104, 100], [cx - 118, 94]], [[cx - 102, 76], [cx - 116, 64]], [[cx - 86, 56], [cx - 90, 40]]]) s.line([a, b], { w: .8 });
    heart(s, [cx + 64, 150], .9);
    return s.svg('Miri winkt zum Abschied, eine Hand auf dem Herzen');
  },

  // Start page: your first visit — a client comes through the door, Miri welcomes them, the table waits
  besuch() {
    const s = new Sketch(640, 400), F = 378;
    floor(s, 20, 620, F);
    // open door on the left: frame, the leaf swung towards us, a handle
    s.line([[40, F], [40, 96], [138, 96], [138, F]], { straight: true });
    s.line([[40, 96], [14, 78], [14, F + 10], [40, F]], { straight: true, fill: '#fff' });
    s.ellipse([22, 240], 3.5, 4.5, { fill: true, w: .6 });
    table(s, 486, 610, 262, F);
    // client stepping in, waving
    person(s, {
      head: [196, 152], face: 'right', mouth: 'smile', neck: [194, 198],
      sh: [[180, 206], [210, 206]], hip: [[182, 290], [210, 290]],
      arms: [[[208, 212], [232, 182], [240, 146]], [[184, 214], [176, 254], [184, 288]]],
      legs: [[[188, 290], [174, 334], [164, 374], [184, 376]], [[202, 290], [220, 332], [232, 372], [252, 376]]],
    });
    for (const [a, b] of [[[250, 150], [262, 144]], [[248, 128], [258, 116]]]) s.line([a, b], { w: .8 });
    // Miri, open arms
    const cx = 392;
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 58, 196], [cx - 92, 176]], [sh[1], [cx + 58, 196], [cx + 92, 176]]]);
    bubble(s, [304, 70], 34, 26, [366, 104]);
    heart(s, [304, 72], 1.1);
    plant(s, 466, F - 2, 64);
    return s.svg('Dein erster Besuch: Miri begrüsst eine Klientin an der Tür ihrer Praxis, die Massageliege steht bereit');
  },

  // Angebot: Miri next to the table, oil bottle in one hand, the other inviting you onto the table
  angebot() {
    const s = new Sketch(640, 400), F = 378;
    floor(s, 30, 610, F);
    table(s, 250, 560, 262, F);
    // folded towels and a small bowl on the table
    s.line([[452, 262], [452, 240], [538, 240], [538, 262]], { straight: true, fill: '#fff' });
    s.line([[458, 240], [458, 222], [532, 222], [532, 240]], { straight: true, fill: '#fff' });
    s.line([[300, 262], [304, 248], [340, 248], [344, 262]], { w: .9 });
    const cx = 160;
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 46, 220], [cx - 52, 182]], [sh[1], [cx + 58, 214], [cx + 108, 222]]]);
    // oil bottle in the raised left hand
    s.line([[cx - 66, 176], [cx - 66, 128], [cx - 38, 128], [cx - 38, 176], [cx - 66, 176]], { straight: true, fill: '#fff' });
    s.line([[cx - 58, 128], [cx - 58, 112], [cx - 46, 112], [cx - 46, 128]], { w: .9 });
    s.ellipse([cx - 52, 174], 9, 6, { fill: true, w: .6 });
    for (const [x, y] of [[cx - 52, 96], [cx - 40, 88]]) s.ellipse([x, y], 3.5, 4.5, { w: .7 });
    sparkle(s, [262, 236], .8, -2.6, -1.2);
    plant(s, 596, F - 2, 64);
    return s.svg('Miri steht neben der Massageliege, hält eine Flasche Massageöl und lädt dich ein, dich hinzulegen');
  },

  // Polarity: the client sits on a stool, Miri stands behind and rests her hands on the head
  polarity() {
    const s = new Sketch(480, 420), F = 400;
    floor(s, 40, 440, F);
    stool(s, 200, 300, F);
    person(s, {
      head: [200, 172], face: 'front', mouth: 'smile', eyes: 'closed', neck: [200, 218],
      sh: [[180, 226], [220, 226]], hip: [[184, 296], [216, 296]],
      arms: [[[182, 234], [176, 270], [190, 294]], [[218, 234], [224, 270], [210, 294]]],
      legs: [[[190, 300], [176, 350], [174, 396], [158, 398]], [[210, 300], [224, 350], [226, 396], [242, 398]]],
    });
    // Miri behind, a little to the right, both mitten hands on the client's head
    miri(s, {
      head: [286, 100], face: 'left', mouth: 'smile', neck: [288, 146],
      sh: [[270, 154], [304, 154]], hip: [[272, 246], [306, 246]],
      arms: [[[274, 162], [246, 150], [212, 136]], [[300, 164], [262, 188], [230, 164]]],
      legs: [
        { c: [[280, 244], [276, 320], [272, 388]], w0: 12, w1: 16, foot: [[268, 397], [246, 397]] },
        { c: [[298, 244], [304, 320], [308, 388]], w0: 12, w1: 16, foot: [[306, 397], [284, 397]] },
      ],
    });
    sparkle(s, [200, 116], 1.1, -2.7, -.45);
    waves(s, 330, 420, 240, 6, 3);
    waves(s, 340, 430, 268, 5, 3);
    plant(s, 418, F - 2, 66);
    return s.svg('Polarity: eine Klientin sitzt entspannt auf einem Hocker, Miri steht hinter ihr und legt ihr die Hände auf den Kopf');
  },

  // Häufige Fragen: Miri thinking, scratching her head, question marks around her
  fragen() {
    const s = new Sketch(360, 420), F = 400, cx = 170;
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 46, 230], [cx - 60, 270]], [sh[1], [cx + 74, 168], [cx + 40, 112]]]);
    // question marks: a hook and a dot
    const q = (x, y, k) => { s.line([[x - 12 * k, y - 10 * k], [x - 8 * k, y - 22 * k], [x + 4 * k, y - 26 * k], [x + 14 * k, y - 18 * k], [x + 12 * k, y - 6 * k], [x, y + 2 * k], [x, y + 12 * k]], { w: .9, wob: .3 }); s.ellipse([x, y + 24 * k], 3.2 * k, 3.2 * k, { fill: true, w: .5 }); };
    q(262, 96, 1.4); q(298, 160, 1); q(78, 108, 1.05);
    return s.svg('Miri überlegt und kratzt sich am Kopf, umgeben von Fragezeichen');
  },

  // Anfahrt (schematic, not a map): train at the station, a short walk, Miri waving from the 4th floor
  anfahrt() {
    const s = new Sketch(640, 400), F = 372;
    // rails, train with a pantograph and the overhead wire
    s.line([[20, F], [250, F]], { straight: true }).line([[20, F + 10], [250, F + 10]], { straight: true, w: .6 });
    s.line([[20, 214], [260, 214]], { straight: true, w: .6 });
    s.line([[34, 352], [34, 262], [196, 262], [226, 290], [228, 352], [34, 352]], { straight: true });
    s.line([[112, 262], [128, 238], [108, 216]], { w: .8 }).line([[96, 216], [124, 216]], { w: .8 });
    for (const x of [48, 92, 136]) s.line([[x, 278], [x + 32, 278], [x + 32, 306], [x, 306], [x, 278]], { straight: true, w: .8 });
    s.line([[184, 280], [208, 280], [218, 300], [184, 300], [184, 280]], { straight: true, w: .8 });
    for (const x of [70, 190]) s.ellipse([x, 360], 11, 11);
    // footsteps to the door
    for (let i = 0; i < 9; i++) { const x = 262 + i * 18, y = F - 6 + (i % 2 ? -5 : 3); s.ellipse([x, y], 3.5, 2.2, { fill: true, w: .5 }); }
    // house: ground floor + 4 floors; Miri leans out of the open window on the 4th floor
    const x0 = 432, x1 = 604, lv = 58, top = F - 5 * lv - 8;
    s.line([[x0, F], [x0, top], [x1, top], [x1, F]], { straight: true });
    s.line([[x0 - 10, top + 2], [(x0 + x1) / 2, top - 38], [x1 + 10, top + 2]], { straight: true });
    s.line([[500, F], [500, F - 44], [536, F - 44], [536, F]], { straight: true });
    for (let k = 1; k <= 3; k++) for (const wx of [452, 540]) {
      const wy = F - (k + 1) * lv + 12;
      s.line([[wx, wy], [wx + 44, wy], [wx + 44, wy + 34], [wx, wy + 34], [wx, wy]], { straight: true, w: .7 });
    }
    const wy = F - 5 * lv + 6;
    s.line([[452, wy + 6], [496, wy + 6], [496, wy + 40], [452, wy + 40], [452, wy + 6]], { straight: true, w: .7 });
    s.line([[530, wy + 50], [530, wy], [590, wy], [590, wy + 50]], { straight: true, w: .8 });
    miri(s, {
      head: [558, wy + 22], r: 13, face: 'front', neck: [558, wy + 38], sh: [[546, wy + 42], [570, wy + 42]], hip: [[547, wy + 50], [569, wy + 50]],
      arms: [[[570, wy + 44], [600, wy + 30], [614, wy + 8]]],
    });
    s.line([[524, wy + 50], [596, wy + 50]], { straight: true });
    for (const [a, b] of [[[624, wy + 10], [632, wy + 4]], [[620, wy - 6], [626, wy - 14]]]) s.line([a, b], { w: .7 });
    return s.svg('Skizze der Anfahrt: vom Hauptbahnhof Winterthur sind es wenige Gehminuten bis zur Münzgasse 2, Miri winkt aus dem Fenster im 4. Stock');
  },

  // Kontakt: Miri waves, a letter in the other hand
  kontakt() {
    const s = new Sketch(360, 420), F = 400, cx = 170;
    miriStanding(s, cx, F, sh => [[sh[0], [cx - 62, 150], [cx - 70, 96]], [sh[1], [cx + 46, 230], [cx + 74, 218]]]);
    for (const [a, b] of [[[cx - 100, 98], [cx - 112, 92]], [[cx - 98, 74], [cx - 110, 62]], [[cx - 84, 56], [cx - 88, 42]]]) s.line([a, b], { w: .8 });
    const [x0, y0, x1, y1] = [cx + 70, 196, cx + 140, 244];
    s.line([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], { straight: true });
    s.line([[x0, y0], [(x0 + x1) / 2, y0 + 26], [x1, y0]], { w: .9 });
    return s.svg('Miri winkt und hält einen Brief in der Hand');
  },
};

const only = process.argv[2];
for (const [name, draw] of Object.entries(scenes)) {
  if (only && only !== name) continue;
  seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 7);
  const svg = draw();
  writeFileSync(new URL(`../img/sketches/${name}.svg`, import.meta.url), svg);
  console.log(name, (svg.length / 1024).toFixed(1) + ' KB');
}
