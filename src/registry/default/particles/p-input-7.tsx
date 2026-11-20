"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      className="w-72"
      defaultValue="s3cr3t-p@ss"
      placeholder="Password"
      type={visible ? "text" : "password"}
    >
      <Button
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((prev) => !prev)}
        size="icon"
        variant="ghost"
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </Input>
  );
}
