// MatchFeed.jsx shows the causes that match the player's top trait.
// Tapping a cause opens its page, where the actions are.
// With "Fits my week" on, it only shows sessions that fit the sample timetable.
import './MatchFeed.css'
import { causes } from './data/causes'
import { clashesWith, describeSlot, findFreeSlot } from './freeTime'
import { traitLabels } from './data/traits'
import { causeLook } from './causeColors'
import SurpriseMe from './SurpriseMe'
import HostEvent from './HostEvent'

// A short day and date in Singapore time, e.g. "Sat 7 Nov".
function shortDate(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', {
        weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Singapore',
    })
}

// The sign-up action of a cause.
function signupOf(cause) {
    return cause.actions.find((action) => action.type === "signup")
}

// { result } is the player's top trait, handed down from App (e.g. "Heart").
// { onOpenCause } is App's function for opening a cause's page.
// { onPlayAgain } is App's function for going back to the start.
// { fitsMyWeek } is true when the "Fits my week" switch is on, and { onShowAll } turns it off.
// { signedUp } is App's list of sign-ups, used to hide clashing sessions.
// { onSendProposal } keeps an event proposal from the Host your own event card.
function MatchFeed ({result, onOpenCause, onPlayAgain, fitsMyWeek, onShowAll, signedUp, onSendProposal}){
    // .filter keeps only the causes whose identity list includes the player's trait.
    const matchingCauses = causes.filter((cause)=>
        cause.identity.includes(result)
    )

    // For each cause, work out whether its session fits the week and whether it clashes.
    const cards = matchingCauses.map((cause) => {
        const signup = signupOf(cause)
        const isSignedUp = signedUp.some((entry) => entry.causeId === cause.id)
        const clashes = signedUp.some((entry) => {
            if (entry.causeId === cause.id) {
                return false
            }
            const other = signupOf(causes.find((c) => c.id === entry.causeId))
            return clashesWith(signup, other, entry.weekly)
        })
        return { cause, isSignedUp, freeSlot: findFreeSlot(signup), clashes }
    })

    // Causes already signed up for always stay. Others must fit and not clash.
    const visibleCards = fitsMyWeek
        ? cards.filter((card) => card.isSignedUp || (card.freeSlot && !card.clashes))
        : cards

    return (
        <div className="match-feed">
           <div className="match-header">
               <h2 className="squiggle">Causes for you</h2>
               <p className="match-subtitle">Matched to your strength: {traitLabels[result].label}</p>
           </div>

           {visibleCards.length === 0 && (
            <div className="match-empty card">
                <p>None of these sessions fit your sample week right now.</p>
                <button className="action-button" onClick={onShowAll}>Show all causes</button>
            </div>
           )}

           {/* .map turns each matching cause into a card.
               key gives each card a unique name so React can tell them apart.
               --cause-color is a CSS variable, so each card's colour comes from causeColors.js. */}
           <div className="match-cards">
           {visibleCards.map(({ cause, isSignedUp, freeSlot }) =>(
            <div className="cause-card card" key= {cause.id} style={{ '--cause-color': causeLook(cause.id).color }}>
                <div className="cause-card-top">
                    <span className="cause-card-emoji" aria-hidden="true">{causeLook(cause.id).emoji}</span>
                    <h3>{cause.name}</h3>
                </div>
                <ul className="cause-facts">
                    <li><span aria-hidden="true">📍</span> {signupOf(cause).area}</li>
                    <li><span aria-hidden="true">📅</span> {shortDate(signupOf(cause).startsAt)}</li>
                    <li><span aria-hidden="true">👥</span> Needs {signupOf(cause).peopleNeeded}</li>
                </ul>
                <p className="cause-description">{cause.description}</p>
                {fitsMyWeek && isSignedUp && (
                    <p className="cause-fits">✓ You're signed up</p>
                )}
                {fitsMyWeek && !isSignedUp && freeSlot && (
                    <p className="cause-fits">✓ Fits your week: free {describeSlot(freeSlot)}</p>
                )}
                <button className="cause-card-open" onClick={() => onOpenCause(cause.id)}>
                    See how to help <span aria-hidden="true">→</span>
                </button>
            </div>
         ))}
           </div>

           <SurpriseMe result={result} fitsMyWeek={fitsMyWeek} onOpenCause={onOpenCause}/>

           <HostEvent onSendProposal={onSendProposal}/>

           <button className="button-primary" onClick={onPlayAgain}>Play again</button>
        </div>
    )
}
export default MatchFeed
