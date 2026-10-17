// Quiz.jsx plays the story quiz one scene at a time, adds up a score
// for each trait, and shows the player's result identity at the end.
import { useState } from 'react'
import { chapters, results } from './data/chapters'
import StoryDots from './StoryDots'
import TraitBreakdown from './TraitBreakdown'


import './Quiz.css'

// { whenDone } is the function App handed down, used to report the final result.
function Quiz({whenDone}){
    // One counter per trait. Every choice adds 1 to the trait it belongs to.
    const [scores, setScores] = useState({
        Heart: 0,
        Strategy: 0,
        Community: 0,
        Craft: 0,
    })
    // Which scene we're on. Lists in JavaScript start counting at 0, so 0 is Scene 1.
    const [currentChapter, setCurrentChapter] = useState(0)
    // false = show the story and choices, true = show what happened after a choice.
    const [showingResult, setShowingResult] = useState(false)
    // The "what happened" text for the choice the player just made.
    const [lastResultText, setLastResultText] = useState("")
    // Every trait picked so far, in order, e.g. ["Heart", "Craft", "Heart"].
    // Used to break ties at the end.
    const [picks, setPicks] = useState([])

    // Runs when a choice button is clicked.
    function handleChoice(choice){
        // Copy the old scores (...scores) and add 1 to this choice's trait.
        setScores({ ...scores, [choice.trait]: scores[choice.trait] + 1})
        // Copy the old list (...picks) and add this trait to the end.
        setPicks([...picks, choice.trait])
        setLastResultText(choice.result)
        setShowingResult(true)
    }

    // Runs when "Continue" is clicked: hide the result and move to the next scene.
    function handleContinue(){
        setShowingResult(false)
        setCurrentChapter(currentChapter + 1)
    }

    // Once we've gone past the last scene, the quiz is over: show the result screen.
    if (currentChapter >= chapters.length){
        // Find the trait with the highest score.
        // Object.keys(scores) gives ["Heart", "Strategy", "Community", "Craft"].
        // reduce compares them two at a time and keeps the winner each round.
        // "condition ? a : b" means: if the condition is true use a, otherwise use b.
        const topTrait = Object.keys(scores).reduce((a, b) => {
            // Different scores: the higher score wins.
            if (scores[a] !== scores[b]) {
                return scores[a] > scores[b] ? a : b
            }
            // Tie-break: the trait picked most recently wins.
            // lastIndexOf gives the position of a trait's latest pick in the list;
            // a bigger number means it was picked later in the story.
            return picks.lastIndexOf(a) > picks.lastIndexOf(b) ? a : b
        })
        // Look up the name and description for that trait in chapters.js.
        const result = results[topTrait]


        return (
            <div>
                <div className="quiz-card card">
                    <h2>You are: <span className="quiz-identity">{result.name}</span></h2>
                    <p>{result.description}</p>
                    <p className="quiz-matches">Best matched with: {result.matchesWith}</p>
                    <TraitBreakdown scores={scores} total={chapters.length} topTrait={topTrait}/>
                    {/* The arrow "() =>" means: only call whenDone when clicked, not straight away. */}
                    <button className="button-primary" onClick={() => whenDone(topTrait)}>See my causes</button>
                </div>
            </div>
        )
    }

    // Still playing: get the scene we're on.
    const chapter = chapters[currentChapter]
    return (
    <div>
        <div className="quiz-card card">
            <StoryDots total={chapters.length} current={currentChapter}/>
            <h2>{chapter.title}</h2>

            {/* "condition && (...)" means: only show this part when the condition is true. */}
            {!showingResult && (
                <>
                <p className="quiz-story">{chapter.story}</p>
                <div className="quiz-choices">
                    {/* .map turns each choice in the list into a button.
                        key gives each button a unique name so React can tell them apart. */}
                    {chapter.choices.map((choice) => (
                        <button className="quiz-choice" key={choice.key} onClick={() => handleChoice(choice)}>
                        {choice.text}
                        </button>
                    ))}
                </div>
                </>
            )}

            {showingResult && (
                <>
                <p className="quiz-story">{lastResultText}</p>
                <button className="button-primary" onClick={handleContinue}>Continue</button>
                </>
            )}
        </div>
    </div>
    )



}

export default Quiz
