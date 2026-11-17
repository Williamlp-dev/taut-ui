import {
  AlertCircleIcon,
  BellIcon,
  BoldIcon,
  BookmarkIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CircleCheckIcon,
  InfoIcon,
  ItalicIcon,
  MenuIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  UnderlineIcon,
  UserRoundIcon,
  Volume2Icon,
  XIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BarProps {
  className?: string;
  tone?: "main" | "muted" | "primary" | "on-primary" | "destructive";
}

function Bar({ className, tone = "main" }: BarProps) {
  const bg =
    tone === "primary"
      ? "bg-primary/85"
      : tone === "on-primary"
        ? "bg-primary-foreground/90"
        : tone === "destructive"
          ? "bg-destructive/75"
          : tone === "main"
            ? "bg-foreground/60"
            : "bg-muted-foreground/28";

  return <div className={cn("h-1.5 rounded-full", bg, className)} />;
}

interface PillButtonProps {
  variant?: "primary" | "tonal" | "outline";
  className?: string;
  children?: ReactNode;
}

function PillButton({
  variant = "tonal",
  className,
  children,
}: PillButtonProps) {
  return (
    <div
      className={cn(
        "inline-flex h-6 items-center justify-center rounded-full px-3",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "tonal" && "bg-secondary text-secondary-foreground",
        variant === "outline" &&
          "border border-border bg-background text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SurfaceProps {
  children?: ReactNode;
  className?: string;
  variant?: "card" | "popup" | "control";
}

function Surface({ children, className, variant = "card" }: SurfaceProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col",
        variant === "card" &&
          "rounded-3xl border border-border bg-card text-card-foreground shadow-xs",
        variant === "popup" &&
          "rounded-[24px] border border-border bg-popover text-popover-foreground shadow-md",
        variant === "control" &&
          "rounded-full bg-background not-dark:bg-clip-padding text-foreground shadow-[inset_0_0_0_1px_var(--color-input)] dark:bg-input/32",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CheckboxRow({
  state = "unchecked",
  className,
}: {
  state?: "unchecked" | "checked" | "indeterminate";
  className?: string;
}) {
  const isActive = state !== "unchecked";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "grid size-4.5 shrink-0 place-items-center rounded-[3px]",
          isActive
            ? "bg-primary text-primary-foreground"
            : "inset-ring-2 inset-ring-muted-foreground/60",
        )}
      >
        {state === "checked" && <CheckIcon className="size-3 stroke-[3]" />}
        {state === "indeterminate" && (
          <MinusIcon className="size-3 stroke-[3]" />
        )}
      </div>
      <Bar className="flex-1" tone={isActive ? "main" : "muted"} />
    </div>
  );
}

function RadioRow({
  checked = false,
  className,
}: {
  checked?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "inset-ring-2 grid size-4.5 shrink-0 place-items-center rounded-full",
          checked ? "inset-ring-primary" : "inset-ring-muted-foreground/60",
        )}
      >
        {checked && <div className="size-2 rounded-full bg-primary" />}
      </div>
      <Bar className="flex-1" tone={checked ? "main" : "muted"} />
    </div>
  );
}

function ControlField({
  labelWidth = "w-14",
  invalid = false,
}: {
  labelWidth?: string;
  invalid?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Bar className={cn("ms-1", labelWidth)} tone="main" />
      <Surface
        className={cn(
          "h-8.5 flex-row items-center px-3.5",
          invalid && "shadow-[inset_0_0_0_2px_var(--color-destructive)]!",
        )}
        variant="control"
      >
        <Bar className="w-[52%]" tone="muted" />
      </Surface>
      {invalid && <Bar className="ms-1 w-[64%]" tone="destructive" />}
    </div>
  );
}

export const accordionThumbnail = (
  <div className="flex w-full max-w-52 flex-col gap-1">
    <div className="flex items-center justify-between rounded-t-2xl rounded-b-[4px] border border-border bg-card px-3.5 py-2">
      <Bar className="w-[48%]" tone="muted" />
      <ChevronDownIcon className="size-3.5 text-muted-foreground" />
    </div>
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-xs">
      <div className="flex items-center justify-between">
        <Bar className="w-[46%]" tone="main" />
        <ChevronDownIcon className="size-3.5 rotate-180 text-foreground" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Bar className="w-[90%]" tone="muted" />
        <Bar className="w-[68%]" tone="muted" />
      </div>
    </div>
    <div className="flex items-center justify-between rounded-t-[4px] rounded-b-2xl border border-border bg-card px-3.5 py-2">
      <Bar className="w-[56%]" tone="muted" />
      <ChevronDownIcon className="size-3.5 text-muted-foreground" />
    </div>
  </div>
);

export const alertThumbnail = (
  <Surface className="max-w-52 flex-row items-start gap-2.5 rounded-2xl p-3">
    <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
      <AlertCircleIcon className="size-3.5" />
    </div>
    <div className="flex flex-1 flex-col gap-1.5 pt-1">
      <Bar className="w-[52%]" tone="main" />
      <Bar className="w-[88%]" tone="muted" />
    </div>
  </Surface>
);

