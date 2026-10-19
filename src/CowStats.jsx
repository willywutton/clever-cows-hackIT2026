// CowStats.jsx shows Clover Cowdini's four stats as bars. Stats only go up when the
// student cares for her; they never drop, so there's nothing to "fail" at.
import { STATS, STAT_MAX } from './data/store'
import './CowStats.css'

// { stats } is { comfort, hunger, cleanliness, happiness }, each 0 to 100.
function CowStats({ stats }) {
    return (
        <ul className="cow-stats">
            {STATS.map((stat) => (
                <li key={stat.id}>
                    <div className="cow-stat-label">
                        <span><span aria-hidden="true">{stat.emoji}</span> {stat.label}</span>
                        <strong>{stats[stat.id]}</strong>
                    </div>
                    <div
                        className={`cow-stat-bar cow-stat-${stat.id}`}
                        role="progressbar"
                        aria-label={stat.label}
                        aria-valuemin={0}
                        aria-valuemax={STAT_MAX}
                        aria-valuenow={stats[stat.id]}
                    >
                        <div style={{ width: `${(stats[stat.id] / STAT_MAX) * 100}%` }}/>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CowStats
