"use client";

import { useEffect, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  life: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<Trail[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.current.length > 30) trail.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trail.current.length - 1; i >= 0; i--) {
        const t = trail.current[i];
        t.life -= 0.04;
        if (t.life <= 0) {
          trail.current.splice(i, 1);
          continue;
        }

        const size = t.life * 6;
        const alpha = t.life * 0.6;

        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(t.x, t.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.2})`;
        ctx.fill();
      }

      // Draw main cursor glow
      const grd = ctx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        0,
        mouse.current.x,
        mouse.current.y,
        20,
      );
      grd.addColorStop(0, "rgba(0, 255, 255, 0.3)");
      grd.addColorStop(1, "rgba(0, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
