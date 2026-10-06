import './MatchFeed.css'
import { useState } from 'react'
import { causes } from './data/causes' 
function MatchFeed ({result}){
    const matchingCauses = causes.filter((cause)=>
        cause.identity.includes(result)
    )

    const [chosenAction, setChosenAction] = useState(null)

    let message = ""
    if (chosenAction !== null){
        if (chosenAction.type === "share")
            message = "Thanks for spreading the word. More people will hear about this cause."
        else if (chosenAction.type === "time")
            message = "You've offered your time. The team will be glad to see you"
        else if (chosenAction.type === "donate")
            message = "Every small gift adds up. Thank you!"
        else if (chosenAction.type === "recurring")
            message = "Showing up regularly is what makes the biggest difference"
    }

    return (
        <div> 
           <h2>Your causes ({result})</h2>
           {matchingCauses.map((cause) =>(
            // key lets react tell cards apart
            <div key= {cause.id}>   
                <h3> {cause.name} </h3>
                <p>{ cause.description} </p>

                {cause.actions.map((action) => (
                    <button 
                    className = "action-button" 
                    key ={action.type}
                    onClick={() => setChosenAction(action)}
                    >
                        {action.label}
                    </button>
                ))}

            </div>  
         ))}
        
         {chosenAction !== null && <p>Great choice! {message}</p>}
        </div>
    )
}
export default MatchFeed