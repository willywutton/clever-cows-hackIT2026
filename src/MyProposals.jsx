// MyProposals.jsx lists the event proposals the student has sent, on their Profile.
import { causes } from './data/causes'
import './MyProposals.css'

// { proposals } is App's list: { id, causeId, idea, date, people, message, sentAt }.
function MyProposals({ proposals }) {
    if (proposals.length === 0) {
        return null
    }

    return (
        <section className="card proposals">
            <h3>My event proposals</h3>
            <ul className="proposals-list">
                {[...proposals].reverse().map((proposal) => {
                    const cause = causes.find((c) => c.id === proposal.causeId)
                    const date = proposal.date
                        ? new Date(proposal.date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })
                        : "Date to be agreed"
                    return (
                        <li key={proposal.id} className="proposals-item">
                            <div className="proposals-top">
                                <strong>{proposal.idea}</strong>
                                <span className="proposals-status">Waiting for a reply (demo)</span>
                            </div>
                            <p className="proposals-meta">
                                To {cause.name} · {date} · about {proposal.people} {proposal.people === 1 ? "person" : "people"}
                            </p>
                            {proposal.message && <p className="proposals-message">"{proposal.message}"</p>}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default MyProposals