export const alertDialogThumbnail = (
  <Surface className="max-w-48 gap-3.5 p-4" variant="popup">
    <div className="flex flex-col gap-2">
      <Bar className="w-[54%]" tone="main" />
      <Bar className="w-[92%]" tone="muted" />
      <Bar className="w-[70%]" tone="muted" />
    </div>
    <div className="flex items-center justify-end gap-1.5">
      <PillButton className="px-2.5" variant="tonal">
        <Bar className="w-7" tone="main" />
      </PillButton>
      <PillButton className="px-2.5" variant="primary">
        <Bar className="w-7" tone="on-primary" />
      </PillButton>
    </div>
  </Surface>
);

export const autocompleteThumbnail = (
  <div className="flex w-full max-w-50 flex-col gap-1.5">
    <Surface
      className="h-9 flex-row items-center gap-2 px-3 shadow-[inset_0_0_0_2px_var(--color-primary)]"
      variant="control"
    >
      <SearchIcon className="size-3.5 shrink-0 text-primary" />
      <Bar className="w-[46%]" tone="main" />
      <span className="h-3.5 w-0.5 rounded-full bg-primary" />
      <ChevronsUpDownIcon className="ms-auto size-3.5 shrink-0 text-muted-foreground" />
    </Surface>
    <Surface className="gap-0.5 rounded-[20px] p-1.5" variant="popup">
      <div className="flex items-center rounded-[12px] bg-secondary px-2.5 py-1.5">
        <Bar className="w-[58%]" tone="main" />
      </div>
      <div className="flex items-center px-2.5 py-1.5">
        <Bar className="w-[72%]" tone="muted" />
      </div>
      <div className="flex items-center px-2.5 py-1.5">
        <Bar className="w-[50%]" tone="muted" />
      </div>
    </Surface>
  </div>
);

export const avatarThumbnail = (
  <div className="flex items-center">
    <div className="grid size-10 place-items-center rounded-full bg-primary/20 text-primary ring-2 ring-background">
      <UserRoundIcon className="size-4.5" />
    </div>
    <div className="-ms-2.5 grid size-10 place-items-center rounded-full bg-secondary font-medium text-secondary-foreground text-xs ring-2 ring-background">
      TU
    </div>
    <div className="-ms-2.5 grid size-10 place-items-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background">
      +3
    </div>
  </div>
);

export const badgeThumbnail = (
  <div className="flex items-center gap-3">
    <div className="relative grid size-10 place-items-center rounded-2xl border border-border bg-card shadow-xs">
      <BellIcon className="size-4 text-muted-foreground" />
      <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-bold font-mono text-[10px] text-primary-foreground">
        3
      </span>
    </div>
    <div className="flex flex-col items-start gap-1.5">
      <div className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-primary px-2.5">
        <span className="size-1.5 rounded-full bg-primary-foreground" />
        <Bar className="w-9" tone="on-primary" />
      </div>
      <div className="inline-flex h-5.5 items-center gap-1.5 rounded-full border border-input bg-background px-2.5 dark:bg-input/32">
        <span className="size-1.5 rounded-full bg-success" />
        <Bar className="w-11" tone="main" />
      </div>
    </div>
  </div>
);

export const breadcrumbThumbnail = (
  <div className="flex items-center gap-1.5">
    <Bar className="w-9" tone="muted" />
    <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground/60" />
    <Bar className="w-10" tone="muted" />
    <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground/60" />
    <div className="flex h-6.5 items-center rounded-full bg-secondary px-2.5">
      <Bar className="w-10" tone="main" />
    </div>
  </div>
);

export const buttonThumbnail = (
  <div className="flex items-center gap-2">
    <div className="flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-primary-foreground shadow-xs">
      <CheckIcon className="size-4" />
      <Bar className="w-11" tone="on-primary" />
    </div>
    <div className="flex h-10 items-center rounded-full border border-border bg-background px-3.5 dark:bg-input/32">
      <Bar className="w-9" tone="main" />
    </div>
    <div className="grid size-10 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
      <PlusIcon className="size-4" />
    </div>
  </div>
);

export const calendarThumbnail = (
  <Surface className="max-w-44 gap-2.5 p-3.5">
    <div className="flex items-center justify-between">
      <ChevronLeftIcon className="size-3.5 text-muted-foreground" />
      <Bar className="w-16" tone="main" />
      <ChevronRightIcon className="size-3.5 text-muted-foreground" />
    </div>
    <div className="grid grid-cols-5 justify-items-center gap-1.5">
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-primary" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-secondary" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-muted" />
      <div className="size-4 rounded-full bg-muted" />
    </div>
  </Surface>
);

