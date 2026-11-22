import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export default function Particle() {
  return (
    <Avatar size="sm">
      <AvatarImage
        alt="Ana Costa"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
      />
      <AvatarFallback>AC</AvatarFallback>
    </Avatar>
  );
}
