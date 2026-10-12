// Mock cause dataset for Clever Cows
// Each cause has an id, name, description, trait tag(s), and three actions
// Traits match the quiz results: Heart, Strategy, Community, Craft
//
// How to read one cause:
//   id        a unique code, used by React to tell causes apart
//   identity  which quiz traits this cause matches (a cause can match more than one)
//   actions   the three ways to help: share, donate and sign up.
//             Every action is equally welcome; donating is never required.
//
// A sign-up action also has:
//   label            what the session is, for students joining just this once
//   weeklyLabel      the same session for students joining every week
//   startsAt         the next session's start, in Singapore time (+08:00). Sample dates.
//   durationMinutes  how long one session lasts

export const causes = [
  {
    id: "cause_01",
    name: "Paws & Purpose",
    description: "Hi, I'm one of many dogs waiting for a home at our shelter. Even an hour of your time means I get to go for a walk today.",
    identity: ["Heart"],
    actions: [
      { type: "share", label: "Share our shelter's page" },
      { type: "donate", label: "Donate $2 for food", optional: true },
      {
        type: "signup",
        label: "Volunteer for a 1-hour walk session",
        weeklyLabel: "Become a weekly walker",
        startsAt: "2026-11-07T09:00:00+08:00",
        durationMinutes: 60
      }
    ]
  },
  {
    id: "cause_02",
    name: "Golden Years Club",
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
        durationMinutes: 120
      }
    ]
  },
  {
    id: "cause_03",
    name: "FixIt Collective",
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
        durationMinutes: 180
      }
    ]
  },
  {
    id: "cause_04",
    name: "TechBridge",
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
        durationMinutes: 90
      }
    ]
  },
  {
    id: "cause_05",
    name: "Riverbank Restore",
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
        durationMinutes: 120
      }
    ]
  },
  {
    id: "cause_06",
    name: "New Friends Circle",
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
        durationMinutes: 90
      }
    ]
  },
  {
    id: "cause_07",
    name: "Storyline Project",
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
        durationMinutes: 120
      }
    ]
  },
  {
    id: "cause_08",
    name: "Study Buddies",
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
        durationMinutes: 60
      }
    ]
  },
  {
    id: "cause_09",
    name: "Quiet Watch",
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
        durationMinutes: 90
      }
    ]
  }
];