// MatchFeed.jsx shows the causes that match the player's top trait.
// Tapping a cause opens its page, where the actions are.
import './MatchFeed.css'
import { causes } from './data/causes'

// { result } is the player's top trait, handed down from App (e.g. "Heart").
// { onOpenCause } is App's function for opening a cause's page.
// { onPlayAgain } is App's function for going back to the start.
function MatchFeed ({result, onOpenCause, onPlayAgain}){
    // .filter keeps only the causes whose identity list includes the player's trait.
    const matchingCauses = causes.filter((cause)=>
        cause.identity.includes(result)
    )

    return (
        <div className="match-feed">
           <h2 className="match-title">Your causes ({result})</h2>
           {/* .map turns each matching cause into a card.
               key gives each card a unique name so React can tell them apart. */}
           {matchingCauses.map((cause) =>(
            <div className="cause-card card" key= {cause.id}>
                <h3>{cause.name}</h3>
                <p className="cause-description">{cause.description}</p>
                <button className="action-button" onClick={() => onOpenCause(cause.id)}>
                    See how to help
                </button>
            </div>
         ))}

           <button className="button-primary" onClick={onPlayAgain}>Play again</button>
        </div>
    )
}
export default MatchFeed
