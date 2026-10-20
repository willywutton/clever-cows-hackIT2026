// characters.js holds the cow artwork: Clover Cowdini (the shared mascot) and the
// four helper types from the story. Each has a full sitting figure and a head crop
// for round avatars. The figures are 640 pixels tall with transparent backgrounds.
//
// Where accessories go on each figure, as fractions of its height or width:
//   aspect     the figure's width divided by its height
//   centreX    the middle of the face, across
//   eyesY      the line of the eyes, down from the top
//   chinY      the bottom of the chin, down from the top
//   headwear   what the helper type already wears on its head (hats are hidden under it)
import clover from './cows/clover.png'
import cloverHead from './cows/clover-head.png'
import guardian from './cows/guardian.png'
import guardianHead from './cows/guardian-head.png'
import architect from './cows/architect.png'
import architectHead from './cows/architect-head.png'
import anchor from './cows/anchor.png'
import anchorHead from './cows/anchor-head.png'
import builder from './cows/builder.png'
import builderHead from './cows/builder-head.png'

export const CLOVER = {
  figure: clover, head: cloverHead, name: "Clover Cowdini",
  aspect: 504 / 640, centreX: 0.51, eyesY: 0.343, chinY: 0.62, headwear: null,
}

// Keyed by the quiz trait each helper type comes from.
export const CHARACTERS = {
  Heart: {
    figure: guardian, head: guardianHead, name: "The Guardian",
    aspect: 505 / 640, centreX: 0.507, eyesY: 0.343, chinY: 0.62, headwear: "laurel wreath",
  },
  Strategy: {
    figure: architect, head: architectHead, name: "The Architect",
    aspect: 487 / 640, centreX: 0.505, eyesY: 0.362, chinY: 0.63, headwear: "hat",
  },
  Community: {
    figure: anchor, head: anchorHead, name: "The Anchor",
    aspect: 539 / 640, centreX: 0.48, eyesY: 0.392, chinY: 0.64, headwear: "captain's hat",
  },
  Craft: {
    figure: builder, head: builderHead, name: "The Builder",
    aspect: 476 / 640, centreX: 0.51, eyesY: 0.38, chinY: 0.636, headwear: "hard hat",
  },
}
