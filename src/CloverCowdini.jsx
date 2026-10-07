// CloverCowdini.jsx shows the group's shared cow. It grows as the group
// takes actions for causes, and it never shrinks.
import { cowStages } from './assets/cowStages'
import './CloverCowdini.css'

// { grass } is how much grass the group has fed the cow, handed down from App.
function CloverCowdini({ grass }) {
    // Keep only the stages the group has reached, then take the last (biggest) one.
    const reachedStages = cowStages.filter((stage) => grass >= stage.minGrass)
    const stage = reachedStages[reachedStages.length - 1]

    // The next stage to grow into. undefined means the cow is already fully grown.
    const nextStage = cowStages[reachedStages.length]

    return (
        <div className="cow card">
            {/* Show the artwork if the stage has one, otherwise the emoji placeholder.
                role and aria-label let screen readers describe the picture. */}
            {stage.image ? (
                <img className="cow-image" src={stage.image} alt={`Clover Cowdini, ${stage.name} stage`} />
            ) : (
                <span className="cow-emoji" role="img" aria-label={`Clover Cowdini, ${stage.name} stage`}>
                    {stage.emoji}
                </span>
            )}

            <h2>Clover Cowdini <span className="cow-stage">{stage.name}</span></h2>
            <p>{stage.message}</p>
            <p className="cow-grass">🌱 {grass} grass from your group</p>

            {nextStage && (
                <p className="cow-next">
                    {nextStage.minGrass - grass} more to grow into the {nextStage.name} stage
                </p>
            )}
        </div>
    )
}

export default CloverCowdini
