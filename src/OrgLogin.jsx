// OrgLogin.jsx is where a volunteer coordinator logs in for their organisation.
// They pick their organisation, then go to its overview.
import { useState } from 'react'
import { organisations } from './data/organisations'
import BarnFront from './BarnFront'
import Graphic from './Graphic'
import './OrgLogin.css'

// { onLogIn } receives the chosen organisation's id. { onBack } returns to Welcome.
function OrgLogin({ onLogIn, onBack }) {
    const [chosen, setChosen] = useState(null)
    const org = organisations.find((o) => o.id === chosen)

    return (
        <BarnFront>
            <div className="org-login card">
                <button className="org-login-back" onClick={onBack}>← Back</button>
                <p className="eyebrow">Organisation log in</p>
                <h1>Which organisation are you with?</h1>
                <p className="org-login-intro">
                    See who's signed up, confirm attendance, thank first-timers and share updates with your volunteers.
                </p>

                <div className="org-login-options" role="radiogroup" aria-label="Organisation">
                    {organisations.map((o) => (
                        <button
                            key={o.id}
                            role="radio"
                            aria-checked={chosen === o.id}
                            className="org-login-option"
                            style={{ '--org-color': o.color }}
                            onClick={() => setChosen(o.id)}
                        >
                            <span className="org-login-mark" aria-hidden="true"><Graphic symbol={o.emoji}/></span>
                            <span>
                                <strong>{o.name}</strong>
                                <small>{o.causeIds.length} {o.causeIds.length === 1 ? "programme" : "programmes"}</small>
                            </span>
                        </button>
                    ))}
                </div>

                <button className="button-primary org-login-go" disabled={!org} onClick={() => onLogIn(org.id)}>
                    {org ? `Log in as ${org.name}` : "Choose your organisation"}
                </button>
            </div>
        </BarnFront>
    )
}

export default OrgLogin
