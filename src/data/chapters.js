// Chapter data for "The Day Mooville Needed You" quiz
// Each scene has a title, the story text, and four choices.
// Each choice has:
//   key     a unique name for the button (React needs this when drawing a list)
//   text    what the button says
//   trait   which trait gets +1 point when this choice is picked
//   result  what happens in the story after picking it

export const chapters = [
  {
    title: "Scene 1 — The Runaway Calf",
    story: `Your entry into town is cut short by a shrill squeal. Clover, a tiny calf, has climbed to the top of an overloaded hay cart near the town square, trembling as the cart wobbles beneath her. Barnaby, an elderly cow leaning heavily on her cane, watches anxiously alongside a young goat kid.

"She panicked when the wheel creaked!" the goat kid wrings his hooves. "She won't budge!"`,
    choices: [
      {
        key: "hay",
        text: "Offer Clover sweet clover-hay to lure her down gently.",
        trait: "Heart",
        result: "Clover relaxes, sniffs the treat, and hops down safely into your arms. She trusts you instantly and will stick close by your side for the rest of the morning."
      },
      {
        key: "guide",
        text: "Inspect the cart and guide her down step by step.",
        trait: "Strategy",
        result: "You steady the rickety cart with your weight and coach her down safely. You notice the cart's wooden wheel has a hairline fracture — a flaw that will become critical later today."
      },
      {
        key: "song",
        text: "Rally the goat kid and Barnaby to sing her favourite barn song.",
        trait: "Community",
        result: "The familiar melody distracts Clover, and she giggles, trotting down the hay bales. A small crowd gathers, inspired by the spontaneous song, lifting the town's tense mood."
      },
      {
        key: "latch",
        text: "Fix the pen latch first so she has a safe place to return to.",
        trait: "Craft",
        result: "You repair the broken gate, then guide Clover safely into her warm pen. You gain practical insight into Mooville's worn-down infrastructure before tackling the square."
      }
    ]
  },
  {
    title: "Scene 2 — The Tangled Lanterns",
    story: `With Clover safe, Barnaby points you toward the center of the square. A massive, tangled knot of colorful festival lanterns lies heaped on the cobblestones like a giant web. Mayor Ox, his spectacles balanced on his snout, rubs his temples.

"The storm clouds are moving fast," Mayor Ox sighs. "If these lanterns aren't hoisted to the rooftops soon, tonight's celebration will happen in pitch darkness."`,
    choices: [
      {
        key: "sort",
        text: "Methodically untangle and group them by color and length.",
        trait: "Craft",
        result: "You systematically unknot the mess without shattering a single fragile bulb. The organized piles allow the setup crew to string up the overhead lights in record time."
      },
      {
        key: "layout",
        text: "Study the square's electrical layout before pulling a single cord.",
        trait: "Strategy",
        result: "You identify the primary power trunk line on the mayor's blueprint and untangle that first. The core lights turn on early, casting a warm glow over the square."
      },
      {
        key: "game",
        text: "Turn the untangling into a team game for the waiting townsfolk.",
        trait: "Community",
        result: "Everyone grabs a strand; laughter fills the square as the knot dissolves through collective effort. The locals feel energized and ready to tackle the rest of the day's tasks."
      },
      {
        key: "trace",
        text: "Dive straight in, tracing individual cords by hand.",
        trait: "Heart",
        result: "Through sheer patience and hands-on effort, you free the lines one by one. Your steady persistence reassures the stressed mayor, who offers you full authority over the afternoon tasks."
      }
    ]
  },
  {
    title: "Scene 3 — The Barn Library",
    story: `As the lanterns go up, the town bell tolls noon. You retreat into the nearby Barn Library to fetch extra twine. Inside, the librarian sheep is frantically pacing around a central display table holding four distinct volumes.

"The mayor wants a centerpiece story for the opening ceremony," she bleats nervously. "Everything rests on setting the right tone for the festival!"`,
    choices: [
      {
        key: "inventions",
        text: "A book of clever farm inventions and historical machinery.",
        trait: "Craft",
        result: "You highlight Mooville's spirit of resourcefulness and practical ingenuity. The local youth are inspired to help fix up broken stalls around the square."
      },
      {
        key: "folktales",
        text: "A collection of ancient animal folktales.",
        trait: "Heart",
        result: "You choose tales of empathy and courage, bringing a sense of warmth to the room. The library becomes a cozy sanctuary where tired workers come to recharge."
      },
      {
        key: "chronicle",
        text: "A chronicle of Mooville's historical founders.",
        trait: "Strategy",
        result: "You focus on how past generations organized and overcame harsh winters. The adult volunteers gain tactical focus and streamline their remaining afternoon chores."
      },
      {
        key: "album",
        text: "A photo album showcasing the whole herd over the years.",
        trait: "Community",
        result: "You display decades of shared memories, past festivals, and familiar faces. Townsfolk linger to share nostalgic stories, bridging old rivalries between neighbors."
      }
    ]
  },
  {
    title: "Scene 4 — Barnaby's Harvest Patch",
    story: `Leaving the library, you pass Barnaby's cottage on the edge of the square. She is staring dismayed at her sprawling vegetable patch, overflowing with giant pumpkins and prize sweetcorn destined for the festival feast.

"My back gave out this morning," she admits softly. "If these crops aren't harvested by mid-afternoon, the festival kitchen won't have ingredients for the stew."`,
    choices: [
      {
        key: "harvest",
        text: "Roll up your sleeves and harvest the entire patch yourself.",
        trait: "Heart",
        result: "You clear the rows in record time, filling crates with prime produce. Barnaby gets to rest inside, completely relieved of her stress."
      },
      {
        key: "teach",
        text: "Teach Barnaby's young grandkids proper harvesting techniques.",
        trait: "Craft",
        result: "The kids learn how to pick produce without damaging the vines or roots. Barnaby's family becomes self-sufficient for future harvests."
      },
      {
        key: "rotation",
        text: "Create a structured rotation schedule for the week's garden maintenance.",
        trait: "Strategy",
        result: "You assign specific chores to different neighbors across morning and evening shifts. Barnaby's garden receives long-term community support well beyond today."
      },
      {
        key: "party",
        text: "Transform the harvest into an impromptu neighborhood garden party.",
        trait: "Community",
        result: "Music plays as neighbors gather with baskets, singing while they clear the patch. The community spirit peaks, turning a chore into one of the day's highlights."
      }
    ]
  },
  {
    title: "Scene 5 — The Missing Ingredient",
    story: `With the produce harvested and carried to the festival kitchen, disaster strikes. The head chef, a high-strung pig, bursts out the back door in a panic.

"The Golden Spice Blend!" he wails. "It's the signature flavor for the harvest stew! The delivery wagon arrived, but the spice chest is nowhere to be found!"`,
    choices: [
      {
        key: "retrace",
        text: "Retrace the supply delivery route step-by-step from the town gate.",
        trait: "Strategy",
        result: "You systematically check each unloading dock along the route and locate the mislabeled chest near the cold cellar. The stew is seasoned on schedule."
      },
      {
        key: "forage",
        text: "Hike into the nearby hills to forage a wild mountain herb substitute.",
        trait: "Craft",
        result: "You return with fragrant wild thyme and rosemary, crafting a unique new blend. The chef creates an upgraded recipe that becomes the talk of the festival."
      },
      {
        key: "search",
        text: "Organize a search party among the townsfolk to sweep the square.",
        trait: "Community",
        result: "Working in pairs, the volunteers quickly uncover the box tucked under a canvas sheet. The search effort keeps everyone coordinated under pressure."
      },
      {
        key: "stash",
        text: "Offer your own personal stash of rare herbs to keep the chef calm.",
        trait: "Heart",
        result: "Your generosity saves the chef from a total breakdown and keeps the kitchen quiet. The chef prepares a special personalized portion of stew just for you later tonight."
      }
    ]
  },
  {
    title: "Scene 6 — The Nervous Newcomer",
    story: `Outside the bustling kitchen, you notice a young calf wearing an oversized hat standing entirely alone at the edge of the lawn. He shifts uncomfortably from hoof to hoof, watching the other young animals play, clearly too shy to step forward.`,
    choices: [
      {
        key: "sit",
        text: "Sit quietly beside him on the bench until he feels ready to talk.",
        trait: "Heart",
        result: "Feeling no pressure, he slowly opens up about feeling out of place in a new town. He gains deep trust in you and feels grounded enough to explore the square."
      },
      {
        key: "introduce",
        text: "Walk him over and introduce him directly to Clover and her friends.",
        trait: "Community",
        result: "Clover immediately invites him into their game of tag. The newcomer is instantly integrated into the local youth group."
      },
      {
        key: "role",
        text: "Assign him a clear, manageable role like managing the banner ropes.",
        trait: "Strategy",
        result: "Having an active responsibility boosts his confidence and pride. He feels useful and stands tall as a recognized contributor to the festival."
      },
      {
        key: "badge",
        text: "Help him craft a personalized festival name badge.",
        trait: "Craft",
        result: "Together, you decorate a wooden badge that showcases his artistic talent. The eye-catching badge becomes a natural conversation starter with passerby."
      }
    ]
  },
  {
    title: "Scene 7 — The Broken Cart Wheel",
    story: `Just as the newcomer finds his footing, a loud CRACK echoes across the square! The main pie vendor's cart tilts violently — the wooden wheel finally snapped. Goldenberry pies begin sliding perilously toward the muddy ground.

"My cart!" the vendor cries out. "If I can't level this wagon, my entire stock is ruined before the market opens!"`,
    choices: [
      {
        key: "splint",
        text: "Custom-carve a reinforced wooden splint to secure the cracked wheel.",
        trait: "Craft",
        result: "You construct a sturdy brace that stabilizes the axle immediately. The cart holds firm, allowing the vendor to serve pies right on schedule."
      },
      {
        key: "blacksmith",
        text: "Fetch the village blacksmith and coordinate a rapid iron repair.",
        trait: "Strategy",
        result: "You bring the right expert and tools to fix the wheel permanently within the hour. The structural integrity of the cart is guaranteed for years to come."
      },
      {
        key: "oxen",
        text: "Rally four strong oxen to carefully hoist and move the cart contents to a stable stall.",
        trait: "Community",
        result: "Many hands make light work; the pies are safely transferred in minutes. Other stall owners step up to offer space, building vendor camaraderie."
      },
      {
        key: "hold",
        text: "Hold the heavy cart steady yourself while helping the owner pack fragile items safely.",
        trait: "Heart",
        result: "Your quick physical intervention prevents a single pie from falling. Your calm demeanour under stress keeps the vendor from panicking."
      }
    ]
  },
  {
    title: "Scene 8 — The Storm Breaks",
    story: `As late afternoon approaches, the sky turns dark purple. BOOM! A sudden crack of thunder shakes the valley, and heavy rain pours down in torrents. Canvas awnings collapse, and water floods the square.

Mayor Ox shouts over the roaring gale: "We can't save everything before the runoff floods the lower barn! We only have time to rescue one stack! Pick one!"`,
    choices: [
      {
        key: "banners",
        text: "The hand-painted banners and decorations made by the calves.",
        trait: "Heart",
        result: "You save the children's week-long artistic efforts from being washed away. The emotional heart and visual spirit of the festival remain intact."
      },
      {
        key: "food",
        text: "The crates of fresh food and festival treats.",
        trait: "Strategy",
        result: "You protect the town's food supply from water damage. The community feast proceeds smoothly without any shortage of supplies."
      },
      {
        key: "equipment",
        text: "The expensive sound equipment and lighting gear.",
        trait: "Craft",
        result: "You save the town's most valuable and hard-to-replace assets. The evening music and illuminated dance floor can proceed without a hitch."
      },
      {
        key: "archives",
        text: "The historical photo archives and town records.",
        trait: "Community",
        result: "You rescue irreplaceable documents that capture Mooville's history. The town's heritage is preserved for future generations."
      }
    ]
  }
]

// Result identities shown at the end, based on which trait scored highest
export const results = {
  Heart: {
    name: "The Guardian",
    description: "You lead with deep empathy. Where others see tasks or problems, you see the individuals behind them. Your presence brings warmth, patience, and emotional safety to those in distress.",
    matchesWith: "Mentorship, caretaking, conflict resolution, and supporting the vulnerable."
  },
  Strategy: {
    name: "The Architect",
    description: "You see the overarching system behind the chaos. Where others panic, you analyze, organize, and construct efficient solutions that stand the test of time.",
    matchesWith: "Crisis management, organizational leadership, logistics, and long-term planning."
  },
  Community: {
    name: "The Anchor",
    description: "You understand that strength lies in unity. You don't just solve problems yourself — you weave people together, turning solitary chores into collective triumphs where everyone belongs.",
    matchesWith: "Team building, neighborhood organizing, restorative justice, and community outreach."
  },
  Craft: {
    name: "The Builder",
    description: "You speak the language of tangible action. You fix what is broken, create elegant workarounds, and use practical skill to turn dead ends into functional paths forward.",
    matchesWith: "Engineering, hands-on rescue, technical design, and practical innovation."
  }
}
