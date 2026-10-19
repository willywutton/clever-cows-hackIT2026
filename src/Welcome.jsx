// Welcome.jsx is the first screen: what the app is in three steps,
// the student's first name, and a Start button.
import { useState } from 'react'
import BarnFront from './BarnFront'
import './Welcome.css'

// The picture of Clover Cowdini in the farm scene. While this is null, an emoji is shown.
// To use artwork, put the image in src/assets, import it at the top of this file
// (e.g. import cowPicture from './assets/clover-cowdini.png') and set COW_PICTURE to it.
const COW_PICTURE = null

const STEPS = [
    { emoji: "📖", text: "Play a short story set in Mooville." },
    { emoji: "🐄", text: "Find out which kind of helper you are." },
    { emoji: "🌱", text: "Find causes that suit you, and help out." },
]

// A first name: letters, plus hyphens or apostrophes, with no spaces.
const FIRST_NAME = /^[A-Za-z][A-Za-z'-]*$/

// { onStart } receives the student's first name and moves on to the next screen.
function Welcome({ onStart }) {
    const [name, setName] = useState("")
    const trimmed = name.trim()
    const valid = FIRST_NAME.test(trimmed)

    // A form's onSubmit runs on the Start button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        if (valid) {
            onStart(trimmed.charAt(0).toUpperCase() + trimmed.slice(1))
        }
    }

    // The card sits inside the barn front, where the big barn door would be.
    return (
        <BarnFront>
            <div className="welcome card">
                {/* A small farm scene drawn with CSS: sky, sun, hills and a fence. */}
                <div className="welcome-scene">
                    <span className="welcome-sun" aria-hidden="true"/>
                    <span className="welcome-hill welcome-hill-back" aria-hidden="true"/>
                    <span className="welcome-hill welcome-hill-front" aria-hidden="true"/>
                    <span className="welcome-fence" aria-hidden="true"/>
                    {COW_PICTURE ? (
                        <img className="welcome-cow welcome-cow-image" src={COW_PICTURE} alt="Clover Cowdini"/>
                    ) : (
                        <span className="welcome-cow" role="img" aria-label="Clover Cowdini">🐮</span>
                    )}
                </div>

                <div className="welcome-body">
                    <h2>Welcome to Clever Cows</h2>
                    <p className="welcome-intro">
                        A short story game that matches you with local causes,
                        and small, real ways to help them.
                    </p>

                    <h3 className="welcome-how">How it works</h3>
                    <ol className="welcome-steps">
                        {STEPS.map((step) => (
                            <li key={step.text}>
                                <span className="welcome-step-emoji" aria-hidden="true">{step.emoji}</span>
                                {step.text}
                            </li>
                        ))}
                    </ol>

                    <form className="welcome-name" onSubmit={handleSubmit}>
                        <label htmlFor="first-name">What's your first name?</label>
                        <div className="welcome-name-row">
                            <input
                                id="first-name"
                                type="text"
                                value={name}
                                maxLength={20}
                                autoComplete="given-name"
                                placeholder="e.g. Alex"
                                required
                                onChange={(event) => setName(event.target.value)}
                            />
                            <button type="submit" className="button-primary welcome-start" disabled={!valid}>Start</button>
                        </div>
                        <p className="welcome-name-hint">
                            {trimmed !== "" && !valid
                                ? "Just your first name, please: letters only, no spaces."
                                : "First name only. We never ask for your full name."}
                        </p>
                    </form>
                    <p className="welcome-note"><span aria-hidden="true">🌱</span> Giving money is always optional.</p>
                </div>
            </div>
        </BarnFront>
    )
}

export default Welcome
