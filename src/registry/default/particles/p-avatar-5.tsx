import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export default function Particle() {
  return (
    <Avatar size="xl">
      <AvatarImage
        alt="Clara Mendes"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&dpr=2&q=80"
      />
      <AvatarFallback>CM</AvatarFallback>
    </Avatar>
  );
}
