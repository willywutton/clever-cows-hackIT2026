// Mock cause dataset for Clever Cows
// Each cause has an id, name, description, trait tag(s), and ladder actions
// Traits match the quiz results: Heart, Strategy, Community, Craft
//
// How to read one cause:
//   id        a unique code, used by React to tell causes apart
//   identity  which quiz traits this cause matches (a cause can match more than one)
//   actions   the ways to help, from smallest to biggest commitment.
//             Every action is equally welcome; donating is never required.

export const causes = [
  {
    id: "cause_01",
    name: "Paws & Purpose",
    description: "Hi, I'm one of many dogs waiting for a home at our shelter. Even an hour of your time means I get to go for a walk today.",
    identity: ["Heart"],
    actions: [
      { type: "share", label: "Share our shelter's page" },
      { type: "time", label: "Volunteer for a 1-hour walk session" },
      { type: "donate", label: "Donate $2 for food", optional: true },
      { type: "recurring", label: "Become a weekly walker" }
    ]
  },
  {
    id: "cause_02",
    name: "Golden Years Club",
    description: "We're a group of elderly residents who'd love some company. A short visit or a game of chess means more than you'd think.",
    identity: ["Heart", "Community"],
    actions: [
      { type: "share", label: "Share our programme" },
      { type: "time", label: "Visit for an afternoon" },
      { type: "donate", label: "Donate $2 for activity supplies", optional: true },
      { type: "recurring", label: "Become a regular visitor" }
    ]
  },
  {
    id: "cause_03",
    name: "FixIt Collective",
    description: "We repair donated furniture and electronics for families who need them. If you like figuring out how things work, we need you.",
    identity: ["Craft"],
    actions: [
      { type: "share", label: "Share what we do" },
      { type: "time", label: "Join a Saturday repair session" },
      { type: "donate", label: "Donate $2 for spare parts", optional: true },
      { type: "recurring", label: "Join the repair crew" }
    ]
  },
  {
    id: "cause_04",
    name: "TechBridge",
    description: "We help seniors get comfortable with smartphones and video calls so they can stay connected to family. Patience is more useful than expertise.",
    identity: ["Strategy", "Craft"],
    actions: [
      { type: "share", label: "Share our sessions" },
      { type: "time", label: "Help at a drop-in session" },
      { type: "donate", label: "Donate $2 for printed guides", optional: true },
      { type: "recurring", label: "Become a regular tutor" }
    ]
  },
  {
    id: "cause_05",
    name: "Riverbank Restore",
    description: "We're restoring the riverbank one cleanup at a time. Every bag of litter removed helps the fish, the birds, and the rest of us.",
    identity: ["Craft"],
    actions: [
      { type: "share", label: "Share our next cleanup" },
      { type: "time", label: "Join a cleanup morning" },
      { type: "donate", label: "Donate $2 for gloves and bags", optional: true },
      { type: "recurring", label: "Join the monthly crew" }
    ]
  },
  {
    id: "cause_06",
    name: "New Friends Circle",
    description: "We welcome newcomer students who just moved here and don't know anyone yet. A short chat can turn into a real friendship.",
    identity: ["Community"],
    actions: [
      { type: "share", label: "Share our circle" },
      { type: "time", label: "Join a welcome meetup" },
      { type: "donate", label: "Donate $2 for welcome packs", optional: true },
      { type: "recurring", label: "Become a regular buddy" }
    ]
  },
  {
    id: "cause_07",
    name: "Storyline Project",
    description: "We turn overlooked community stories into short films and photo essays. If you notice things others walk past, this is for you.",
    identity: ["Community", "Strategy"],
    actions: [
      { type: "share", label: "Share our latest story" },
      { type: "time", label: "Help film or photograph an event" },
      { type: "donate", label: "Donate $2 for equipment", optional: true },
      { type: "recurring", label: "Join the storytelling team" }
    ]
  },
  {
    id: "cause_08",
    name: "Study Buddies",
    description: "We pair volunteers with younger students who need a bit of extra help and encouragement with schoolwork.",
    identity: ["Strategy", "Heart"],
    actions: [
      { type: "share", label: "Share our programme" },
      { type: "time", label: "Try a one-off tutoring session" },
      { type: "donate", label: "Donate $2 for stationery", optional: true },
      { type: "recurring", label: "Become a weekly tutor" }
    ]
  },
  {
    id: "cause_09",
    name: "Quiet Watch",
    description: "We track accessibility gaps around the neighbourhood — broken ramps, missing signage — so they can actually get fixed.",
    identity: ["Strategy"],
    actions: [
      { type: "share", label: "Share our accessibility map" },
      { type: "time", label: "Join a neighbourhood survey walk" },
      { type: "donate", label: "Donate $2 for printed reports", optional: true },
      { type: "recurring", label: "Join the survey team" }
    ]
  }
];