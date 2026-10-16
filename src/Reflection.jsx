// Reflection.jsx lets the student add a photo and a few words after a session.
// It looks like a journal page, and the chosen photo shows as an instant-camera print.
// The photo stays on this device in the browser's memory; it is never uploaded.
import { useState } from 'react'
import JournalPage from './JournalPage'
import InstantPhoto from './InstantPhoto'
import './Reflection.css'

const MAX_LENGTH = 280

// { cause } is the cause the session was for.
// { shared } is true when the student shares their diary with friends.
// { onSave } receives { message, photoUrl }. { onCancel } goes back without saving.
function Reflection({ cause, shared, onSave, onCancel }) {
    const [message, setMessage] = useState("")
    // A temporary browser link to the chosen photo, used for the preview, or null.
    const [photoUrl, setPhotoUrl] = useState(null)

    function handlePhotoChange(event) {
        const file = event.target.files[0]
        if (photoUrl) {
            URL.revokeObjectURL(photoUrl)
        }
        setPhotoUrl(file ? URL.createObjectURL(file) : null)
    }

    function handleCancel() {
        if (photoUrl) {
            URL.revokeObjectURL(photoUrl)
        }
        onCancel()
    }

    const canSave = message.trim() !== "" || photoUrl !== null

    return (
        <JournalPage className="reflection">
            <p className="reflection-demo">Demo</p>
            <h2>How did it go at {cause.name}?</h2>
            <p className="reflection-private">
                {shared
                    ? "Shared with friends. You can change this in Profile, under Privacy."
                    : <><span aria-hidden="true">🔒</span> Private: only you can see this.</>}
            </p>

            {photoUrl && (
                <InstantPhoto src={photoUrl} alt="Your chosen photo" caption={cause.name}/>
            )}

            {/* The real file input sits inside the label, so the styled label works as the button. */}
            <label className="reflection-photo-button">
                <span aria-hidden="true">📷</span> {photoUrl ? "Choose a different photo" : "Add a photo (optional)"}
                <input type="file" accept="image/*" onChange={handlePhotoChange}/>
            </label>
            <p className="reflection-note">Please don't include other people's faces.</p>

            <label className="reflection-field">
                <span>A few words</span>
                <textarea
                    value={message}
                    maxLength={MAX_LENGTH}
                    rows={4}
                    placeholder="What did you do? What will you remember?"
                    onChange={(event) => setMessage(event.target.value)}
                />
            </label>
            <p className="reflection-count">{message.length} / {MAX_LENGTH}</p>

            <div className="reflection-buttons">
                <button className="reflection-cancel" onClick={handleCancel}>Cancel</button>
                <button
                    className="button-primary"
                    disabled={!canSave}
                    onClick={() => onSave({ message: message.trim(), photoUrl })}
                >
                    Save to my diary
                </button>
            </div>
        </JournalPage>
    )
}

export default Reflection
