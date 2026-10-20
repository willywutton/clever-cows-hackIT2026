// SavedReminder.jsx is a gentle note on Home about one saved event the student hasn't
// signed up for yet. It never says "hurry" or "you missed it": it's just a friendly nudge.
import Graphic from './Graphic'
import { causes } from './data/causes'
import './SavedReminder.css'

// { events } is every event, { favourites } the saved items and { signedUp } the sign-ups.
// { onSignUp } signs up for a cause. { onOpenFavourites } opens the Favourites tab.
function SavedReminder({ events, favourites, signedUp, onSignUp, onOpenFavourites }) {
    const signedUpCauses = signedUp.map((entry) => entry.causeId)
    const event = favourites
        .filter((item) => item.kind === "event")
        .map((item) => events.find((e) => e.id === item.id))
        .find((e) => e && !signedUpCauses.includes(e.causeId))

    if (!event) {
        return null
    }
    const cause = causes.find((c) => c.id === event.causeId)

    return (
        <section className="card saved-reminder">
            <p>
                <span aria-hidden="true"><Graphic symbol="star"/></span> You saved <strong>{event.title}</strong> with {cause.name}.
                Ready to sign up?
            </p>
            <div className="saved-reminder-buttons">
                <button className="saved-reminder-signup" onClick={() => onSignUp(event.causeId)}>Sign up</button>
                <button className="saved-reminder-later" onClick={onOpenFavourites}>See favourites</button>
            </div>
        </section>
    )
}

export default SavedReminder
