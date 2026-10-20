// HostEventForm.jsx is the form for adding an event. Students use it to propose an event
// (kept as "Pending (demo)" until the organisation approves it), and the Organisation
// view uses it to add events to its own cause. Nothing is really sent anywhere.
import Graphic from './Graphic'
import { useState } from 'react'
import { causes } from './data/causes'
import { organisations } from './data/organisations'
import { sampleStudentById } from './data/friends'
import CowAvatar from './CowAvatar'
import { readImageFile } from './imageFile'
import './HostEventForm.css'

const DESCRIPTION_LENGTH = 300
const MIN_SPOTS = 2
const MAX_SPOTS = 30

// The current date and time as "YYYY-MM-DDTHH:MM", the format datetime inputs use,
// so past times can't be picked.
function nowForInput() {
    const now = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
}

// { onSubmit } receives { title, causeId, startsAt, durationMinutes, place, description, photoUrl }.
// { fixedCauseId } hides the cause choice and uses that cause. { submitLabel } is the button text.
// { friendIds } lets a student pick friends to co-host; students also say how many people they need.
function HostEventForm({ onSubmit, fixedCauseId, friendIds = [], submitLabel = "Send for approval" }) {
    const [title, setTitle] = useState("")
    const [orgId, setOrgId] = useState(organisations[0].id)
    const [chosenCauseId, setCauseId] = useState(organisations[0].causeIds[0])
    const programmes = organisations.find((org) => org.id === orgId).causeIds.map((id) => causes.find((c) => c.id === id))
    const causeId = fixedCauseId || chosenCauseId
    const [when, setWhen] = useState("")
    const [place, setPlace] = useState("")
    const [description, setDescription] = useState("")
    const [spots, setSpots] = useState(6)
    const [cohostIds, setCohostIds] = useState([])
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
            ...(fixedCauseId ? {} : { spots, cohostIds }),
        })
        setCohostIds([])
        setSpots(6)
        setTitle("")
        setWhen("")
        setPlace("")
        setDescription("")
        setPhotoUrl(null)
    }

    return (
        <form className="card host-form" onSubmit={handleSubmit}>
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
                            {organisations.map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}
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

            {!fixedCauseId && (
                <div className="host-row">
                    <div className="host-field">
                        <span id="host-spots-label">How many people do you need?</span>
                        <div className="host-stepper" role="group" aria-labelledby="host-spots-label">
                            <button type="button" onClick={() => setSpots(Math.max(MIN_SPOTS, spots - 1))} disabled={spots <= MIN_SPOTS} aria-label="Fewer people">−</button>
                            <input type="number" value={spots} min={MIN_SPOTS} max={MAX_SPOTS} aria-labelledby="host-spots-label"
                                onChange={(event) => setSpots(Math.min(MAX_SPOTS, Math.max(MIN_SPOTS, Number(event.target.value) || MIN_SPOTS)))}/>
                            <button type="button" onClick={() => setSpots(Math.min(MAX_SPOTS, spots + 1))} disabled={spots >= MAX_SPOTS} aria-label="More people">+</button>
                        </div>
                        <small>Including you and your co-hosts.</small>
                    </div>
                    <fieldset className="host-field host-cohosts">
                        <legend>Invite friends to co-host</legend>
                        {friendIds.length === 0 && <small>Add friends in Social to host together.</small>}
                        <div className="host-cohost-list">
                            {friendIds.map((id) => {
                                const friend = sampleStudentById(id)
                                const picked = cohostIds.includes(id)
                                return (
                                    <label key={id} className="host-cohost">
                                        <input
                                            type="checkbox"
                                            checked={picked}
                                            disabled={!picked && cohostIds.length + 1 >= spots}
                                            onChange={() => setCohostIds(picked ? cohostIds.filter((c) => c !== id) : [...cohostIds, id])}
                                        />
                                        <CowAvatar accessories={friend.accessories} size="tiny" label=""/>
                                        {friend.name}
                                    </label>
                                )
                            })}
                        </div>
                    </fieldset>
                </div>
            )}

            <label className="host-field">
                <span>What will happen? (optional)</span>
                <textarea value={description} rows={3} maxLength={DESCRIPTION_LENGTH}
                    placeholder={fixedCauseId ? "Tell volunteers what will happen and what to bring." : "Tell the organisation what you'd like to do and why."}
                    onChange={(event) => setDescription(event.target.value)}/>
            </label>

            <label className="host-photo">
                <span aria-hidden="true"><Graphic symbol="camera"/></span> {photoUrl ? "Choose a different picture" : "Add a picture (optional)"}
                <input type="file" accept="image/*" onChange={handlePhoto}/>
            </label>
            {photoUrl && <img className="host-preview" src={photoUrl} alt="Your chosen picture"/>}

            <button type="submit" className="button-primary host-submit" disabled={!ready}>{submitLabel}</button>
        </form>
    )
}

export default HostEventForm
