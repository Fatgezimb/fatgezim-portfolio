"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Showcase.module.css";

const modes = [
  { label: "Signals", note: "Finding structure in complexity." },
  { label: "Connections", note: "Turning relationships into systems." },
  { label: "Systems", note: "Making the whole thing work." },
] as const;

/** Original conceptual fibre geometry, not a measured scientific dataset. */
export function SignalSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState(0);
  const modeRef = useRef(0);
  const clockRef = useRef(0);
  const blendRef = useRef([1, 0, 0]);
  const [paused, setPaused] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
    containerRef.current?.dispatchEvent(new Event("sculpture-form"));
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let width = 1;
    let height = 1;
    let lastTime = 0;
    function draw(time: number) {
      if (!ctx || !canvas) return;
      const moving = !paused && !reduced.matches && visible && !document.hidden;
      if (moving && lastTime)
        clockRef.current += Math.min(time - lastTime, 40) * 0.00022;
      const blend = blendRef.current;
      for (let i = 0; i < 3; i++) {
        const target = i === modeRef.current ? 1 : 0;
        blend[i] =
          reduced.matches || paused
            ? target
            : blend[i] + (target - blend[i]) * 0.055;
      }
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      const rotation = clockRef.current * 0.35 + pointerRef.current.x * 0.12;
      const scale = Math.min(width * 0.25, Math.max(1, height - 104) * 0.235);
      const strands = width < 450 ? 54 : 84;
      for (let line = 0; line < strands; line++) {
        const angle = (line / (strands - 1)) * Math.PI * 2;
        ctx.beginPath();
        for (let point = 0; point <= 105; point++) {
          const t = (point / 105) * Math.PI * 2;
          const radiusA = 1.12 + 0.33 * Math.cos(t * 3 + angle);
          const radiusC = 1 + Math.cos(angle) * 0.22;
          const x =
            blend[0] * radiusA * Math.cos(t) +
            blend[1] * Math.sin(t) * 1.5 +
            blend[2] * Math.cos(t) * radiusC;
          const y =
            blend[0] * radiusA * Math.sin(t) * 1.05 +
            blend[1] * (Math.sin(t * 2) * 0.8 + Math.cos(angle) * 0.26) +
            blend[2] * Math.sin(t) * radiusC;
          const z =
            blend[0] * Math.sin(t * 3 + angle) * 0.58 +
            blend[1] * (Math.cos(t) * 0.6 + Math.sin(angle) * 0.28) +
            blend[2] *
              (Math.sin(angle) * 0.35 + Math.sin(t * 3 + angle) * 0.06);
          const rx = x * Math.cos(rotation) - z * Math.sin(rotation);
          const rz = x * Math.sin(rotation) + z * Math.cos(rotation);
          const perspective = 3.6 / (3.6 + rz);
          const px = width * 0.5 + rx * scale * perspective;
          const py =
            24 + (height - 104) * 0.5 +
            (y * Math.cos(0.33) -
              rz * Math.sin(0.33) +
              pointerRef.current.y * 0.06) *
              scale *
              perspective;
          if (point === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const opacity = 0.19 + Math.pow(Math.sin(angle * 0.5), 2) * 0.39;
        ctx.strokeStyle =
          line % 8 === 0
            ? `rgba(255,255,255,${opacity + 0.17})`
            : `rgba(166,214,255,${opacity})`;
        ctx.lineWidth = line % 8 === 0 ? 1.1 : 0.7;
        ctx.stroke();
      }
      if (moving) raf = requestAnimationFrame(draw);
    }
    function restart() {
      cancelAnimationFrame(raf);
      lastTime = 0;
      draw(performance.now());
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
      setRendered(true);
    });
    resize.observe(container);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    intersection.observe(container);
    container.addEventListener("sculpture-form", restart);
    reduced.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      intersection.disconnect();
      container.removeEventListener("sculpture-form", restart);
      reduced.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [paused]);

  return (
    <div
      className={styles.sculpture}
      ref={containerRef}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
    >
      <div className={styles.sculptureTop}>
        <span>A study in connected systems</span>
        <span aria-hidden="true">ZB—S/26</span>
      </div>
      <svg
        aria-hidden="true"
        className={styles.sculptureFallback}
        data-hidden={rendered}
        viewBox="0 0 600 600"
      >
        {Array.from({ length: 32 }, (_, i) => (
          <ellipse
            key={i}
            cx="300"
            cy="280"
            rx={150 + i * 1.4}
            ry={80 + i * 3.1}
            fill="none"
            stroke="#b9e5ff"
            strokeOpacity=".4"
            transform={`rotate(${i * 5} 300 280)`}
          />
        ))}
      </svg>
      <canvas aria-hidden="true" ref={canvasRef} />
      <div className={styles.sculptureCaption}>
        <span className={styles.signalDot} />
        <p aria-live="polite">{modes[mode].note}</p>
      </div>
      <div className={styles.sculptureControls}>
        <div aria-label="Sculpture form" role="group">
          {modes.map((item, index) => (
            <button
              aria-pressed={mode === index}
              key={item.label}
              onClick={() => setMode(index)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          aria-label={
            paused ? "Play sculpture motion" : "Pause sculpture motion"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
          type="button"
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
