import { useEffect, useState } from 'react'
import { cowStages } from './assets/cowStages'
import CowFigure from './CowFigure'
import CowStats from './CowStats'
import './CowPeek.css'

const FEED_REASONS = {
    signup: "signing up with",
    reflection: "your diary entry on",
    goal: "finishing your goal",
}

const REACTION_TIME = 4000

function feedReaction(recentFeeds) {
    if (recentFeeds.length === 1) {
        const feed = recentFeeds[0]
        return `Yum! +${feed.amount} grass from ${FEED_REASONS[feed.type]} ${feed.causeName}.`
    }
    const total = recentFeeds.reduce((sum, feed) => sum + feed.amount, 0)
    return `Yum! +${total} grass from your last ${recentFeeds.length} actions.`
}

// { notes } come from cowNotes() in cowNotes.js. { urgent } is how many of them just happened:
// Clover starts with those, otherwise with a different everyday note on each visit ({ visit }).
function CowPeek({ art, cow, grass, recentFeeds, onReactionDone, notes, urgent, visit, onVisit }) {
    const reached = cowStages.filter((stage) => grass >= stage.minGrass)
    const stage = reached[reached.length - 1]
    const reacting = recentFeeds.length > 0
    const everyday = notes.length - urgent
    const [index, setIndex] = useState(urgent > 0 || everyday === 0 ? 0 : urgent + (visit % everyday))
    const note = notes[index % notes.length]
    const message = reacting ? feedReaction(recentFeeds) : note.text
    const action = reacting ? null : note.action

    useEffect(() => {
        if (!reacting) {
            return
        }
        const timer = setTimeout(onReactionDone, REACTION_TIME)
        return () => clearTimeout(timer)
    }, [reacting, onReactionDone])

    return (
        <section className="cow-peek" aria-label="Clover Cowdini">
            <div key={message} className="cow-peek-bubble" role="status">
                <p>{message}</p>
                {(action || notes.length > 1) && (
                    <div className="cow-peek-bubble-actions">
                        {action && <button className="cow-peek-action" onClick={action.onClick}>{action.label}</button>}
                        {!reacting && notes.length > 1 && (
                            <button className="cow-peek-more" onClick={() => setIndex(index + 1)} aria-label="Tell me something else" title="Tell me something else">›</button>
                        )}
                    </div>
                )}
            </div>

            <div className="cow-peek-barn">
                <button className="cow-peek-window" onClick={onVisit} aria-label="Visit Clover Cowdini in the barn">
                    <span className="cow-peek-inside">
                        <span className={reacting ? "cow-peek-cow cow-peek-happy" : "cow-peek-cow"}>
                            <CowFigure art={art} accessories={cow.equipped} label="Clover Cowdini"/>
                        </span>
                    </span>
                </button>

                <div className="cow-peek-info">
                    <p className="cow-peek-name">
                        Clover Cowdini <span className="cow-peek-stage">{stage.name}</span>
                    </p>
                    <CowStats stats={cow.stats} compact/>
                    <button className="cow-peek-visit" onClick={onVisit}>Visit the barn →</button>
                </div>
            </div>
        </section>
    )
}

export default CowPeek
