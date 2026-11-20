import { SearchIcon } from "lucide-react";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Input
      className="w-72"
      placeholder="Search components…"
      startAddon={<SearchIcon />}
      type="search"
    />
  );
}
