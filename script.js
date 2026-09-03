// Tombstone click interaction
const tombstones = document.querySelectorAll('.tombstone');
tombstones.forEach(stone => {
  stone.addEventListener('click', () => {
    const info = stone.querySelector('.info');
    info.style.display = info.style.display === 'block' ? 'none' : 'block';
  });
});

// Generate random stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  starsContainer.appendChild(star);
}
