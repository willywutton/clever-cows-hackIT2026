// Chapter data for "The Day Mooville Needed You" quiz
// Each scene has a title, the story text, and four choices.
// Each choice has:
//   key     a unique name for the button (React needs this when drawing a list)
//   text    what the button says
//   trait   which trait gets +1 point when this choice is picked
//   result  what happens in the story after picking it

export const chapters = [
  {
    title: "The Runaway Calf",
    story: `You arrive in Mooville to a loud "Moooo!" Clover, a tiny calf, has climbed onto a wobbly hay cart and is too scared to come down.

"Please help her!" calls Granny Bess, leaning on her cane.`,
    choices: [
      {
        key: "hay",
        text: "Hold out some sweet hay and talk to her softly.",
        trait: "Heart",
        result: "Clover calms down and hops into your arms. She stays close to you all morning."
      },
      {
        key: "guide",
        text: "Steady the cart and guide her down step by step.",
        trait: "Strategy",
        result: "She climbs down safely. You also spot a crack in the cart's wheel. That could be trouble later."
      },
      {
        key: "song",
        text: "Get the crowd singing her favourite barn song.",
        trait: "Community",
        result: "Clover giggles and trots down. The singing puts the whole square in a good mood."
      },
      {
        key: "latch",
        text: "Fix her pen gate first, so she has somewhere safe to go.",
        trait: "Craft",
        result: "With the gate fixed, Clover heads straight back to her pen. You notice lots of Mooville needs repairs."
      }
    ]
  },
  {
    title: "The Tangled Lanterns",
    story: `In the town square, the festival lanterns are tangled into one giant knot. Storm clouds are rolling in.

"If these aren't up soon," sighs Mayor Ox, "tonight's festival will be in the dark!"`,
    choices: [
      {
        key: "sort",
        text: "Untangle them carefully and sort them by colour.",
        trait: "Craft",
        result: "Not a single bulb breaks, and the crew hangs them up in record time."
      },
      {
        key: "layout",
        text: "Check the mayor's map and free the main power line first.",
        trait: "Strategy",
        result: "The main lights flicker on early, and the square starts to glow."
      },
      {
        key: "game",
        text: "Turn the untangling into a team game for everyone.",
        trait: "Community",
        result: "Everyone grabs a strand, and the knot disappears in a burst of laughter."
      },
      {
        key: "trace",
        text: "Calm the worried mayor, then untangle it with him patiently.",
        trait: "Heart",
        result: "The mayor relaxes, and the two of you free the lights one by one."
      }
    ]
  },
  {
    title: "The Barn Library",
    story: `At the Barn Library, the librarian sheep is in a panic. She needs one book to read aloud at the festival opening.

"Which one sets the right mood?" she bleats.`,
    choices: [
      {
        key: "inventions",
        text: "A book of clever farm inventions.",
        trait: "Craft",
        result: "The young listeners rush off to fix up the broken market stalls."
      },
      {
        key: "folktales",
        text: "Old animal tales about kindness and courage.",
        trait: "Heart",
        result: "The library becomes a cosy spot where tired helpers come to rest."
      },
      {
        key: "chronicle",
        text: "How Mooville's founders planned for hard winters.",
        trait: "Strategy",
        result: "The grown-ups get organised and finish their chores much faster."
      },
      {
        key: "album",
        text: "A photo album of the whole herd through the years.",
        trait: "Community",
        result: "Neighbours swap old memories, and two old rivals even shake hooves."
      }
    ]
  },
  {
    title: "Granny Bess's Garden",
    story: `Granny Bess's garden is full of pumpkins and corn for tonight's festival stew. But she has hurt her back.

"If they're not picked by this afternoon," she says quietly, "there'll be no stew."`,
    choices: [
      {
        key: "harvest",
        text: "Roll up your sleeves and pick it all for her.",
        trait: "Heart",
        result: "You fill the crates while Granny Bess rests, finally able to relax."
      },
      {
        key: "teach",
        text: "Show her grandkids how to pick without hurting the plants.",
        trait: "Craft",
        result: "The kids learn fast, and now they can help with every harvest."
      },
      {
        key: "rotation",
        text: "Make a weekly rota so neighbours take turns helping.",
        trait: "Strategy",
        result: "Granny Bess gets help today, and every week after that."
      },
      {
        key: "party",
        text: "Turn the harvest into a garden party for the street.",
        trait: "Community",
        result: "Neighbours bring baskets and music. A chore becomes the best part of the day."
      }
    ]
  },
  {
    title: "The Missing Spice",
    story: `The festival chef, a very stressed pig, bursts out of the kitchen.

"The Golden Spice is gone!" he wails. "The stew is ruined without it!"`,
    choices: [
      {
        key: "retrace",
        text: "Retrace the delivery route, stop by stop.",
        trait: "Strategy",
        result: "You find the chest in the wrong cellar. The stew is saved, right on time."
      },
      {
        key: "forage",
        text: "Pick wild herbs in the hills and mix a new blend.",
        trait: "Craft",
        result: "Your new recipe is even better. Everyone asks for seconds."
      },
      {
        key: "search",
        text: "Get the townsfolk to search the square in pairs.",
        trait: "Community",
        result: "One pair finds it under a sheet within minutes. Teamwork wins."
      },
      {
        key: "stash",
        text: "Calm the chef down and share your own herbs with him.",
        trait: "Heart",
        result: "The chef stops panicking, and later cooks you a special bowl to say thanks."
      }
    ]
  },
  {
    title: "The Shy Newcomer",
    story: `Near the kitchen, a young calf in an oversized hat stands alone. He's new in town, and he watches the others play from far away.`,
    choices: [
      {
        key: "sit",
        text: "Sit with him quietly until he's ready to talk.",
        trait: "Heart",
        result: "He opens up about missing home, and soon feels brave enough to explore."
      },
      {
        key: "introduce",
        text: "Bring him over to meet Clover and her friends.",
        trait: "Community",
        result: "Clover pulls him into a game of tag. He's part of the gang in no time."
      },
      {
        key: "role",
        text: "Give him a small job, like looking after the banner ropes.",
        trait: "Strategy",
        result: "With a job to do, he stands tall and feels useful."
      },
      {
        key: "badge",
        text: "Make a festival name badge together.",
        trait: "Craft",
        result: "His colourful badge gets everyone asking who made it, and he starts chatting."
      }
    ]
  },
  {
    title: "The Broken Wheel",
    story: `CRACK! The pie seller's cart tips over as its wheel snaps. Pies start sliding towards the mud.

"My cart!" she cries. "Everything will be ruined!"`,
    choices: [
      {
        key: "splint",
        text: "Carve a wooden brace to hold the wheel together.",
        trait: "Craft",
        result: "The brace holds, and the pies are served on time."
      },
      {
        key: "blacksmith",
        text: "Fetch the blacksmith and plan a proper repair.",
        trait: "Strategy",
        result: "The wheel is fixed properly. That cart will last for years."
      },
      {
        key: "oxen",
        text: "Call over some strong oxen to move the pies to safety.",
        trait: "Community",
        result: "Many hooves make light work, and the other stalls offer to share their space."
      },
      {
        key: "hold",
        text: "Hold the cart steady and help her save her pies.",
        trait: "Heart",
        result: "Not one pie falls, and your calm keeps the seller from panicking."
      }
    ]
  },
  {
    title: "The Storm",
    story: `BOOM! Thunder shakes the valley, and rain floods the square.

"We can only save one pile before the water reaches the barn!" shouts Mayor Ox. "Which one?"`,
    choices: [
      {
        key: "banners",
        text: "The banners the calves painted all week.",
        trait: "Heart",
        result: "The calves' hard work is saved, and the festival keeps its heart."
      },
      {
        key: "food",
        text: "The crates of food for the feast.",
        trait: "Strategy",
        result: "The feast goes ahead, and nobody goes hungry."
      },
      {
        key: "equipment",
        text: "The sound and lighting gear.",
        trait: "Craft",
        result: "The music plays and the dance floor lights up, just as planned."
      },
      {
        key: "archives",
        text: "The town's photo albums and records.",
        trait: "Community",
        result: "Mooville's history is kept safe for the next generation."
      }
    ]
  }
]

