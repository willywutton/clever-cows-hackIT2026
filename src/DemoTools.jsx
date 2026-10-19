// DemoTools.jsx holds two buttons for demo day: retake the story, and reset the
// whole demo (which clears everything saved in this browser).
import { useState } from 'react'
import './DemoTools.css'

// { onRetakeStory } goes back to the story cover. { onResetDemo } clears everything.
function DemoTools({ onRetakeStory, onResetDemo }) {
    // Reset asks once more before clearing, so it isn't pressed by accident.
    const [confirming, setConfirming] = useState(false)

    return (
        <section className="card demo-tools">
            <h3>Demo tools</h3>
            <button className="demo-tools-button" onClick={onRetakeStory}>Retake the story</button>

            {!confirming && (
                <button className="demo-tools-button" onClick={() => setConfirming(true)}>Reset demo</button>
            )}
            {confirming && (
                <div className="demo-tools-confirm" role="alert">
                    <p>This clears everything saved in this browser and starts again. Are you sure?</p>
                    <div className="demo-tools-row">
                        <button className="demo-tools-button" onClick={() => setConfirming(false)}>Cancel</button>
                        <button className="button-primary" onClick={onResetDemo}>Yes, reset</button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default DemoTools
