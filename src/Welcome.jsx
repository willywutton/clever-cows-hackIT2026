// Welcome.jsx is the first screen: what the app is, how it works, and a Start button.
import './Welcome.css'

const STEPS = [
    { emoji: "📖", text: "Play a short story set in Mooville." },
    { emoji: "🐄", text: "Find out which kind of helper you are." },
    { emoji: "🌱", text: "Pick a small way to help a cause that suits you." },
]

// { onStart } is App's function for moving on to the next screen.
function Welcome({ onStart }) {
    return (
        <div className="welcome card">
            <span className="welcome-emoji" aria-hidden="true">🐮</span>
            <h2>Welcome to Clever Cows</h2>
            <p className="welcome-intro">
                A short story game that matches you with local causes,
                and small, real ways to help them.
            </p>

            <ol className="welcome-steps">
                {STEPS.map((step) => (
                    <li key={step.text}>
                        <span aria-hidden="true">{step.emoji}</span>
                        {step.text}
                    </li>
                ))}
            </ol>

            <p className="welcome-note">Giving money is always optional.</p>

            <button className="button-primary" onClick={onStart}>Start</button>
        </div>
    )
}

export default Welcome
