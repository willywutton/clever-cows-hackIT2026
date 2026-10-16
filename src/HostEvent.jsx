// HostEvent.jsx is a card with a simple checklist for running your own small event.
// The checklist is for reading only: nothing is ticked or tracked.
import './HostEvent.css'

const STEPS = [
    "Pick a cause and talk to them first, so your event helps in the way they need.",
    "Choose a date, and a place that's easy for everyone to reach.",
    "Invite a few friends, or set up a relay group so no one has to come every time.",
    "Check what you need to bring and any safety rules.",
    "Add it to everyone's calendar so no one forgets.",
    "Afterwards, write a reflection about how it went.",
]

function HostEvent() {
    return (
        <section className="card host-event">
            <h3><span aria-hidden="true">🌾</span> Host your own event</h3>
            <p className="host-event-intro">
                You could run something small yourself, like a litter pick with friends
                or a games afternoon at a care home. Here's how to start:
            </p>
            <ol className="host-event-steps">
                {STEPS.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>
        </section>
    )
}

export default HostEvent
