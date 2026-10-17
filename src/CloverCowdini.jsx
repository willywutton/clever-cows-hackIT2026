// CloverCowdini.jsx shows the group's shared cow. It grows as the group
// takes actions for causes, and it never shrinks.
import { useEffect } from 'react'
import { cowStages } from './assets/cowStages'
import './CloverCowdini.css'

// How each kind of action is described in the reaction message.
const FEED_REASONS = {
    share: "sharing",
    donate: "your demo pledge to",
    signup: "signing up with",
    reflection: "your reflection on",
    goal: "finishing your goal",
}

// How long the happy reaction stays before it is cleared, in milliseconds.
const REACTION_TIME = 4000

// { grass } is how much grass the group has fed the cow, handed down from App.
// { recentFeeds } lists the actions since the cow last reacted: { type, causeName, amount }.
// For a finished goal, causeName holds the goal's name instead.
// { onReactionDone } tells App the reaction has been shown, so it only plays once.
function CloverCowdini({ grass, recentFeeds, onReactionDone }) {
    // Keep only the stages the group has reached, then take the last (biggest) one.
    const reachedStages = cowStages.filter((stage) => grass >= stage.minGrass)
    const stage = reachedStages[reachedStages.length - 1]

    // The next stage to grow into. undefined means the cow is already fully grown.
    const nextStage = cowStages[reachedStages.length]

    const reacting = recentFeeds.length > 0

    // useEffect runs after the cow is shown. While reacting, it starts a timer
    // that clears the reaction; the returned function cancels the timer if the
    // student leaves Home first, so the reaction waits for their next visit.
    useEffect(() => {
        if (!reacting) {
            return
        }
        const timer = setTimeout(onReactionDone, REACTION_TIME)
        return () => clearTimeout(timer)
    }, [reacting, onReactionDone])

    let reactionText = ""
    if (recentFeeds.length === 1) {
        const feed = recentFeeds[0]
        reactionText = `Yum! +${feed.amount} grass from ${FEED_REASONS[feed.type]} ${feed.causeName}.`
    }
    else if (reacting) {
        const total = recentFeeds.reduce((sum, feed) => sum + feed.amount, 0)
        reactionText = `Yum! +${total} grass from your last ${recentFeeds.length} actions.`
    }

    return (
        <div className="cow card">
            {/* Show the artwork if the stage has one, otherwise the emoji placeholder.
                role and aria-label let screen readers describe the picture. */}
            <div className={reacting ? "cow-picture cow-happy" : "cow-picture"}>
                {stage.image ? (
                    <img className="cow-image" src={stage.image} alt={`Clover Cowdini, ${stage.name} stage`} />
                ) : (
                    <span className="cow-emoji" role="img" aria-label={`Clover Cowdini, ${stage.name} stage`}>
                        {stage.emoji}
                    </span>
                )}
            </div>

            {reacting && <p className="cow-reaction" role="status">{reactionText}</p>}

            <h2>Clover Cowdini <span className="cow-stage">{stage.name}</span></h2>
            <p>{stage.message}</p>
            <p className="cow-grass">🌱 {grass} grass from your group</p>

            {nextStage && (
                <p className="cow-next">
                    {nextStage.minGrass - grass} more to grow into the {nextStage.name} stage
                </p>
            )}
        </div>
    )
}

export default CloverCowdini
