"use client";

import {
  CreditCardIcon,
  LayoutDashboardIcon,
  RocketIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const navItems = [
  { icon: LayoutDashboardIcon, id: "overview", label: "Overview" },
  { icon: RocketIcon, id: "deployments", label: "Deployments" },
  { icon: UsersIcon, id: "team", label: "Team members" },
  { icon: CreditCardIcon, id: "billing", label: "Billing & usage" },
];

export default function Particle() {
  const [active, setActive] = useState("overview");

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Left</Button>} />
      <SheetPopup side="left">
        <SheetHeader>
          <SheetTitle>Workspace navigation</SheetTitle>
          <SheetDescription>
            Switch between projects, environments, and shared views.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid gap-1">
          {navItems.map((item) => (
            <Button
              className="w-full justify-start"
              key={item.id}
              onClick={() => setActive(item.id)}
              selected={active === item.id}
              variant={active === item.id ? "secondary" : "ghost"}
            >
              <item.icon />
              {item.label}
            </Button>
          ))}
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
