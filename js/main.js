// Dewo Ngima — Main JS (Coffee-shop inspired interactions)

// Mobile menu
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');
if (menuBtn && navbar) {
  menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  };
}

// Navbar scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  if (menuBtn) menuBtn.classList.remove('fa-times');
  if (navbar) navbar.classList.remove('active');
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .step, .box, .stat-box, .child-card, .review-box, .feature').forEach(el => {
  revealObserver.observe(el);
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + (target >= 100 ? '+' : '');
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Cycling images with crossfade on blob pump
const imgA = document.getElementById('cycling-img-a');
const imgB = document.getElementById('cycling-img-b');
if (imgA && imgB) {
  const cycleImages = [
    'assets/images/d4.jpg',
    'assets/images/d6.jpg',
    'assets/images/d9.jpeg',
    'assets/images/d14.jpg',
    'assets/images/d15.jpg'
  ];
  // Preload all images
  cycleImages.forEach(src => { new Image().src = src; });
  let cycleIndex = 1;
  let showingA = true;
  setInterval(() => {
    cycleIndex = (cycleIndex + 1) % cycleImages.length;
    if (showingA) {
      imgB.src = cycleImages[cycleIndex];
      imgB.classList.add('active');
      imgA.classList.remove('active');
    } else {
      imgA.src = cycleImages[cycleIndex];
      imgA.classList.add('active');
      imgB.classList.remove('active');
    }
    showingA = !showingA;
  }, 4000);
}

// Image slider (for sponsor page child cards)
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.style.background = 'none';
      b.style.color = 'var(--main)';
    });
    btn.style.background = 'var(--main)';
    btn.style.color = 'var(--cream)';
  });
});
