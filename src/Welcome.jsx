// Welcome.jsx is the first screen: what the app is, how it works, and a Start button.
import './Welcome.css'

// The picture of Clover Cowdini in the farm scene. While this is null, an emoji is shown.
// To use artwork, put the image in src/assets, import it at the top of this file
// (e.g. import cowPicture from './assets/clover-cowdini.png') and set COW_PICTURE to it.
const COW_PICTURE = null

const STEPS = [
    { emoji: "📝", text: "Tell us a little about you (optional)." },
    { emoji: "📖", text: "Play a short story set in Mooville." },
    { emoji: "🐄", text: "Find out which kind of helper you are." },
    { emoji: "🌱", text: "Discover causes suited to you." },
]

// { onStart } is App's function for moving on to the next screen.
function Welcome({ onStart }) {
    return (
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

                <button className="button-primary welcome-start" onClick={onStart}>Get started</button>
                <p className="welcome-note"><span aria-hidden="true">🌱</span> Giving money is always optional.</p>
            </div>
        </div>
    )
}

export default Welcome
