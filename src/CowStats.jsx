// CowStats.jsx shows Clover Cowdini's four stats as bars. Caring for her raises them,
// and they drop a little each week.
import { STATS, STAT_MAX } from './data/store'
import './CowStats.css'

const LEVELS = [
    { min: 60, id: "good", word: "Great" },
    { min: 30, id: "mid", word: "Okay" },
    { min: 0, id: "low", word: "Could use some care" },
]

function statLevel(value) {
    return LEVELS.find((level) => value >= level.min)
}

// { stats } is { comfort, hunger, cleanliness, happiness }, each 0 to 100.
// { compact } shows just an icon and a bar for each stat, e.g. on Home.
function CowStats({ stats, compact = false }) {
    return (
        <ul className={compact ? "cow-stats cow-stats-compact" : "cow-stats"}>
            {STATS.map((stat) => {
                const level = statLevel(stats[stat.id])
                return (
                    <li key={stat.id} title={`${stat.label}: ${level.word}`}>
                        <div className="cow-stat-label">
                            <span><span aria-hidden="true">{stat.emoji}</span> <span className="cow-stat-name">{stat.label}</span></span>
                            {!compact && <strong>{stats[stat.id]}</strong>}
                        </div>
                        <div
                            className={`cow-stat-bar cow-stat-${level.id}`}
                            role="progressbar"
                            aria-label={stat.label}
                            aria-valuemin={0}
                            aria-valuemax={STAT_MAX}
                            aria-valuenow={stats[stat.id]}
                            aria-valuetext={`${stats[stat.id]} out of ${STAT_MAX}, ${level.word.toLowerCase()}`}
                        >
                            <div style={{ width: `${(stats[stat.id] / STAT_MAX) * 100}%` }}/>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default CowStats
