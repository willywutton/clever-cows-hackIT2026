// FavouritesPage.jsx lists the causes and events the student has saved,
// so they can come back to them later without having to sign up straight away.
import Graphic from './Graphic'
import { causes } from './data/causes'
import { causeLook } from './causeColors'
import PageTitle from './PageTitle'
import EventCard from './EventCard'
import './FavouritesPage.css'

// { app } is everything from useCleverCows.
function FavouritesPage({ app }) {
    const savedCauses = app.favourites
        .filter((item) => item.kind === "cause")
        .map((item) => causes.find((c) => c.id === item.id))
    const savedEvents = app.favourites
        .filter((item) => item.kind === "event")
        .map((item) => app.events.find((event) => event.id === item.id))
        .filter(Boolean)

    return (
        <div className="favourites">
            <PageTitle title="Favourites" subtitle="Things you've saved for later. No rush."/>

            {savedCauses.length === 0 && savedEvents.length === 0 && (
                <p className="card favourites-empty">Nothing saved yet. Press <Graphic symbol="star-outline"/> Save on any cause or event.</p>
            )}

            {savedCauses.length > 0 && (
                <section className="favourites-section">
                    <h3>Causes</h3>
                    <div className="favourites-causes">
                        {savedCauses.map((cause) => (
                            <article key={cause.id} className="card favourites-cause" style={{ '--cause-color': causeLook(cause.id).color }}>
                                <span className="favourites-emoji" aria-hidden="true"><Graphic symbol={causeLook(cause.id).emoji}/></span>
                                <strong>{cause.name}</strong>
                                <div className="favourites-buttons">
                                    <button onClick={() => app.openCause(cause.id)}>Open</button>
                                    <button onClick={() => app.toggleFavourite("cause", cause.id)}>Remove</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {savedEvents.length > 0 && (
                <section className="favourites-section">
                    <h3>Events</h3>
                    {savedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            causeName={causes.find((c) => c.id === event.causeId).name}
                            saved
                            onToggleSave={() => app.toggleFavourite("event", event.id)}
                        >
                            <button className="favourites-signup" onClick={() => app.signUpFor(event.causeId)}>
                                Sign up for {causes.find((c) => c.id === event.causeId).name}
                            </button>
                        </EventCard>
                    ))}
                </section>
            )}
        </div>
    )
}

export default FavouritesPage
