import { Card } from "@/registry/default/ui/card";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Separator } from "@/registry/default/ui/separator";

const tags = [
  "Base UI",
  "Tailwind CSS",
  "Next.js",
  "React",
  "TypeScript",
  "Class Variance Authority",
  "Lucide Icons",
  "Biome",
  "Jotai",
  "Fumadocs",
  "Shiki",
  "Zod",
];

export default function Particle() {
  return (
    <Card className="h-56 w-64 overflow-hidden">
      <ScrollArea overscrollContain>
        <div className="p-4">
          <h4 className="mb-2 font-medium text-foreground text-sm">Stack</h4>
          {tags.map((tag, index) => (
            <div key={tag}>
              <p className="py-2 text-muted-foreground text-sm">{tag}</p>
              {index < tags.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
