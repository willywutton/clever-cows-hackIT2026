// Sample organisations. Each one runs one or more causes (its programmes), and students
// can follow it to hear how it's doing. These organisations are made up for the demo,
// and every number here is a sample, labelled as such on screen.
//
// How to read one organisation:
//   causeIds     the programmes it runs (see causes.js)
//   tagline      one line saying what it is
//   about        a short paragraph on its mission
//   volunteers   what volunteers actually do there
//   goodToKnow   practical things a student checks before going: age, training,
//                commitment and getting there
//   suits        the helper types (quiz traits) its roles suit best
//   impact       sample figures about its work
//   followers    sample follower count (the student's own follow is added on top)

export const organisations = [
  {
    id: "org_paws",
    name: "Second Chance Paws",
    emoji: "🐾",
    color: "#f4c7a1",
    causeIds: ["cause_01"],
    tagline: "A volunteer-run shelter finding homes for rescued dogs.",
    about: "We take in dogs that were abandoned or rescued from the streets, help them trust people again, and find them families. Volunteers are how the dogs get walked, played with and ready for adoption.",
    volunteers: ["Walk and socialise dogs", "Help keep the kennels clean and comfy", "Greet families at adoption days"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "13 and up. Under-16s come with a parent or teacher." },
      { icon: "🧑‍🏫", label: "Training", text: "A 20-minute safety briefing on your first visit." },
      { icon: "⏱️", label: "Commitment", text: "Come once, or join the weekly walkers." },
      { icon: "🚌", label: "Getting there", text: "The shelter is in Sungei Tengah; check the bus route before you go." },
    ],
    suits: ["Heart", "Craft"],
    impact: [{ value: "120", label: "dogs walked each month" }, { value: "38", label: "dogs rehomed this year" }],
    followers: 412,
  },
  {
    id: "org_silver",
    name: "Silver Threads Community",
    emoji: "🧶",
    color: "#e9c6e0",
    causeIds: ["cause_02", "cause_04", "cause_11"],
    tagline: "Keeping older neighbours connected, fed and part of things.",
    about: "Many seniors live alone and can go days without a proper chat. We run visits, tech help and a community kitchen so they stay connected to family, friends and the neighbourhood.",
    volunteers: ["Visit, chat and play games with seniors", "Help with phones and video calls", "Cook and deliver lunches"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "14 and up for visits; 16 and up in the kitchen." },
      { icon: "🧑‍🏫", label: "Training", text: "A short guide on chatting with seniors, sent before your first session." },
      { icon: "⏱️", label: "Commitment", text: "One-off visits are welcome; regulars get to know the same seniors." },
      { icon: "🗣️", label: "Languages", text: "Mandarin, Malay, Tamil or dialect help, but English is fine too." },
    ],
    suits: ["Heart", "Community", "Strategy"],
    impact: [{ value: "260", label: "seniors visited this year" }, { value: "1,900", label: "lunches delivered" }],
    followers: 538,
  },
  {
    id: "org_makers",
    name: "Makers for Good",
    emoji: "🛠️",
    color: "#c9d8e8",
    causeIds: ["cause_03", "cause_12"],
    tagline: "Fixing things so they go to people who need them, not the bin.",
    about: "We repair donated furniture, electronics and bicycles, then pass them on to families and workers who need them. You'll learn real repair skills from experienced fixers.",
    volunteers: ["Repair furniture, fans and lamps", "Fix up donated bicycles", "Sort and test donations"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "15 and up. Tools are used under supervision." },
      { icon: "🧑‍🏫", label: "Training", text: "No experience needed. Every bench has a mentor." },
      { icon: "🧤", label: "Bring", text: "Closed-toe shoes. Gloves and safety glasses are provided." },
      { icon: "⏱️", label: "Commitment", text: "Drop in to any Saturday session." },
    ],
    suits: ["Craft", "Strategy"],
    impact: [{ value: "540", label: "items repaired this year" }, { value: "85", label: "bikes given away" }],
    followers: 296,
  },
  {
    id: "org_green",
    name: "Green Kampung Network",
    emoji: "🌿",
    color: "#cfe3c6",
    causeIds: ["cause_05", "cause_14", "cause_10"],
    tagline: "Neighbours looking after rivers, parks and good food.",
    about: "We bring people together to clean waterways, plant native trees and rescue unsold food before it's thrown away. Small, regular actions that add up across the island.",
    volunteers: ["Clean up riverbanks", "Plant and care for native trees", "Rescue and pack unsold food"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "12 and up. Under-16s come with an adult." },
      { icon: "☀️", label: "Bring", text: "Water bottle, hat and shoes that can get muddy." },
      { icon: "⏱️", label: "Commitment", text: "Most sessions are early mornings, two to three hours." },
      { icon: "♿", label: "Access", text: "Food rescue runs are step-free; ask about cleanup sites." },
    ],
    suits: ["Craft", "Community", "Strategy"],
    impact: [{ value: "3.2 t", label: "litter cleared this year" }, { value: "900", label: "trees planted" }],
    followers: 721,
  },
  {
    id: "org_brightpath",
    name: "Bright Path Youth",
    emoji: "📚",
    color: "#d6d3f0",
    causeIds: ["cause_06", "cause_08", "cause_13"],
    tagline: "Helping children and new students feel at home and do well.",
    about: "We pair volunteers with younger students who need homework help, read with young children, and welcome students who have just moved to Singapore.",
    volunteers: ["Tutor younger students", "Read picture books with kids", "Welcome newcomer students"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "16 and up for tutoring; 13 and up for reading and meetups." },
      { icon: "🛡️", label: "Safety", text: "Sessions are always in public places with a staff member present." },
      { icon: "🧑‍🏫", label: "Training", text: "A 30-minute online briefing before your first session." },
      { icon: "⏱️", label: "Commitment", text: "Tutoring works best weekly; reading and meetups can be one-off." },
    ],
    suits: ["Heart", "Community", "Strategy"],
    impact: [{ value: "180", label: "students tutored" }, { value: "75", label: "story times run" }],
    followers: 467,
  },
  {
    id: "org_openstreets",
    name: "Open Streets SG",
    emoji: "🏘️",
    color: "#f2c3bd",
    causeIds: ["cause_07", "cause_09"],
    tagline: "Making neighbourhoods fairer, more accessible and better known.",
    about: "We map accessibility problems so they get fixed, and tell the stories of the people who make a neighbourhood what it is.",
    volunteers: ["Survey streets for accessibility gaps", "Photograph and film community stories", "Help write and share reports"],
    goodToKnow: [
      { icon: "🎂", label: "Age", text: "13 and up. Under-16s survey in pairs with an adult." },
      { icon: "📱", label: "Bring", text: "A phone for photos. No special equipment needed." },
      { icon: "⏱️", label: "Commitment", text: "Evening walks of about 90 minutes." },
      { icon: "🔒", label: "Privacy", text: "We always ask before photographing anyone." },
    ],
    suits: ["Strategy", "Community"],
    impact: [{ value: "310", label: "access issues reported" }, { value: "24", label: "stories published" }],
    followers: 189,
  },
]

export function organisationById(id) {
  return organisations.find((org) => org.id === id)
}

export function organisationOfCause(causeId) {
  return organisations.find((org) => org.causeIds.includes(causeId))
}
