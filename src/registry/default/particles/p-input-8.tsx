import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Input
      aria-invalid="true"
      className="w-72"
      defaultValue="invalid-email"
      placeholder="Enter your email"
      type="email"
    />
  );
}
