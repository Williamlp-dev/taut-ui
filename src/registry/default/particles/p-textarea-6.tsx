import { Textarea } from "@/registry/default/ui/textarea";

export default function Particle() {
  return (
    <Textarea
      placeholder="Auto-grows with content without a resize handle..."
      resize="none"
    />
  );
}