export const cardThumbnail = (
  <Surface className="max-w-48 gap-2.5 p-3">
    <div className="flex h-11 items-center justify-between rounded-2xl bg-secondary/65 px-3">
      <div className="size-5 rounded-full bg-primary/30" />
      <div className="h-2 w-10 rounded-full bg-primary/40" />
    </div>
    <div className="flex flex-col gap-1.5 px-0.5">
      <Bar className="w-[58%]" tone="main" />
      <Bar className="w-[86%]" tone="muted" />
    </div>
    <div className="flex justify-end">
      <PillButton className="h-5 px-2.5" variant="primary">
        <Bar className="w-7" tone="on-primary" />
      </PillButton>
    </div>
  </Surface>
);

export const checkboxThumbnail = (
  <div className="flex w-full max-w-36 flex-col gap-2.5">
    <CheckboxRow state="checked" />
    <CheckboxRow state="indeterminate" />
    <CheckboxRow state="unchecked" />
  </div>
);

export const checkboxGroupThumbnail = (
  <div className="flex w-full max-w-40 flex-col gap-2.5">
    <CheckboxRow state="indeterminate" />
    <div className="relative ms-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -start-[15px] -top-2.5 h-5 w-2.5 border-border border-s border-b"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -start-[15px] top-2.5 -bottom-2.5 w-px bg-border"
      />
      <CheckboxRow state="checked" />
    </div>
    <div className="relative ms-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -start-[15px] -top-2.5 h-5 w-2.5 rounded-bl-[5px] border-border border-s border-b"
      />
      <CheckboxRow state="unchecked" />
    </div>
  </div>
);

export const collapsibleThumbnail = (
  <div className="flex w-full max-w-50 flex-col gap-2">
    <div className="flex items-center justify-between gap-3 rounded-full bg-secondary py-1.5 ps-3.5 pe-1.5">
      <Bar className="w-[54%]" tone="main" />
      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <ChevronDownIcon className="size-3.5 rotate-180" />
      </div>
    </div>
    <Surface className="gap-1.5 rounded-2xl p-3">
      <Bar className="w-[82%]" tone="muted" />
      <Bar className="w-[62%]" tone="muted" />
    </Surface>
  </div>
);

export const comboboxThumbnail = (
  <Surface
    className="h-10 max-w-52 flex-row items-center gap-1.5 ps-2 pe-2.5"
    variant="control"
  >
    <div className="flex h-6 items-center gap-1 rounded-full bg-secondary ps-2.5 pe-1.5">
      <Bar className="w-7" tone="main" />
      <XIcon className="size-3 text-muted-foreground" />
    </div>
    <div className="flex h-6 items-center gap-1 rounded-full bg-secondary ps-2.5 pe-1.5">
      <Bar className="w-7" tone="main" />
      <XIcon className="size-3 text-muted-foreground" />
    </div>
    <ChevronsUpDownIcon className="ms-auto size-4 shrink-0 text-muted-foreground" />
  </Surface>
);

export const commandThumbnail = (
  <Surface className="max-w-52 gap-1.5 p-1.5" variant="popup">
    <div className="flex items-center gap-2 px-2.5 py-1.5">
      <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
      <Bar className="w-[46%]" tone="main" />
    </div>
    <div className="flex flex-col gap-0.5 rounded-[18px] border border-border bg-background p-1.5">
      <div className="flex items-center justify-between rounded-[12px] bg-secondary px-2.5 py-1.5">
        <Bar className="w-[54%]" tone="main" />
        <span className="font-mono text-[10px] text-secondary-foreground/80">
          ⌘K
        </span>
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <Bar className="w-[64%]" tone="muted" />
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <Bar className="w-[42%]" tone="muted" />
      </div>
    </div>
  </Surface>
);

export const contextMenuThumbnail = (
  <div className="relative flex w-full max-w-50 flex-col">
    <div className="h-16 rounded-2xl border border-border border-dashed bg-muted/30" />
    <Surface
      className="ms-auto -mt-6 w-34 gap-0.5 rounded-[18px] p-1.5"
      variant="popup"
    >
      <div className="flex items-center justify-between rounded-[10px] bg-secondary px-2.5 py-1.5">
        <Bar className="w-14" tone="main" />
      </div>
      <div className="px-2.5 py-1.5">
        <Bar className="w-16" tone="muted" />
      </div>
      <div className="px-2.5 py-1.5">
        <Bar className="w-12" tone="muted" />
      </div>
    </Surface>
  </div>
);

export const datePickerThumbnail = (
  <Surface
    className="h-10 max-w-48 flex-row items-center gap-2.5 px-3.5"
    variant="control"
  >
    <CalendarIcon className="size-4 shrink-0 text-primary" />
    <Bar className="w-[56%]" tone="main" />
    <ChevronDownIcon className="ms-auto size-3.5 shrink-0 text-muted-foreground" />
  </Surface>
);

export const dialogThumbnail = (
  <Surface className="max-w-50 gap-3.5 p-4" variant="popup">
    <XIcon className="absolute end-3.5 top-3.5 size-3.5 text-muted-foreground" />
    <div className="flex flex-col gap-2 pe-4">
      <Bar className="w-[58%]" tone="main" />
      <Bar className="w-[92%]" tone="muted" />
      <Bar className="w-[74%]" tone="muted" />
    </div>
    <div className="flex items-center justify-end gap-1.5">
      <PillButton className="px-2.5" variant="tonal">
        <Bar className="w-6" tone="main" />
      </PillButton>
      <PillButton className="px-2.5" variant="primary">
        <Bar className="w-6" tone="on-primary" />
      </PillButton>
    </div>
  </Surface>
);

