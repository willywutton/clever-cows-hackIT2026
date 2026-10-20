// Mock cause dataset for Clever Cows
// Each cause has an id, name, description, trait tag(s), and three actions
// Traits match the quiz results: Heart, Strategy, Community, Craft
//
// How to read one cause:
//   id        a unique code, used by React to tell causes apart
//   topic     what the cause is about, used for the topic filters on Home
//   identity  which quiz traits this cause matches (a cause can match more than one)
//   actions   the three ways to help: share, donate and sign up.
//             Every action is equally welcome; donating is never required.
//
// A sign-up action also has:
//   label            what the session is, for students joining just this once
//   weeklyLabel      the same session for students joining every week
//   startsAt         the next session's start, in Singapore time (+08:00). Sample dates.
//   durationMinutes  how long one session lasts
//   peopleNeeded     how many people a relay group sends to each session
//   spots            how many places the next session has (sample number)
//   area             the neighbourhood the session is in (general area only, no address)
//   region           the part of Singapore: North, North-East, East, West or Central

export const causes = [
  {
    id: "cause_01",
    name: "Paws & Purpose",
    topic: "Animals",
    description: "Hi, I'm one of many dogs waiting for a home at our shelter. Even an hour of your time means I get to go for a walk today.",
    identity: ["Heart"],
    actions: [
      { type: "share", label: "Share our shelter's page" },
      { type: "donate", label: "Donate $2 for food", optional: true },
      {
        type: "signup",
        label: "Volunteer for a 1-hour walk session",
        weeklyLabel: "Become a weekly walker",
        startsAt: "2026-11-07T10:00:00+08:00",
        durationMinutes: 60,
        peopleNeeded: 2,
        spots: 8,
        area: "Sungei Tengah",
        region: "West"
      }
    ]
  },
  {
    id: "cause_02",
    name: "Golden Years Club",
    topic: "Older people",
    description: "We're a group of elderly residents who'd love some company. A short visit or a game of chess means more than you'd think.",
    identity: ["Heart", "Community"],
    actions: [
      { type: "share", label: "Share our programme" },
      { type: "donate", label: "Donate $2 for activity supplies", optional: true },
      {
        type: "signup",
        label: "Visit for an afternoon",
        weeklyLabel: "Become a regular visitor",
        startsAt: "2026-11-08T14:00:00+08:00",
        durationMinutes: 120,
        peopleNeeded: 3,
        spots: 6,
        area: "Toa Payoh",
        region: "Central"
      }
    ]
  },
  {
    id: "cause_03",
    name: "FixIt Collective",
    topic: "Making and fixing",
    description: "We repair donated furniture and electronics for families who need them. If you like figuring out how things work, we need you.",
    identity: ["Craft"],
    actions: [
      { type: "share", label: "Share what we do" },
      { type: "donate", label: "Donate $2 for spare parts", optional: true },
      {
        type: "signup",
        label: "Join a Saturday repair session",
        weeklyLabel: "Join the repair crew",
        startsAt: "2026-11-14T10:00:00+08:00",
        durationMinutes: 180,
        peopleNeeded: 4,
        spots: 10,
        area: "Bedok",
        region: "East"
      }
    ]
  },
  {
    id: "cause_04",
    name: "TechBridge",
    topic: "Older people",
    description: "We help seniors get comfortable with smartphones and video calls so they can stay connected to family. Patience is more useful than expertise.",
    identity: ["Strategy", "Craft"],
    actions: [
      { type: "share", label: "Share our sessions" },
      { type: "donate", label: "Donate $2 for printed guides", optional: true },
      {
        type: "signup",
        label: "Help at a drop-in session",
        weeklyLabel: "Become a regular tutor",
        startsAt: "2026-11-04T18:30:00+08:00",
        durationMinutes: 90,
        peopleNeeded: 2,
        spots: 6,
        area: "Ang Mo Kio",
        region: "North-East"
      }
    ]
  },
  {
    id: "cause_05",
    name: "Riverbank Restore",
    topic: "Environment",
    description: "We're restoring the riverbank one cleanup at a time. Every bag of litter removed helps the fish, the birds, and the rest of us.",
    identity: ["Craft"],
    actions: [
      { type: "share", label: "Share our next cleanup" },
      { type: "donate", label: "Donate $2 for gloves and bags", optional: true },
      {
        type: "signup",
        label: "Join a cleanup morning",
        weeklyLabel: "Join the weekly cleanup crew",
        startsAt: "2026-11-15T08:00:00+08:00",
        durationMinutes: 120,
        peopleNeeded: 4,
        spots: 12,
        area: "Punggol",
        region: "North-East"
      }
    ]
  },
  {
    id: "cause_06",
    name: "New Friends Circle",
    topic: "Young people and learning",
    description: "We welcome newcomer students who just moved here and don't know anyone yet. A short chat can turn into a real friendship.",
    identity: ["Community"],
    actions: [
      { type: "share", label: "Share our circle" },
      { type: "donate", label: "Donate $2 for welcome packs", optional: true },
      {
        type: "signup",
        label: "Join a welcome meetup",
        weeklyLabel: "Become a regular buddy",
        startsAt: "2026-11-06T19:00:00+08:00",
        durationMinutes: 90,
        peopleNeeded: 3,
        spots: 8,
        area: "Clementi",
        region: "West"
      }
    ]
  },
  {
    id: "cause_07",
    name: "Storyline Project",
    topic: "Neighbourhood",
    description: "We turn overlooked community stories into short films and photo essays. If you notice things others walk past, this is for you.",
    identity: ["Community", "Strategy"],
    actions: [
      { type: "share", label: "Share our latest story" },
      { type: "donate", label: "Donate $2 for equipment", optional: true },
      {
        type: "signup",
        label: "Help film or photograph an event",
        weeklyLabel: "Join the storytelling team",
        startsAt: "2026-11-21T15:00:00+08:00",
        durationMinutes: 120,
        peopleNeeded: 2,
        spots: 6,
        area: "Tiong Bahru",
        region: "Central"
      }
    ]
  },
  {
    id: "cause_08",
    name: "Study Buddies",
    topic: "Young people and learning",
    description: "We pair volunteers with younger students who need a bit of extra help and encouragement with schoolwork.",
    identity: ["Strategy", "Heart"],
    actions: [
      { type: "share", label: "Share our programme" },
      { type: "donate", label: "Donate $2 for stationery", optional: true },
      {
        type: "signup",
        label: "Try a one-off tutoring session",
        weeklyLabel: "Become a weekly tutor",
        startsAt: "2026-11-10T17:30:00+08:00",
        durationMinutes: 60,
        peopleNeeded: 2,
        spots: 6,
        area: "Woodlands",
        region: "North"
      }
    ]
  },
  {
    id: "cause_09",
    name: "Quiet Watch",
    topic: "Neighbourhood",
    description: "We track accessibility gaps around the neighbourhood — broken ramps, missing signage — so they can actually get fixed.",
    identity: ["Strategy"],
    actions: [
      { type: "share", label: "Share our accessibility map" },
      { type: "donate", label: "Donate $2 for printed reports", optional: true },
      {
        type: "signup",
        label: "Join a neighbourhood survey walk",
        weeklyLabel: "Join the survey team",
        startsAt: "2026-11-12T18:00:00+08:00",
        durationMinutes: 90,
        peopleNeeded: 3,
        spots: 8,
        area: "Tampines",
        region: "East"
      }
    ]
  },
  {
    id: "cause_10",
    name: "Food Rescue Crew",
    topic: "Environment",
    description: "We collect unsold bread and vegetables from markets and get them to families before they go to waste.",
    identity: ["Community", "Strategy"],
    actions: [
      { type: "share", label: "Share our rescue runs" },
      { type: "donate", label: "Donate $2 for crates", optional: true },
      {
        type: "signup",
        label: "Join a market rescue run",
        weeklyLabel: "Join the weekly rescue crew",
        startsAt: "2026-11-11T07:30:00+08:00",
        durationMinutes: 90,
        peopleNeeded: 3,
        spots: 10,
        area: "Yishun",
        region: "North"
      }
    ]
  },
  {
    id: "cause_11",
    name: "Kampung Kitchen",
    topic: "Older people",
    description: "We cook and pack warm lunches for seniors who live alone, then deliver them with a short chat at the door.",
    identity: ["Heart", "Craft"],
    actions: [
      { type: "share", label: "Share our kitchen" },
      { type: "donate", label: "Donate $2 for ingredients", optional: true },
      {
        type: "signup",
        label: "Cook and pack lunches for a morning",
        weeklyLabel: "Become a weekly cook",
        startsAt: "2026-11-09T09:00:00+08:00",
        durationMinutes: 150,
        peopleNeeded: 3,
        spots: 8,
        area: "Bedok",
        region: "East"
      }
    ]
  },
  {
    id: "cause_12",
    name: "Bike Kitchen",
    topic: "Making and fixing",
    description: "We fix donated bicycles so migrant workers and students have a cheap way to get around.",
    identity: ["Craft", "Community"],
    actions: [
      { type: "share", label: "Share our workshop" },
      { type: "donate", label: "Donate $2 for spare tubes", optional: true },
      {
        type: "signup",
        label: "Join a bike repair afternoon",
        weeklyLabel: "Join the repair bench",
        startsAt: "2026-11-13T14:00:00+08:00",
        durationMinutes: 120,
        peopleNeeded: 2,
        spots: 8,
        area: "Jalan Besar",
        region: "Central"
      }
    ]
  },
  {
    id: "cause_13",
    name: "Reading Pals",
    topic: "Young people and learning",
    description: "We read picture books with young kids at the library and help them pick stories they'll love.",
    identity: ["Heart", "Community"],
    actions: [
      { type: "share", label: "Share our story time" },
      { type: "donate", label: "Donate $2 for books", optional: true },
      {
        type: "signup",
        label: "Read at a Saturday story time",
        weeklyLabel: "Become a weekly reading pal",
        startsAt: "2026-11-14T10:30:00+08:00",
        durationMinutes: 60,
        peopleNeeded: 2,
        spots: 6,
        area: "Sengkang",
        region: "North-East"
      }
    ]
  },
  {
    id: "cause_14",
    name: "Green Corridors",
    topic: "Environment",
    description: "We plan and plant native trees along park connectors so birds and butterflies can travel across the island.",
    identity: ["Strategy", "Craft"],
    actions: [
      { type: "share", label: "Share our planting map" },
      { type: "donate", label: "Donate $2 for saplings", optional: true },
      {
        type: "signup",
        label: "Join a planting morning",
        weeklyLabel: "Join the planting team",
        startsAt: "2026-11-21T08:00:00+08:00",
        durationMinutes: 180,
        peopleNeeded: 4,
        spots: 12,
        area: "Jurong West",
        region: "West"
      }
    ]
  }
];
