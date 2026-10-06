import { useState } from 'react'
import { chapters, results } from './data/chapters'


import './Quiz.css'

function Quiz({whenDone}){
    const [scores, setScores] = useState({
        Heart: 0,
        Strategy: 0,
        Community: 0,
        Craft: 0,
    })
    const [currentChapter, setCurrentChapter] = useState(0) // start at the number 0 -> will increase everytime by 1
    const [showingResult, setShowingResult] = useState(false) // start at false
    const [lastResultText, setLastResultText] = useState("") // start as an empty string 

    function handleChoice(choice){
        setScores({ ...scores, [choice.trait]: scores[choice.trait] + 1})
        setLastResultText(choice.result)
        setShowingResult(true)
    }

    function handleContinue(){
        setShowingResult(false)
        setCurrentChapter(currentChapter + 1)
    }
    
    if (currentChapter >= chapters.length){
        const topTrait = Object.keys(scores).reduce((a, b) => // Object -> global built in methods e.g. Object.keys -> field name, Object.values -> values, Object.entries -> get both name and values        
            scores[a] > scores[b] ? a : b // condition ? valueIfTrue : valueIfFalse
        )
        const result = results[topTrait]
        

        return (
            <div className="quiz">
                <div className="quiz-card">
                    <h2>You are: {result.name}</h2>
                    <p>{result.description}</p>
                    <p>Best matched with: {result.matchesWith}</p>
                    <button onClick={() => whenDone(topTrait)}>See my causes</button>
                </div>
            </div>
        )
    }
    
    const chapter = chapters[currentChapter]
    return (
    <div className="quiz">
        <div className="quiz-card">
            <h2>{chapter.title}</h2>

            {!showingResult && (
                <>
                <p>{chapter.story}</p>
                <div className="quiz-choices">
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