// ProposalForm.jsx lets a student propose their own event to an organisation.
// In this demo nothing is really sent: the proposal is kept in the app and shown on Profile.
import { useState } from 'react'
import { causes } from './data/causes'
import './ProposalForm.css'

const MESSAGE_LENGTH = 300

// Today's date as "YYYY-MM-DD", the format date inputs use, so past dates can't be picked.
function todayForInput() {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

// { onSend } receives { causeId, idea, date, people, message }. { onCancel } closes the form.
function ProposalForm({ onSend, onCancel }) {
    const [causeId, setCauseId] = useState(causes[0].id)
    const [idea, setIdea] = useState("")
    const [date, setDate] = useState("")
    const [people, setPeople] = useState(4)
    const [message, setMessage] = useState("")

    // A form's onSubmit runs on the Send button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        onSend({ causeId, idea: idea.trim(), date, people: Number(people), message: message.trim() })
    }

    return (
        <form className="proposal" onSubmit={handleSubmit}>
            <p className="proposal-demo">Demo: nothing is really sent</p>

            <label className="proposal-field">
                <span>Which organisation?</span>
                <select value={causeId} onChange={(event) => setCauseId(event.target.value)}>
                    {causes.map((cause) => (
                        <option key={cause.id} value={cause.id}>{cause.name}</option>
                    ))}
                </select>
            </label>

            <label className="proposal-field">
                <span>Your event idea</span>
                <input
                    type="text"
                    value={idea}
                    maxLength={80}
                    required
                    placeholder="e.g. A games afternoon with my friends"
                    onChange={(event) => setIdea(event.target.value)}
                />
            </label>

            <div className="proposal-row">
                <label className="proposal-field">
                    <span>Preferred date (optional)</span>
                    <input type="date" value={date} min={todayForInput()} onChange={(event) => setDate(event.target.value)}/>
                </label>
                <label className="proposal-field">
                    <span>About how many people?</span>
                    <input type="number" value={people} min={1} max={30} onChange={(event) => setPeople(event.target.value)}/>
                </label>
            </div>

            <label className="proposal-field">
                <span>A short message (optional)</span>
                <textarea
                    value={message}
                    rows={3}
                    maxLength={MESSAGE_LENGTH}
                    placeholder="Tell them what you'd like to do and why."
                    onChange={(event) => setMessage(event.target.value)}
                />
            </label>

            <div className="proposal-buttons">
                <button type="button" className="proposal-cancel" onClick={onCancel}>Cancel</button>
                <button type="submit" className="button-primary" disabled={idea.trim() === ""}>Send proposal</button>
            </div>
        </form>
    )
}

export default ProposalForm
