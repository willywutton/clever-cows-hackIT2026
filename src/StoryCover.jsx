// StoryCover.jsx comes after the About you questions. The farmer takes a book from
// his collection, explains how the story works, then shows its cover, like the front
// of a picture book. "Skip story" is a shortcut for demos: it gives the student a
// character straight away.
import { useState } from 'react'
import FarmerScene from './FarmerScene'
import './StoryCover.css'

// The other books on the farmer's shelf, as [colour, height in pixels].
const SHELF = [["#8a3a15", 74], ["#2f5d8a", 86], ["#c9a227", 70], ["#7a4a8a", 80], ["#b23a2a", 90]]

// { name } is the student's first name. { onBegin } starts the story.
// { onSkip } skips to Home with a sample character.
function StoryCover({ name, onBegin, onSkip }) {
    // 0: the farmer looks for a book. 1: he explains the story. 2: the cover.
    const [step, setStep] = useState(0)

    if (step < 2) {
        return (
            <FarmerScene bubbleKey={step} centred>
                {step === 0 && (
                    <>
                        <p className="farmer-line">
                            Thanks{name ? `, ${name}` : ""}! Now it's story time.
                            Let me find the right book from my collection...
                        </p>
                        {/* The farmer's bookshelf. The green book is the story, and it slides out. */}
                        <div className="shelf" aria-hidden="true">
                            {SHELF.slice(0, 3).map(([colour, height]) => (
                                <span key={colour} className="shelf-book" style={{ background: colour, height }}/>
                            ))}
                            <span className="shelf-book shelf-book-story"/>
                            {SHELF.slice(3).map(([colour, height]) => (
                                <span key={colour} className="shelf-book" style={{ background: colour, height }}/>
                            ))}
                        </div>
                    </>
                )}
                {step === 1 && (
                    <p className="farmer-line">
                        Here it is: The Day Mooville Needed You. I'll read it to you, and at each part,
                        you tell me what you would do. There are no wrong answers.
                    </p>
                )}
                <div className="farmer-nav">
                    <span/>
                    <button className="button-primary" onClick={() => setStep(step + 1)}>Next</button>
                </div>
            </FarmerScene>
        )
    }

    return (
        <FarmerScene bubbleKey="cover" centred bubble={false}>
            <div className="cover-book">
                <p className="cover-kicker">A short story · 8 scenes · about 5 minutes</p>
                <h2 className="cover-title">The Day Mooville Needed You</h2>
                <span className="cover-art" aria-hidden="true">🐄🏡🌾</span>
                <p className="cover-blurb">
                    {name ? `${name}, it` : "It"}'s a busy morning in Mooville, and things keep going wrong.
                    How you choose to help shows what kind of helper you are.
                </p>
                <p className="cover-note">There are no wrong answers.</p>
                <div className="cover-buttons">
                    <button className="button-primary cover-begin" onClick={onBegin}>Begin</button>
                    <button className="cover-skip" onClick={onSkip}>Skip story (demo)</button>
                </div>
            </div>
        </FarmerScene>
    )
}

export default StoryCover
