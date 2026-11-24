import { GlobeIcon } from "lucide-react";
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const timezones = [
  { label: "Pacific Time (PT)", value: "america-los_angeles" },
  { label: "Eastern Time (ET)", value: "america-new_york" },
  { label: "Brasilia Time (BRT)", value: "america-sao_paulo" },
  { label: "Greenwich Mean Time (GMT)", value: "europe-london" },
  { label: "Central European Time (CET)", value: "europe-paris" },
  { label: "Japan Standard Time (JST)", value: "asia-tokyo" },
];

export default function Particle() {
  return (
    <Select defaultValue="america-sao_paulo" items={timezones}>
      <SelectTrigger
        aria-label="Timezone"
        className="w-full max-w-64"
        startAddon={<GlobeIcon />}
      >
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Americas</SelectGroupLabel>
          <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
          <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
          <SelectItem value="america-sao_paulo">Brasilia Time (BRT)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Europe &amp; Asia</SelectGroupLabel>
          <SelectItem value="europe-london">
            Greenwich Mean Time (GMT)
          </SelectItem>
          <SelectItem value="europe-paris">
            Central European Time (CET)
          </SelectItem>
          <SelectItem value="asia-tokyo">Japan Standard Time (JST)</SelectItem>
        </SelectGroup>
      </SelectPopup>
    </Select>
  );
}
