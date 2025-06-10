document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.slider-wrapper'); // A csúszkát tartalmazó elem
  const items = document.querySelectorAll('.slider-item');   // Az egyes csúszkaelemek
  const pagination = document.querySelector('.slider-pagination'); // A pontok tartója
  const prevBtn = document.querySelector('.slider-button.prev');   // Bal nyíl
  const nextBtn = document.querySelector('.slider-button.next');   // Jobb nyíl

  if (!wrapper || !items.length || !pagination) return;

  const dots = [];
  let currentIndex = 0;

  // === PONTOK GENERÁLÁSA ===
  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');

    // Kattintásra az adott elemre ugrik
    dot.addEventListener('click', () => {
      scrollToIndex(index);
    });

    pagination.appendChild(dot);
    dots.push(dot);
  });

  // === GOMB ESEMÉNYEK ===
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // körkörös visszalépés
    scrollToIndex(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length; // körkörös előrelépés
    scrollToIndex(currentIndex);
  });

  // === SCROLL KÖVETÉS (ha kézzel húznád) ===
  wrapper.addEventListener('scroll', () => {
    const itemWidth = items[0].offsetWidth;
    const newIndex = Math.round(wrapper.scrollLeft / itemWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots();
    }
  });

  // === GÖRGETÉS ADOTT INDEXRE ===
  function scrollToIndex(index) {
    const offset = items[index].offsetLeft;
    wrapper.scrollTo({ left: offset, behavior: 'smooth' });
    currentIndex = index;
    updateDots();
  }

  // === PONTOK AKTIVÁLÁSA ===
  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
});
