import { causeLook } from '../causeColors'
import { sessionOf, spotsFor } from '../causeRows'
import { formatSession } from '../formatSession'
import { publicPosts } from '../herd'
import { traitLabels } from '../data/traits'
import PostTile from '../PostTile'
import CowAvatar from '../CowAvatar'
import { CHARACTERS } from '../assets/characters'
import { TRAIT_TIPS, traitMix } from './orgData'
import './OrgOverview.css'

function OrgOverview({ app, org, cause, rows, stats, pending, onGo }) {
    const look = causeLook(cause.id)
    const followers = org.followers + (app.followedOrgIds.includes(org.id) ? 1 : 0)
    const session = sessionOf(cause)
    const spots = spotsFor(cause, app.signedUp.find((entry) => entry.causeId === cause.id))
    const mix = traitMix(rows)
    const top = mix[0]
    const feedback = publicPosts({ diary: app.diary, name: app.profile.name, accessories: app.cow.equipped, trait: app.quizResult })
        .filter(({ entry }) => entry.causeId === cause.id)
    const updates = app.orgUpdates.filter((update) => update.causeId === cause.id)
    const lastUpdate = updates.at(-1)

    const tasks = [
        stats.toThank.length > 0 && {
            icon: "💛", section: "volunteers", action: "Say thanks",
            text: `${stats.toThank.length} ${stats.toThank.length === 1 ? "volunteer has" : "volunteers have"} been once. A thank-you is the easiest way to bring them back.`,
        },
        pending.length > 0 && {
            icon: "📮", section: "events", action: "Review",
            text: `${pending.length} ${pending.length === 1 ? "event idea" : "event ideas"} from students waiting for you.`,
        },
        {
            icon: "✅", section: "volunteers", action: "Mark attendance",
            text: `After ${formatSession(session).split(",").slice(0, 2).join(",")}, confirm who came so their hours count.`,
        },
        {
            icon: "📣", section: "updates", action: "Post update",
            text: lastUpdate
                ? `Your last update went out on ${new Date(lastUpdate.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}. Keep volunteers in the loop.`
                : "You haven't posted yet. Tell volunteers what their help changed.",
        },
    ].filter(Boolean)

    return (
        <>
            <section className="card org-hero" style={{ '--cause-color': look.color }}>
                <span className="org-hero-mark" aria-hidden="true">{look.emoji}</span>
                <div className="org-hero-text">
                    <p className="eyebrow">{org.emoji} {org.name} · {followers} followers</p>
                    <h1>{cause.name}</h1>
                    <p>Next session: {formatSession(session)} · {session.area}</p>
                </div>
                <div className="org-hero-spots">
                    <strong>{spots.going}/{spots.total}</strong>
                    <span>places taken</span>
                    <div className="org-hero-meter"><span style={{ width: `${(spots.going / spots.total) * 100}%` }}/></div>
                </div>
            </section>

            <div className="org-stats">
                <p className="org-stat">
                    <strong>{stats.volunteers}</strong> volunteers signed up
                </p>
                <p className="org-stat org-stat-key">
                    <strong>{stats.returningRate}%</strong> came back after their first visit
                    <small>{stats.returning} of {stats.attendedOnce} who've been</small>
                </p>
                <p className="org-stat">
                    <strong>{stats.hours}</strong> hours given
                </p>
                <p className="org-stat">
                    <strong>{feedback.length}</strong> diary {feedback.length === 1 ? "page" : "pages"} about you
                </p>
            </div>
            <p className="org-section-note">Numbers include sample volunteers.</p>

            <div className="org-columns">
                <section className="card org-section">
                    <h3>To do</h3>
                    <ul className="org-tasks">
                        {tasks.map((task) => (
                            <li key={task.text}>
                                <span aria-hidden="true">{task.icon}</span>
                                <p>{task.text}</p>
                                <button onClick={() => onGo(task.section)}>{task.action}</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="card org-section">
                    <h3>Who's signing up</h3>
                    <p className="org-section-note">Helper types come from each student's story, so you can offer roles that suit them.</p>
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
                    <button className="org-link" onClick={() => onGo("updates")}>See all feedback</button>
                </div>
                {feedback.length === 0 && (
                    <p className="org-section-note">No public diary pages about {cause.name} yet. They appear here when volunteers share them.</p>
                )}
                <div className="org-feedback">
                    {feedback.slice(0, 3).map(({ entry, author }) => (
                        <PostTile key={entry.id} entry={entry} author={author} cause={cause} onOpen={() => onGo("updates")}/>
                    ))}
                </div>
            </section>
        </>
    )
}

export default OrgOverview
