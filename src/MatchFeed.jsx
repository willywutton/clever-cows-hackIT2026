// MatchFeed.jsx shows the causes that match the player's top trait,
// with action buttons, a thank-you message after an action is picked,
// and a gentle suggestion for the next step.
import './MatchFeed.css'
import { useState } from 'react'
import { causes } from './data/causes'

// The suggested next step after each kind of action, one rung up the ladder.
// Donating is never suggested: after a donation we suggest giving time instead.
// "recurring" is the top rung, so it has no next step.
const NEXT_STEP = {
    share: { type: "time", intro: "Want to see it for yourself?" },
    donate: { type: "time", intro: "Want to meet the team in person?" },
    time: { type: "recurring", intro: "Enjoyed it? You could make it a regular thing." },
}

// { result } is the player's top trait, handed down from App (e.g. "Heart").
// { onPlayAgain } is App's function for going back to the start of the quiz.
// { onAction } is App's function for feeding Clover Cowdini when an action is picked.
// { hasFed } is App's function for checking if an action has already fed the cow.
function MatchFeed ({result, onPlayAgain, onAction, hasFed}){
    // .filter keeps only the causes whose identity list includes the player's trait.
    const matchingCauses = causes.filter((cause)=>
        cause.identity.includes(result)
    )

    // Remembers the last button clicked as { cause, action },
    // so the message can name the cause. null means nothing clicked yet.
    const [chosenAction, setChosenAction] = useState(null)

    // Runs when any action button (or the next-step button) is clicked.
    function handleActionClick(cause, action) {
        setChosenAction({ cause, action })
        onAction(cause.id, action.type)
    }

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

    // Work out the next-step suggestion for the card that was clicked.
    // It stays null when there is no next rung, or the player has already done it.
    let nextStep = null
    let nextAction = null
    if (chosenAction !== null) {
        nextStep = NEXT_STEP[chosenAction.action.type]
        if (nextStep) {
            // .find gives back the first action in the list with a matching type.
            nextAction = chosenAction.cause.actions.find((action) => action.type === nextStep.type)
        }
        if (nextAction && hasFed(chosenAction.cause.id, nextAction.type)) {
            nextAction = null
        }
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
                        onClick={() => handleActionClick(cause, action)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Only the card that was clicked shows the message. */}
                {chosenAction !== null && chosenAction.cause.id === cause.id && (
                    <div className="cause-message">
                        <p>Great choice for {cause.name}! {message}</p>

                        {nextAction && (
                            <p className="cause-next">
                                {nextStep.intro}{" "}
                                <button
                                    className="next-step-button"
                                    onClick={() => handleActionClick(cause, nextAction)}
                                >
                                    {nextAction.label}
                                </button>
                            </p>
                        )}
                    </div>
                )}
            </div>
         ))}

           <button className="button-primary" onClick={onPlayAgain}>Play again</button>
        </div>
    )
}
export default MatchFeed
