import { cva } from "class-variance-authority";

export type MorphShape = "round" | "square";

export const morphClasses = cva(
  [
    "[font-variation-settings:'GRAD'_0]",
    "[--taut-spring:linear(0,0.08_6%,0.25_14%,0.55_26%,0.82_40%,0.98_55%,1.015_68%,1.008_80%,1)]",
    "[transition:border-radius_250ms_var(--taut-spring),box-shadow_150ms_cubic-bezier(0.2,0,0,1)]",
    "motion-reduce:transition-none",
  ],
  {
    defaultVariants: { press: true, radius: "full" },
    variants: {
      press: {
        false: "",
        true: "active:rounded-(--r-pressed) active:[font-variation-settings:'GRAD'_-50] active:[transition-duration:120ms,100ms]",
      },
      radius: {
        full: "rounded-(--r-full)",
        square: "rounded-(--r-square)",
      },
    },
  },
);

export const morphRadius = (
  shape: MorphShape,
  selected?: boolean,
  enabled = true,
): "full" | "square" =>
  (shape === "round") !== (enabled && selected === true) ? "full" : "square";

export const tautSize = cva("", {
  defaultVariants: { size: "default" },
  variants: {
    size: {
      xs: "h-8 gap-1.5 px-3 text-xs [--icon:1rem] [--r-full:1rem] [--r-pressed:0.375rem] [--r-square:0.5rem]",
      sm: "h-9 gap-2 px-3.5 text-sm [--icon:1rem] [--r-full:1.125rem] [--r-pressed:0.375rem] [--r-square:0.625rem]",
      default:
        "h-10 gap-2 px-4 text-sm [--icon:1.125rem] [--r-full:1.25rem] [--r-pressed:0.5rem] [--r-square:0.75rem]",
      md: "h-10 gap-2 px-4 text-sm [--icon:1.125rem] [--r-full:1.25rem] [--r-pressed:0.5rem] [--r-square:0.75rem]",
      lg: "h-12 gap-2.5 px-5 text-base [--icon:1.25rem] [--r-full:1.5rem] [--r-pressed:0.625rem] [--r-square:0.875rem]",
      xl: "h-14 gap-3 px-6 text-base [--icon:1.5rem] [--r-full:1.75rem] [--r-pressed:0.75rem] [--r-square:1rem]",
      "icon-xs":
        "h-8 w-(--iw) px-0 [--icon:1rem] [--iw-narrow:1.75rem] [--iw-wide:2.5rem] [--iw:2rem] [--r-full:1rem] [--r-pressed:0.375rem] [--r-square:0.5rem]",
      "icon-sm":
        "h-9 w-(--iw) px-0 [--icon:1rem] [--iw-narrow:2rem] [--iw-wide:2.75rem] [--iw:2.25rem] [--r-full:1.125rem] [--r-pressed:0.375rem] [--r-square:0.625rem]",
      icon: "h-10 w-(--iw) px-0 [--icon:1.125rem] [--iw-narrow:2rem] [--iw-wide:3.25rem] [--iw:2.5rem] [--r-full:1.25rem] [--r-pressed:0.5rem] [--r-square:0.75rem]",
      "icon-md":
        "h-10 w-(--iw) px-0 [--icon:1.125rem] [--iw-narrow:2rem] [--iw-wide:3.25rem] [--iw:2.5rem] [--r-full:1.25rem] [--r-pressed:0.5rem] [--r-square:0.75rem]",
      "icon-lg":
        "h-12 w-(--iw) px-0 [--icon:1.25rem] [--iw-narrow:2.5rem] [--iw-wide:4rem] [--iw:3rem] [--r-full:1.5rem] [--r-pressed:0.625rem] [--r-square:0.875rem]",
      "icon-xl":
        "h-14 w-(--iw) px-0 [--icon:1.5rem] [--iw-narrow:3rem] [--iw-wide:5rem] [--iw:3.5rem] [--r-full:1.75rem] [--r-pressed:0.75rem] [--r-square:1rem]",
    },
    width: {
      narrow: "w-(--iw-narrow)",
      wide: "w-(--iw-wide)",
    },
  },
});
