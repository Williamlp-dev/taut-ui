import { transformerNotationWordHighlight } from "@shikijs/transformers";
import * as React from "react";
import type { ShikiTransformer } from "shiki";
import { codeToHast } from "shiki";

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties.__raw__ = raw;

        if (raw.startsWith("npm install")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm install", "yarn add");
          node.properties.__pnpm__ = raw.replace("npm install", "pnpm add");
          node.properties.__bun__ = raw.replace("npm install", "bun add");
        }

        if (raw.startsWith("npx create-")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx create-", "yarn create ");
          node.properties.__pnpm__ = raw.replace("npx create-", "pnpm create ");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        }

        if (raw.startsWith("npm create")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm create", "yarn create");
          node.properties.__pnpm__ = raw.replace("npm create", "pnpm create");
          node.properties.__bun__ = raw.replace("npm create", "bun create");
        }

        if (raw.startsWith("npx")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx", "yarn dlx");
          node.properties.__pnpm__ = raw.replace("npx", "pnpm dlx");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        }

        if (raw.startsWith("npm run")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm run", "yarn");
          node.properties.__pnpm__ = raw.replace("npm run", "pnpm");
          node.properties.__bun__ = raw.replace("npm run", "bun");
        }
      }
    },
  },
  transformerNotationWordHighlight(),
] as ShikiTransformer[];

type HastNode =
  | { type: "text"; value: string }
  | {
      type: "element";
      tagName: string;
      properties?: Record<string, unknown>;
      children?: HastNode[];
    }
  | { type: "root"; children?: HastNode[] };

function parseInlineStyle(styleString: string): Record<string, string> {
  const styleObject: Record<string, string> = {};
  for (const declaration of styleString.split(";")) {
    const colonIndex = declaration.indexOf(":");
    if (colonIndex === -1) continue;
    const prop = declaration.slice(0, colonIndex).trim();
    const val = declaration.slice(colonIndex + 1).trim();
    if (prop && val) {
      styleObject[prop] = val;
    }
  }
  return styleObject;
}

function hastNodeToReact(node: HastNode, key?: React.Key): React.ReactNode {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "root") {
    return node.children?.map((child, idx) => hastNodeToReact(child, idx));
  }

  if (node.type === "element") {
    const rawProps = node.properties ?? {};
    const reactProps: Record<string, unknown> = { key };

    for (const [propName, propValue] of Object.entries(rawProps)) {
      if (propName === "class" || propName === "className") {
        reactProps.className = Array.isArray(propValue)
          ? propValue.join(" ")
          : String(propValue);
      } else if (propName === "style" && typeof propValue === "string") {
        reactProps.style = parseInlineStyle(propValue);
      } else if (propName === "tabindex") {
        reactProps.tabIndex = Number(propValue);
      } else {
        reactProps[propName] = propValue;
      }
    }

    const children = node.children?.map((child, idx) =>
      hastNodeToReact(child, idx),
    );

    return React.createElement(node.tagName, reactProps, children);
  }

  return null;
}

export async function highlightCode(
  code: string,
  language = "tsx",
  options?: { showLineNumbers?: boolean },
): Promise<React.ReactNode> {
  "use cache";

  const { showLineNumbers = true } = options ?? {};

  const hast = await codeToHast(code, {
    defaultColor: false,
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: [
      {
        code(node) {
          if (showLineNumbers) {
            node.properties["data-line-numbers"] = "";
          }
        },
        line(node) {
          node.properties["data-line"] = "";
        },
        pre(node) {
          node.properties.class =
            "text-[.8125rem] min-w-0 w-max px-4 py-3.5 outline-none has-data-[highlighted-line]:px-0 has-data-[line-numbers]:ps-0 has-data-[slot=tabs]:p-0 !bg-transparent";
        },
      },
      transformerNotationWordHighlight(),
    ],
  });

  return hastNodeToReact(hast as HastNode);
}
