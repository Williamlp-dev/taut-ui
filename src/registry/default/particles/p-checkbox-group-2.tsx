import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";

const permissions = [
  { label: "Read repositories", value: "read" },
  { label: "Write deployments", value: "write" },
  { label: "Manage billing", value: "billing" },
];

export default function Particle() {
  return (
    <CheckboxGroup
      allValues={permissions.map((item) => item.value)}
      defaultValue={["read"]}
    >
      <label className="inline-flex cursor-pointer select-none items-center gap-2.5 text-foreground text-sm leading-5">
        <Checkbox parent />
        Workspace permissions
      </label>
      {permissions.map((permission) => (
        <label
          className="inline-flex cursor-pointer select-none items-center gap-2.5 text-foreground text-sm leading-5"
          key={permission.value}
        >
          <Checkbox value={permission.value} />
          {permission.label}
        </label>
      ))}
    </CheckboxGroup>
  );
}
