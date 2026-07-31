#!/usr/bin/env node
// Guards against a slide silently rendering blank.
//
// The WWT theme's layouts (comparison, stats, timeline, process, agenda,
// image-full, image-feature) read their content entirely from frontmatter and
// render whatever they find — an empty or malformed field produces the
// layout's chrome with nothing inside it, with no error from Slidev or Vue.
// The most likely cause is an editor's Markdown formatter (Prettier or
// similar) reflowing the nested YAML these layouts depend on: it turns a
// `points:` list into an inline string rather than removing the key, which a
// naive "is the key present" check would miss entirely.
//
// This walks every slide with Slidev's own parser (so it checks exactly what
// Slidev will render, not a hand-rolled re-implementation of its frontmatter
// rules) and asserts the fields each layout actually needs. Wired into
// `build` and `export` in package.json so a broken slide fails the command
// instead of shipping.
//
// Run directly: `node scripts/check-slides.mjs [path/to/slides.md]`

import { readFileSync } from 'node:fs'
import { parseSync } from '@slidev/parser'

const file = process.argv[2] ?? 'slides.md'
const raw = readFileSync(file, 'utf-8')
const parsed = parseSync(raw, file)

/** @type {{ line: number, message: string }[]} */
const errors = []

function fail(slide, message) {
  errors.push({ line: slide.start, message })
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

function isNonEmptyArray(v) {
  return Array.isArray(v) && v.length > 0
}

// Layouts whose entire visible content comes from frontmatter — no <slot/>
// in the theme's .vue file, so markdown body content is irrelevant to them
// and an empty/malformed field is the *only* way they end up blank.
const CHECKS = {
  cover(fm, slide) {
    if (!isNonEmptyString(fm.title)) fail(slide, 'cover: missing title')
  },
  section(fm, slide) {
    if (!isNonEmptyString(fm.title)) fail(slide, 'section: missing title')
  },
  end() {
    // signoff has a theme-level default; nothing is required.
  },
  comparison(fm, slide) {
    for (const side of ['left', 'right']) {
      const col = fm[side]
      if (!col || typeof col !== 'object') {
        fail(slide, `comparison: missing "${side}"`)
        continue
      }
      if (!isNonEmptyString(col.title)) fail(slide, `comparison: "${side}.title" is missing or empty`)
      if (!isNonEmptyArray(col.points)) {
        const shape = typeof col.points
        fail(slide, `comparison: "${side}.points" must be a non-empty list (got ${Array.isArray(col.points) ? 'empty list' : shape}) — check for flattened YAML`)
      }
    }
  },
  stats(fm, slide) {
    if (!isNonEmptyArray(fm.stats)) {
      fail(slide, `stats: "stats" must be a non-empty list (got ${typeof fm.stats})`)
      return
    }
    fm.stats.forEach((s, i) => {
      if (!isNonEmptyString(s?.value)) fail(slide, `stats: stats[${i}].value is missing or empty`)
      if (!isNonEmptyString(s?.label)) fail(slide, `stats: stats[${i}].label is missing or empty`)
    })
  },
  timeline(fm, slide) {
    if (!isNonEmptyArray(fm.events)) {
      fail(slide, `timeline: "events" must be a non-empty list (got ${typeof fm.events})`)
      return
    }
    fm.events.forEach((e, i) => {
      if (!isNonEmptyString(e?.date)) fail(slide, `timeline: events[${i}].date is missing or empty`)
      if (!isNonEmptyString(e?.label)) fail(slide, `timeline: events[${i}].label is missing or empty`)
    })
  },
  process(fm, slide) {
    if (!isNonEmptyArray(fm.steps)) {
      fail(slide, `process: "steps" must be a non-empty list (got ${typeof fm.steps})`)
      return
    }
    fm.steps.forEach((s, i) => {
      if (!isNonEmptyString(s?.title)) fail(slide, `process: steps[${i}].title is missing or empty`)
    })
  },
  agenda(fm, slide) {
    if (!isNonEmptyArray(fm.items)) {
      fail(slide, `agenda: "items" must be a non-empty list (got ${typeof fm.items})`)
    }
  },
  'image-full': checkImageSlide,
  'image-feature': checkImageSlide,
}

function checkImageSlide(fm, slide) {
  if (!isNonEmptyString(fm.image)) fail(slide, `${fm.layout}: missing "image"`)
  if (!isNonEmptyString(fm.imageAlt)) fail(slide, `${fm.layout}: missing "imageAlt" (accessibility requirement, not just a rendering one)`)
}

// Everything else (default, quote, code-focus, two-cols, customer-quote,
// demo, team, ...) renders a <slot/> — its content lives in the markdown
// body, not frontmatter, so the one thing that can go silently missing is
// the body itself.
function checkSlotBody(fm, slide) {
  if (slide.content.trim().length === 0) {
    fail(slide, `${fm.layout ?? 'default'}: slide body is empty`)
  }
}

for (const slide of parsed.slides) {
  const fm = slide.frontmatter ?? {}
  const layout = fm.layout ?? 'default'
  const check = CHECKS[layout] ?? checkSlotBody
  check(fm, slide)
}

if (errors.length > 0) {
  errors.sort((a, b) => a.line - b.line)
  console.error(`✗ ${errors.length} slide content issue${errors.length === 1 ? '' : 's'} in ${file}:\n`)
  for (const { line, message } of errors) {
    console.error(`  ${file}:${line}: ${message}`)
  }
  console.error('')
  process.exit(1)
}

console.log(`✓ ${parsed.slides.length} slides checked in ${file}, all have the content their layout needs`)
