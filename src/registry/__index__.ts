// @ts-nocheck
// Arquivo GERADO por scripts/build-registry.ts — não edite.
import * as React from "react";

export const Index: Record<string, unknown> = {
  accordion: {
    name: "accordion",
    description: "accordion (ui)",
    type: "registry:ui",
    registryDependencies: ["ripple"],
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [
      { path: "src/registry/default/ui/accordion.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  autocomplete: {
    name: "autocomplete",
    description: "autocomplete (ui)",
    type: "registry:ui",
    registryDependencies: ["button", "input", "menu"],
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
      "lucide-react",
    ],
    files: [
      { path: "src/registry/default/ui/autocomplete.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  badge: {
    name: "badge",
    description: "badge (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [{ path: "src/registry/default/ui/badge.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  button: {
    name: "button",
    description: "button (ui)",
    type: "registry:ui",
    registryDependencies: ["morph", "ripple", "spinner"],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [
      { path: "src/registry/default/ui/button.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  card: {
    name: "card",
    description: "card (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [{ path: "src/registry/default/ui/card.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  command: {
    name: "command",
    description: "command (ui)",
    type: "registry:ui",
    registryDependencies: ["autocomplete", "ripple"],
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [
      { path: "src/registry/default/ui/command.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  drawer: {
    name: "drawer",
    description: "drawer (ui)",
    type: "registry:ui",
    registryDependencies: ["button", "ripple", "scroll-area"],
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [
      { path: "src/registry/default/ui/drawer.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  empty: {
    name: "empty",
    description: "empty (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["class-variance-authority"],
    files: [{ path: "src/registry/default/ui/empty.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  input: {
    name: "input",
    description: "input (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [{ path: "src/registry/default/ui/input.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  kbd: {
    name: "kbd",
    description: "kbd (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    files: [{ path: "src/registry/default/ui/kbd.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  menu: {
    name: "menu",
    description: "menu (ui)",
    type: "registry:ui",
    registryDependencies: ["scroll-area", "switch"],
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
      "lucide-react",
    ],
    files: [{ path: "src/registry/default/ui/menu.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  popover: {
    name: "popover",
    description: "popover (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [
      { path: "src/registry/default/ui/popover.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  "scroll-area": {
    name: "scroll-area",
    description: "scroll area (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      { path: "src/registry/default/ui/scroll-area.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  separator: {
    name: "separator",
    description: "separator (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [
      { path: "src/registry/default/ui/separator.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  sheet: {
    name: "sheet",
    description: "sheet (ui)",
    type: "registry:ui",
    registryDependencies: ["button", "scroll-area"],
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [{ path: "src/registry/default/ui/sheet.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  sidebar: {
    name: "sidebar",
    description: "sidebar (ui)",
    type: "registry:ui",
    registryDependencies: ["ripple"],
    dependencies: ["@base-ui/react"],
    files: [
      { path: "src/registry/default/ui/sidebar.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  skeleton: {
    name: "skeleton",
    description: "skeleton (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    files: [
      { path: "src/registry/default/ui/skeleton.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  spinner: {
    name: "spinner",
    description: "spinner (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["class-variance-authority"],
    files: [
      { path: "src/registry/default/ui/spinner.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  switch: {
    name: "switch",
    description: "switch (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      { path: "src/registry/default/ui/switch.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  tabs: {
    name: "tabs",
    description: "tabs (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [{ path: "src/registry/default/ui/tabs.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  toast: {
    name: "toast",
    description: "toast (ui)",
    type: "registry:ui",
    registryDependencies: ["button", "morph"],
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [{ path: "src/registry/default/ui/toast.tsx", type: "registry:ui" }],
    component: null,
    categories: ["ui"],
  },
  tooltip: {
    name: "tooltip",
    description: "tooltip (ui)",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@base-ui/react", "class-variance-authority"],
    files: [
      { path: "src/registry/default/ui/tooltip.tsx", type: "registry:ui" },
    ],
    component: null,
    categories: ["ui"],
  },
  "use-copy-to-clipboard": {
    name: "use-copy-to-clipboard",
    description: "use copy to clipboard (hooks)",
    type: "registry:hook",
    registryDependencies: [],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/hooks/use-copy-to-clipboard.ts",
        type: "registry:hook",
      },
    ],
    component: null,
    categories: ["hook"],
  },
  morph: {
    name: "morph",
    description: "morph (lib)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["class-variance-authority"],
    files: [
      { path: "src/registry/default/lib/morph.tsx", type: "registry:lib" },
    ],
    component: null,
    categories: ["lib"],
  },
  ripple: {
    name: "ripple",
    description: "ripple (lib)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: [],
    files: [
      { path: "src/registry/default/lib/ripple.tsx", type: "registry:lib" },
    ],
    component: null,
    categories: ["lib"],
  },
  utils: {
    name: "utils",
    description: "utils (lib)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      { path: "src/registry/default/lib/utils.ts", type: "registry:lib" },
    ],
    component: null,
    categories: ["lib"],
  },
  "csp-provider": {
    name: "csp-provider",
    description: "csp provider (base-ui)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "src/registry/default/base-ui/csp-provider.ts",
        type: "registry:lib",
      },
    ],
    component: null,
    categories: ["lib"],
  },
  "direction-provider": {
    name: "direction-provider",
    description: "direction provider (base-ui)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "src/registry/default/base-ui/direction-provider.ts",
        type: "registry:lib",
      },
    ],
    component: null,
    categories: ["lib"],
  },
  "merge-props": {
    name: "merge-props",
    description: "merge props (base-ui)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "src/registry/default/base-ui/merge-props.ts",
        type: "registry:lib",
      },
    ],
    component: null,
    categories: ["lib"],
  },
  "use-render": {
    name: "use-render",
    description: "use render (base-ui)",
    type: "registry:lib",
    registryDependencies: [],
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "src/registry/default/base-ui/use-render.ts",
        type: "registry:lib",
      },
    ],
    component: null,
    categories: ["lib"],
  },
  "p-button-1": {
    name: "p-button-1",
    description: "button example 1",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-1.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-1");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-10": {
    name: "p-button-10",
    description: "button example 10",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-10.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-10");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-11": {
    name: "p-button-11",
    description: "button example 11",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-11.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-11");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-12": {
    name: "p-button-12",
    description: "button example 12",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-12.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-12");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button", "async"],
  },
  "p-button-13": {
    name: "p-button-13",
    description: "button example 13",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-13.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-13");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-14": {
    name: "p-button-14",
    description: "button example 14",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-14.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-14");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button", "async"],
  },
  "p-button-15": {
    name: "p-button-15",
    description: "button example 15",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-15.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-15");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-2": {
    name: "p-button-2",
    description: "button example 2",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-2.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-2");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-3": {
    name: "p-button-3",
    description: "button example 3",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-3.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-3");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-4": {
    name: "p-button-4",
    description: "button example 4",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-4.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-4");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-5": {
    name: "p-button-5",
    description: "button example 5",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-5.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-5");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-6": {
    name: "p-button-6",
    description: "button example 6",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-6.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-6");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-7": {
    name: "p-button-7",
    description: "button example 7",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-7.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-7");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-8": {
    name: "p-button-8",
    description: "button example 8",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: [],
    files: [
      {
        path: "src/registry/default/particles/p-button-8.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-8");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
  "p-button-9": {
    name: "p-button-9",
    description: "button example 9",
    type: "registry:example",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/default/particles/p-button-9.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/particles/p-button-9");
      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");
      return { default: mod.default ?? mod[key] };
    }),
    categories: ["button"],
  },
};
