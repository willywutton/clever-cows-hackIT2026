// The growth stages of Clover Cowdini, the group's shared cow,
// and how much grass each kind of action feeds her.
// A stage is shown once the group's grass count reaches its minGrass.
//
// The pictures are emoji placeholders. To use real artwork instead:
//   1. put the image file in this folder (src/assets)
//   2. import it at the top, e.g.  import calfImage from './cow-calf.png'
//   3. add it to the stage, e.g.   image: calfImage
// CloverCowdini.jsx shows the image when there is one, and the emoji when there isn't.

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
    message: "Clover Cowdini is a little calf. Every action helps the herd's cow grow.",
  },
  {
    name: "Growing",
    minGrass: 5,
    emoji: "🐄",
    message: "Clover Cowdini is growing, thanks to everyone pitching in!",
  },
  {
    name: "Grown",
    minGrass: 12,
    emoji: "🐄🌼",
    message: "Clover Cowdini is big and strong. Look what your group did together!",
  },
  {
    name: "Happy",
    minGrass: 25,
    emoji: "🐄✨",
    message: "Clover Cowdini is happy and well fed. Your group made this happen!",
  },
]
