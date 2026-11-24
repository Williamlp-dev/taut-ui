import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "System UI", value: "system" },
];

export default function Particle() {
  return (
    <Select defaultValue="sans" items={fonts}>
      <SelectTrigger aria-label="Font family" className="w-full max-w-56">
        <SelectValue placeholder="Choose a font" />
      </SelectTrigger>
      <SelectPopup alignItemWithTrigger>
        {fonts.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            {font.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
