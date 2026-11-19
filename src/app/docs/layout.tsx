import { SidebarProvider } from "@/registry/default/ui/sidebar";
import { DocsSidebar } from "@/components/docs-sidebar";
import { source } from "@/lib/source";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <SidebarProvider className="container min-h-min flex-1 items-start gap-4 px-0 [--sidebar-width:230px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:pe-6 xl:pe-0 lg:[--sidebar-width:252px] lg:[--top-spacing:calc(var(--spacing)*3)]">
        <DocsSidebar tree={source.pageTree} />
        <div className="h-full w-full min-w-0">{children}</div>
      </SidebarProvider>
    </main>
  );
}
