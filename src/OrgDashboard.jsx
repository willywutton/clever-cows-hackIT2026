// OrgDashboard.jsx is a mock view for a charity coordinator.
// It lists the students who signed up for their cause, shows simple totals,
// and lets the coordinator confirm when a student has turned up in person.
import { useState } from 'react'
import { causes } from './data/causes'
import { orgCauseId, signups } from './data/signups'
import './OrgDashboard.css'

// Actions that happen in person, so attendance can be confirmed.
const IN_PERSON_ACTIONS = ["time", "recurring"]

function OrgDashboard() {
    // .find gives back the first cause whose id matches this organisation's cause.
    const cause = causes.find((c) => c.id === orgCauseId)

    // The sign-ups are kept in state (not just read from the file),
    // because "Mark as attended" changes them and the screen must update.
    const [rows, setRows] = useState(signups)

    // Look up the button label (e.g. "Visit for an afternoon") for an action type.
    function actionLabel(actionType) {
        return cause.actions.find((action) => action.type === actionType).label
    }

    // Add 1 to one student's attendance.
    // .map makes a new list: the matching row gets a copy with +1, every other row stays the same.
    function markAttended(id) {
        setRows(rows.map((row) =>
            row.id === id ? { ...row, timesAttended: row.timesAttended + 1 } : row
        ))
    }

    // Totals are counted from the list every time the screen draws,
    // so they always match the rows and nothing extra needs to be stored.
    const totalVisits = rows.reduce((sum, row) => sum + row.timesAttended, 0)
    const totalShared = rows.filter((row) => row.actionType === "share").length

    return (
        <div className="org">
            <div className="org-header">
                <p className="org-label">Organisation view (demo data)</p>
                <h2>{cause.name}</h2>
            </div>

            <div className="org-totals">
                <div className="org-total card">
                    <span className="org-total-number">{rows.length}</span>
                    students signed up
                </div>
                <div className="org-total card">
                    <span className="org-total-number">{totalVisits}</span>
                    visits confirmed
                </div>
                <div className="org-total card">
                    <span className="org-total-number">{totalShared}</span>
                    shared your page
                </div>
            </div>

            {/* One row per student, in the order they signed up (never ranked). */}
            <div className="org-list card">
                {rows.map((row) => (
                    <div className="org-row" key={row.id}>
                        <div className="org-student">
                            <strong>{row.name}</strong>
                            <span className="org-action">{actionLabel(row.actionType)}</span>
                        </div>

                        {/* Only in-person actions get an attendance count and button. */}
                        {IN_PERSON_ACTIONS.includes(row.actionType) && (
                            <div className="org-attendance">
                                <span>Attended {row.timesAttended} {row.timesAttended === 1 ? "time" : "times"}</span>
                                <button className="org-attend-button" onClick={() => markAttended(row.id)}>
                                    Mark as attended
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrgDashboard
