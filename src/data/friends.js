// Sample students for the friends feature. These people are made up.
// Only a first name and last initial are shown, so no personal details are stored.
//
// Each student has a friend code. In a real app, two students would swap codes
// and a server would connect their accounts; here, typing a sample code adds that person.
//
// How to read one sample student:
//   id, name, code  their id, first name and initial, and friend code
//   hoursWorked     their volunteering hours (sample numbers)
//   showTitles      whether they let friends see their titles
//   titles          title ids from titles.js
//   accessories     what their cow wears in its profile picture (see cowArt.js)
//   banner          the colour of their profile banner
//   about           a short line about them

export const sampleStudents = [
  { id: "friend_01", name: "Mei L.", code: "MOO-2741", hoursWorked: 14, showTitles: true,
    titles: ["first-step", "storyteller", "regular"], accessories: ["flower-crown"], banner: "#e9c6e0",
    about: "Loves board games and old Cantonese songs." },
  { id: "friend_02", name: "Arjun P.", code: "MOO-5163", hoursWorked: 9, showTitles: false,
    titles: ["first-step", "explorer"], accessories: ["straw-hat", "bandana"], banner: "#c9d8e8",
    about: "Fixes bikes on weekends." },
  { id: "friend_03", name: "Sofia T.", code: "MOO-3398", hoursWorked: 22, showTitles: true,
    titles: ["first-step", "connector", "champion"], accessories: ["sunglasses"], banner: "#f4c7a1",
    about: "Dog person, through and through." },
  { id: "friend_04", name: "Haziq R.", code: "MOO-7025", hoursWorked: 6, showTitles: true,
    titles: ["first-step"], accessories: ["cowbell"], banner: "#cfe3c6",
    about: "Learning to film things with my phone." },
  { id: "friend_05", name: "Jun Wei C.", code: "MOO-1186", hoursWorked: 17, showTitles: false,
    titles: ["first-step", "regular"], accessories: ["straw-hat"], banner: "#d6d3f0",
    about: "Maths tutor in training." },
  { id: "friend_06", name: "Priya S.", code: "MOO-6430", hoursWorked: 11, showTitles: true,
    titles: ["first-step", "word-spreader"], accessories: ["flower-crown", "bandana"], banner: "#f6dc9a",
    about: "Happiest outdoors." },
  { id: "friend_07", name: "Daniel K.", code: "MOO-8812", hoursWorked: 4, showTitles: true,
    titles: ["first-step"], accessories: [], banner: "#bfe0dc",
    about: "New to volunteering and keen to try things." },
]

export function sampleStudentById(id) {
  return sampleStudents.find((student) => student.id === id)
}

// The friends the demo student starts with.
export const startingFriendIds = ["friend_01", "friend_02"]

// The demo student's own friend code, shown on their Profile.
export const myFriendCode = "MOO-4821"

// "moo 2741" and "MOO2741" both become "MOO2741", so codes match however they're typed.
export function normaliseCode(code) {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "")
}
