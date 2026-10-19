// TraitBreakdown.jsx shows how the player's answers were spread across the four traits,
// named as everyday strengths, with a bar and a percentage for each, highest first.
import { traitLabels } from './data/traits'
import './TraitBreakdown.css'

// The exact share of answers for each trait, e.g. 3 of 8 answers is 37.5.
// Shown with at most one decimal place, so "25%" rather than "25.0%".
function toPercents(scores, total) {
    return Object.keys(scores).map((trait) => {
        const percent = Math.round((scores[trait] / total) * 1000) / 10
        return { trait, percent }
    })
}

// { scores } is the quiz's count per trait, e.g. { Heart: 4, Strategy: 2, ... }.
// { total } is the number of answers given. { topTrait } is the trait that won.
function TraitBreakdown({ scores, total, topTrait }) {
    // Highest first; on a tie, the winning trait goes first.
    const rows = toPercents(scores, total).sort((a, b) =>
        b.percent - a.percent || (b.trait === topTrait) - (a.trait === topTrait)
    )

    return (
        <div className="traits">
            <h3 className="traits-title">Your strengths</h3>
            <ul className="traits-list">
                {rows.map(({ trait, percent }) => (
                    <li key={trait} className={trait === topTrait ? "traits-row traits-row-top" : "traits-row"}>
                        <div className="traits-label">
                            <span>
                                {traitLabels[trait].label}
                                <small>{traitLabels[trait].skills}</small>
                            </span>
                            <strong>{percent}%</strong>
                        </div>
                        <div
                            className="traits-bar"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={percent}
                            aria-label={`${traitLabels[trait].label}: ${percent}%`}
                        >
                            <div className="traits-bar-fill" style={{ width: `${percent}%` }}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TraitBreakdown
