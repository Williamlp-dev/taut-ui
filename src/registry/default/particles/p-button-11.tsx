"use client";

import { BookmarkIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  const [saved, setSaved] = React.useState(false);

  return (
    <Button
      morph
      onClick={(): void => setSaved((prev) => !prev)}
      selected={saved}
    >
      <BookmarkIcon
        aria-hidden="true"
        className={saved ? "fill-current" : undefined}
      />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
