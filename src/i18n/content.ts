/**
 * Every string on the site, in both languages.
 *
 * One typed object rather than a translation framework: this is one page with two
 * locales, and a missing key should be a build error rather than a fallback nobody
 * notices. `content.es` is typed against `content.en`, so adding a string to one and
 * not the other stops the build.
 *
 * Every claim here has to be true of the product as it is today, not as it is planned.
 * The hosted service is the live example: it is written, it is not open, and the page
 * says so. If any of this stops being true, this file changes the same day.
 */
export const languages = ['en', 'es'] as const
export type Language = (typeof languages)[number]

export const REPO_URL = 'https://github.com/javirub/claude-manual-todos-plugin'
export const DOCS_URL = `${REPO_URL}#readme`
export const LICENCE_URL = `${REPO_URL}/blob/main/LICENSE`

/** The two commands from the README, verbatim. They are run inside Claude Code. */
export const INSTALL_COMMANDS = [
  '/plugin marketplace add javirub/claude-manual-todos-plugin',
  '/plugin install todos@claude-manual-todos',
] as const

/**
 * The lines the hero terminal types out.
 *
 * `kind` drives how a line is painted, not what it means: `prompt` is something the
 * reader would type, `out` is the plugin answering, `dim` is a comment beside it.
 */
export type TerminalLine = {
  kind: 'prompt' | 'out' | 'dim'
  text: string
}

const en = {
  meta: {
    lang: 'en',
    title: 'Manual todos — everything only you can do, in one place',
    description:
      'A Claude Code plugin that records the manual steps left after its work — a console setting, an agreement to accept, a review to answer — with the exact values, the links and what blocks what. On a board, on your machine.',
    ogAlt: 'A task board showing pending manual work grouped by project.',
  },

  nav: {
    how: 'How it works',
    step: 'What a step carries',
    identity: 'Projects',
    install: 'Install',
    github: 'GitHub',
  },

  hero: {
    badge: 'Claude Code plugin',
    titleTop: 'Everything only you can do,',
    titleBottom: 'in one place.',
    subtitle:
      'Claude finishes its part and writes down yours: the console setting, the agreement to accept, the review to answer. With the exact value to paste and the reason it matters.',
    primary: 'Install it',
    secondary: 'See what it looks like',
    note: 'No account. Nothing leaves your machine.',
    terminal: [
      { kind: 'prompt', text: '/plugin install todos@claude-manual-todos' },
      { kind: 'out', text: '✓ installed' },
      { kind: 'prompt', text: 'Ship the app to TestFlight' },
      { kind: 'dim', text: '…Claude works, and finds what it cannot finish' },
      { kind: 'out', text: '▸ Recorded 3 steps in "Publish on the App Store"' },
      { kind: 'out', text: '  the licence agreement blocks the build upload' },
      { kind: 'prompt', text: '/todos:tasks' },
      { kind: 'dim', text: '→ opens the board' },
    ] satisfies TerminalLine[],
  },

  board: {
    eyebrow: 'The board',
    title: 'Ordered by what is already late',
    body: 'Every project you work on, in one list, grouped by when it is due. The colour on a task is its project\'s, so you never have to read a label to know where you are.',
    caption: 'The board, running on 127.0.0.1. This is a real screenshot, not a mock-up.',
  },

  anatomy: {
    eyebrow: 'What a step carries',
    title: 'The difference between a reminder and a task you can finish',
    body: 'A to-do list says "rotate the shared secret". This says which secret, where the button is, and what breaks if you skip it.',
    items: [
      {
        title: 'The exact value, not a description of it',
        body: '`ai.costia.app.pre`, not "the pre-production identifier". If you are going to paste it, it is there with a copy button.',
      },
      {
        title: 'Why, when skipping it fails invisibly',
        body: 'Not on every step — only where the consequence is not obvious. A greyed-out button with no explanation next to it, a payout withheld months later.',
      },
      {
        title: 'The link goes to the console, not the documentation',
        body: 'You are about to do the thing, not read about it. And the path through the interface is in the product\'s own words, because navigating is most of the work.',
      },
      {
        title: 'What blocks what',
        body: 'Tasks link to each other, so the one that has to happen first says so. A task is done when its steps are, never before.',
      },
    ],
    caption: 'One task, its phases and its steps.',
  },

  identity: {
    eyebrow: 'Projects',
    title: 'Each project looks like itself',
    body: 'Colour, texture, typeface and corner radius per project, so you know where you are without reading anything. Two projects are never allowed to look alike, and the contrast is checked rather than trusted.',
    caption: 'The same board, a different project.',
  },

  recorded: {
    eyebrow: 'How it gets there',
    title: 'You do not type these in',
    steps: [
      {
        title: 'Claude records what it could not finish',
        body: 'As it works. It checks what is already on the board first, so the same task does not land three times.',
      },
      {
        title: 'You work through it',
        body: 'Tick a step on the board, or just tell Claude what you finished.',
      },
      {
        title: 'Your terminal knows',
        body: 'An optional status line counts what is pending for the project you are standing in.',
      },
    ],
  },

  modes: {
    eyebrow: 'Where it lives',
    title: 'Local by default',
    local: {
      title: 'On your machine',
      badge: 'Available now',
      body: 'Tasks live in SQLite under your own home directory. No account, no sign-up, no network. The board binds to loopback and authenticates nobody, because nobody else can reach it.',
      points: [
        'Linux, macOS and Windows',
        'Nothing leaves the computer unless you ask it to',
        'The board is yours; the plugin never posts it anywhere',
      ],
    },
    cloud: {
      title: 'Shared, when you want it',
      badge: 'Not open yet',
      body: 'A hosted mode is written — accounts, workspaces, shared projects and per-role steps — and it is not taking sign-ups. This page will say so the day it is.',
      points: [
        'Share a project without sharing everything',
        'A step owned by a role only its role can close',
        'The local mode keeps working exactly as it does now',
      ],
    },
  },

  install: {
    eyebrow: 'Install',
    title: 'Two commands, inside Claude Code',
    body: 'Then run `/todos:onboarding`, which asks — in your conversation\'s language — whether you want the terminal command, the status line and the board. Any combination, or none.',
    requirementsTitle: 'What you need',
    requirements: [
      'Claude Code',
      'Bun 1.2 or newer, on PATH',
      'Linux, macOS or Windows',
    ],
    copy: 'Copy',
    copied: 'Copied',
    cta: 'Read the docs',
  },

  footer: {
    tagline: 'Keep the work only you can finish out of forgotten chat messages.',
    licence: 'Source-available under BUSL-1.1.',
    licenceNote: 'Version 1.1.0 and earlier were MIT and remain so.',
    docs: 'Docs',
    github: 'GitHub',
    language: 'Español',
  },
}

