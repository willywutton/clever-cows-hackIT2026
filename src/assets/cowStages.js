// The growth stages of Clover Cowdini, the student's cow,
// and how much grass each kind of action feeds her.
// A stage is shown once the student's grass count reaches its minGrass.
//
// The pictures are emoji placeholders. To use real artwork instead:
//   1. put the image file in this folder (src/assets)
//   2. import it at the top, e.g.  import calfImage from './cow-calf.png'
//   3. add it to the stage, e.g.   image: calfImage
// The Cow tab shows each stage's name and message.

// Basic grass per action. Each action counts once per cause, and each goal once when finished.
// Sharing and donating give no grass, so helping in person is what feeds the cow.
export const GRASS = {
  signup: 3,
  reflection: 2,
  goal: 2,
}

export const cowStages = [
  {
    name: "Calf",
    minGrass: 0,
    emoji: "🐮",
    message: "Clover is a little calf. She grows with every place you help.",
  },
  {
    name: "Growing",
    minGrass: 5,
    emoji: "🐄",
    message: "Clover is growing, one cause at a time.",
  },
  {
    name: "Grown",
    minGrass: 12,
    emoji: "🐄🌼",
    message: "Clover is big and strong. Look how far you've come!",
  },
  {
    name: "Happy",
    minGrass: 25,
    emoji: "🐄✨",
    message: "Clover is happy and thriving. You made this happen!",
  },
]
