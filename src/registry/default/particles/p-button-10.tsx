import { DownloadIcon } from "lucide-react";
import type React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  return (
    <Button>
      <DownloadIcon aria-hidden="true" />
      Download
    </Button>
  );
}
