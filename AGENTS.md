# Working on the Manual todos landing page

Astro, static, no framework components. One page in two languages, at
`manualtasks.dev`. It is the only public face of a product whose other repositories are
[`claude-manual-todos-plugin`](https://github.com/javirub/claude-manual-todos-plugin)
(the plugin and its board) and `javirub.pro/todos/*` on GitLab; the superproject's
`AGENTS.md` describes the pair as a whole and says which feature belongs where.

## The rule that matters most

**Every claim on this page has to be true of the product as it is today**, not as it is
planned. The hosted mode is the live example: it is written, it is not open to sign-ups,
and the page says exactly that. If any sentence here stops being true, this page changes
the same day rather than the next time somebody remembers.

## The copy

All of it lives in `src/i18n/content.ts`, both languages in one typed object. `content.es`
is typed against `content.en`, so **adding a string to one locale and not the other is a
build error**, which is the point. There is no translation framework and there should not
be one: a landing page with two locales is a type, not a runtime.

English is at `/`, Spanish at `/es/`. That is the opposite of the Hirefolio landing next
door, and deliberately: the product itself is written in English — the README, the board,
every tool description — and its readers are Claude Code users.

Backticks in a string become `<code>` through `src/i18n/format.ts`. That helper lives in
its own module because the Astro compiler's frontmatter scanner does not survive a regular
expression literal containing a backtick; moving it into a component's frontmatter will
produce 400 parse errors that name the wrong line.

## The design

Two-toned on purpose: a near-black hero that is the terminal, and a light half that is the
product. **The turn between them is made by the board screenshot**, which is pulled up far
enough to straddle the edge and be lit from both sides. An earlier attempt faded the hero
to white with a gradient and it read as a blown-out band, so there is no fade — do not add
one back.

`src/styles/tokens.css` is not invented here. The board generates its CSS from
`todo-plugin/src/lib/theme/tokens.ts`, where every lightness is fixed per mode and a
project chooses only a hue, a chroma and a texture. The tokens are that generator's ramps
evaluated at `NEUTRAL_THEME` — hue 250, chroma 0.045. **If those ramps move, these move
with them**, so that the screenshots and the page around them stay the same material.

The one colour that belongs to this page and not to the board is `--mt-violet`, the violet
of the Claude Code plugin badge in the README. It exists because the board's accent at the
hero's lightness is a wash.

## The screenshots

`src/assets/*.png` are copies, produced by `scripts/shots.sh` from a sibling checkout of
the plugin, where `bun run shots` generates them. The script crops the headline band off
the top: those images are framed for a README, under a two-line headline set in the
board's own typeface, and this page supplies its own headings — showing both says the same
sentence twice.

```sh
bash scripts/shots.sh              # expects ../todo-plugin
bash scripts/shots.sh /path/to/it  # or say where it is
```

Run it when the board changes. Nothing checks that they are current, which is the one
loose thread in this repository and worth remembering.

`public/og.png` is made by hand from the plugin's *uncropped* `overview.png`, cropped to
1200×630. It is English on both locales, which is a simplification rather than a decision:
the Spanish page links to an English card.

## Checks

```sh
bun run check      # astro check -- types, and both catalogues agreeing
bun run build      # the whole of the rest of CI
bun run hooks      # once, per clone: points git at .githooks/
```

`astro check` needs **TypeScript 6**. TypeScript 7 is the native compiler and does not yet
expose the programmatic API the Astro language server uses; installing it silently breaks
`bun run check` with a message about a missing API. The dependency is pinned for that
reason and not by accident.

The dev server runs in the background by default in Astro 7 — `astro dev`, then
`astro dev stop|status|logs`.

## How a change lands

Same as the rest of the estate: a branch named `<type>/<kebab-case>`, a pull request, a
squash merge. **The pull request title is the commit that lands**, and CI checks it against
`scripts/commit-lint.sh`, which is a copy of the plugin's — change one, change the other.
Never add `Co-Authored-By: Claude` or credit an assistant anywhere; the hook and CI both
refuse it.

Everything written here is in English, including this file, whatever language the request
that produced it was in. The page's own copy is the exception, and it lives in
`content.ts`.

## Deployment

Vercel's GitHub integration, straight from this repository. No CI deploy job and no
`vercel.json`: the settings live in the Vercel project, and `SITE_URL` there is what pins
canonical links, hreflang and the OG image URL to `https://manualtasks.dev`. Without it a
build falls back to the deployment's own URL, which is right for a preview and wrong for
production.

`manualtasks.dev` is a Cloudflare zone that external-dns also writes into, for the
cluster's `api.manualtasks.dev`. The two do not collide: external-dns runs `upsert-only`
and only writes records for HTTPRoutes it owns, so records pointed at Vercel are left
alone.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