export const drawerThumbnail = (
  <div className="flex h-36 w-full max-w-52 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-muted/30">
    <div className="flex flex-col items-center gap-2.5 rounded-t-[22px] border-border border-t bg-popover px-4 pt-2.5 pb-4 shadow-md">
      <div className="h-1 w-9 rounded-full bg-muted-foreground/35" />
      <Bar className="mt-0.5 w-[52%]" tone="main" />
      <Bar className="w-[78%]" tone="muted" />
    </div>
  </div>
);

export const emptyThumbnail = (
  <div className="flex flex-col items-center gap-3 text-center">
    <div className="relative grid size-11 place-items-center">
      <span
        aria-hidden="true"
        className="absolute inset-0 rotate-12 scale-105 rounded-[30%] bg-secondary/45"
      />
      <span className="relative grid size-full place-items-center rounded-[30%] bg-secondary text-secondary-foreground">
        <SearchIcon className="size-4.5" />
      </span>
    </div>
    <div className="flex flex-col items-center gap-1.5">
      <Bar className="w-20" tone="main" />
      <Bar className="w-28" tone="muted" />
    </div>
    <PillButton className="h-5.5 px-3" variant="primary">
      <Bar className="w-9" tone="on-primary" />
    </PillButton>
  </div>
);

export const fieldThumbnail = (
  <div className="w-full max-w-50">
    <ControlField invalid />
  </div>
);

export const fieldsetThumbnail = (
  <div className="flex w-full max-w-50 flex-col gap-2.5">
    <Bar className="ms-1 h-2 w-20" tone="primary" />
    <ControlField labelWidth="w-12" />
    <ControlField labelWidth="w-16" />
  </div>
);

export const formThumbnail = (
  <div className="flex w-full max-w-50 flex-col gap-3">
    <ControlField />
    <PillButton className="h-8.5 w-full" variant="primary">
      <Bar className="w-12" tone="on-primary" />
    </PillButton>
  </div>
);

export const frameThumbnail = (
  <div className="w-full max-w-52 rounded-[24px] bg-muted p-1.5">
    <div className="flex items-center justify-between px-3 py-2">
      <Bar className="w-16" tone="main" />
      <div className="size-2 rounded-full bg-primary" />
    </div>
    <Surface className="gap-2 rounded-[18px] p-3.5 shadow-none">
      <Bar className="w-[62%]" tone="main" />
      <Bar className="w-[88%]" tone="muted" />
    </Surface>
  </div>
);

export const groupThumbnail = (
  <div className="flex items-center gap-0.5">
    <div className="flex h-9 items-center rounded-s-full rounded-e-[4px] bg-secondary px-3.5">
      <Bar className="w-6" tone="main" />
    </div>
    <div className="flex h-9 items-center rounded-[4px] bg-primary px-3.5">
      <Bar className="w-6" tone="on-primary" />
    </div>
    <div className="flex h-9 items-center rounded-s-[4px] rounded-e-full bg-secondary px-3.5">
      <Bar className="w-6" tone="main" />
    </div>
  </div>
);

export const inputThumbnail = (
  <Surface
    className="h-10 max-w-52 flex-row items-center gap-2.5 px-4 shadow-[inset_0_0_0_2px_var(--color-primary)]"
    variant="control"
  >
    <SearchIcon className="size-4 shrink-0 text-primary" />
    <Bar className="w-[48%]" tone="main" />
    <span className="h-4 w-0.5 rounded-full bg-primary" />
  </Surface>
);

export const inputGroupThumbnail = (
  <Surface
    className="h-10 max-w-52 flex-row items-center gap-2 ps-3.5 pe-1.5"
    variant="control"
  >
    <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
    <Bar className="w-[44%]" tone="muted" />
    <PillButton className="ms-auto h-7 px-2.5" variant="primary">
      <Bar className="w-6" tone="on-primary" />
    </PillButton>
  </Surface>
);

export const kbdThumbnail = (
  <div className="flex items-center justify-center gap-1.5">
    <kbd className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-muted/70 px-2.5 font-medium font-mono text-foreground/80 text-xs shadow-[inset_0_0_0_1px_var(--color-border)]">
      ⌘
    </kbd>
    <kbd className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-muted/70 px-2.5 font-medium font-mono text-foreground/80 text-xs shadow-[inset_0_0_0_1px_var(--color-border)]">
      K
    </kbd>
  </div>
);

export const labelThumbnail = (
  <div className="flex w-full max-w-48 flex-col gap-2">
    <div className="flex items-center gap-1.5 px-1">
      <Bar className="w-16" tone="primary" />
      <span className="size-1.5 rounded-full bg-destructive/80" />
    </div>
    <Surface className="h-9" variant="control" />
  </div>
);

