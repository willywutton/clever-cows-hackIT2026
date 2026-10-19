// StoryCover.jsx is the cover page of the story, like the front of a picture book.
// "Skip story" is a shortcut for demos: it gives the student a character straight away.
import './StoryCover.css'

// { name } is the student's first name. { onBegin } starts the story.
// { onSkip } skips to Home with a sample character.
function StoryCover({ name, onBegin, onSkip }) {
    return (
        <div className="cover">
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
        </div>
    )
}

export default StoryCover
