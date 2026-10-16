// GoalBar.jsx is a simple progress bar for a goal, with its text, e.g. "1 of 3 causes".
import './GoalBar.css'

// { progress } is { done, target } from goalProgress(). { label } is the text under the bar.
function GoalBar({ progress, label }) {
    const percent = Math.round((progress.done / progress.target) * 100)
    return (
        <div className="goal-bar-wrap">
            <div
                className="goal-bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={progress.target}
                aria-valuenow={progress.done}
                aria-label={label}
            >
                <div className="goal-bar-fill" style={{ width: `${percent}%` }}/>
            </div>
            <p className="goal-bar-label">{label}</p>
        </div>
    )
}

export default GoalBar
