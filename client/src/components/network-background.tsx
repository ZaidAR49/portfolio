import { useEffect, useRef } from 'react';

export const NetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = 0;
        let mouseY = 0;

        // Set canvas size
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - width / 2) * 0.5; // Sensitivity
            mouseY = (e.clientY - height / 2) * 0.5;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // 3D Particle configuration
        const particleCount = Math.min(Math.floor((width * height) / 12000), 150); // Increased density
        const connectionDistance = 150;
        const focalLength = 300; // FOV
        const particles: Particle3D[] = [];

        class Particle3D {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            color: string;

            constructor() {
                this.x = (Math.random() - 0.5) * width * 1.5;
                this.y = (Math.random() - 0.5) * height * 1.5;
                this.z = Math.random() * focalLength * 2; // Depth

                // Random 3D velocity
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.vz = (Math.random() - 0.5) * 0.5;

                const primary = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';
                this.color = primary;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                // Wrap particles in 3D space to keep them coming
                const depth = focalLength * 2;
                if (this.z < -focalLength) this.z = depth;
                if (this.z > depth) this.z = -focalLength;

                // Keep xy bounds somewhat contained but allow fly-through
                const boundX = width;
                const boundY = height;
                if (this.x < -boundX) this.x = boundX;
                if (this.x > boundX) this.x = -boundX;
                if (this.y < -boundY) this.y = boundY;
                if (this.y > boundY) this.y = -boundY;
            }

            project() {
                // Apply parallax/mouse influence
                // Translate world based on mouse
                const dX = this.x + (mouseX * 0.1);
                const dY = this.y + (mouseY * 0.1);

                // Perspective projection
                // Objects closer (lower z) are larger, further (higher z) are smaller
                // We offset z by focalLength to avoid division by zero if z crosses 0 (camera plane)
                const scale = focalLength / (focalLength + this.z);

                const x2d = (width / 2) + dX * scale;
                const y2d = (height / 2) + dY * scale;

                return { x: x2d, y: y2d, scale, visible: this.z > -focalLength + 10 };
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle3D());
        }

        // Animation loop
        const animate = () => {
            // Clear with a very slight fade for potential trails (optional), 
            // but here we just clear for crisp movement
            ctx.clearRect(0, 0, width, height);

            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';

            // Re-fetch color if it changes (theme switch)
            // Ideally we'd do this less often but it works for now
            ctx.fillStyle = accentColor;
            ctx.strokeStyle = accentColor;

            particles.forEach((p, i) => {
                p.update();
                const proj = p.project();

                if (!proj.visible) return;

                // Draw Particle
                // Opacity based on Z (depth fog)
                // Closer = more opacity, Further = less
                const alpha = Math.max(0, Math.min(1, (1 - (p.z / (focalLength * 2))) * 0.8)); // increased base opacity
                const size = Math.max(0.5, 3 * proj.scale);

                ctx.beginPath();
                ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
                ctx.fillStyle = accentColor;
                ctx.globalAlpha = alpha;
                ctx.fill();

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const proj2 = p2.project();

                    if (!proj2.visible) continue;

                    // Calculate distance in 3D for logic, but draw 2D line
                    // Actually, simple 2D distance often looks better/cleaner for "constellations"
                    const dx = proj.x - proj2.x;
                    const dy = proj.y - proj2.y;
                    const dist2d = Math.sqrt(dx * dx + dy * dy);

                    if (dist2d < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(proj.x, proj.y);
                        ctx.lineTo(proj2.x, proj2.y);
                        // Line opacity based on both particles' depth and their 2d distance
                        ctx.globalAlpha = alpha * 0.15 * (1 - dist2d / connectionDistance);
                        ctx.lineWidth = 1 * proj.scale;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{
                background: 'transparent'
            }}
        />
    );
};
