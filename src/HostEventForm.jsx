// HostEventForm.jsx is the form for adding an event. Students use it to propose an event
// (kept as "Pending (demo)" until the organisation approves it), and the Organisation
// view uses it to add events to its own cause. Nothing is really sent anywhere.
import { useState } from 'react'
import { causes } from './data/causes'
import { organisations } from './data/organisations'
import { readImageFile } from './imageFile'
import './HostEventForm.css'

const DESCRIPTION_LENGTH = 300

// The current date and time as "YYYY-MM-DDTHH:MM", the format datetime inputs use,
// so past times can't be picked.
function nowForInput() {
    const now = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
}

// { onSubmit } receives { title, causeId, startsAt, durationMinutes, place, description, photoUrl }.
// { fixedCauseId } hides the cause choice and uses that cause. { submitLabel } is the button text.
function HostEventForm({ onSubmit, fixedCauseId, submitLabel = "Send for approval" }) {
    const [title, setTitle] = useState("")
    const [orgId, setOrgId] = useState(organisations[0].id)
    const [chosenCauseId, setCauseId] = useState(organisations[0].causeIds[0])
    const programmes = organisations.find((org) => org.id === orgId).causeIds.map((id) => causes.find((c) => c.id === id))
    const causeId = fixedCauseId || chosenCauseId
    const [when, setWhen] = useState("")
    const [place, setPlace] = useState("")
    const [description, setDescription] = useState("")
    // The chosen picture, shrunk and stored as a data URL, or null.
    const [photoUrl, setPhotoUrl] = useState(null)

    async function handlePhoto(event) {
        const file = event.target.files[0]
        setPhotoUrl(file ? await readImageFile(file) : null)
    }

    const ready = title.trim() !== "" && when !== "" && place.trim() !== ""

    // A form's onSubmit runs on the button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        if (!ready) {
            return
        }
        onSubmit({
            title: title.trim(), causeId, startsAt: `${when}:00+08:00`, durationMinutes: 120,
            place: place.trim(), description: description.trim(), photoUrl,
        })
        setTitle("")
        setWhen("")
        setPlace("")
        setDescription("")
        setPhotoUrl(null)
    }

    return (
        <form className="card host-form" onSubmit={handleSubmit}>
            <p className="host-form-demo">Demo: nothing is really sent</p>

            <label className="host-field">
                <span>Event title</span>
                <input type="text" value={title} maxLength={60} required
                    placeholder="e.g. Board games afternoon"
                    onChange={(event) => setTitle(event.target.value)}/>
            </label>

            {!fixedCauseId && (
                <div className="host-row">
                    <label className="host-field">
                        <span>Which organisation?</span>
                        <select
                            value={orgId}
                            onChange={(event) => {
                                const next = organisations.find((org) => org.id === event.target.value)
                                setOrgId(next.id)
                                setCauseId(next.causeIds[0])
                            }}
                        >
                            {organisations.map((org) => <option key={org.id} value={org.id}>{org.emoji} {org.name}</option>)}
                        </select>
                    </label>
                    <label className="host-field">
                        <span>Which programme (cause)?</span>
                        <select value={causeId} onChange={(event) => setCauseId(event.target.value)}>
                            {programmes.map((cause) => <option key={cause.id} value={cause.id}>{cause.name}</option>)}
                        </select>
                    </label>
                </div>
            )}

            <div className="host-row">
                <label className="host-field">
                    <span>Date and time</span>
                    <input type="datetime-local" value={when} min={nowForInput()} required
                        onChange={(event) => setWhen(event.target.value)}/>
                </label>
                <label className="host-field">
                    <span>Place</span>
                    <input type="text" value={place} maxLength={60} required
                        placeholder="e.g. Clementi community centre"
                        onChange={(event) => setPlace(event.target.value)}/>
                </label>
            </div>

            <label className="host-field">
                <span>What will happen? (optional)</span>
                <textarea value={description} rows={3} maxLength={DESCRIPTION_LENGTH}
                    placeholder={fixedCauseId ? "Tell volunteers what will happen and what to bring." : "Tell the organisation what you'd like to do and why."}
                    onChange={(event) => setDescription(event.target.value)}/>
            </label>

            <label className="host-photo">
                <span aria-hidden="true">📷</span> {photoUrl ? "Choose a different picture" : "Add a picture (optional)"}
                <input type="file" accept="image/*" onChange={handlePhoto}/>
            </label>
            {photoUrl && <img className="host-preview" src={photoUrl} alt="Your chosen picture"/>}

            <button type="submit" className="button-primary host-submit" disabled={!ready}>{submitLabel}</button>
        </form>
    )
}

export default HostEventForm
