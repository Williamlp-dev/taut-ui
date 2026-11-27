import { getLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(await getLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
