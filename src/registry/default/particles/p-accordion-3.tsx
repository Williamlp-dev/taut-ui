import { PaletteIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const items = [
  {
    content:
      "Built on tonal surfaces and CSS tokens that adapt cleanly between light and dark themes.",
    icon: PaletteIcon,
    id: "1",
    title: "Surface-first design",
  },
  {
    content:
      "Keyboard navigation, ARIA attributes, and focus management are handled out of the box by Base UI.",
    icon: ShieldCheckIcon,
    id: "2",
    title: "Accessible by default",
  },
  {
    content:
      "Spring-based height, corner morphing, and ripple feedback respect prefers-reduced-motion.",
    icon: ZapIcon,
    id: "3",
    title: "Expressive motion",
  },
];

export default function Particle() {
  return (
    <Accordion className="w-full" defaultValue={["1"]}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <item.icon className="size-4 shrink-0 text-muted-foreground" />
              <span>{item.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
