// GoalReward.jsx shows what finishing a goal earns: Moolah, a title, and sometimes an
// accessory for Clover Cowdini. It's shown before finishing, so the student knows up front.
import { TITLES } from './titles'
import { ART } from './assets/cowArt'
import { STORE_ITEMS } from './data/store'
import './GoalReward.css'

// { goal } is a goal from goals.js. { earned } changes the wording once it's finished.
function GoalReward({ goal, earned = false }) {
    const title = TITLES.find((t) => t.id === goal.titleId)
    const accessory = goal.reward.accessory && STORE_ITEMS.find((item) => item.id === goal.reward.accessory)

    return (
        <div className="goal-reward">
            <span className="goal-reward-label">{earned ? "You earned" : "Reward"}</span>
            <span className="goal-reward-chip"><span aria-hidden="true">🪙</span> {goal.reward.moolah} Moolah</span>
            <span className="goal-reward-chip"><span aria-hidden="true">🏅</span> {title.name}</span>
            {accessory && (
                <span className="goal-reward-chip">
                    <span aria-hidden="true">{ART[accessory.id].emoji}</span> {accessory.name} for Clover
                </span>
            )}
        </div>
    )
}

export default GoalReward
