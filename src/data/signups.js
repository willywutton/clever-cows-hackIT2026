// Mock sign-up data for the organisation view.
// These students are made up. Only a first name and initial are shown,
// so no real or personal details are stored.
//
// How to read one sign-up:
//   id              a unique code, used by React to tell rows apart
//   name            first name and last initial
//   actionType      which action they picked: "share", "donate" or "signup"
//                   (the matching button label is looked up from causes.js)
//   weekly          for sign-ups only: true if they join every week, false for just once
//   timesAttended   how many times the organisation has confirmed they turned up.
//                   Only used for sign-ups.

// The cause this mock organisation runs (Golden Years Club in causes.js).
export const orgCauseId = "cause_02"

export const signups = [
  { id: "signup_01", name: "Aisha K.", actionType: "signup", weekly: false, timesAttended: 2 },
  { id: "signup_02", name: "Ben T.", actionType: "signup", weekly: true, timesAttended: 5 },
  { id: "signup_03", name: "Chloe L.", actionType: "share", timesAttended: 0 },
  { id: "signup_04", name: "Daniel W.", actionType: "signup", weekly: false, timesAttended: 0 },
  { id: "signup_05", name: "Farah N.", actionType: "signup", weekly: true, timesAttended: 3 },
  { id: "signup_06", name: "Gabriel O.", actionType: "donate", timesAttended: 0 },
  { id: "signup_07", name: "Hui Min S.", actionType: "signup", weekly: false, timesAttended: 1 },
  { id: "signup_08", name: "Ivan R.", actionType: "share", timesAttended: 0 },
]