export const menuThumbnail = (
  <div className="flex w-full max-w-48 flex-col items-center gap-1.5">
    <div className="inline-flex h-7.5 items-center gap-1.5 rounded-full border border-border bg-card px-3 shadow-xs">
      <Bar className="w-10" tone="main" />
      <ChevronDownIcon className="size-3.5 text-muted-foreground" />
    </div>
    <Surface className="gap-0.5 rounded-[20px] p-1.5" variant="popup">
      <div className="flex items-center justify-between rounded-[12px] bg-secondary px-2.5 py-1.5">
        <Bar className="w-[52%]" tone="main" />
        <ChevronRightIcon className="size-3.5 text-secondary-foreground" />
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <Bar className="w-[58%]" tone="muted" />
        <span className="font-mono text-[10px] text-muted-foreground/75">
          ⌘K
        </span>
      </div>
      <div className="flex items-center px-2.5 py-1.5">
        <Bar className="w-[44%]" tone="muted" />
      </div>
    </Surface>
  </div>
);

export const meterThumbnail = (
  <div className="flex w-full max-w-50 flex-col gap-2">
    <div className="flex items-center justify-between">
      <Bar className="w-18" tone="main" />
      <span className="font-mono font-semibold text-[11px] text-primary tabular-nums">
        65%
      </span>
    </div>
    <div className="flex h-3 w-full items-center gap-1">
      <div className="h-full w-[65%] rounded-s-full rounded-e-[4px] bg-primary" />
      <div className="h-full flex-1 rounded-s-[4px] rounded-e-full bg-secondary/70" />
    </div>
  </div>
);

export const navigationRailThumbnail = (
  <div className="flex h-36 w-full max-w-52 overflow-hidden rounded-3xl border border-border bg-background">
    <div className="flex w-14 shrink-0 flex-col items-center gap-2.5 border-border border-r bg-card/70 py-3">
      <MenuIcon className="size-3.5 text-muted-foreground" />
      <div className="flex flex-col items-center gap-1">
        <div className="grid h-5 w-9 place-items-center rounded-full bg-secondary">
          <div className="size-2 rounded-full bg-secondary-foreground" />
        </div>
        <Bar className="h-1 w-6" tone="main" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="size-2 rounded-full bg-muted-foreground/40" />
        <Bar className="h-1 w-6" tone="muted" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="size-2 rounded-full bg-muted-foreground/40" />
        <Bar className="h-1 w-5" tone="muted" />
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-2 p-3">
      <Bar className="w-14" tone="main" />
      <div className="flex-1 rounded-2xl border border-border bg-card/60" />
    </div>
  </div>
);

export const numberFieldThumbnail = (
  <Surface
    className="h-10 max-w-44 flex-row items-center overflow-hidden px-1"
    variant="control"
  >
    <div className="grid size-8 place-items-center rounded-full text-muted-foreground">
      <MinusIcon className="size-3.5" />
    </div>
    <span className="flex-1 text-center font-medium font-mono text-foreground text-sm tabular-nums">
      12
    </span>
    <div className="grid size-8 place-items-center rounded-full text-muted-foreground">
      <PlusIcon className="size-3.5" />
    </div>
  </Surface>
);

export const inputOtpThumbnail = (
  <div className="flex items-center justify-center gap-1.5">
    <div className="grid size-9 place-items-center rounded-full bg-secondary font-medium font-mono text-secondary-foreground text-sm">
      4
    </div>
    <div className="grid size-9 place-items-center rounded-full bg-secondary font-medium font-mono text-secondary-foreground text-sm">
      8
    </div>
    <span className="mx-0.5 h-1 w-2.5 rounded-full bg-muted-foreground/40" />
    <div className="grid size-9 place-items-center rounded-[14px] bg-background shadow-[inset_0_0_0_2px_var(--color-primary)] dark:bg-input/32">
      <span className="h-4 w-0.5 rounded-full bg-primary" />
    </div>
    <div className="size-9 rounded-[10px] bg-muted/50 shadow-[inset_0_0_0_1px_var(--color-border)]" />
  </div>
);

export const paginationThumbnail = (
  <div className="flex items-center gap-1">
    <div className="grid size-8 place-items-center rounded-full text-muted-foreground">
      <ChevronLeftIcon className="size-4" />
    </div>
    <div className="grid size-8 place-items-center rounded-xl bg-primary font-mono font-semibold text-primary-foreground text-xs">
      1
    </div>
    <div className="grid size-8 place-items-center rounded-full font-mono text-foreground text-xs">
      2
    </div>
    <div className="grid size-8 place-items-center rounded-full font-mono text-muted-foreground text-xs">
      3
    </div>
    <div className="grid size-8 place-items-center rounded-full text-muted-foreground">
      <ChevronRightIcon className="size-4" />
    </div>
  </div>
);

