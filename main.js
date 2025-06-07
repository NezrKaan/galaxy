// main.js
// Reactive futuristic animations: starfield and cursor light

// Cursor light movement
document.addEventListener('mousemove', e => {
  const cursor = document.getElementById('cursor-light');
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Starfield Initialization
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 150;

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

function initStars() {
  stars = [];
  const w = canvas.width;
  const h = canvas.height;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
      o: Math.random()
    });
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}
window.addEventListener('resize', resize);
resize();

// Draw and animate starfield
function drawStars() {
  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = 'transparent';
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < numStars; i++) {
    const s = stars[i];
    s.z -= 2;
    if (s.z <= 0) {
      s.x = Math.random() * w;
      s.y = Math.random() * h;
      s.z = w;
      s.o = Math.random();
    }
    const px = (s.x - w/2) * (w / s.z) + w/2;
    const py = (s.y - h/2) * (w / s.z) + h/2;
    const size = (1 - s.z / w) * 3;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.o})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

drawStars();
