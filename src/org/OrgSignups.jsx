// OrgSignups.jsx lists who signed up for a cause, with a button to confirm each
// person attended a session. Confirming adds hours worked to that student.
import { sampleSignupsFor } from '../data/signups'
import { describeWho } from '../people'
import { sessionHours } from '../data/economy'
import './OrgSignups.css'

// { cause } is the cause being managed. { sampleAttendance } holds extra confirmed visits
// for sample students, and { onMarkSample } adds one. { studentEntry } is the real
// student's sign-up for this cause (or null), { studentName } their name,
// { studentVisits } their visits so far, and { onMarkStudent } confirms one more.
function OrgSignups({ cause, sampleAttendance, onMarkSample, studentEntry, studentName, studentVisits, onMarkStudent }) {
    const session = cause.actions.find((action) => action.type === "signup")
    const hours = sessionHours(session)
    const samples = sampleSignupsFor(cause.id)

    const rows = samples.map((person) => {
        const attended = person.timesAttended + (sampleAttendance[person.id] || 0)
        return { ...person, attended, sample: true }
    })
    if (studentEntry) {
        rows.push({
            id: "student", name: `${studentName} (you)`, weekly: studentEntry.weekly,
            attended: studentVisits, who: describeWho(studentEntry), sample: false,
        })
    }

    const totalVisits = rows.reduce((sum, row) => sum + row.attended, 0)

    return (
        <section className="card org-signups">
            <h3>Sign-ups</h3>
            <div className="org-totals">
                <p><strong>{rows.length}</strong> signed up</p>
                <p><strong>{totalVisits}</strong> visits confirmed</p>
                <p><strong>{totalVisits * hours}</strong> hours given</p>
            </div>

            <ul className="org-rows">
                {rows.map((row) => (
                    <li key={row.id} className={row.sample ? "org-row" : "org-row org-row-student"}>
                        <div className="org-row-who">
                            <strong>{row.name}</strong>
                            {row.sample && <span className="org-sample">Sample</span>}
                            <span className="org-row-detail">
                                {row.weekly ? "Every week" : "Just once"}
                                {row.who && row.who !== "Just you" ? ` · ${row.who}` : ""}
                            </span>
                        </div>
                        <div className="org-row-attend">
                            <span>
                                {row.attended} {row.attended === 1 ? "visit" : "visits"} · {row.attended * hours} h
                            </span>
                            <button onClick={() => (row.sample ? onMarkSample(row.id) : onMarkStudent())}>
                                Mark attended
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="org-note">Each session counts as {hours} {hours === 1 ? "hour" : "hours"} for this cause.</p>
        </section>
    )
}

export default OrgSignups
