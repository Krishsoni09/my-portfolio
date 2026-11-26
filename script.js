// Smooth typing effect
const roles = ['Web Developer', 'Java Programmer', 'Frontend Designer', 'Aspiring Software Engineer'];
let r = 0, c = 0, del = false;
const typed = document.getElementById('typed');

(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) {
    c++;
  } else if (!del) {
    del = true;
    return setTimeout(type, 1500);
  } else if (c > 0) {
    c--;
  } else {
    del = false;
    r = (r + 1) % roles.length;
  }
  setTimeout(type, del ? 45 : 85);
})();

// Scroll reveal, skill ring progress & counters
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('on');

    el.querySelectorAll('.ring').forEach(ring => {
      const target = +ring.dataset.p;
      ring.querySelector('.fg').style.strokeDashoffset = 264 - (264 * target / 100);
      let current = 0;
      const timer = setInterval(() => {
        current++;
        ring.querySelector('b').textContent = current + '%';
        if (current >= target) clearInterval(timer);
      }, 16);
    });

    el.querySelectorAll('[data-n]').forEach(counter => {
      const target = +counter.dataset.n;
      let current = 0;
      const step = Math.max(1, target / 50);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + '+';
      }, 25);
    });

    io.unobserve(el);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
