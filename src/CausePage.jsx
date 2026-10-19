// CausePage.jsx shows one cause and its three actions: Share, Donate and Sign up.
// Share and Donate show a thank-you message that names the cause.
// Sign up opens its own screen (SignUp.jsx).
import { useState } from 'react'
import DemoPledge from './DemoPledge'
import './CausePage.css'

// { cause } is the cause to show, from causes.js.
// { onBack } returns to Home. { onAction } feeds Clover Cowdini.
// { onSignUp } opens the sign-up screen. { isSignedUp } is true if already signed up.
// { surprise } is true when the page was opened from Surprise me.
function CausePage({ cause, surprise, onBack, onAction, onSignUp, isSignedUp }) {
    const share = cause.actions.find((action) => action.type === "share")
    const donate = cause.actions.find((action) => action.type === "donate")
    const signup = cause.actions.find((action) => action.type === "signup")

    // 'actions' shows the three buttons and 'pledge' the demo donation screen.
    const [mode, setMode] = useState('actions')
    // The last action taken on this page, used for its message, or null for none yet.
    const [lastAction, setLastAction] = useState(null)

    function handleShare() {
        onAction(cause.id, "share")
        setLastAction("share")
    }

    function handlePledge() {
        onAction(cause.id, "donate")
        setLastAction("donate")
        setMode('actions')
    }

    let message = ""
    if (lastAction === "share") {
        message = `Thanks for sharing ${cause.name}.`
    }
    else if (lastAction === "donate") {
        message = `Thanks for your demo pledge to ${cause.name}. No money was taken.`
    }

    // After sharing or donating, gently suggest meeting the team in person.
    // Donating is never suggested.
    const suggestSignup = lastAction !== null && !isSignedUp

    return (
        <div className="cause-page">
            <button className="cause-back" onClick={onBack}>← Back to Home</button>

            <div className="card cause-page-card">
                {surprise && (
                    <p className="cause-surprise">
                        <span aria-hidden="true">🎲</span> Surprise pick: not one of your usual matches, but you might enjoy it.
                    </p>
                )}
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
                        <button className="cause-page-action" onClick={onSignUp}>
                            <strong>{isSignedUp ? "Signed up: tap to change" : "Sign up"}</strong>
                            <span>{signup.label}, in {signup.area}</span>
                        </button>
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
                                <button className="next-step-button" onClick={onSignUp}>
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
