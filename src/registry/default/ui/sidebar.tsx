"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";

type SidebarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext: React.Context<SidebarContextProps | null> =
  React.createContext<SidebarContextProps | null>(null);

export function useSidebar(): SidebarContextProps {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}): React.ReactElement {
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)): void => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open],
  );
  const [openMobile, setOpenMobile] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
  }, [isMobile, setOpen]);
  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      <div
        className={cn("flex min-h-svh w-full", className)}
        data-slot="sidebar-wrapper"
        style={style}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  className,
  collapsible = "offcanvas",
  render,
  ...props
}: useRender.ComponentProps<"aside"> & {
  collapsible?: "offcanvas" | "icon" | "none";
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex h-full w-(--sidebar-width) flex-col text-sidebar-foreground",
      className,
    ),
    "data-collapsible": collapsible,
    "data-slot": "sidebar",
  };
  return useRender({
    defaultTagName: "aside",
    props: mergeProps<"aside">(defaultProps, props),
    render,
  });
}

export function SidebarContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden [scrollbar-color:transparent_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] in-[[data-slot=sidebar]:hover]:[scrollbar-color:var(--border)_transparent] focus-within:[scrollbar-color:var(--border)_transparent] hover:[scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent in-[[data-slot=sidebar]:hover]:[&::-webkit-scrollbar-thumb]:bg-border focus-within:[&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:size-1.5",
      className,
    ),
    "data-slot": "sidebar-content",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SidebarGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("relative flex w-full min-w-0 flex-col", className),
    "data-slot": "sidebar-group",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex h-8 shrink-0 items-center px-3 font-medium text-muted-foreground text-xs leading-4 outline-none",
      className,
    ),
    "data-slot": "sidebar-group-label",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SidebarGroupContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("w-full", className),
    "data-slot": "sidebar-group-content",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SidebarMenu({
  className,
  render,
  ...props
}: useRender.ComponentProps<"ul">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "m-0 flex w-full min-w-0 list-none flex-col gap-0.5 p-0",
      className,
    ),
    "data-slot": "sidebar-menu",
  };
  return useRender({
    defaultTagName: "ul",
    props: mergeProps<"ul">(defaultProps, props),
    render,
  });
}

export function SidebarMenuItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"li">): React.ReactElement {
  const defaultProps = {
    className: cn("relative list-none", className),
    "data-slot": "sidebar-menu-item",
  };
  return useRender({
    defaultTagName: "li",
    props: mergeProps<"li">(defaultProps, props),
    render,
  });
}

export function SidebarMenuButton({
  isActive,
  morph = true,
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"button"> & {
  isActive?: boolean;
  morph?: boolean;
}): React.ReactElement {
  const defaultProps = {
    "aria-current": isActive ? ("page" as const) : undefined,
    children: (
      <>
        {children}
        <Ripple hoverOpacity={0} />
      </>
    ),
    className: cn(
      "group relative flex min-h-10 w-full select-none items-center justify-between gap-3 px-3.5 py-2 font-medium text-sidebar-foreground text-sm leading-5 outline-none [&_svg]:size-4.5 [&_svg]:shrink-0",
      morph
        ? "rounded-lg transition-[border-radius] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] hover:rounded-xl active:rounded-xl data-[active=true]:rounded-xl motion-reduce:transition-none"
        : "rounded-lg",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0",
      "hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:before:opacity-0",
      className,
    ),
    "data-active": isActive,
    "data-slot": "sidebar-menu-button",
  };
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
