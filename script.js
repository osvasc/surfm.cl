// Navbar scroll + menú móvil + reveal + reproductor

const nav = document.querySelector('.nav-wrap');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Efecto al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Menú móvil
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
function handleReveal() {
  const trigger = window.innerHeight * 0.85;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// Reproductor principal
const audio = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playBtn');
const statusEl = document.getElementById('playerStatus');

if (audio && playBtn && statusEl) {
  let isPlaying = false;

  playBtn.addEventListener('click', async () => {
    try {
      if (!isPlaying) {
        await audio.play();
        isPlaying = true;
        playBtn.textContent = '❚❚ Pausar señal';
        statusEl.textContent = 'Reproduciendo en vivo';
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶ Escuchar en vivo';
        statusEl.textContent = 'Detenido';
      }
    } catch (e) {
      statusEl.textContent = 'Error al reproducir. Verifique el stream.';
      console.error(e);
    }
  });

  audio.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.textContent = '▶ Escuchar en vivo';
    statusEl.textContent = 'Detenido';
  });
}
