// The growth stages of Clover Cowdini, the group's shared cow.
// A stage is shown once the group's grass count reaches its minGrass.
//
// The pictures are emoji placeholders. To use real artwork instead:
//   1. put the image file in this folder (src/assets)
//   2. import it at the top, e.g.  import calfImage from './cow-calf.png'
//   3. add it to the stage, e.g.   image: calfImage
// CloverCowdini.jsx shows the image when there is one, and the emoji when there isn't.

export const cowStages = [
  {
    name: "Calf",
    minGrass: 0,
    emoji: "🐮",
    message: "Clover Cowdini is a little calf. Every action helps the herd's cow grow.",
  },
  {
    name: "Grown",
    minGrass: 3,
    emoji: "🐄",
    message: "Clover Cowdini is growing strong, thanks to everyone pitching in!",
  },
  {
    name: "Happy",
    minGrass: 6,
    emoji: "🐄✨",
    message: "Clover Cowdini is happy and well fed. Look what your group did together!",
  },
]
