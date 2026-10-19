// OrgView.jsx is the mock Organisation view: a coordinator picks their cause, then sees
// who signed up, confirms attendance, approves student events, adds events and posts updates.
// Everything here is demo data kept in the app; nothing is sent anywhere.
import { useState } from 'react'
import { causes } from '../data/causes'
import OrgSignups from './OrgSignups'
import OrgPendingEvents from './OrgPendingEvents'
import OrgPostUpdate from './OrgPostUpdate'
import HostEventForm from '../HostEventForm'
import EventCard from '../EventCard'
import './OrgView.css'

// { app } is everything from useCleverCows, so this view can read and update the demo.
function OrgView({ app }) {
    const [causeId, setCauseId] = useState("cause_02")
    const cause = causes.find((c) => c.id === causeId)

    const causeEvents = app.events.filter((event) => event.causeId === causeId)
    const studentEntry = app.signedUp.find((entry) => entry.causeId === causeId) || null
    const studentVisits = app.attendance.filter((visit) => visit.causeId === causeId).length

    return (
        <div className="org">
            <div className="org-top">
                <p className="org-label">Organisation view (demo data)</p>
                <label className="org-cause">
                    <span>Your cause</span>
                    <select value={causeId} onChange={(event) => setCauseId(event.target.value)}>
                        {causes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </label>
            </div>

            <OrgSignups
                cause={cause}
                sampleAttendance={app.sampleAttendance}
                onMarkSample={app.markSampleAttended}
                studentEntry={studentEntry}
                studentName={app.profile.name || "Student"}
                studentVisits={studentVisits}
                onMarkStudent={() => app.recordVisit(causeId, 'org')}
            />

            <OrgPendingEvents
                events={causeEvents.filter((event) => event.source === "student")}
                onApprove={app.approveEvent}
            />

            <section className="org-events">
                <h3>Add an event</h3>
                <HostEventForm fixedCauseId={causeId} submitLabel="Add event" onSubmit={app.addOrgEvent}/>
                {causeEvents.filter((event) => event.status === "approved").map((event) => (
                    <EventCard key={event.id} event={event}/>
                ))}
            </section>

            <OrgPostUpdate
                updates={app.orgUpdates.filter((update) => update.causeId === causeId)}
                onPost={(text) => app.postUpdate(causeId, text)}
            />
        </div>
    )
}

export default OrgView
