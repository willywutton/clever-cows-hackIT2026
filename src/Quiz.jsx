// Quiz.jsx plays the story quiz one scene at a time, adds up a score
// for each trait, and shows the player's result identity at the end.
import { useState } from 'react'
import { chapters, results } from './data/chapters'


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

    // Runs when a choice button is clicked.
    function handleChoice(choice){
        // Copy the old scores (...scores) and add 1 to this choice's trait.
        setScores({ ...scores, [choice.trait]: scores[choice.trait] + 1})
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
        // reduce compares them two at a time and keeps the higher one each round.
        // "condition ? a : b" means: if the condition is true use a, otherwise use b.
        const topTrait = Object.keys(scores).reduce((a, b) =>
            scores[a] > scores[b] ? a : b
        )
        // Look up the name and description for that trait in chapters.js.
        const result = results[topTrait]


        return (
            <div className="quiz">
                <div className="quiz-card">
                    <h2>You are: {result.name}</h2>
                    <p>{result.description}</p>
                    <p>Best matched with: {result.matchesWith}</p>
                    {/* The arrow "() =>" means: only call whenDone when clicked, not straight away. */}
                    <button onClick={() => whenDone(topTrait)}>See my causes</button>
                </div>
            </div>
        )
    }

    // Still playing: get the scene we're on.
    const chapter = chapters[currentChapter]
    return (
    <div className="quiz">
        <div className="quiz-card">
            <h2>{chapter.title}</h2>

            {/* "condition && (...)" means: only show this part when the condition is true. */}
            {!showingResult && (
                <>
                <p>{chapter.story}</p>
                <div className="quiz-choices">
                    {/* .map turns each choice in the list into a button.
                        key gives each button a unique name so React can tell them apart. */}
                    {chapter.choices.map((choice) => (
                        <button key={choice.key} onClick={() => handleChoice(choice)}>
                        {choice.text}
                        </button>
                    ))}
                </div>
                </>
            )}

            {showingResult && (
                <>
                <p>{lastResultText}</p>
                <button className="quiz-continue" onClick={handleContinue}>Continue</button>
                </>
            )}
        </div>
    </div>
    )



}

export default Quiz
