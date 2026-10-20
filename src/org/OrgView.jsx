// OrgView.jsx is the mock Organisation view: a coordinator's space for one cause.
// Overview shows how volunteers are doing and what to do next, Volunteers confirms
// attendance and sends thank-yous, Events manages sessions and student proposals,
// and Updates & feedback posts news and shows what volunteers wrote.
// Everything here is demo data kept in the app; nothing is sent anywhere.
import { useState } from 'react'
import { causes } from '../data/causes'
import { organisationOfCause, organisations } from '../data/organisations'
import { ORG_NAV } from '../navigation'
import AppShell from '../AppShell'
import Sidebar from '../Sidebar'
import OrgOverview from './OrgOverview'
import OrgSignups from './OrgSignups'
import OrgEvents from './OrgEvents'
import OrgUpdates from './OrgUpdates'
import { orgStats, volunteersFor } from './orgData'
import './OrgView.css'

// { app } is everything from useCleverCows, so this view can read and update the demo.
function OrgView({ app }) {
    // Until a programme is picked, show the one the student signed up for most recently.
    const [chosenCauseId, setCauseId] = useState(null)
    const [section, setSection] = useState("overview")
    const causeId = chosenCauseId || app.allSignups.at(-1)?.causeId || "cause_01"
    const cause = causes.find((c) => c.id === causeId)
    const org = organisationOfCause(causeId)
    const rows = volunteersFor(cause, app)
    const stats = orgStats(cause, rows)
    const pending = app.events.filter((event) => event.causeId === causeId && event.status === "pending")

    function go(next) {
        setSection(next)
        window.scrollTo(0, 0)
    }

    const items = ORG_NAV.map((item) => ({
        ...item,
        badge: item.screen === "volunteers" ? stats.toThank.length : item.screen === "events" ? pending.length : 0,
    }))

    const identity = (
        <div className="org-identity">
            <span className="org-identity-mark" style={{ background: org.color }} aria-hidden="true">{org.emoji}</span>
            <label>
                <span className="visually-hidden">Organisation</span>
                <select
                    value={org.id}
                    onChange={(event) => setCauseId(organisations.find((o) => o.id === event.target.value).causeIds[0])}
                >
                    {organisations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
            </label>
            <label className="org-identity-programme">
                <span>Programme</span>
                <select value={causeId} onChange={(event) => setCauseId(event.target.value)}>
                    {org.causeIds.map((id) => <option key={id} value={id}>{causes.find((c) => c.id === id).name}</option>)}
                </select>
            </label>
            <small>Coordinator view · demo</small>
        </div>
    )

    const shared = { app, org, cause, rows, stats, onGo: go }

    return (
        <AppShell
            sidebar={
                <Sidebar items={items} screen={section} onNavigate={go} top={identity} view={app.view} onViewChange={app.setView}/>
            }
        >
            <div key={`${section}-${causeId}`} className="org screen-enter">
                {section === "overview" && <OrgOverview {...shared} pending={pending}/>}
                {section === "volunteers" && <OrgSignups {...shared}/>}
                {section === "events" && <OrgEvents app={app} cause={cause} pending={pending}/>}
                {section === "updates" && <OrgUpdates app={app} org={org} cause={cause} rows={rows}/>}
            </div>
        </AppShell>
    )
}

export default OrgView
