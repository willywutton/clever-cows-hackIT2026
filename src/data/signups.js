// Sample sign-ups for the Organisation view. These students are made up and are
// marked as samples on screen. Only a first name and initial are shown.
//
// How to read one sample sign-up:
//   id              a unique code, used by React to tell rows apart
//   name            first name and last initial
//   weekly          true if they come every week, false for just once
//   timesAttended   how many times they had already been confirmed as attending
//   trait           their helper type from the story (Heart, Strategy, Community or Craft)

const SAMPLE_PEOPLE = [
  { name: "Aisha K.", weekly: false, timesAttended: 2, trait: "Heart" },
  { name: "Ben T.", weekly: true, timesAttended: 5, trait: "Strategy" },
  { name: "Chloe L.", weekly: false, timesAttended: 0, trait: "Community" },
  { name: "Daniel W.", weekly: false, timesAttended: 1, trait: "Craft" },
  { name: "Farah N.", weekly: true, timesAttended: 3, trait: "Heart" },
  { name: "Hui Min S.", weekly: false, timesAttended: 1, trait: "Community" },
  { name: "Ivan R.", weekly: true, timesAttended: 4, trait: "Heart" },
]

// A few sample sign-ups for a cause. Each cause gets a different mix of people,
// so switching causes in the Organisation view shows a different list.
export function sampleSignupsFor(causeId) {
  const offset = Number(causeId.replace(/\D/g, "")) % SAMPLE_PEOPLE.length
  const count = 4 + (offset % 2)
  return Array.from({ length: count }, (_, index) => {
    const person = SAMPLE_PEOPLE[(offset + index) % SAMPLE_PEOPLE.length]
    return { id: `${causeId}_sample_${index}`, ...person }
  })
}
