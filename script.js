// Matrix rain
const cv = document.getElementById('rain'), cx = cv.getContext('2d');
let cols, drops;
function setup() {
  cv.width = innerWidth; cv.height = innerHeight;
  cols = Math.floor(cv.width / 16);
  drops = Array(cols).fill(1);
}
setup(); addEventListener('resize', setup);
const chars = '01{}[]<>/;=+*#$HTMLCSSJAVA';
setInterval(() => {
  cx.fillStyle = 'rgba(5,8,15,0.08)';
  cx.fillRect(0, 0, cv.width, cv.height);
  cx.fillStyle = '#00ff9c';
  cx.font = '15px monospace';
  drops.forEach((y, i) => {
    cx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
    if (y * 16 > cv.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}, 50);

// Typing effect
const roles = ['Web Developer', 'Java Programmer', 'UI Animator', 'Future Engineer'];
let r = 0, c = 0, del = false;
const typed = document.getElementById('typed');
(function type() {
  const w = roles[r];
  typed.textContent = w.slice(0, c);
  if (!del && c < w.length) c++;
  else if (!del) { del = true; return setTimeout(type, 1100); }
  else if (c > 0) c--;
  else { del = false; r = (r + 1) % roles.length; }
  setTimeout(type, del ? 40 : 90);
})();

// Scroll reveal + rings + counters
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('on');

    el.querySelectorAll('.ring').forEach(ring => {
      const p = +ring.dataset.p;
      ring.querySelector('.fg').style.strokeDashoffset = 264 - (264 * p / 100);
      let v = 0;
      const t = setInterval(() => {
        v++; ring.querySelector('b').textContent = v + '%';
        if (v >= p) clearInterval(t);
      }, 20);
    });

    el.querySelectorAll('[data-n]').forEach(n => {
      const target = +n.dataset.n; let v = 0;
      const step = Math.max(1, target / 60);
      const t = setInterval(() => {
        v += step;
        if (v >= target) { v = target; clearInterval(t); }
        n.textContent = Math.floor(v) + '+';
      }, 25);
    });
    io.unobserve(el);
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Cursor trail
addEventListener('mousemove', e => {
  const d = document.createElement('div');
  d.className = 'trail';
  d.style.left = e.clientX - 5 + 'px';
  d.style.top = e.clientY - 5 + 'px';
  document.body.appendChild(d);
  requestAnimationFrame(() => { d.style.opacity = 0; d.style.transform = 'scale(0.2)'; });
  setTimeout(() => d.remove(), 600);
});