export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "button",
    name: "Button",
    description:
      "Interactive button with corner morphing, spring animations, and ripple effects.",
  },
  {
    slug: "card",
    name: "Card",
    description:
      "Content container with elevated, filled, and outlined variants plus header frame support.",
  },
  {
    slug: "dialog",
    name: "Dialog",
    description:
      "Modal surface with tactile entering scale, spring physics, and focus trapping.",
  },
  {
    slug: "switch",
    name: "Switch",
    description:
      "Tactile toggle switch with handle scaling on press, icons, and smooth track transitions.",
  },
  {
    slug: "slider",
    name: "Slider",
    description:
      "Discrete and continuous sliders with tactile thumb growth and value indicators.",
  },
  {
    slug: "tabs",
    name: "Tabs",
    description:
      "Tactile tabbed interfaces with active pill indicator and smooth animations.",
  },
  {
    slug: "toast",
    name: "Toast",
    description:
      "Snackbars and anchored toasts with spatial spring entrance and swipe dismissal.",
  },
  {
    slug: "badge",
    name: "Badge",
    description:
      "Notification indicators and status tags with spring scale-in transitions.",
  },
  {
    slug: "input",
    name: "Input",
    description:
      "Accessible text inputs with state layers, floating hints, and prefix/suffix support.",
  },
  {
    slug: "menu",
    name: "Menu",
    description:
      "Dropdown and context menus with cascade animations, hotkeys, and submenus.",
  },
  {
    slug: "spinner",
    name: "Spinner & Progress",
    description:
      "Circular progress spinners with indeterminate and determinate states.",
  },
  {
    slug: "accordion",
    name: "Accordion",
    description:
      "Expandable content sections with fluid height animations and chevron rotation.",
  },
  {
    slug: "sheet",
    name: "Sheet / Drawer",
    description:
      "Side drawer surfaces anchored to the viewport edges with tactile spring drag.",
  },
];
