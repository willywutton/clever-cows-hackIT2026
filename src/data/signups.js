// Mock sign-up data for the organisation view.
// These students are made up. Only a first name and initial are shown,
// so no real or personal details are stored.
//
// How to read one sign-up:
//   id              a unique code, used by React to tell rows apart
//   name            first name and last initial
//   actionType      which action they picked: "share", "time", "donate" or "recurring"
//                   (the matching button label is looked up from causes.js)
//   timesAttended   how many times the organisation has confirmed they turned up.
//                   Only used for in-person actions ("time" and "recurring").

// The cause this mock organisation runs (Golden Years Club in causes.js).
export const orgCauseId = "cause_02"

export const signups = [
  { id: "signup_01", name: "Aisha K.", actionType: "time", timesAttended: 2 },
  { id: "signup_02", name: "Ben T.", actionType: "recurring", timesAttended: 5 },
  { id: "signup_03", name: "Chloe L.", actionType: "share", timesAttended: 0 },
  { id: "signup_04", name: "Daniel W.", actionType: "time", timesAttended: 0 },
  { id: "signup_05", name: "Farah N.", actionType: "recurring", timesAttended: 3 },
  { id: "signup_06", name: "Gabriel O.", actionType: "donate", timesAttended: 0 },
  { id: "signup_07", name: "Hui Min S.", actionType: "time", timesAttended: 1 },
  { id: "signup_08", name: "Ivan R.", actionType: "share", timesAttended: 0 },
]
