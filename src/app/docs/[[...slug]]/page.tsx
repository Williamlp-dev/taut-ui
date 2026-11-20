import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/registry/default/ui/button";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsTableOfContents } from "@/components/docs-toc";
import { SiteFooter } from "@/components/shared/site-footer";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";

// Docs are fully prerendered via generateStaticParams, so the page may block.
export const instant = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  return {
    description: doc.description || "Component documentation for Taut Ui.",
    title: `${doc.title || page.slugs.join(" / ")} - Taut Ui`,
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  const rawContent = await page.data.getText("processed");

  const MDX = doc.body;
  const links = doc.links;
  const sectionLabel =
    page.slugs[0] === "components" ? "Components" : "Documentation";

  return (
    <div className="flex items-stretch gap-6 xl:w-full" data-slot="docs">
      <div className="relative flex w-full min-w-0 flex-1 flex-col lg:mt-5 lg:mb-4">
        <div
          className="flex flex-1 flex-col bg-background px-4 py-6 motion-reduce:transition-none! sm:px-8 lg:rounded-4xl lg:border lg:border-border/60 lg:p-8 lg:data-[docked=true]:rounded-t-none lg:data-[docked=true]:border-t-transparent xl:p-10 lg:[transition:border-radius_150ms_cubic-bezier(0.16,1,0.3,1),border-top-color_100ms_ease-out]"
          data-docked="false"
          data-slot="docs-surface"
          suppressHydrationWarning
        >
          <div className="mx-auto w-full max-w-3xl flex-1">
            <div className="flex min-w-0 flex-col gap-10">
              <header className="flex flex-col gap-5 rounded-3xl bg-secondary/60 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-medium text-muted-foreground text-sm">
                    {sectionLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    {links?.doc && (
                      <Button
                        className="bg-background/80 hover:bg-background"
                        render={
                          <Link
                            href={links.doc}
                            rel="noreferrer"
                            target="_blank"
                          />
                        }
                        size="xs"
                        variant="secondary"
                      >
                        <ExternalLink className="size-3.5" />
                        API reference
                      </Button>
                    )}
                    <DocsCopyPage page={rawContent} />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="scroll-m-20 font-bold font-heading text-3xl tracking-tight sm:text-4xl xl:text-[2.75rem] xl:leading-[1.1]">
                    {doc.title || page.slugs[page.slugs.length - 1]}
                  </h1>
                  {doc.description && (
                    <p className="max-w-[62ch] text-base text-muted-foreground leading-relaxed sm:text-lg">
                      {doc.description}
                    </p>
                  )}
                </div>
              </header>
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <MDX components={mdxComponents} />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-14 w-full max-w-3xl">
            <SiteFooter />
          </div>
        </div>
      </div>
      <div className="sticky top-(--header-height) z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-68 shrink-0 flex-col overflow-hidden overscroll-none xl:flex">
        <div className="flex min-h-0 flex-1 flex-col gap-2 py-2">
          <div className="h-(--top-spacing) shrink-0" />
          {doc.toc?.length ? <DocsTableOfContents toc={doc.toc} /> : null}
        </div>
      </div>
    </div>
  );
}
