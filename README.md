<p align="center">
  <a href="https://taut-ui.com">
    <img alt="taut ui" src="./public/logo.svg" width="64" />
  </a>
</p>

<h1 align="center">Taut Ui</h1>

<p align="center">
  <strong>Tactile, spring-driven React components on Base UI engineered for developers and AI to build interfaces that feel alive.</strong>
</p>

<p align="center">
  <img alt="Taut UI components showcase" src="https://github.com/user-attachments/assets/7d6048c1-566b-4200-b830-592017411051" width="100%" />
</p>

## What is taut ui?

**taut ui** is a component library for React 19 applications built on [Base UI](https://base-ui.com/) and [Tailwind CSS v4](https://tailwindcss.com/). It gives developers and AI workflows a responsive, tactile alternative to static component kits: you add components directly into your codebase, own the source, and get fast, satisfying animations out of the box without shipping an external motion library.

> [!NOTE]
> Built in the open by an independent developer. Rough edges are continuously refined along the way.

## Project Layout

- **`src/registry/default/ui/`** — Core UI primitives
- **`src/registry/default/particles/`** — Interactive component examples
- **`src/registry/default/lib/`** — Zero-dependency motion helpers (`ripple`, `morph`)
- **`src/content/docs/`** — Documentation pages
- **`src/app/globals.css`** — Theme tokens and motion variables

Written in 100% [TypeScript](https://www.typescriptlang.org/).

## Local Setup

Requires [Bun](https://bun.sh/).

```sh
bun install
bun run dev
```

```sh
bun run build   # Build the registry index and documentation site
bun run lint    # Check code with Biome
bun run format  # Format files with Biome
```

## License

Distributed under the [MIT License](LICENSE).

## Credits

- **[Base UI](https://base-ui.com/)** — Unstyled, accessible React primitives
- **[shadcn/ui](https://ui.shadcn.com/)** — Component registry architecture
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Fumadocs](https://fumadocs.dev/)** — Documentation engine
