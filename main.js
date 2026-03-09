import './style.css';
import { initParticles } from './particles.js';

// Apply scroll-triggered animations (Apple Style)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Background Animation
    initParticles();

    const elementsToAnimate = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => observer.observe(el));
});
