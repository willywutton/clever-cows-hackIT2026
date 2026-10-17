// GoalCard.jsx shows the student's current goal and progress on Home,
// or a "Pick a goal" card when they have none. Progress comes from the history each time.
import { useState } from 'react'
import { goalById, goalProgress, progressText } from './goalProgress'
import GoalPicker from './GoalPicker'
import GoalBar from './GoalBar'
import './GoalCard.css'

// { goalId } is the active goal id ('' for none). { history } is App's list of actions.
// { finishedIds } lists goals already finished. { onGoalChange } receives the new goal id ('' for no goal).
function GoalCard({ goalId, history, finishedIds, onGoalChange }) {
    const [picking, setPicking] = useState(false)
    const goal = goalById(goalId)

    function handleChoose(id) {
        onGoalChange(id)
        setPicking(false)
    }

    return (
        <section className="goal-card card">
            {!goal && !picking && (
                <>
                    <h3><span aria-hidden="true">🎯</span> Pick a goal</h3>
                    <p className="goal-card-text">
                        Choose something to work towards. There's no rush, and you can change it any time.
                    </p>
                    <button className="goal-card-button" onClick={() => setPicking(true)}>Pick a goal</button>
                </>
            )}

            {goal && !picking && (
                <>
                    <h3><span aria-hidden="true">🎯</span> {goal.name}</h3>
                    <p className="goal-card-text">{goal.description}</p>
                    <GoalBar progress={goalProgress(goal, history)} label={progressText(goal, history)}/>
                    <button className="goal-card-button" onClick={() => setPicking(true)}>Change goal</button>
                </>
            )}

            {picking && (
                <>
                    <h3>Choose a goal</h3>
                    <GoalPicker activeGoalId={goalId} finishedIds={finishedIds} onChoose={handleChoose} onCancel={() => setPicking(false)}/>
                </>
            )}
        </section>
    )
}

export default GoalCard
