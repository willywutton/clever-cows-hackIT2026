import Graphic from '../Graphic'
import { causeLook } from '../causeColors'
import { sessionOf } from '../causeRows'
import { publicPosts } from '../herd'
import { traitLabels } from '../data/traits'
import { CHARACTERS } from '../assets/characters'
import PostTile from '../PostTile'
import CowAvatar from '../CowAvatar'
import { TRAIT_TIPS, traitMix } from './orgData'
import './OrgHome.css'

function shortDate(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', {
        weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Singapore',
    })
}

function OrgHome({ app, org, programmes, onOpenProgramme, onGo }) {
    const followers = org.followers + (app.followedOrgIds.includes(org.id) ? 1 : 0)
    const allRows = programmes.flatMap((p) => p.rows)
    const attendedOnce = programmes.reduce((sum, p) => sum + p.stats.attendedOnce, 0)
    const returning = programmes.reduce((sum, p) => sum + p.stats.returning, 0)
    const hours = programmes.reduce((sum, p) => sum + p.stats.hours, 0)
    const toThank = programmes.filter((p) => p.stats.toThank.length > 0)
    const pending = programmes.filter((p) => p.pending.length > 0)
    const mix = traitMix(allRows)
    const top = mix[0]
    const feedback = publicPosts({ diary: app.diary, name: app.profile.name, accessories: app.cow.equipped, trait: app.quizResult })
        .filter(({ entry }) => org.causeIds.includes(entry.causeId))
    const posted = app.orgUpdates.filter((update) => org.causeIds.includes(update.causeId))

    const tasks = [
        ...toThank.map((p) => ({
            icon: "💛", key: `thank-${p.cause.id}`, action: "Say thanks",
            text: `${p.stats.toThank.length} first-time ${p.stats.toThank.length === 1 ? "volunteer" : "volunteers"} at ${p.cause.name} waiting for a thank-you.`,
            go: () => onGo("volunteers", p.cause.id),
        })),
        ...pending.map((p) => ({
            icon: "📮", key: `review-${p.cause.id}`, action: "Review",
            text: `${p.pending.length} event ${p.pending.length === 1 ? "idea" : "ideas"} from students for ${p.cause.name}.`,
            go: () => onGo("events", p.cause.id),
        })),
        {
            icon: "📣", key: "post", action: "Post update",
            text: posted.length > 0
                ? `${posted.length} ${posted.length === 1 ? "update" : "updates"} posted so far. Tell volunteers what their help changed this week.`
                : "You haven't posted yet. Followers hear your updates from Clover on their Home page.",
            go: () => onGo("updates", programmes[0].cause.id),
        },
    ]

    return (
        <>
            <section className="card org-home-hero" style={{ '--org-color': org.color }}>
                <span className="org-home-mark" aria-hidden="true"><Graphic symbol={org.emoji}/></span>
                <div>
                    <p className="eyebrow">Organisation overview</p>
                    <h1>{org.name}</h1>
                    <p className="org-home-tagline">{org.tagline}</p>
                </div>
            </section>

            <div className="org-home-stats">
                <p className="org-stat"><strong>{programmes.length}</strong> programmes running</p>
                <p className="org-stat"><strong>{allRows.length}</strong> volunteers signed up</p>
                <p className="org-stat org-stat-key">
                    <strong>{attendedOnce ? Math.round((returning / attendedOnce) * 100) : 0}%</strong> came back after their first visit
                    <small>{returning} of {attendedOnce} who've been</small>
                </p>
                <p className="org-stat"><strong>{hours}</strong> hours given</p>
                <p className="org-stat"><strong>{followers}</strong> followers</p>
            </div>

            <section className="org-section">
                <h2>Your programmes</h2>
                <div className="org-home-programmes">
                    {programmes.map(({ cause, stats, spots, pending: ideas }) => {
                        const session = sessionOf(cause)
                        return (
                            <article key={cause.id} className="org-programme lift" style={{ '--cause-color': causeLook(cause.id).color }}>
                                <div className="org-programme-top">
                                    <span className="org-programme-mark" aria-hidden="true"><Graphic symbol={causeLook(cause.id).emoji}/></span>
                                    <div>
                                        <h3>
                                            <button className="org-programme-open" onClick={() => onOpenProgramme(cause.id)}>{cause.name}</button>
                                        </h3>
                                        <p>Next: {shortDate(session.startsAt)} · {session.area}</p>
                                    </div>
                                </div>

                                <div className="org-programme-spots">
                                    <div className="org-programme-meter"><span style={{ width: `${(spots.going / spots.total) * 100}%` }}/></div>
                                    <span><strong>{spots.going}/{spots.total}</strong> places taken</span>
                                </div>

                                <dl className="org-programme-numbers">
                                    <div><dt>Volunteers</dt><dd>{stats.volunteers}</dd></div>
                                    <div><dt>Came back</dt><dd>{stats.returningRate}%</dd></div>
                                    <div><dt>Hours</dt><dd>{stats.hours}</dd></div>
                                </dl>

                                {(stats.toThank.length > 0 || ideas.length > 0) && (
                                    <p className="org-programme-flags">
                                        {stats.toThank.length > 0 && <span><Graphic symbol="heart"/> {stats.toThank.length} to thank</span>}
                                        {ideas.length > 0 && <span><Graphic symbol="mailbox"/> {ideas.length} to review</span>}
                                    </p>
                                )}

                                <span className="org-programme-cta" aria-hidden="true">Open programme →</span>
                            </article>
                        )
                    })}
                </div>
            </section>

            <div className="org-columns">
                <section className="card org-section">
                    <h3>To do</h3>
                    <ul className="org-tasks">
                        {tasks.map((task) => (
                            <li key={task.key}>
                                <span aria-hidden="true"><Graphic symbol={task.icon}/></span>
                                <p>{task.text}</p>
                                <button onClick={task.go}>{task.action}</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="card org-section">
                    <h3>Who volunteers with you</h3>
                    <p className="org-section-note">Across all programmes, from each student's story result.</p>
                    <ul className="org-mix">
                        {mix.map(({ trait, count, share }) => (
                            <li key={trait}>
                                <CowAvatar face={CHARACTERS[trait].head} size="small" label=""/>
                                <span>{TRAIT_TIPS[trait].name} <small>{traitLabels[trait].label}</small></span>
                                <div className="org-mix-bar"><span style={{ width: `${share}%` }}/></div>
                                <strong>{count}</strong>
                            </li>
                        ))}
                    </ul>
                    {top.count > 0 && (
                        <p className="org-tip"><strong>Tip:</strong> most of your volunteers are {TRAIT_TIPS[top.trait].name}. {TRAIT_TIPS[top.trait].tip}</p>
                    )}
                </section>
            </div>

            <section className="org-section">
                <div className="org-section-head">
                    <h3>What volunteers said</h3>
                    <button className="org-link" onClick={() => onGo("updates", programmes[0].cause.id)}>All feedback</button>
                </div>
                {feedback.length === 0 && <p className="org-section-note">Public diary pages about your programmes will appear here.</p>}
                <div className="org-feedback">
                    {feedback.slice(0, 3).map(({ entry, author }) => {
                        const cause = programmes.find((p) => p.cause.id === entry.causeId).cause
                        return <PostTile key={entry.id} entry={entry} author={author} cause={cause}/>
                    })}
                </div>
            </section>
        </>
    )
}

export default OrgHome
