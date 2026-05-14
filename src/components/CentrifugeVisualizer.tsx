import React, { useEffect, useRef } from 'react';
import type { StrikeEntry } from '../types';

interface CentrifugeVisualizerProps {
  strikeLog: StrikeEntry[];
  spinning: boolean;
}

const RING_COLORS = ['#00ff41', '#00cc33', '#009922', '#006611'];
const NUM_RINGS = 4;
const CANVAS_SIZE = 280;
const CENTER = CANVAS_SIZE / 2;

export const CentrifugeVisualizer: React.FC<CentrifugeVisualizerProps> = ({
  strikeLog,
  spinning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Background
      ctx.fillStyle = 'rgba(0, 10, 0, 0.95)';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const rotationSpeed = spinning ? 0.03 : 0.005;
      angleRef.current += rotationSpeed;

      for (let i = NUM_RINGS; i >= 1; i--) {
        const radius = (CENTER * i) / NUM_RINGS - 10;
        const color = RING_COLORS[i - 1];
        const alpha = spinning ? 0.15 + (i / NUM_RINGS) * 0.2 : 0.05;

        // Glow ring
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Rotating dots on each ring
        const numDots = i * 3;
        for (let d = 0; d < numDots; d++) {
          const dotAngle =
            angleRef.current * (i % 2 === 0 ? 1 : -1) +
            (d / numDots) * Math.PI * 2;
          const x = CENTER + Math.cos(dotAngle) * radius;
          const y = CENTER + Math.sin(dotAngle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = spinning ? 0.9 : 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Center core
      const coreGrad = ctx.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, 20);
      coreGrad.addColorStop(0, spinning ? '#00ff41' : '#003311');
      coreGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Center label
      ctx.font = '9px Courier New';
      ctx.fillStyle = '#00ff41';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(spinning ? 'ACTIVE' : 'IDLE', CENTER, CENTER);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [spinning]);

  return (
    <div className="centrifuge-container">
      <h3 className="centrifuge-container__title">Centrifuge Visualizer</h3>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="centrifuge-container__canvas"
        aria-label="Centrifuge animation"
      />
      <div className="centrifuge-container__log">
        <p className="centrifuge-container__log-header">
          Strike Log ({strikeLog.length})
        </p>
        <ul className="centrifuge-container__log-list">
          {strikeLog
            .slice(-5)
            .reverse()
            .map((entry) => (
              <li
                key={entry.id}
                className={`centrifuge-container__log-entry centrifuge-container__log-entry--${entry.type}`}
              >
                <span className="centrifuge-container__log-time">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>{' '}
                {entry.message}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
