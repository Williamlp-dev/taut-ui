"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";
import { useEffect, useRef } from "react";

const R = 24;
const S = R + 1;
const SNAP_GAP = 8;
const LG_WIDTH = 1024;

const LEFT_FILL = `M 0 -1 L ${S + 1} -1 L ${S + 1} ${R + 0.5} L ${R + 0.5} ${R + 0.5} A ${R} ${R} 0 0 0 0.5 0.5 L 0 0.5 Z`;
const LEFT_STROKE = `M 0 0.5 L 0.5 0.5 A ${R} ${R} 0 0 1 ${R + 0.5} ${R + 0.5}`;
const RIGHT_FILL = `M -1 -1 L ${S} -1 L ${S} 0.5 L ${R + 0.5} 0.5 A ${R} ${R} 0 0 0 0.5 ${R + 0.5} L -1 ${R + 0.5} Z`;
const RIGHT_STROKE = `M 0.5 ${R + 0.5} A ${R} ${R} 0 0 1 ${R + 0.5} 0.5 L ${S} 0.5`;

export function SiteHeaderDock(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    const header = el?.closest("header");
    if (!el || !header) return;

    const reset = (surface?: HTMLElement | null) => {
      el.dataset.active = "false";
      el.dataset.docked = "false";
      el.dataset.left = "false";
      el.dataset.right = "false";
      if (surface) surface.dataset.docked = "false";
    };

    if (!pathname.startsWith("/docs")) {
      reset();
      return;
    }

    let surface = document.querySelector<HTMLElement>(
      '[data-slot="docs-surface"]',
    );
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const measure = () => {
      rafId = 0;
      if (!surface || !surface.isConnected) {
        surface = document.querySelector<HTMLElement>(
          '[data-slot="docs-surface"]',
        );
        if (!surface) {
          reset();
          return;
        }
      }

      const headerRect = header.getBoundingClientRect();
      const surfaceRect = surface.getBoundingClientRect();
      const isDesktop = window.innerWidth >= LG_WIDTH;

      const left = surfaceRect.left - headerRect.left;
      const width = surfaceRect.width;
      const rightSpace = headerRect.width - (left + width);

      const hasLeft = isDesktop && left >= R;
      const hasRight = isDesktop && rightSpace >= R;
      const docked =
        isDesktop &&
        surfaceRect.top <= headerRect.bottom + SNAP_GAP &&
        surfaceRect.bottom > headerRect.bottom + R;

      const bridgeLeft = hasLeft ? left - R : left;
      const bridgeWidth = width + (hasLeft ? R : 0) + (hasRight ? R : 0);

      el.style.setProperty("--dock-left", `${left}px`);
      el.style.setProperty("--dock-width", `${width}px`);
      el.style.setProperty("--bridge-left", `${bridgeLeft}px`);
      el.style.setProperty("--bridge-width", `${bridgeWidth}px`);

      el.dataset.active = isDesktop ? "true" : "false";
      el.dataset.docked = docked ? "true" : "false";
      el.dataset.left = hasLeft ? "true" : "false";
      el.dataset.right = hasRight ? "true" : "false";
      surface.dataset.docked = docked ? "true" : "false";
    };

    const schedule = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(measure);
      }
    };

    const bindSurface = (target: HTMLElement) => {
      surface = target;
      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(target);
      resizeObserver.observe(header);
      measure();
    };

    if (surface) {
      bindSurface(surface);
    } else {
      mutationObserver = new MutationObserver(() => {
        const found = document.querySelector<HTMLElement>(
          '[data-slot="docs-surface"]',
        );
        if (found) {
          mutationObserver?.disconnect();
          mutationObserver = null;
          bindSurface(found);
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      reset(surface);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="group/dock pointer-events-none absolute inset-0 [--dock-spring:linear(0,0.18_7%,0.56_18%,0.89_30%,1.06_44%,1.08_54%,1.02_72%,0.995_86%,1)] data-[active=false]:hidden"
      data-active="false"
      data-docked="false"
      data-left="false"
      data-right="false"
      data-slot="site-header-dock"
      ref={ref}
    >
      <div className="absolute bottom-0 left-(--bridge-left) h-[3px] w-(--bridge-width) origin-center translate-y-px scale-x-50 bg-background opacity-0 will-change-transform [transition:transform_110ms_cubic-bezier(0.4,0,1,1),opacity_80ms_ease-in] group-data-[docked=true]/dock:scale-x-100 group-data-[docked=true]/dock:opacity-100 motion-reduce:transition-none! group-data-[docked=true]/dock:[transition:transform_150ms_var(--dock-spring),opacity_70ms_ease-out]" />

      <div className="absolute top-full left-(--dock-left) w-(--dock-width) origin-top scale-y-0 opacity-0 will-change-transform [transition:transform_100ms_ease-in,opacity_80ms_ease-in] group-data-[docked=true]/dock:scale-y-100 group-data-[docked=true]/dock:opacity-100 motion-reduce:transition-none! group-data-[docked=true]/dock:[transition:transform_135ms_cubic-bezier(0.16,1,0.3,1),opacity_70ms_ease-out]">
        <div className="h-2.5 bg-background" />
        <div className="mx-px h-3 bg-gradient-to-b from-background via-background/60 to-transparent" />
      </div>

      <svg
        className="absolute top-[calc(100%-1px)] left-[calc(var(--dock-left)-24px)] origin-top-right -translate-y-1 scale-50 overflow-visible opacity-0 will-change-transform [transition:transform_110ms_cubic-bezier(0.4,0,1,1),opacity_80ms_ease-in] group-data-[left=false]/dock:hidden group-data-[docked=true]/dock:translate-y-0 group-data-[docked=true]/dock:scale-100 group-data-[docked=true]/dock:opacity-100 motion-reduce:transition-none! group-data-[docked=true]/dock:[transition:transform_165ms_var(--dock-spring),opacity_80ms_ease-out]"
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        width={S}
      >
        <rect
          fill="var(--background)"
          height={R + 1.5}
          width={2}
          x={R}
          y={-1}
        />
        <path d={LEFT_FILL} fill="var(--background)" />
        <path
          className="stroke-border/60"
          d={LEFT_STROKE}
          fill="none"
          strokeWidth={1}
        />
      </svg>

      <svg
        className="absolute top-[calc(100%-1px)] left-[calc(var(--dock-left)+var(--dock-width)-1px)] origin-top-left -translate-y-1 scale-50 overflow-visible opacity-0 will-change-transform [transition:transform_110ms_cubic-bezier(0.4,0,1,1),opacity_80ms_ease-in] group-data-[right=false]/dock:hidden group-data-[docked=true]/dock:translate-y-0 group-data-[docked=true]/dock:scale-100 group-data-[docked=true]/dock:opacity-100 motion-reduce:transition-none! group-data-[docked=true]/dock:[transition:transform_165ms_var(--dock-spring),opacity_80ms_ease-out]"
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        width={S}
      >
        <rect
          fill="var(--background)"
          height={R + 1.5}
          width={2}
          x={-1}
          y={-1}
        />
        <path d={RIGHT_FILL} fill="var(--background)" />
        <path
          className="stroke-border/60"
          d={RIGHT_STROKE}
          fill="none"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
