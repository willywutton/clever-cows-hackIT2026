// DemoPledge.jsx is a pretend donation screen for the demo.
// No payment details are asked for and no money is taken.
import './DemoPledge.css'

// { cause } is the cause being pledged to, { action } is its donate action.
// { onPledge } records the demo pledge. { onBack } returns without pledging.
function DemoPledge({ cause, action, onPledge, onBack }) {
    return (
        <div className="pledge">
            <h3>{cause.name}</h3>
            <p>{action.label}</p>
            <p className="pledge-note">
                Giving money is always optional. Sharing and signing up help just as much.
            </p>
            <div className="pledge-buttons">
                <button className="pledge-back" onClick={onBack}>Back</button>
                <button className="button-primary" onClick={onPledge}>Pledge</button>
            </div>
        </div>
    )
}

export default DemoPledge
