// OrgDashboard.jsx is a mock view for a charity coordinator.
// It lists the students who signed up for their cause, shows simple totals,
// and lets the coordinator confirm when a student has turned up in person.
import { useState } from 'react'
import { causes } from './data/causes'
import { orgCauseId, signups } from './data/signups'
import './OrgDashboard.css'

// Actions that happen in person, so attendance can be confirmed.
const IN_PERSON_ACTIONS = ["signup"]

// { fedActions } is App's list of actions the player has clicked,
// e.g. ["cause_02:share", "cause_05:time"]. It is used to add the player's own rows.
function OrgDashboard({ fedActions }) {
    // .find gives back the first cause whose id matches this organisation's cause.
    const cause = causes.find((c) => c.id === orgCauseId)

    // The sign-ups are kept in state (not just read from the file),
    // because "Mark as attended" changes them and the screen must update.
    const [rows, setRows] = useState(signups)

    // Attendance for the player's own rows, by action type, e.g. { time: 2 }.
    // Kept separately because these rows come from App, not from signups.js.
    const [demoAttended, setDemoAttended] = useState({})

    // Turn the player's clicks on this cause into rows that look like the others.
    // Each item looks like "cause_02:time": the part before ":" is the cause,
    // the part after is the action type. split(":") cuts it into those two parts.
    const demoRows = fedActions
        .filter((actionId) => actionId.startsWith(`${orgCauseId}:`))
        // Skip action types the cause no longer has (e.g. saved before "time" became "signup").
        .filter((actionId) => cause.actions.some((action) => action.type === actionId.split(":")[1]))
        .map((actionId) => {
            const actionType = actionId.split(":")[1]
            return {
                id: `demo_${actionType}`,
                name: "You (demo student)",
                actionType,
                // || 0 means "use 0 if nothing has been marked yet".
                timesAttended: demoAttended[actionType] || 0,
                isDemo: true,
            }
        })

    // The made-up students first, then the player's own rows at the bottom.
    const allRows = [...rows, ...demoRows]

    // Look up the label (e.g. "Visit for an afternoon") for a row's action.
    // Weekly sign-ups use the weekly wording, e.g. "Become a regular visitor".
    function actionLabel(row) {
        const action = cause.actions.find((a) => a.type === row.actionType)
        return row.weekly ? action.weeklyLabel : action.label
    }

    // Add 1 to one student's attendance.
    function markAttended(clickedRow) {
        if (clickedRow.isDemo) {
            const type = clickedRow.actionType
            setDemoAttended({ ...demoAttended, [type]: clickedRow.timesAttended + 1 })
            return
        }
        // .map makes a new list: the matching row gets a copy with +1, every other row stays the same.
        setRows(rows.map((row) =>
            row.id === clickedRow.id ? { ...row, timesAttended: row.timesAttended + 1 } : row
        ))
    }

    // Totals are counted from the list every time the screen draws,
    // so they always match the rows and nothing extra needs to be stored.
    const totalVisits = allRows.reduce((sum, row) => sum + row.timesAttended, 0)
    const totalShared = allRows.filter((row) => row.actionType === "share").length
    // The player can have several rows (one per action) but is still one student.
    const totalStudents = rows.length + (demoRows.length > 0 ? 1 : 0)

    return (
        <div className="org">
            <div className="org-header">
                <p className="org-label">Organisation view (demo data)</p>
                <h2>{cause.name}</h2>
            </div>

            <div className="org-totals">
                <div className="org-total card">
                    <span className="org-total-number">{totalStudents}</span>
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
                {allRows.map((row) => (
                    <div className={row.isDemo ? "org-row org-row-demo" : "org-row"} key={row.id}>
                        <div className="org-student">
                            <strong>{row.name}</strong>
                            <span className="org-action">{actionLabel(row)}</span>
                        </div>

                        {/* Only in-person actions get an attendance count and button. */}
                        {IN_PERSON_ACTIONS.includes(row.actionType) && (
                            <div className="org-attendance">
                                <span>Attended {row.timesAttended} {row.timesAttended === 1 ? "time" : "times"}</span>
                                <button className="org-attend-button" onClick={() => markAttended(row)}>
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