// Result identities shown at the end, based on which trait scored highest.
//   emoji    a placeholder badge for the character, until the character art is added
//   matches  the kinds of help this character tends to enjoy, shown as tiles
export const results = {
  Heart: {
    name: "The Guardian",
    emoji: "🌿",
    description: "You lead with empathy. Where others see a task, you see the person behind it, and you bring warmth and patience to people who need it.",
    matches: [
      { emoji: "🧑‍🏫", label: "Mentoring" },
      { emoji: "🤲", label: "Caring for others" },
      { emoji: "🕊️", label: "Calming conflict" },
      { emoji: "🫶", label: "Supporting the vulnerable" },
    ],
  },
  Strategy: {
    name: "The Architect",
    emoji: "📐",
    description: "You see the system behind the chaos. While others panic, you plan, organise and build solutions that last.",
    matches: [
      { emoji: "🚨", label: "Handling a crisis" },
      { emoji: "🗂️", label: "Organising people" },
      { emoji: "📦", label: "Logistics" },
      { emoji: "🗺️", label: "Long-term planning" },
    ],
  },
  Community: {
    name: "The Anchor",
    emoji: "⚓",
    description: "You know strength comes from people together. You turn lonely chores into team efforts where everyone belongs.",
    matches: [
      { emoji: "🤝", label: "Team building" },
      { emoji: "🏘️", label: "Neighbourhood events" },
      { emoji: "👋", label: "Welcoming newcomers" },
      { emoji: "📣", label: "Community outreach" },
    ],
  },
  Craft: {
    name: "The Builder",
    emoji: "🛠️",
    description: "You speak the language of action. You fix what's broken, find clever workarounds and turn dead ends into ways forward.",
    matches: [
      { emoji: "🔧", label: "Fixing things" },
      { emoji: "🧤", label: "Hands-on projects" },
      { emoji: "✏️", label: "Design and making" },
      { emoji: "💡", label: "Practical ideas" },
    ],
  },
}
