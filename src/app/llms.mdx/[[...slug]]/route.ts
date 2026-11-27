import { notFound } from "next/navigation";
import { appConfig } from "@/lib/config";
import { getPageMarkdownBySlug } from "@/lib/llms";
import { source } from "@/lib/source";

export const dynamic = "force-static";

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug?: string[] }> },
): Promise<Response> {
  const { slug } = await props.params;
  const result = await getPageMarkdownBySlug(slug);

  if (!result) {
    notFound();
  }

  return new Response(result.content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // The Markdown copy must never compete with the HTML page in search.
      Link: `<${new URL(result.url, appConfig.url)}>; rel="canonical"`,
    },
  });
}
