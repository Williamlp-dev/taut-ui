import { SearchIcon } from "lucide-react";
import { Input } from "@/registry/default/ui/input";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function Particle() {
  return (
    <Input
      className="w-72"
      placeholder="Search…"
      startAddon={<SearchIcon />}
      type="search"
    >
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Input>
  );
}
