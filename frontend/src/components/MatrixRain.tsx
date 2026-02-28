import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|\\/*+-=~^%$#@!?';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -50);

    const draw = () => {
      columns = Math.floor(canvas.width / fontSize);
      while (drops.length < columns) drops.push(Math.random() * -50);

      ctx.fillStyle = 'rgba(5, 10, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * fontSize;

        // Bright head
        if (drops[i] > 0) {
          ctx.fillStyle = '#ccffcc';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 8;
          ctx.font = `bold ${fontSize}px "Share Tech Mono", monospace`;
          ctx.fillText(char, i * fontSize, y);
        }

        // Trail
        if (drops[i] > 1) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = '#00ff41';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 4;
          ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
          ctx.fillText(trailChar, i * fontSize, y - fontSize);
        }

        // Dim trail
        if (drops[i] > 3) {
          ctx.fillStyle = 'rgba(0, 180, 50, 0.5)';
          ctx.shadowBlur = 0;
          ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, y - fontSize * 2);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
