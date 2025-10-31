(function () {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dots = Array.from(slider.querySelectorAll('.hero-slider-dot'));
    const prevBtn = slider.querySelector('[data-action="prev"]');
    const nextBtn = slider.querySelector('[data-action="next"]');
    let current = 0;
    let intervalId;

    function setActive(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        current = index;
    }

    function next() {
        const newIndex = (current + 1) % slides.length;
        setActive(newIndex);
    }

    function prev() {
        const newIndex = (current - 1 + slides.length) % slides.length;
        setActive(newIndex);
    }

    function startAuto() {
        stopAuto();
        intervalId = window.setInterval(next, 8000);
    }

    function stopAuto() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActive(index);
            startAuto();
        });
    });

    nextBtn?.addEventListener('click', () => {
        next();
        startAuto();
    });

    prevBtn?.addEventListener('click', () => {
        prev();
        startAuto();
    });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Initialize slider
    setActive(0);
    startAuto();
})();
