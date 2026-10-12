// CausePage.jsx shows one cause and its three actions: Share, Donate and Sign up.
// Each action shows a thank-you message that names the cause.
import { useState } from 'react'
import { formatSession } from './formatSession'
import DemoPledge from './DemoPledge'
import './CausePage.css'

// { cause } is the cause to show, from causes.js.
// { onBack } returns to Home. { onAction } feeds Clover Cowdini.
// { hasFed } checks whether an action for this cause has already been taken.
function CausePage({ cause, onBack, onAction, hasFed }) {
    const share = cause.actions.find((action) => action.type === "share")
    const donate = cause.actions.find((action) => action.type === "donate")
    const signup = cause.actions.find((action) => action.type === "signup")

    // 'actions' shows the three buttons, 'signup' the once / weekly choice,
    // and 'pledge' the demo donation screen.
    const [mode, setMode] = useState('actions')
    const [weekly, setWeekly] = useState(false)
    // The last action taken on this page, used for its message, or null for none yet.
    const [lastAction, setLastAction] = useState(null)

    function handleShare() {
        onAction(cause.id, "share")
        setLastAction({ type: "share" })
    }

    function handlePledge() {
        onAction(cause.id, "donate")
        setLastAction({ type: "donate" })
        setMode('actions')
    }

    function handleConfirmSignup() {
        onAction(cause.id, "signup")
        setLastAction({ type: "signup", weekly })
        setMode('actions')
    }

    let message = ""
    if (lastAction?.type === "share") {
        message = `Thanks for sharing ${cause.name}.`
    }
    else if (lastAction?.type === "donate") {
        message = `Thanks for your demo pledge to ${cause.name}. No money was taken.`
    }
    else if (lastAction?.type === "signup") {
        message = lastAction.weekly
            ? `You're signed up with ${cause.name}: ${signup.weeklyLabel}, every week from ${formatSession(signup)}.`
            : `You're signed up with ${cause.name}: ${signup.label}, ${formatSession(signup)}.`
    }

    // After sharing or donating, gently suggest meeting the team in person.
    // Donating is never suggested.
    const suggestSignup = lastAction !== null
        && lastAction.type !== "signup"
        && !hasFed(cause.id, "signup")

    return (
        <div className="cause-page">
            <button className="cause-back" onClick={onBack}>← Back to Home</button>

            <div className="card cause-page-card">
                <h2>{cause.name}</h2>
                <p className="cause-page-description">{cause.description}</p>

                {mode === 'actions' && (
                    <div className="cause-page-actions">
                        <button className="cause-page-action" onClick={handleShare}>
                            <strong>Share</strong>
                            <span>{share.label}</span>
                        </button>
                        <button className="cause-page-action" onClick={() => setMode('pledge')}>
                            <strong>Donate <em>(optional)</em></strong>
                            <span>{donate.label}</span>
                        </button>
                        <button className="cause-page-action" onClick={() => setMode('signup')}>
                            <strong>Sign up</strong>
                            <span>{signup.label}</span>
                        </button>
                    </div>
                )}

                {mode === 'signup' && (
                    <div className="cause-signup">
                        <p className="cause-signup-time">Next session: {formatSession(signup)}</p>
                        <fieldset className="cause-signup-choice">
                            <legend>How often would you like to come?</legend>
                            <label>
                                <input
                                    type="radio"
                                    name="repeat"
                                    checked={!weekly}
                                    onChange={() => setWeekly(false)}
                                />
                                Just this once: {signup.label}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="repeat"
                                    checked={weekly}
                                    onChange={() => setWeekly(true)}
                                />
                                Every week: {signup.weeklyLabel}
                            </label>
                        </fieldset>
                        <div className="cause-signup-buttons">
                            <button className="cause-cancel" onClick={() => setMode('actions')}>Cancel</button>
                            <button className="button-primary" onClick={handleConfirmSignup}>Confirm</button>
                        </div>
                    </div>
                )}

                {mode === 'pledge' && (
                    <DemoPledge
                        cause={cause}
                        action={donate}
                        onPledge={handlePledge}
                        onBack={() => setMode('actions')}
                    />
                )}

                {mode === 'actions' && message && (
                    <div className="cause-message" role="status">
                        <p>{message}</p>
                        {suggestSignup && (
                            <p className="cause-next">
                                Want to meet the team in person?{" "}
                                <button className="next-step-button" onClick={() => setMode('signup')}>
                                    Sign up
                                </button>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CausePage
