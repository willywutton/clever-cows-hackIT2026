// FarmerIntro.jsx is the second screen: inside the barn, a farmer explains what
// Clever Cows does and how it works, one speech bubble at a time, then asks for
// the student's first name.
import { useState } from 'react'
import { FARMER } from './assets/farmerArt'
import FarmerScene from './FarmerScene'
import StoryDots from './StoryDots'

const LINES = [
    `Howdy, and welcome to my barn! I'm ${FARMER.name}. Mooville could use a hand, and so could your neighbourhood.`,
    "First, you'll play a short story. How you choose to help in it shows what kind of helper you are.",
    "Then I'll match you with causes that suit you: near you, and at times that fit your week.",
    "Sign up alone or with friends. A group can even take turns, so no one has to come every week.",
    "After each session, write in your diary and earn Moolah to look after Clover Cowdini, our calf. Giving money is always optional, and no one's keeping score.",
]

// A first name: letters, plus hyphens or apostrophes, with no spaces.
const FIRST_NAME = /^[A-Za-z][A-Za-z'-]*$/

// { onDone } receives the student's first name. { onBack } returns to the Welcome screen.
function FarmerIntro({ onDone, onBack }) {
    // Which speech bubble is showing. One past the last line is the name question.
    const [step, setStep] = useState(0)
    const [name, setName] = useState("")
    const askingName = step === LINES.length
    const trimmed = name.trim()
    const valid = FIRST_NAME.test(trimmed)

    // A form's onSubmit runs on the button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        if (valid) {
            onDone(trimmed.charAt(0).toUpperCase() + trimmed.slice(1))
        }
    }

    return (
        <FarmerScene bubbleKey={step} centred>
            {!askingName && <p className="farmer-line">{LINES[step]}</p>}

            {askingName && (
                <form className="farmer-form" onSubmit={handleSubmit}>
                    <label htmlFor="first-name" className="farmer-line farmer-question">Now, what should I call you?</label>
                    <input
                        id="first-name"
                        type="text"
                        value={name}
                        maxLength={20}
                        autoComplete="given-name"
                        placeholder="Your first name, e.g. Alex"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <p className="farmer-hint">
                        {trimmed !== "" && !valid
                            ? "Just your first name, please: letters only, no spaces."
                            : "First name only. We never ask for your full name."}
                    </p>
                    <button type="submit" className="button-primary" disabled={!valid}>Let's go!</button>
                </form>
            )}

            <div className="farmer-nav">
                <button className="farmer-back" onClick={() => (step === 0 ? onBack() : setStep(step - 1))}>
                    ← Back
                </button>
                <StoryDots total={LINES.length + 1} current={step} label="Step"/>
                {!askingName && (
                    <button className="button-primary farmer-next" onClick={() => setStep(step + 1)}>Next</button>
                )}
                {askingName && <span className="farmer-next-space"/>}
            </div>
        </FarmerScene>
    )
}

export default FarmerIntro
