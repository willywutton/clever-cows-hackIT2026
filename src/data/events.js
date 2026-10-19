// Sample events, shown on cause pages alongside each cause's regular session.
// These are made up and marked as samples on screen. Organisations can add more
// from the Organisation view, and students can propose their own from Host your own event.
//
// How to read one event:
//   source     "org" (added by the organisation) or "student" (proposed by a student)
//   status     "approved", or "pending" until the organisation approves it
//   startsAt   Singapore time (+08:00)

export const sampleEvents = [
  {
    id: "event_sample_1",
    causeId: "cause_02",
    title: "Karaoke afternoon",
    startsAt: "2026-11-15T14:00:00+08:00",
    durationMinutes: 120,
    place: "Toa Payoh community room",
    description: "Old favourites, new songs and plenty of kopi. No singing skills needed.",
    photoUrl: null,
    source: "org",
    status: "approved",
    sample: true,
  },
  {
    id: "event_sample_2",
    causeId: "cause_05",
    title: "Big riverbank clean-up",
    startsAt: "2026-11-22T08:00:00+08:00",
    durationMinutes: 180,
    place: "Punggol Waterway, near the bridge",
    description: "Gloves and bags provided. Wear shoes you don't mind getting muddy.",
    photoUrl: null,
    source: "org",
    status: "approved",
    sample: true,
  },
  {
    id: "event_sample_3",
    causeId: "cause_01",
    title: "Puppy socialising morning",
    startsAt: "2026-11-28T09:30:00+08:00",
    durationMinutes: 90,
    place: "Sungei Tengah shelter",
    description: "Help shy puppies get used to new people by sitting, reading and playing with them.",
    photoUrl: null,
    source: "org",
    status: "approved",
    sample: true,
  },
]

// The saved items a new student starts with, so Favourites isn't empty on first open.
export const startingFavourites = [{ kind: "event", id: "event_sample_1" }]
