import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const items = [
  {
    content:
      "You can expand more than one section at the same time when the multiple prop is enabled.",
    id: "1",
    title: "Can I open multiple items at once?",
  },
  {
    content:
      "Each expanded item detaches smoothly from its neighbors with spring motion and rounded corners.",
    id: "2",
    title: "How do the surfaces transition?",
  },
  {
    content:
      "Disabled items stay visible in the list while preventing interaction and keyboard focus.",
    id: "3",
    title: "What about disabled items?",
  },
];

export default function Particle() {
  return (
    <Accordion className="w-full" defaultValue={["1", "2"]} multiple>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
