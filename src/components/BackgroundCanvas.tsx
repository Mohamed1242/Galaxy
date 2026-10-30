import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Rose petal colors: gentle rose, petal pink, soft crimson
    const petalColors = [
      'rgba(244, 63, 94, 0.75)',   // rose-500
      'rgba(251, 113, 133, 0.70)', // rose-400
      'rgba(225, 29, 72, 0.80)',   // rose-600
      'rgba(253, 164, 175, 0.65)', // rose-300
      'rgba(254, 205, 211, 0.60)', // rose-200
    ];

    // Responsive petal count: 20 on small screens, 36 on larger screens for perfect performance
    const petalCount = window.innerWidth < 768 ? 20 : 36;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height, // start staggered above
        size: Math.random() * 9 + 8, // 8px to 17px
        speedY: Math.random() * 1.2 + 0.8, // gentle fall speed
        speedX: Math.random() * 0.8 - 0.4, // subtle drift
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    let windTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      windTime += 0.01;
      const breeze = Math.sin(windTime) * 0.6; // gentle swaying breeze

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX + breeze;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        // Reset if offscreen
        if (p.y > height + 20) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) {
          p.x = -20;
        } else if (p.x < -25) {
          p.x = width + 20;
        }

        // Draw natural rose petal shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, Math.cos(p.flip)); // 3D flip effect
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        // Curvature of a delicate rose petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.7, p.size * 0.85, p.size * 0.6, 0, p.size * 0.95);
        ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.6, -p.size * 0.85, -p.size * 0.7, 0, -p.size);
        ctx.closePath();

        ctx.fillStyle = p.color;
        ctx.fill();

        // Subtle highlight line on petal spine
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.7);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Cotton candy sides with white center background layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden cotton-candy-bg">
        {/* Left cotton candy dreamy glow orbs */}
        <div className="absolute -left-28 sm:-left-36 top-1/3 w-80 sm:w-96 h-[90vh] rounded-full bg-pink-300/30 blur-[100px] transform -translate-y-1/2 pointer-events-none" />
        {/* Right cotton candy dreamy glow orbs */}
        <div className="absolute -right-28 sm:-right-36 top-2/3 w-80 sm:w-96 h-[90vh] rounded-full bg-rose-300/30 blur-[100px] transform -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Falling Rose Petals Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />
    </>
  );
};