export const popoverThumbnail = (
  <div className="flex w-full max-w-46 flex-col items-center gap-2">
    <PillButton className="h-7 px-3.5" variant="tonal">
      <Bar className="w-10" tone="main" />
    </PillButton>
    <Surface className="gap-2 rounded-[22px] p-3.5" variant="popup">
      <Bar className="w-[62%]" tone="main" />
      <Bar className="w-[88%]" tone="muted" />
    </Surface>
  </div>
);

export const previewCardThumbnail = (
  <div className="flex w-full max-w-50 flex-col items-start gap-2">
    <div className="border-primary/60 border-b pb-1">
      <Bar className="w-16" tone="primary" />
    </div>
    <Surface
      className="flex-row items-center gap-3 rounded-[22px] p-3.5"
      variant="popup"
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <UserRoundIcon className="size-4" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <Bar className="w-[62%]" tone="main" />
        <Bar className="w-[90%]" tone="muted" />
        <Bar className="w-[74%]" tone="muted" />
      </div>
    </Surface>
  </div>
);

export const progressThumbnail = (
  <div className="flex w-full max-w-50 items-center gap-1">
    <div className="h-3 w-[58%] rounded-s-full rounded-e-[4px] bg-primary" />
    <div className="h-3 flex-1 rounded-s-[4px] rounded-e-full bg-secondary/70" />
  </div>
);

export const radioGroupThumbnail = (
  <div className="flex w-full max-w-36 flex-col gap-3">
    <RadioRow checked />
    <RadioRow />
  </div>
);

export const scrollAreaThumbnail = (
  <Surface className="max-w-44 rounded-2xl p-3.5">
    <div className="flex flex-col gap-2 pe-3">
      <Bar className="w-[82%]" tone="muted" />
      <Bar className="w-[94%]" tone="main" />
      <Bar className="w-[72%]" tone="muted" />
      <Bar className="w-[88%]" tone="muted" />
    </div>
    <div className="absolute top-3 right-1.5 h-8 w-1 rounded-full bg-foreground/35" />
  </Surface>
);

export const selectThumbnail = (
  <Surface
    className="h-10 max-w-48 flex-row items-center justify-between gap-2 ps-4 pe-2.5"
    variant="control"
  >
    <Bar className="w-[58%]" tone="main" />
    <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
  </Surface>
);

export const separatorThumbnail = (
  <div className="flex w-full max-w-48 flex-col divide-y divide-border">
    <div className="flex flex-col gap-1.5 pb-2.5">
      <Bar className="w-[55%]" tone="main" />
      <Bar className="w-[85%]" tone="muted" />
    </div>
    <div className="flex items-center divide-x divide-border pt-2.5">
      <div className="flex-1 pe-2.5">
        <Bar tone="muted" />
      </div>
      <div className="flex-1 px-2.5">
        <Bar tone="muted" />
      </div>
      <div className="flex-1 ps-2.5">
        <Bar tone="muted" />
      </div>
    </div>
  </div>
);

export const sheetThumbnail = (
  <div className="flex h-36 w-full max-w-54 justify-end overflow-hidden rounded-3xl border border-border bg-muted/30">
    <div className="relative flex h-full w-[58%] flex-col justify-between rounded-s-[22px] border-border border-s bg-popover p-3 shadow-md">
      <XIcon className="absolute end-2.5 top-2.5 size-3 text-muted-foreground" />
      <div className="flex flex-col gap-1.5 pe-3 pt-1">
        <Bar className="w-[65%]" tone="main" />
        <Bar className="w-[92%]" tone="muted" />
        <Bar className="w-[78%]" tone="muted" />
      </div>
      <PillButton className="h-5 w-full" variant="primary">
        <Bar className="w-8" tone="on-primary" />
      </PillButton>
    </div>
  </div>
);

export const sidebarThumbnail = (
  <div className="flex h-36 w-full max-w-54 overflow-hidden rounded-3xl border border-border bg-background">
    <div className="flex w-[44%] shrink-0 flex-col gap-2 border-border border-r bg-sidebar p-2.5">
      <div className="flex items-center gap-1.5 px-1">
        <div className="size-3.5 rounded-md bg-primary" />
        <Bar className="w-10" tone="main" />
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 rounded-lg bg-sidebar-accent px-2 py-1.5">
          <div className="size-1.5 rounded-full bg-primary" />
          <Bar className="flex-1" tone="main" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1">
          <div className="size-1.5 rounded-full bg-muted-foreground/35" />
          <Bar className="w-[70%]" tone="muted" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1">
          <div className="size-1.5 rounded-full bg-muted-foreground/35" />
          <Bar className="w-[55%]" tone="muted" />
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-2 p-3">
      <Bar className="w-12" tone="main" />
      <div className="flex-1 rounded-2xl border border-border bg-card/60" />
    </div>
  </div>
);

export const skeletonThumbnail = (
  <div className="flex w-full max-w-48 items-center gap-3">
    <div className="size-10 shrink-0 rounded-full bg-muted-foreground/20" />
    <div className="flex flex-1 flex-col gap-2">
      <div className="h-2 w-[68%] rounded-full bg-muted-foreground/22" />
      <div className="h-2 w-full rounded-full bg-muted-foreground/15" />
      <div className="h-2 w-[82%] rounded-full bg-muted-foreground/15" />
    </div>
  </div>
);

