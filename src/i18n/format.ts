/**
 * Backticks in the copy become <code>.
 *
 * A few lines rather than a markdown dependency: the only formatting this page needs is
 * the one that makes an exact value look like an exact value, which is the argument the
 * page is making. The escaping happens first, so a backtick can never smuggle a tag in.
 *
 * It lives in its own module rather than in a component's frontmatter because the Astro
 * compiler's frontmatter scanner does not survive a regular expression literal that
 * contains a backtick.
 */
const TONES = {
  light: 'rounded bg-accent-soft px-1.5 py-0.5 text-[0.9em] text-accent',
  // The install section is dark, and the light chip read as a hole punched in it.
  dark: 'rounded bg-white/10 px-1.5 py-0.5 text-[0.9em] text-violet-bright',
} as const

export type CodeTone = keyof typeof TONES

export function inlineCode(text: string, tone: CodeTone = 'light'): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped.replace(/`([^`]+)`/g, `<code class="${TONES[tone]}">$1</code>`)
}
