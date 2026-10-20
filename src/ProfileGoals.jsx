// ProfileGoals.jsx is the Goals section on Profile: the current goal (with progress,
// reward and a way to change it) and the goals already finished, with their titles.
// Goals that were changed or dropped are simply not listed: nothing counts as a failure.
import Graphic from './Graphic'
import { goalById } from './goalProgress'
import { TITLES } from './titles'
import GoalCard from './GoalCard'
import './ProfileGoals.css'

// { goalId } is the current goal ('' for none). { history } is for progress.
// { goalHistory } lists finished goals. { onGoalChange } picks a new goal.
function ProfileGoals({ goalId, history, goalHistory, onGoalChange }) {
    const finishedIds = goalHistory.map((finished) => finished.goalId)

    return (
        <section className="profile-goals">
            <GoalCard goalId={goalId} history={history} finishedIds={finishedIds} onGoalChange={onGoalChange}/>
            {goalHistory.length > 0 && (
                <div className="card profile-goals-done">
                    <h3>Goals finished</h3>
                    <ul>
                        {goalHistory.map((finished) => {
                            const goal = goalById(finished.goalId)
                            const title = TITLES.find((t) => t.id === goal.titleId)
                            return (
                                <li key={finished.goalId}>
                                    <span>✓ {goal.name}</span>
                                    <span className="profile-goals-title"><Graphic symbol="medal"/> {title.name}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default ProfileGoals