export const sliderThumbnail = (
  <div className="flex w-full max-w-52 flex-col gap-2.5 px-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Volume2Icon className="size-3.5 text-primary" />
        <Bar className="w-12" tone="main" />
      </div>
      <span className="font-mono font-semibold text-[11px] text-secondary-foreground tabular-nums">
        72%
      </span>
    </div>
    <div className="relative flex items-center py-1.5">
      <div className="h-4 w-[62%] rounded-s-full rounded-e-xs bg-primary" />
      <div className="relative z-10 mx-1 h-7 w-2 shrink-0 rounded-full bg-primary" />
      <div className="relative flex h-4 flex-1 items-center justify-end rounded-s-xs rounded-e-full bg-secondary/70 pe-2">
        <div className="size-1 rounded-full bg-foreground/35" />
      </div>
    </div>
  </div>
);

function SpinnerThumbnailMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("-rotate-90", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        pathLength={100}
        r="9"
        stroke="currentColor"
        strokeDasharray="34 100"
        strokeDashoffset={-55}
        strokeLinecap="round"
        strokeWidth={2.6}
      />
      <circle
        cx="12"
        cy="12"
        pathLength={100}
        r="9"
        stroke="currentColor"
        strokeDasharray="44 100"
        strokeDashoffset={0}
        strokeLinecap="round"
        strokeWidth={2.6}
      />
    </svg>
  );
}

export const spinnerThumbnail = (
  <div className="flex items-center gap-4">
    <SpinnerThumbnailMark className="size-11 text-primary" />
    <div className="grid size-11 place-items-center rounded-full bg-secondary p-2 text-secondary-foreground">
      <SpinnerThumbnailMark className="size-full" />
    </div>
  </div>
);

export const switchThumbnail = (
  <div className="flex flex-col items-center gap-3">
    <div className="flex h-8 w-13 items-center rounded-full bg-primary p-1">
      <div className="ms-auto grid size-6 place-items-center rounded-full bg-primary-foreground text-primary shadow-2xs">
        <CheckIcon className="size-3.5 stroke-[3]" />
      </div>
    </div>
    <div className="inset-ring-2 inset-ring-muted-foreground/60 flex h-8 w-13 items-center rounded-full bg-muted p-2">
      <div className="size-4 rounded-full bg-muted-foreground" />
    </div>
  </div>
);

export const tableThumbnail = (
  <Surface className="max-w-52 divide-y divide-border overflow-hidden rounded-2xl shadow-none">
    <div className="flex items-center gap-2.5 bg-muted/50 px-3 py-2">
      <div className="size-3 rounded-[3px] border border-muted-foreground/45" />
      <Bar className="flex-1" tone="main" />
      <Bar className="flex-1" tone="main" />
      <Bar className="flex-1" tone="main" />
    </div>
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <div className="size-3 rounded-[3px] bg-primary" />
      <Bar className="flex-1" tone="muted" />
      <Bar className="flex-1" tone="muted" />
      <Bar className="flex-1" tone="muted" />
    </div>
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <div className="size-3 rounded-[3px] border border-muted-foreground/45" />
      <Bar className="flex-1" tone="muted" />
      <Bar className="flex-1" tone="muted" />
      <Bar className="flex-1" tone="muted" />
    </div>
  </Surface>
);

export const tabsThumbnail = (
  <div className="flex w-full max-w-52 flex-col gap-2.5">
    <div className="flex items-center gap-1 rounded-full bg-muted p-1">
      <div className="flex h-6.5 flex-1 items-center justify-center rounded-full bg-primary px-2.5 shadow-2xs">
        <Bar className="w-7" tone="on-primary" />
      </div>
      <div className="flex h-6.5 flex-1 items-center justify-center rounded-full px-2.5">
        <Bar className="w-7" tone="muted" />
      </div>
      <div className="flex h-6.5 flex-1 items-center justify-center rounded-full px-2.5">
        <Bar className="w-6" tone="muted" />
      </div>
    </div>
    <Surface className="gap-1.5 rounded-2xl p-3">
      <Bar className="w-[62%]" tone="main" />
      <Bar className="w-[88%]" tone="muted" />
    </Surface>
  </div>
);

export const textareaThumbnail = (
  <Surface
    className="relative h-22 max-w-50 justify-between rounded-2xl p-3.5"
    variant="control"
  >
    <div className="flex flex-col gap-2">
      <Bar className="w-[72%]" tone="main" />
      <Bar className="w-[46%]" tone="muted" />
    </div>
    <div className="flex flex-col items-end gap-0.5 opacity-45">
      <span className="h-0.5 w-3 -rotate-45 rounded-full bg-muted-foreground" />
      <span className="-mt-0.5 h-0.5 w-1.5 -rotate-45 rounded-full bg-muted-foreground" />
    </div>
  </Surface>
);

