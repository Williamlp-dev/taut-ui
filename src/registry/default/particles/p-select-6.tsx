import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const regions = [
  { label: "US East (Virginia)", value: "us-east-1" },
  { label: "South America (São Paulo)", value: "sa-east-1" },
  { label: "Europe (Frankfurt)", value: "eu-central-1" },
  { label: "Asia Pacific (Tokyo)", value: "ap-northeast-1" },
];

export default function Particle() {
  return (
    <Field className="w-full max-w-64">
      <FieldLabel>Deployment region</FieldLabel>
      <Select defaultValue="sa-east-1" items={regions}>
        <SelectTrigger>
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectPopup>
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <FieldDescription>
        Choose the region closest to your users.
      </FieldDescription>
    </Field>
  );
}
