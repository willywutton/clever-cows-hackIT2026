import { publicPosts } from '../herd'
import PostTile from '../PostTile'
import OrgPostUpdate from './OrgPostUpdate'

function OrgUpdates({ app, org, cause, rows }) {
    const feedback = publicPosts({ diary: app.diary, name: app.profile.name, accessories: app.cow.equipped, trait: app.quizResult })
        .filter(({ entry }) => entry.causeId === cause.id)

    return (
        <>
            <div>
                <h2>Updates & feedback</h2>
                <p className="org-section-note">Tell volunteers what their help changed, and hear how it went for them.</p>
            </div>

            <OrgPostUpdate
                cause={cause}
                audience={rows.length}
                followers={org.followers + (app.followedOrgIds.includes(org.id) ? 1 : 0)}
                updates={app.orgUpdates.filter((update) => update.causeId === cause.id)}
                onPost={(text) => app.postUpdate(cause.id, text)}
            />

            <section className="org-section">
                <h3>What volunteers said</h3>
                <p className="org-section-note">
                    Only diary pages students chose to make public appear here. Private pages stay private.
                </p>
                {feedback.length === 0 && <p className="org-section-note">No public diary pages about {cause.name} yet.</p>}
                <div className="org-feedback">
                    {feedback.map(({ entry, author }) => (
                        <PostTile key={entry.id} entry={entry} author={author} cause={cause}/>
                    ))}
                </div>
            </section>
        </>
    )
}

export default OrgUpdates
