'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create noise texture
    const createNoiseTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10;
        data[i] = data[i + 1] = data[i + 2] = noise;
        data[i + 3] = noise * 2;
      }
      
      return imageData;
    };

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200, // Blue-ish hues
        });
      }
    };

    // Animation variables
    let time = 0;
    const noiseTexture = createNoiseTexture();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw noise texture with reduced opacity
      ctx.globalAlpha = 0.02;
      ctx.putImageData(noiseTexture, 0, 0);
      ctx.globalAlpha = 1;

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 30, 0.2)');
      gradient.addColorStop(1, 'rgba(30, 30, 60, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position with perlin noise influence
        const noiseX = Math.random() * 0.5;
        const noiseY = Math.random() * 0.5;
        
        particle.x += particle.speedX + noiseX;
        particle.y += particle.speedY + noiseY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * Math.sin(time / 1000)})`;
        ctx.fill();
      });

      // Draw organic waves
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      
      for (let i = 0; i < canvas.width; i += 20) {
        const y = canvas.height / 2 + 
                 Math.sin(i / 200 + time / 1000) * 50 +
                 Math.sin(i / 100 - time / 1500) * 30;
        ctx.lineTo(i, y);
      }

      ctx.strokeStyle = 'rgba(100, 150, 255, 0.05)';
      ctx.lineWidth = 2;
      ctx.stroke();

      time++;
      requestAnimationFrame(animate);
    };

    // Initialize and start animation
    initParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedBackground;
