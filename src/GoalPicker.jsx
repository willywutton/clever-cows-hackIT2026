// GoalPicker.jsx lists the goals so the student can choose one, switch, or drop their goal.
import { goals } from './data/goals'
import './GoalPicker.css'

// { activeGoalId } is the current goal id ('' for none).
// { onChoose } receives the chosen goal id ('' for no goal). { onCancel } closes without changing.
function GoalPicker({ activeGoalId, onChoose, onCancel }) {
    return (
        <div className="goal-picker">
            <ul className="goal-picker-list">
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <button
                            className="goal-picker-option"
                            aria-pressed={goal.id === activeGoalId}
                            onClick={() => onChoose(goal.id)}
                        >
                            <strong>{goal.name}</strong>
                            <span>{goal.description}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="goal-picker-buttons">
                {activeGoalId !== "" && (
                    <button className="goal-picker-plain" onClick={() => onChoose("")}>No goal for now</button>
                )}
                <button className="goal-picker-plain" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default GoalPicker
