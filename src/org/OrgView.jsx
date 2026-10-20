// OrgView.jsx is the Organisation view: a coordinator's space for their organisation.
// Overview shows every programme they run with organisation-wide stats; opening a
// programme shows it in depth. Volunteers confirms attendance and sends thank-yous,
// Events manages sessions and student proposals, and Updates & feedback posts news
// and shows what volunteers wrote. Those three work on one programme at a time.
import Graphic from '../Graphic'
import { useState } from 'react'
import { organisationById, organisations } from '../data/organisations'
import { ORG_NAV } from '../navigation'
import AppShell from '../AppShell'
import Sidebar from '../Sidebar'
import OrgHome from './OrgHome'
import OrgOverview from './OrgOverview'
import OrgSignups from './OrgSignups'
import OrgEvents from './OrgEvents'
import OrgUpdates from './OrgUpdates'
import ProgrammeSwitch from './ProgrammeSwitch'
import { programmeSummaries } from './orgData'
import './OrgView.css'

// { app } is everything from useCleverCows, so this view can read and update the app.
function OrgView({ app }) {
    const [section, setSection] = useState("overview")
    const [programmeId, setProgrammeId] = useState(null)
    const org = organisationById(app.orgAccountId) || organisations[0]
    const programmes = programmeSummaries(org, app)
    const active = programmes.find((p) => p.cause.id === programmeId) || programmes[0]

    // { next } is a section; { causeId } picks the programme it opens on.
    function go(next, causeId = null) {
        setSection(next)
        if (causeId) {
            setProgrammeId(causeId)
        }
        window.scrollTo(0, 0)
    }


    const items = ORG_NAV.map((item) => ({
        ...item,
        also: item.screen === "overview" ? ["programme"] : undefined,
        badge: item.screen === "volunteers"
            ? programmes.reduce((sum, p) => sum + p.stats.toThank.length, 0)
            : item.screen === "events" ? programmes.reduce((sum, p) => sum + p.pending.length, 0) : 0,
    }))

    const identity = (
        <div className="org-identity">
            <span className="org-identity-mark" style={{ background: org.color }} aria-hidden="true"><Graphic symbol={org.emoji}/></span>
            <p className="org-identity-name">{org.name}</p>
            <small>{programmes.length} {programmes.length === 1 ? "programme" : "programmes"} · Coordinator</small>
        </div>
    )

    const shared = { app, org, cause: active.cause, rows: active.rows, stats: active.stats, onGo: go }
    const switcher = (
        <ProgrammeSwitch programmes={programmes} activeId={active.cause.id} onChange={setProgrammeId}/>
    )

    return (
        <AppShell
            sidebar={
                <Sidebar
                    items={items}
                    screen={section}
                    onNavigate={(next) => go(next)}
                    top={identity}
                    account={{ name: org.name, role: "Coordinator", picture: <Graphic symbol={org.emoji}/> }}
                    onLogOut={app.logOut}
                />
            }
        >
            <div key={`${section}-${org.id}-${section === "overview" ? "" : active.cause.id}`} className="org screen-enter">
                {section === "overview" && (
                    <OrgHome app={app} org={org} programmes={programmes} onOpenProgramme={(id) => go("programme", id)} onGo={go}/>
                )}
                {section === "programme" && (
                    <OrgOverview {...shared} pending={active.pending} onBack={() => go("overview")}/>
                )}
                {section === "volunteers" && <>{switcher}<OrgSignups {...shared}/></>}
                {section === "events" && <>{switcher}<OrgEvents app={app} cause={active.cause} pending={active.pending}/></>}
                {section === "updates" && <>{switcher}<OrgUpdates app={app} org={org} cause={active.cause} rows={active.rows}/></>}
            </div>
        </AppShell>
    )
}

export default OrgView
