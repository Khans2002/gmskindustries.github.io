// High-Tech Particle Animation Background

export function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 120; // Number of particles
    const maxDistance = 150;   // Maximum distance to draw connecting lines

    // Initialize particles with random positions and velocities
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8, // X velocity
            vy: (Math.random() - 0.5) * 0.8, // Y velocity
            radius: Math.random() * 2 + 0.5 // Particle size
        });
    }

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Particle color

        particles.forEach(p => {
            // Mouse Interaction (Push/Attract Effect)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * 2; // Attraction strength
                    const directionY = forceDirectionY * force * 2;
                    p.x -= directionX; // Repel instead of attract for cooler effect: `-=`
                    p.y -= directionY;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Move particles
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        // Draw connecting tech lines
        ctx.strokeStyle = 'rgba(0, 102, 204, 0.15)'; // Tech blue connecting lines
        ctx.lineWidth = 1;

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Draw line if particles are close enough
                if (dist < maxDistance) {
                    // Opacity based on distance
                    const opacity = 1 - (dist / maxDistance);
                    ctx.strokeStyle = `rgba(0, 102, 204, ${opacity * 0.4})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw lines from particles to cursor
        if (mouse.x != null && mouse.y != null) {
            for (let i = 0; i < particleCount; i++) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const opacity = 1 - (dist / mouse.radius);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; // White line to cursor
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        // Loop animation
        requestAnimationFrame(draw);
    }

    // Start animation loop
    draw();
}
