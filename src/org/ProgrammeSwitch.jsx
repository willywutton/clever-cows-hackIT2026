import Graphic from '../Graphic'
import { causeLook } from '../causeColors'
import './ProgrammeSwitch.css'

function ProgrammeSwitch({ programmes, activeId, onChange }) {
    return (
        <div className="programme-switch" role="group" aria-label="Programme">
            <span className="programme-switch-label">Programme</span>
            {programmes.map(({ cause, stats, pending }) => {
                const flags = stats.toThank.length + pending.length
                return (
                    <button key={cause.id} aria-pressed={cause.id === activeId} onClick={() => onChange(cause.id)}>
                        <span aria-hidden="true"><Graphic symbol={causeLook(cause.id).emoji}/></span> {cause.name}
                        {flags > 0 && <span className="programme-switch-badge">{flags}</span>}
                    </button>
                )
            })}
        </div>
    )
}

export default ProgrammeSwitch
