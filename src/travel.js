// travel.js describes roughly how far a session is from the student, using the
// five parts of Singapore. Nothing is ever hidden for being far: the label just
// helps the student decide whether the trip suits them.

// Which regions border each other. Central borders all four of the others.
const NEIGHBOURS = {
    Central: ["North", "North-East", "East", "West"],
    North: ["Central", "North-East", "West"],
    "North-East": ["Central", "North", "East"],
    East: ["Central", "North-East"],
    West: ["Central", "North"],
}

// Returns { level, text } for a session's region, or null when the student
// hasn't said where they are (or prefers not to say).
//   level  "very-near", "not-far" or "longer", used for the tag's colour
export function travelLabel(userRegion, sessionRegion) {
    if (!NEIGHBOURS[userRegion]) {
        return null
    }
    if (userRegion === sessionRegion) {
        return { level: "very-near", text: "Very near you" }
    }
    if (NEIGHBOURS[userRegion].includes(sessionRegion)) {
        return { level: "not-far", text: "Not far" }
    }
    return { level: "longer", text: "A longer trip" }
}
