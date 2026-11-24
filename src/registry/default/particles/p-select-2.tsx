import {
  Select,
  SelectItem,
  SelectLabel,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const roles = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-60 flex-col">
      <Select defaultValue="editor" items={roles}>
        <SelectLabel>Role</SelectLabel>
        <SelectTrigger variant="outline">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectPopup>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}
