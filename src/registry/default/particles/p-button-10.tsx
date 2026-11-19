"use client";

import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [selected, setSelected] = useState(false);

  return (
    <Button
      morph
      onClick={() => setSelected((prev) => !prev)}
      selected={selected}
      variant="secondary"
    >
      <HeartIcon className={selected ? "fill-current" : undefined} />
      Favorite
    </Button>
  );
}
