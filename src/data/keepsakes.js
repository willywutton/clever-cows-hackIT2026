// keepsakes.js lists the keepsake Clover keeps from each cause, once the student has
// been to a session there. A keepsake becomes "treasured" when the student comes back
// often enough, so returning to a cause is what makes Clover's barn special.
//
// How to read one keepsake:
//   name     what Clover keeps
//   symbol   its drawing (see assets/graphics.js)
//   memory   one line about where it came from

import { causes } from './causes'

export const TREASURED_VISITS = 3

// Each keepsake raises Clover's Comfort and Happiness by this much when it's earned,
// and again when it becomes treasured.
export const KEEPSAKE_BOOST = 15

export const KEEPSAKES = {
  cause_01: { name: "Biscuit's tennis ball", symbol: "ball", memory: "From a walk with the shelter dogs." },
  cause_02: { name: "A chess piece from Mr Tan", symbol: "chess", memory: "He let you keep the knight after your game." },
  cause_03: { name: "A spare screwdriver", symbol: "tool", memory: "From the bench where you fixed your first lamp." },
  cause_04: { name: "A thank-you photo", symbol: "phone", memory: "A senior's first video call, saved for you." },
  cause_05: { name: "A river pebble", symbol: "wave", memory: "Picked up on the cleaned-up riverbank." },
  cause_06: { name: "A welcome badge", symbol: "hand", memory: "From the meetup where you made someone feel at home." },
  cause_07: { name: "A film strip", symbol: "film", memory: "A frame from the story you helped tell." },
  cause_08: { name: "A gold star sticker", symbol: "star", memory: "From the student you helped with homework." },
  cause_09: { name: "A neighbourhood map", symbol: "map", memory: "Marked with the ramps you reported." },
  cause_10: { name: "A loaf of rescued bread", symbol: "bread", memory: "Saved from the bin and shared with a family." },
  cause_11: { name: "A wooden spoon", symbol: "pot", memory: "From the kitchen where you cooked for seniors." },
  cause_12: { name: "A bicycle bell", symbol: "bicycle", memory: "From a bike you got back on the road." },
  cause_13: { name: "A favourite picture book", symbol: "openbook", memory: "The one the kids asked to hear twice." },
  cause_14: { name: "A sapling leaf", symbol: "tree", memory: "From a tree you planted." },
}

// Every keepsake the student has earned, newest first. Worked out from their visits
// and diary each time, so nothing extra is stored.
//   level   "keepsake", or "treasured" after TREASURED_VISITS visits
export function keepsakesFor(attendance, diary) {
  const byCause = new Map()
  attendance.forEach((visit) => {
    const earlier = byCause.get(visit.causeId) || { visits: 0, hours: 0, firstAt: visit.at, lastAt: visit.at }
    byCause.set(visit.causeId, {
      visits: earlier.visits + 1,
      hours: earlier.hours + visit.hours,
      firstAt: earlier.firstAt < visit.at ? earlier.firstAt : visit.at,
      lastAt: earlier.lastAt > visit.at ? earlier.lastAt : visit.at,
    })
  })
  return [...byCause.entries()]
    .filter(([causeId]) => KEEPSAKES[causeId])
    .map(([causeId, totals]) => ({
      cause: causes.find((c) => c.id === causeId),
      keepsake: KEEPSAKES[causeId],
      ...totals,
      level: totals.visits >= TREASURED_VISITS ? "treasured" : "keepsake",
      diaryEntry: diary.filter((entry) => entry.causeId === causeId).at(-1) || null,
    }))
    .sort((a, b) => (a.lastAt < b.lastAt ? 1 : -1))
}
