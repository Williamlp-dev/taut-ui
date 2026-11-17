"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return (): void => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      onClick={(): void => setCopied(true)}
      selected={copied}
      variant="tonal"
    >
      {copied ? (
        <>
          <CheckIcon aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon aria-hidden="true" />
          Copy Token
        </>
      )}
    </Button>
  );
}
