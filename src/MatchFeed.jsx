// MatchFeed.jsx shows the causes that match the player's top trait,
// with action buttons, and a thank-you message after an action is picked.
import './MatchFeed.css'
import { useState } from 'react'
import { causes } from './data/causes'

// { result } is the player's top trait, handed down from App (e.g. "Heart").
// { onPlayAgain } is App's function for going back to the start of the quiz.
function MatchFeed ({result, onPlayAgain}){
    // .filter keeps only the causes whose identity list includes the player's trait.
    const matchingCauses = causes.filter((cause)=>
        cause.identity.includes(result)
    )

    // Remembers the last button clicked as { cause, action },
    // so the message can name the cause. null means nothing clicked yet.
    const [chosenAction, setChosenAction] = useState(null)

    // Pick the thank-you message based on the type of action clicked.
    let message = ""
    if (chosenAction !== null){
        const type = chosenAction.action.type
        if (type === "share")
            message = "Thanks for spreading the word. More people will hear about this cause."
        else if (type === "time")
            message = "You've offered your time. The team will be glad to see you"
        else if (type === "donate")
            message = "Every small gift adds up. Thank you!"
        else if (type === "recurring")
            message = "Showing up regularly is what makes the biggest difference"
    }

    return (
        <div className="match-feed">
           <h2 className="match-title">Your causes ({result})</h2>
           {/* .map turns each matching cause into a card.
               key gives each card a unique name so React can tell them apart. */}
           {matchingCauses.map((cause) =>(
            <div className="cause-card card" key= {cause.id}>
                <h3>{cause.name}</h3>
                <p className="cause-description">{cause.description}</p>

                {/* One button per action. Each button remembers which cause card it is in. */}
                <div className="cause-actions">
                    {cause.actions.map((action) => (
                        <button
                        className = "action-button"
                        key ={action.type}
                        onClick={() => setChosenAction({ cause, action })}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Only the card that was clicked shows the message. */}
                {chosenAction !== null && chosenAction.cause.id === cause.id && (
                    <p className="cause-message">Great choice for {cause.name}! {message}</p>
                )}
            </div>
         ))}

           <button className="button-primary" onClick={onPlayAgain}>Play again</button>
        </div>
    )
}
export default MatchFeed
