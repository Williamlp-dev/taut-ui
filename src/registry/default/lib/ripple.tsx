"use client";

import * as React from "react";

type PressOptions = Required<
  Pick<RippleProps, "color" | "duration" | "opacity" | "minimumPressDuration">
>;

interface Press {
  release: () => void;
  cancel: () => void;
}

const EASE = "cubic-bezier(0.2, 0, 0, 1)";

function startPress(
  container: HTMLElement,
  x: number | undefined,
  y: number | undefined,
  { color, duration, opacity, minimumPressDuration }: PressOptions,
  onDone: () => void,
): Press | null {
  const rect = container.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;

  const maxDim = Math.max(rect.width, rect.height);
  const softEdge = Math.max(0.35 * maxDim, 75);
  const size = Math.max(Math.floor(maxDim * 0.2), 1);
  const scale = (Math.hypot(rect.width, rect.height) + 12 + softEdge) / size;

  const end = { x: (rect.width - size) / 2, y: (rect.height - size) / 2 };
  const start =
    x != null && y != null
      ? { x: x - rect.left - size / 2, y: y - rect.top - size / 2 }
      : end;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = document.createElement("span");
  Object.assign(el.style, {
    background: `radial-gradient(closest-side, ${color} max(100% - 70px, 65%), transparent 100%)`,
    borderRadius: "50%",
    height: `${size}px`,
    left: "0",
    opacity: "0",
    pointerEvents: "none",
    position: "absolute",
    top: "0",
    width: `${size}px`,
    willChange: "transform, opacity",
  });
  container.appendChild(el);

  const grow = el.animate(
    [
      { transform: `translate(${start.x}px, ${start.y}px) scale(1)` },
      { transform: `translate(${end.x}px, ${end.y}px) scale(${scale})` },
    ],
    { duration: reduced ? 0 : duration, easing: EASE, fill: "forwards" },
  );
  el.animate([{ opacity: 0 }, { opacity }], { duration: 75, fill: "forwards" });

  const startedAt = performance.now();
  let released = false;
  let timer: number | undefined;

  const cleanup = (): void => {
    window.clearTimeout(timer);
    grow.cancel();
    el.remove();
    onDone();
  };

  return {
    cancel: cleanup,
    release: (): void => {
      if (released) return;
      released = true;
      const wait = Math.max(
        0,
        minimumPressDuration - (performance.now() - startedAt),
      );
      timer = window.setTimeout((): void => {
        const fade = el.animate([{ opacity }, { opacity: 0 }], {
          duration: 375,
          fill: "forwards",
        });
        fade.onfinish = cleanup;
      }, wait);
    },
  };
}

function Ripple({
  color = "currentColor",
  duration = 450,
  opacity = 0.1,
  hoverOpacity = 0.08,
  hoverDuration = 150,
  minimumPressDuration = 225,
  disabled = false,
  className,
  style,
  ...props
}: RippleProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const hoverRef = React.useRef<HTMLSpanElement>(null);

  const optionsRef = React.useRef({
    color,
    duration,
    hoverOpacity,
    minimumPressDuration,
    opacity,
  });
  optionsRef.current = {
    color,
    duration,
    hoverOpacity,
    minimumPressDuration,
    opacity,
  };

  React.useEffect((): (() => void) | undefined => {
    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent || disabled) return;
    if (typeof container.animate !== "function") return;

    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    const presses = new Set<Press>();
    let current: Press | null = null;

    const isDisabled = (): boolean =>
      (parent as HTMLButtonElement).disabled === true ||
      parent.getAttribute("aria-disabled") === "true" ||
      parent.hasAttribute("data-disabled");

    const setHover = (on: boolean): void => {
      if (hoverRef.current) {
        hoverRef.current.style.opacity = on
          ? `${optionsRef.current.hoverOpacity}`
          : "0";
      }
    };

    const endPress = (): void => {
      current?.release();
      current = null;
    };

    const begin = (x?: number, y?: number): void => {
      endPress();
      const press = startPress(container, x, y, optionsRef.current, () =>
        presses.delete(press as Press),
      );
      if (press) {
        presses.add(press);
        current = press;
      }
    };

    const onEnter = (e: PointerEvent): void => {
      if (e.pointerType !== "touch" && !isDisabled()) setHover(true);
    };
    const onLeave = (): void => {
      setHover(false);
      endPress();
    };
    const onDown = (e: PointerEvent): void => {
      if (!e.isPrimary || e.button !== 0 || isDisabled()) return;
      begin(e.clientX, e.clientY);
    };
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.repeat || isDisabled() || (e.key !== "Enter" && e.key !== " "))
        return;
      begin();
    };
    const onKeyUp = (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") endPress();
    };

    const listeners: [string, EventListener][] = [
      ["pointerenter", onEnter as EventListener],
      ["pointerleave", onLeave],
      ["pointerdown", onDown as EventListener],
      ["pointerup", endPress],
      ["pointercancel", endPress],
      ["keydown", onKeyDown as EventListener],
      ["keyup", onKeyUp as EventListener],
      ["blur", endPress],
    ];
    for (const [name, fn] of listeners) parent.addEventListener(name, fn);

    return () => {
      for (const [name, fn] of listeners) parent.removeEventListener(name, fn);
      for (const press of [...presses]) press.cancel();
      setHover(false);
    };
  }, [disabled]);

  return (
    <span
      aria-hidden="true"
      className={className}
      data-slot="ripple"
      ref={containerRef}
      style={{
        borderRadius: "inherit",
        contain: "paint",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        position: "absolute",
        ...style,
      }}
      {...props}
    >
      <span
        data-slot="ripple-hover"
        ref={hoverRef}
        style={{
          backgroundColor: color,
          inset: 0,
          opacity: 0,
          position: "absolute",
          transition: hoverDuration > 0 ? `opacity ${hoverDuration}ms` : "none",
        }}
      />
    </span>
  );
}

export interface RippleProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  duration?: number;
  opacity?: number;
  hoverOpacity?: number;
  hoverDuration?: number;
  minimumPressDuration?: number;
  disabled?: boolean;
}

export { Ripple };
export default Ripple;
