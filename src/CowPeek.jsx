import { useEffect } from 'react'
import { cowStages } from './assets/cowStages'
import CowAvatar from './CowAvatar'
import CowStats from './CowStats'
import './CowPeek.css'

const FEED_REASONS = {
    signup: "signing up with",
    reflection: "your diary entry on",
    goal: "finishing your goal",
}

const REACTION_TIME = 4000

function shortDay(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', {
        weekday: 'long', day: 'numeric', month: 'short', timeZone: 'Asia/Singapore',
    })
}

function cowMessage({ name, recentFeeds, note, grassLeft, next }) {
    if (recentFeeds.length === 1) {
        const feed = recentFeeds[0]
        return `Yum! +${feed.amount} grass from ${FEED_REASONS[feed.type]} ${feed.causeName}.`
    }
    if (recentFeeds.length > 1) {
        const total = recentFeeds.reduce((sum, feed) => sum + feed.amount, 0)
        return `Yum! +${total} grass from your last ${recentFeeds.length} actions.`
    }
    if (note) {
        return note.text
    }
    if (grassLeft > 0) {
        return `You've saved ${grassLeft} ${grassLeft === 1 ? "handful" : "handfuls"} of grass for me. Snack time?`
    }
    if (next) {
        return `See you at ${next.cause.name} on ${shortDay(next.signup.startsAt)}? Tell me all about it after!`
    }
    return `Hi ${name}! Every time you help out, I get a little grass.`
}

function CowPeek({ name, cow, grass, grassLeft, recentFeeds, onReactionDone, note, next, onVisit }) {
    const reached = cowStages.filter((stage) => grass >= stage.minGrass)
    const stage = reached[reached.length - 1]
    const reacting = recentFeeds.length > 0
    const message = cowMessage({ name, recentFeeds, note, grassLeft, next })
    const action = !reacting && note ? note.action : null

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
                {action && <button className="cow-peek-action" onClick={action.onClick}>{action.label}</button>}
            </div>

            <div className="cow-peek-barn">
                <button className="cow-peek-window" onClick={onVisit} aria-label="Visit Clover Cowdini in the barn">
                    <span className="cow-peek-inside">
                        <span className={reacting ? "cow-peek-cow cow-peek-happy" : "cow-peek-cow"}>
                            <CowAvatar accessories={cow.equipped} label="Clover Cowdini"/>
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
