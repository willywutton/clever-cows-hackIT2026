// Sample students for the friends feature. These people are made up.
// Only a first name and last initial are shown, so no personal details are stored.
//
// Each student has a friend code. In a real app, two students would swap codes
// and a server would connect their accounts; here, typing a sample code adds that person.

export const sampleStudents = [
  { id: "friend_01", name: "Mei L.", code: "MOO-2741" },
  { id: "friend_02", name: "Arjun P.", code: "MOO-5163" },
  { id: "friend_03", name: "Sofia T.", code: "MOO-3398" },
  { id: "friend_04", name: "Haziq R.", code: "MOO-7025" },
  { id: "friend_05", name: "Jun Wei C.", code: "MOO-1186" },
  { id: "friend_06", name: "Priya S.", code: "MOO-6430" },
  { id: "friend_07", name: "Daniel K.", code: "MOO-8812" },
]

// The friends the demo student starts with.
export const startingFriendIds = ["friend_01", "friend_02"]

// The demo student's own friend code, shown on their Profile.
export const myFriendCode = "MOO-4821"

// "moo 2741" and "MOO2741" both become "MOO2741", so codes match however they're typed.
export function normaliseCode(code) {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "")
}
