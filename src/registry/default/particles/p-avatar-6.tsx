import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export default function Particle() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          alt="Lucas Santos"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>LS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          alt="Ana Costa"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          alt="Rafael Lima"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          alt="Clara Mendes"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>CM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
