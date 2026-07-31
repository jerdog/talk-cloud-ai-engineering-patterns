<script setup lang="ts">
// Renders elapsed (or remaining) time since a fixed date, e.g. a regulatory
// deadline, so the slide stays correct without a manual edit before each
// delivery. Used on "The clock" (EU AI Act) and in the nine-questions recap.
//
// Caveats:
// - This evaluates in the browser at view time, so it's live in `slidev dev`
//   and in any deployed build. A PDF export freezes it at export time —
//   re-export close to the delivery date rather than reusing an old PDF.
// - Vue components do not compile inside presenter notes (notes are rendered
//   as plain markdown/HTML). This only works on-slide.
import { computed } from 'vue'

const props = defineProps<{
  /** ISO date string, e.g. "2026-08-02" */
  date: string
}>()

// Compare at UTC midnight on both sides so this doesn't drift a day depending
// on the presenter's timezone relative to the audience's.
function utcMidnight(d: Date) {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
}

const label = computed(() => {
  const target = utcMidnight(new Date(props.date))
  const today = utcMidnight(new Date())
  const dayMs = 24 * 60 * 60 * 1000
  const daysSince = Math.round((today - target) / dayMs)

  if (daysSince < 0) {
    const daysUntil = -daysSince
    return `in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`
  }
  if (daysSince < 7) {
    return 'this week'
  }
  const weeks = Math.floor(daysSince / 7)
  return `${weeks} week${weeks === 1 ? '' : 's'} ago`
})
</script>

<template>
  <span>{{ label }}</span>
</template>
