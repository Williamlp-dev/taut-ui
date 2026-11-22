import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";

const channels = [
  { label: "Email digest", value: "email" },
  { label: "Slack alerts", value: "slack" },
  { label: "Webhook events", value: "webhook" },
];

export default function Particle() {
  return (
    <CheckboxGroup defaultValue={["email", "slack"]}>
      {channels.map((channel) => (
        <label
          className="inline-flex cursor-pointer select-none items-center gap-2.5 text-foreground text-sm leading-5"
          key={channel.value}
        >
          <Checkbox value={channel.value} />
          {channel.label}
        </label>
      ))}
    </CheckboxGroup>
  );
}
