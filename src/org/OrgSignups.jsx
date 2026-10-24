// OrgSignups.jsx is the Volunteers page: everyone signed up for the cause, with their
// helper type and how often they've come. Mark attended adds hours to that volunteer;
// Say thanks sends a short thank-you, which the demo student hears from Clover on Home.
import Graphic from '../Graphic'
import { useState } from 'react'
import { sessionHours } from '../data/economy'
import { sessionOf } from '../causeRows'
import { TRAIT_TIPS } from './orgData'
import './OrgSignups.css'

const FILTERS = [
    { id: "all", label: "Everyone" },
    { id: "first", label: "Came once" },
    { id: "returning", label: "Came back" },
    { id: "new", label: "Not been yet" },
]

// { app } is everything from useCleverCows. { cause } is the cause being managed.
// { rows } are its volunteers (see orgData.js) and { stats } their totals.
function OrgSignups({ app, cause, rows, stats }) {
    const [filter, setFilter] = useState("all")
    const hours = sessionHours(sessionOf(cause))
    const shown = filter === "all" ? rows : rows.filter((row) => row.status.id === filter)

    function markAttended(row) {
        if (row.sample) {
            app.markSampleAttended(row.id)
        }
        else {
            app.recordVisit(cause.id, 'org')
        }
    }

    return (
        <section className="card org-signups">
            <div className="org-signups-head">
                <div>
                    <h2>Volunteers</h2>
                    <p className="org-section-note">
                        Confirm who came after each session, and thank first-timers so they come back.
                    </p>
                </div>
                <div className="org-filter" role="group" aria-label="Filter volunteers">
                    {FILTERS.map((f) => (
                        <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
                    ))}
                </div>
            </div>

            {stats.toThank.length > 0 && (
                <p className="org-nudge">
                    <span aria-hidden="true"><Graphic symbol="heart"/></span> {stats.toThank.length} {stats.toThank.length === 1 ? "person has" : "people have"} come
                    once and not been thanked yet.
                </p>
            )}

            <ul className="org-rows">
                {shown.map((row) => (
                    <li key={row.id} className={row.sample ? "org-row" : "org-row org-row-student"}>
                        <div className="org-row-who">
                            <strong>{row.name}</strong>
                            <span className={`org-chip org-chip-${row.status.id}`}>{row.status.label}</span>
                            {row.weekly && <span className="org-chip">{row.weeks ? `For ${row.weeks} weeks` : "Every week"}</span>}
                            <span className="org-row-detail">
                                {row.trait ? TRAIT_TIPS[row.trait].name.slice(0, -1) : "Helper type unknown"}
                                {row.who && row.who !== "Just you" ? ` · ${row.who}` : ""}
                            </span>
                        </div>
                        <div className="org-row-attend">
                            <span className="org-row-count">{row.attended} {row.attended === 1 ? "visit" : "visits"} · {row.attended * hours} h</span>
                            <button className="org-row-mark" onClick={() => markAttended(row)}>Mark attended</button>
                            {row.attended === 0
                                ? <span className="org-row-thank-slot" aria-hidden="true"/>
                                : row.thanked
                                    ? <span className="org-row-thanked">Thanked ✓</span>
                                    : <button className="org-row-thank" onClick={() => app.thankVolunteer(cause.id, row.id)}><Graphic symbol="heart"/> Say thanks</button>}
                        </div>
                    </li>
                ))}
                {shown.length === 0 && <li className="org-section-note">No one here right now.</li>}
            </ul>
            <p className="org-note">
                Each session counts as {hours} {hours === 1 ? "hour" : "hours"}.
            </p>
        </section>
    )
}

export default OrgSignups