const es: typeof en = {
  meta: {
    lang: 'es',
    title: 'Manual todos — todo lo que solo puedes hacer tú, en un sitio',
    description:
      'Un plugin de Claude Code que apunta los pasos manuales que quedan después de su trabajo — un ajuste en una consola, un acuerdo que aceptar, una reseña que contestar — con los valores exactos, los enlaces y qué bloquea a qué. En un tablero, en tu máquina.',
    ogAlt: 'Un tablero de tareas con el trabajo manual pendiente, agrupado por proyecto.',
  },

  nav: {
    how: 'Cómo funciona',
    step: 'Qué lleva un paso',
    identity: 'Proyectos',
    install: 'Instalar',
    github: 'GitHub',
  },

  hero: {
    badge: 'Plugin de Claude Code',
    titleTop: 'Todo lo que solo puedes hacer tú,',
    titleBottom: 'en un sitio.',
    subtitle:
      'Claude termina su parte y apunta la tuya: el ajuste en la consola, el acuerdo que aceptar, la reseña que contestar. Con el valor exacto que hay que pegar y la razón por la que importa.',
    primary: 'Instalar',
    secondary: 'Ver qué aspecto tiene',
    note: 'Sin cuenta. Nada sale de tu máquina.',
    terminal: [
      { kind: 'prompt', text: '/plugin install todos@claude-manual-todos' },
      { kind: 'out', text: '✓ instalado' },
      { kind: 'prompt', text: 'Sube la app a TestFlight' },
      { kind: 'dim', text: '…Claude trabaja, y encuentra lo que no puede terminar' },
      { kind: 'out', text: '▸ 3 pasos en «Publicar en la App Store»' },
      { kind: 'out', text: '  el acuerdo de licencia bloquea la subida' },
      { kind: 'prompt', text: '/todos:tasks' },
      { kind: 'dim', text: '→ abre el tablero' },
    ] satisfies TerminalLine[],
  },

  board: {
    eyebrow: 'El tablero',
    title: 'Ordenado por lo que ya va tarde',
    body: 'Todos los proyectos en los que trabajas, en una lista, agrupados por cuándo vencen. El color de una tarea es el de su proyecto, así que nunca hace falta leer una etiqueta para saber dónde estás.',
    caption: 'El tablero, corriendo en 127.0.0.1. Es una captura real, no una maqueta.',
  },

  anatomy: {
    eyebrow: 'Qué lleva un paso',
    title: 'La diferencia entre un recordatorio y una tarea que puedes cerrar',
    body: 'Una lista de tareas dice «rota el secreto compartido». Esto dice qué secreto, dónde está el botón, y qué se rompe si te lo saltas.',
    items: [
      {
        title: 'El valor exacto, no una descripción de él',
        body: '`ai.costia.app.pre`, no «el identificador de preproducción». Si lo vas a pegar, está ahí con un botón de copiar.',
      },
      {
        title: 'El porqué, cuando saltárselo falla en silencio',
        body: 'No en cada paso: solo donde la consecuencia no es evidente. Un botón gris sin explicación al lado, un pago retenido que te enteras meses después.',
      },
      {
        title: 'El enlace va a la consola, no a la documentación',
        body: 'Estás a punto de hacerlo, no de leer sobre ello. Y el camino por la interfaz está en las palabras del propio producto, porque navegar es la mayor parte del trabajo.',
      },
      {
        title: 'Qué bloquea a qué',
        body: 'Las tareas se enlazan entre sí, así que la que tiene que ir primero lo dice. Una tarea está hecha cuando lo están sus pasos, nunca antes.',
      },
    ],
    caption: 'Una tarea, con sus fases y sus pasos.',
  },

  identity: {
    eyebrow: 'Proyectos',
    title: 'Cada proyecto se parece a sí mismo',
    body: 'Color, textura, tipografía y radio de esquina por proyecto, para saber dónde estás sin leer nada. Dos proyectos nunca pueden parecerse, y el contraste se comprueba en vez de darse por supuesto.',
    caption: 'El mismo tablero, otro proyecto.',
  },

  recorded: {
    eyebrow: 'Cómo llega ahí',
    title: 'Esto no lo escribes tú',
    steps: [
      {
        title: 'Claude apunta lo que no ha podido terminar',
        body: 'Sobre la marcha. Antes mira lo que ya hay en el tablero, para que la misma tarea no aterrice tres veces.',
      },
      {
        title: 'Tú lo vas cerrando',
        body: 'Marca un paso en el tablero, o simplemente dile a Claude qué has terminado.',
      },
      {
        title: 'Tu terminal se entera',
        body: 'Una línea de estado opcional cuenta lo que queda pendiente en el proyecto donde estás parado.',
      },
    ],
  },

  modes: {
    eyebrow: 'Dónde vive',
    title: 'Local por defecto',
    local: {
      title: 'En tu máquina',
      badge: 'Disponible ya',
      body: 'Las tareas viven en SQLite dentro de tu propio directorio personal. Sin cuenta, sin registro, sin red. El tablero escucha en loopback y no autentica a nadie, porque nadie más puede llegar a él.',
      points: [
        'Linux, macOS y Windows',
        'Nada sale del ordenador salvo que lo pidas',
        'El tablero es tuyo; el plugin no lo publica en ningún sitio',
      ],
    },
    cloud: {
      title: 'Compartido, cuando quieras',
      badge: 'Todavía no está abierto',
      body: 'El modo hospedado está escrito — cuentas, espacios de trabajo, proyectos compartidos y pasos por rol — y no está aceptando registros. El día que lo esté, esta página lo dirá.',
      points: [
        'Compartir un proyecto sin compartirlo todo',
        'Un paso de un rol solo lo cierra quien está en ese rol',
        'El modo local sigue funcionando exactamente igual que ahora',
      ],
    },
  },

  install: {
    eyebrow: 'Instalar',
    title: 'Dos comandos, dentro de Claude Code',
    body: 'Después, `/todos:onboarding` te pregunta — en el idioma de tu conversación — si quieres el comando de terminal, la línea de estado y el tablero. La combinación que sea, o ninguna.',
    requirementsTitle: 'Qué necesitas',
    requirements: [
      'Claude Code',
      'Bun 1.2 o posterior, en el PATH',
      'Linux, macOS o Windows',
    ],
    copy: 'Copiar',
    copied: 'Copiado',
    cta: 'Leer la documentación',
  },

  footer: {
    tagline: 'Que el trabajo que solo puedes terminar tú no se quede en un mensaje olvidado.',
    licence: 'Código disponible bajo BUSL-1.1.',
    licenceNote: 'La versión 1.1.0 y anteriores fueron MIT y lo siguen siendo.',
    docs: 'Documentación',
    github: 'GitHub',
    language: 'English',
  },
}

export const content = { en, es } satisfies Record<Language, typeof en>

export function contentFor(language: Language) {
  return content[language]
}

/** The path a locale lives at. English is at the root; Spanish is prefixed. */
export function homeFor(language: Language) {
  return language === 'en' ? '/' : '/es/'
}
