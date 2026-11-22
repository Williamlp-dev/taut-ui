import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export default function Particle() {
  return (
    <Avatar size="lg">
      <AvatarImage
        alt="Rafael Lima"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&dpr=2&q=80"
      />
      <AvatarFallback>RL</AvatarFallback>
    </Avatar>
  );
}
