# manualtasks.dev

The landing page for **Manual Tasks**, a Claude Code plugin that records the manual steps
left after Claude's work — a console setting, an agreement to accept, a review to answer —
with the exact values, the links and what blocks what.

The product lives at
[javirub/claude-manual-todos-plugin](https://github.com/javirub/claude-manual-todos-plugin).
This repository is only the page in front of it.

Astro, static, two locales: English at `/`, Spanish at `/es/`.

```sh
bun install
bun run hooks     # once: points git at .githooks/
bun run dev       # http://localhost:4321
bun run check     # types, and both catalogues agreeing
bun run build
```

Every string is in `src/i18n/content.ts`, both languages together. Adding one to a single
locale is a build error, which is the point.

`AGENTS.md` has the rest: where the design tokens come from, why the screenshots are
cropped, and the one rule that matters — every claim here has to be true of the product as
it is today.

## Licence

The code in this repository is available to read. The copy, the imagery and the name are
not licensed for reuse; see [LICENSE](LICENSE).

The product itself is source-available under BUSL-1.1, in its own repository.
