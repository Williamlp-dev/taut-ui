import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  return (
    <Button render={<Link href="/docs" />}>
      Documentation
      <ArrowUpRightIcon aria-hidden="true" />
    </Button>
  );
}
