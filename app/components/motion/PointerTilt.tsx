"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./PointerTilt.module.css";

type TiltStyle = CSSProperties & {
  "--tilt-perspective"?: string;
  "--tilt-x"?: string;
  "--tilt-y"?: string;
};

export type PointerTiltProps = HTMLAttributes<HTMLDivElement> & {
  /** Hard-capped at six degrees to preserve legibility. */
  maxTilt?: number;
  /** CSS perspective distance in pixels. */
  perspective?: number;
  disabled?: boolean;
};

function bounded(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

/**
 * A visual-stage wrapper with modest pointer depth. It starts static, enables
 * only for a fine hover-capable pointer, and remains disabled for touch and
 * `prefers-reduced-motion` users.
 */
export function PointerTilt({
  children,
  className,
  disabled = false,
  maxTilt = 3.5,
  perspective = 900,
  style,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: PointerTiltProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const tiltLimit = bounded(Math.abs(maxTilt), 0, 6);

  function reset() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const element = elementRef.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.dataset.tiltActive = "false";
  }

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncCapability() {
      enabledRef.current = !disabled && finePointer.matches && !reducedMotion.matches;
      if (elementRef.current) {
        elementRef.current.dataset.tiltEnabled = String(enabledRef.current);
      }
      if (!enabledRef.current) reset();
    }

    syncCapability();
    finePointer.addEventListener("change", syncCapability);
    reducedMotion.addEventListener("change", syncCapability);

    return () => {
      finePointer.removeEventListener("change", syncCapability);
      reducedMotion.removeEventListener("change", syncCapability);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [disabled]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (!enabledRef.current || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return;
    const horizontal = bounded((event.clientX - bounds.left) / bounds.width, 0, 1);
    const vertical = bounded((event.clientY - bounds.top) / bounds.height, 0, 1);
    const rotateY = (horizontal - 0.5) * 2 * tiltLimit;
    const rotateX = (0.5 - vertical) * 2 * tiltLimit;
    const element = event.currentTarget;

    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      element.dataset.tiltActive = "true";
      frameRef.current = null;
    });
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    reset();
    onPointerLeave?.(event);
  }

  function handlePointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    reset();
    onPointerCancel?.(event);
  }

  const tiltStyle: TiltStyle = {
    "--tilt-perspective": `${Math.max(
      480,
      Number.isFinite(perspective) ? perspective : 900,
    )}px`,
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    ...style,
  };

  return (
    <div
      {...rest}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-tilt-active="false"
      data-tilt-enabled="false"
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={elementRef}
      style={tiltStyle}
    >
      {children}
    </div>
  );
}
