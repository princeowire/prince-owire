'use client';
import { useEffect, useRef } from 'react';

export default function ContourField({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let pointer = { x: 0.56, y: 0.42 };
    let visible = true;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const base = dark ? 'rgba(2,210,227,' : 'rgba(9,10,11,';
      const cx = width * (pointer.x + 0.03 * Math.sin(frame * 0.006));
      const cy = height * (pointer.y + 0.025 * Math.cos(frame * 0.004));
      ctx.lineWidth = 0.7;
      for (let j = 0; j < 26; j++) {
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) {
          const x = (i / 90) * width;
          const y = height * 0.51 + Math.sin(i * 0.09 + j * 0.25 + frame * 0.003) * (18 + j * 1.6) + Math.cos(i * 0.035 - j * 0.3) * 18 + (x - cx) * 0.035;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = base + (0.035 + (j % 6 === 0 ? 0.09 : 0)) + ')';
        ctx.stroke();
      }
      const radius = Math.min(width, height) * 0.36;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, dark ? 'rgba(2,210,227,0.12)' : 'rgba(2,210,227,0.15)');
      glow.addColorStop(1, 'rgba(2,210,227,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = dark ? 'rgba(2,210,227,.55)' : 'rgba(9,10,11,.45)';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy);
      ctx.lineTo(cx + 12, cy);
      ctx.moveTo(cx, cy - 12);
      ctx.lineTo(cx, cy + 12);
      ctx.stroke();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const animate = () => {
      if (!visible) return;
      frame += 1;
      draw();
      if (!reduce) raf = window.requestAnimationFrame(animate);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
      if (reduce) draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) {
        window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(animate);
      } else {
        window.cancelAnimationFrame(raf);
      }
    });

    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointer);
    window.addEventListener('resize', resize);
    resize();
    if (!reduce) raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="contour-canvas" aria-hidden="true" />;
}
