import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

export default function Particle() {
  const items = [
    {
      content:
        "taut-ui combines shadcn UI patterns with tactile spring motion, corner morphing, and accessible Base UI primitives.",
      id: "1",
      title: "What is taut-ui?",
    },
    {
      content:
        "Browse the components in the documentation and copy the code or install via shadcn CLI directly into your project.",
      id: "2",
      title: "How do I get started?",
    },
    {
      content:
        "Yes! Every component is built with accessible primitives, responsive tokens, and smooth spring physics.",
      id: "3",
      title: "Is it production ready and accessible?",
    },
  ];

  return (
    <Accordion className="w-full" defaultValue={["3"]}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
