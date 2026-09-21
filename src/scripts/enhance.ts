/**
 * Everything on this page that moves.
 *
 * All three enhancements share one rule: the markup is already correct without them.
 * The terminal is rendered with its transcript complete, the sections are rendered
 * visible, and the copy buttons sit next to text that can be selected by hand. This
 * file makes them nicer, and a browser that never runs it loses nothing it needed.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

/* ------------------------------------------------------------------ terminal */

/**
 * Types the hero transcript out, line by line.
 *
 * It empties the lines first, which is why the server renders them full: if this script
 * fails to load, or the reader asked for less motion, the transcript is simply there.
 *
 * The typing pauses while the tab is hidden. Without that, coming back to a background
 * tab shows a terminal that has already finished, and the one thing the animation is
 * for -- watching Claude find work it cannot do -- has happened to nobody.
 */
function runTerminal(root: HTMLElement) {
  const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-line]'))
  const caret = root.querySelector<HTMLElement>('[data-caret]')
  if (lines.length === 0) return

  const texts = lines.map((line) => {
    const span = line.querySelector<HTMLElement>('[data-text]')
    return span?.dataset.text ?? ''
  })

  // Hold the finished height so the page does not grow as the lines arrive.
  root.style.minHeight = `${root.getBoundingClientRect().height}px`

  lines.forEach((line) => {
    line.style.visibility = 'hidden'
    const span = line.querySelector<HTMLElement>('[data-text]')
    if (span) span.textContent = ''
  })

  if (caret) {
    caret.hidden = false
    caret.style.animation = 'mt-blink 1.1s steps(2, start) infinite'
  }

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms)
    })

  const idle = () =>
    document.hidden
      ? new Promise<void>((resolve) => {
          const onVisible = () => {
            if (document.hidden) return
            document.removeEventListener('visibilitychange', onVisible)
            resolve()
          }
          document.addEventListener('visibilitychange', onVisible)
        })
      : Promise.resolve()

  void (async () => {
    for (const [index, line] of lines.entries()) {
      await idle()
      line.style.visibility = 'visible'
      const span = line.querySelector<HTMLElement>('[data-text]')
      const text = texts[index] ?? ''

      if (!span) continue

      if (line.dataset.kind === 'prompt') {
        // A typed line: one character at a time, at something like a human rate.
        for (const character of text) {
          span.textContent += character
          await sleep(18 + Math.random() * 26)
        }
        await sleep(360)
      } else {
        // Output is not typed. A machine answering prints its line at once, and
        // pretending otherwise is the detail that makes these animations look fake.
        span.textContent = text
        await sleep(240)
      }

      if (caret) line.append(caret)
    }

    await sleep(1400)
    if (caret) caret.hidden = true
  })()
}

/* -------------------------------------------------------------------- reveal */

function runReveals(targets: HTMLElement[]) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )

  for (const target of targets) observer.observe(target)
}

/* ---------------------------------------------------------------------- copy */

function wireCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy ?? ''
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        // Denied permission, or an insecure origin. Saying nothing would look like the
        // button is broken, so the text is selected instead and the reader can copy it.
        const code = button.parentElement?.querySelector('code')
        if (code) {
          const range = document.createRange()
          range.selectNodeContents(code)
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
        }
        return
      }

      const done = button.dataset.copiedLabel
      const idleLabel = button.dataset.copyLabel
      if (!done || !idleLabel) return

      button.textContent = done
      button.classList.add('text-violet-bright')
      window.setTimeout(() => {
        button.textContent = idleLabel
        button.classList.remove('text-violet-bright')
      }, 1600)
    })
  }
}

/* --------------------------------------------------------------------- start */

function start() {
  wireCopyButtons()

  const reveals = Array.from(document.querySelectorAll<HTMLElement>('.will-reveal'))

  if (reduced.matches) {
    // The stylesheet already neutralises `will-reveal` under this preference; adding the
    // revealed class as well means nothing depends on which of the two wins.
    for (const target of reveals) target.classList.add('is-revealed')
    return
  }

  runReveals(reveals)

  const terminal = document.querySelector<HTMLElement>('[data-terminal]')
  if (terminal) runTerminal(terminal)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true })
} else {
  start()
}
