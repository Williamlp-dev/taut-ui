import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const frameworks = [
  { label: "Next.js", value: "nextjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
  { label: "Nuxt", value: "nuxt" },
  { label: "SvelteKit", value: "sveltekit" },
];

export default function Particle() {
  return (
    <Select items={frameworks}>
      <SelectTrigger aria-label="Select framework" className="w-full max-w-60">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectPopup>
        {frameworks.map((framework) => (
          <SelectItem key={framework.value} value={framework.value}>
            {framework.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
