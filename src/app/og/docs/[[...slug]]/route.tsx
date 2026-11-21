import { notFound } from "next/navigation";
import { renderOgCard } from "@/lib/seo";
import { source } from "@/lib/source";

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug?: string[] }> },
): Promise<Response> {
  const { slug } = await props.params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const sectionLabel =
    page.slugs[0] === "components" ? "Component" : "Documentation";

  return renderOgCard({
    badge: sectionLabel,
    description:
      page.data.description ||
      "Accessible, composable React components built on Base UI with tactile spring motion.",
    title: page.data.title || page.slugs[page.slugs.length - 1] || "Taut UI",
  });
}
