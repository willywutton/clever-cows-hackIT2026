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

    // Runs when "Previous" is clicked. Going back always undoes the most recent answer
    // (its point and its place in the tie-break list), so the result only ever
    // counts the answers the player currently has.
    function handlePrevious(){
        const lastTrait = picks[picks.length - 1]
        setScores({ ...scores, [lastTrait]: scores[lastTrait] - 1 })
        setPicks(picks.slice(0, -1))
        if (showingResult) {
            // On "what happened": go back to this scene's choices.
            setShowingResult(false)
        }
        else {
            // On a scene's choices (or the result screen): go back to the previous scene's choices.
            setCurrentChapter(currentChapter - 1)
        }
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
            <div className="quiz-card card quiz-result screen-enter">
                <header className="quiz-result-hero">
                    <span className="quiz-result-badge" aria-hidden="true">{result.emoji}</span>
                    <p className="eyebrow">Your helper type</p>
                    <h1 className="quiz-identity">{result.name}</h1>
                    <p className="quiz-result-description">{result.description}</p>
                </header>

                <div className="quiz-result-layout">
                    <section className="quiz-matches">
                        <h3>Best matched with</h3>
                        <ul className="quiz-match-tiles">
                            {result.matches.map((match) => (
                                <li key={match.label}>
                                    <span aria-hidden="true">{match.emoji}</span>
                                    {match.label}
                                </li>
                            ))}
                        </ul>
                        <p className="quiz-matches-note">
                            These are just where you'll probably shine. Every cause is open to you.
                        </p>
                    </section>
                    <TraitBreakdown scores={scores} total={chapters.length} topTrait={topTrait}/>
                </div>

                <div className="quiz-buttons">
                    <button className="quiz-previous" onClick={handlePrevious}>← Change my last answer</button>
                    {/* The arrow "() =>" means: only call whenDone when clicked, not straight away. */}
                    <button className="button-primary" onClick={() => whenDone(topTrait)}>See my causes</button>
                </div>
            </div>
        )
    }

    // Still playing: get the scene we're on.
    const chapter = chapters[currentChapter]
    return (
        <div className="quiz-card card">
            <div className="quiz-top">
                <p className="eyebrow">Scene {currentChapter + 1} of {chapters.length}</p>
                <StoryDots total={chapters.length} current={currentChapter}/>
            </div>
            <h2>{chapter.title}</h2>

            {/* "condition && (...)" means: only show this part when the condition is true. */}
            {!showingResult && (
                <div className="quiz-step" key={`scene-${currentChapter}`}>
                    <div className="quiz-layout">
                        <p className="quiz-story">{chapter.story}</p>
                        <div className="quiz-choices">
                            <p className="eyebrow">What do you do?</p>
                            {/* .map turns each choice in the list into a button.
                                key gives each button a unique name so React can tell them apart. */}
                            {chapter.choices.map((choice, index) => (
                                <button className="quiz-choice" key={choice.key} onClick={() => handleChoice(choice)}>
                                    <span className="quiz-choice-letter" aria-hidden="true">{"ABCD"[index]}</span>
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    {picks.length > 0 && (
                        <div className="quiz-buttons">
                            <button className="quiz-previous" onClick={handlePrevious}>← Previous</button>
                        </div>
                    )}
                </div>
            )}

            {showingResult && (
                <div className="quiz-step" key={`result-${currentChapter}`}>
                    <p className="quiz-story quiz-outcome">{lastResultText}</p>
                    <div className="quiz-buttons">
                        <button className="quiz-previous" onClick={handlePrevious}>← Previous</button>
                        <button className="button-primary" onClick={handleContinue}>
                            {currentChapter === chapters.length - 1 ? "See my result" : "Continue"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )



}

export default Quiz
