import { getLlmsTxt } from "@/lib/llms";

export async function GET(): Promise<Response> {
  return new Response(await getLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