export const toastThumbnail = (
  <div className="relative flex w-full max-w-54 flex-col items-center pt-3.5">
    <Surface
      className="absolute top-0 w-[88%] scale-94 rounded-2xl p-3 opacity-65"
      variant="popup"
    />
    <Surface
      className="relative z-10 flex-row items-center gap-2.5 rounded-2xl px-3 py-2.5"
      variant="popup"
    >
      <CircleCheckIcon className="size-4 shrink-0 text-success" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Bar className="w-[64%]" tone="main" />
        <Bar className="w-[88%]" tone="muted" />
      </div>
      <PillButton className="h-5.5 px-2.5" variant="outline">
        <Bar className="w-5" tone="main" />
      </PillButton>
    </Surface>
  </div>
);

export const toggleThumbnail = (
  <div className="flex items-center gap-2.5">
    <div className="grid size-10 place-items-center rounded-full bg-muted text-foreground">
      <BoldIcon className="size-4" />
    </div>
    <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
      <BookmarkIcon className="size-4" />
    </div>
  </div>
);

export const toggleGroupThumbnail = (
  <div className="flex items-center gap-1">
    <div className="grid h-9 w-10 place-items-center rounded-s-full rounded-e-[6px] bg-muted text-muted-foreground">
      <BoldIcon className="size-3.5" />
    </div>
    <div className="grid h-9 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
      <ItalicIcon className="size-3.5" />
    </div>
    <div className="grid h-9 w-10 place-items-center rounded-s-[6px] rounded-e-full bg-muted text-muted-foreground">
      <UnderlineIcon className="size-3.5" />
    </div>
  </div>
);

export const toolbarThumbnail = (
  <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1.5 shadow-xs">
    <div className="flex items-center gap-1">
      <div className="grid size-7.5 place-items-center rounded-full bg-primary text-primary-foreground">
        <BoldIcon className="size-3.5" />
      </div>
      <div className="grid size-7.5 place-items-center rounded-full text-muted-foreground">
        <ItalicIcon className="size-3.5" />
      </div>
      <div className="grid size-7.5 place-items-center rounded-full text-muted-foreground">
        <UnderlineIcon className="size-3.5" />
      </div>
    </div>
    <div className="h-4.5 w-px bg-border" />
    <PillButton className="h-7.5 px-3" variant="tonal">
      <Bar className="w-7" tone="main" />
    </PillButton>
  </div>
);

export const tooltipThumbnail = (
  <div className="flex flex-col items-center gap-2">
    <div className="rounded-2xl bg-foreground px-3 py-1.5 shadow-sm">
      <div className="h-1.5 w-12 rounded-full bg-background/85" />
    </div>
    <div className="grid size-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
      <InfoIcon className="size-4" />
    </div>
  </div>
);

export const categoryThumbnails: Record<string, ReactNode> = {
  accordion: accordionThumbnail,
  alert: alertThumbnail,
  "alert-dialog": alertDialogThumbnail,
  autocomplete: autocompleteThumbnail,
  avatar: avatarThumbnail,
  badge: badgeThumbnail,
  breadcrumb: breadcrumbThumbnail,
  button: buttonThumbnail,
  calendar: calendarThumbnail,
  card: cardThumbnail,
  checkbox: checkboxThumbnail,
  "checkbox-group": checkboxGroupThumbnail,
  collapsible: collapsibleThumbnail,
  combobox: comboboxThumbnail,
  command: commandThumbnail,
  "context-menu": contextMenuThumbnail,
  "date-picker": datePickerThumbnail,
  dialog: dialogThumbnail,
  drawer: drawerThumbnail,
  empty: emptyThumbnail,
  field: fieldThumbnail,
  fieldset: fieldsetThumbnail,
  form: formThumbnail,
  frame: frameThumbnail,
  group: groupThumbnail,
  input: inputThumbnail,
  "input-group": inputGroupThumbnail,
  kbd: kbdThumbnail,
  label: labelThumbnail,
  menu: menuThumbnail,
  meter: meterThumbnail,
  "navigation-rail": navigationRailThumbnail,
  "number-field": numberFieldThumbnail,
  "otp-field": inputOtpThumbnail,
  pagination: paginationThumbnail,
  popover: popoverThumbnail,
  "preview-card": previewCardThumbnail,
  progress: progressThumbnail,
  "radio-group": radioGroupThumbnail,
  "scroll-area": scrollAreaThumbnail,
  select: selectThumbnail,
  separator: separatorThumbnail,
  sheet: sheetThumbnail,
  sidebar: sidebarThumbnail,
  skeleton: skeletonThumbnail,
  slider: sliderThumbnail,
  spinner: spinnerThumbnail,
  switch: switchThumbnail,
  table: tableThumbnail,
  tabs: tabsThumbnail,
  textarea: textareaThumbnail,
  toast: toastThumbnail,
  toggle: toggleThumbnail,
  "toggle-group": toggleGroupThumbnail,
  toolbar: toolbarThumbnail,
  tooltip: tooltipThumbnail,
};

export function getCategoryThumbnail(slug: string): ReactNode | undefined {
  return categoryThumbnails[slug];
}
