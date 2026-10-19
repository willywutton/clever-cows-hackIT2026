// Reflection.jsx lets the student write a diary entry after a session: an optional photo,
// a short message, a few stickers, and whether the entry is public or private.
// It looks like a journal page, and the photo shows as an instant-camera print.
// The photo stays on this device; it is never uploaded.
import { useState } from 'react'
import { stickers } from './assets/stickers'
import { readImageFile } from './imageFile'
import { REFLECTION_MOOLAH } from './data/economy'
import JournalPage from './JournalPage'
import InstantPhoto from './InstantPhoto'
import Sticker from './Sticker'
import './Reflection.css'

const MAX_LENGTH = 280
const MAX_STICKERS = 3

// { cause } is the cause the session was for. { publicByDefault } comes from Privacy settings.
// { visit } is the session just recorded ({ hours, moolah }), or null.
// { onSave } receives { message, photoUrl, stickers, isPublic }. { onCancel } skips writing.
function Reflection({ cause, publicByDefault, visit, onSave, onCancel }) {
    const [message, setMessage] = useState("")
    const [photoUrl, setPhotoUrl] = useState(null)
    const [chosen, setChosen] = useState([])
    const [isPublic, setIsPublic] = useState(Boolean(publicByDefault))

    async function handlePhotoChange(event) {
        const file = event.target.files[0]
        setPhotoUrl(file ? await readImageFile(file) : null)
    }

    function toggleSticker(id) {
        if (chosen.includes(id)) {
            setChosen(chosen.filter((s) => s !== id))
        }
        else if (chosen.length < MAX_STICKERS) {
            setChosen([...chosen, id])
        }
    }

    const canSave = message.trim() !== "" || photoUrl !== null

    return (
        <JournalPage className="reflection">
            {visit && (
                <p className="reflection-visit">
                    <span aria-hidden="true">✓</span> Session recorded: +{visit.hours} {visit.hours === 1 ? "hour" : "hours"}, +{visit.moolah} Moolah
                </p>
            )}
            <h2>How did it go at {cause.name}?</h2>

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

            <fieldset className="reflection-stickers">
                <legend>Add up to {MAX_STICKERS} stickers</legend>
                {stickers.map((sticker) => (
                    <button
                        key={sticker.id}
                        type="button"
                        aria-pressed={chosen.includes(sticker.id)}
                        onClick={() => toggleSticker(sticker.id)}
                    >
                        <Sticker id={sticker.id}/>
                    </button>
                ))}
            </fieldset>

            <fieldset className="reflection-visibility">
                <legend>Who can see this page?</legend>
                <label>
                    <input type="radio" name="visibility" checked={!isPublic} onChange={() => setIsPublic(false)}/>
                    <span><span aria-hidden="true">🔒</span> Private: only you</span>
                </label>
                <label>
                    <input type="radio" name="visibility" checked={isPublic} onChange={() => setIsPublic(true)}/>
                    <span><span aria-hidden="true">🌻</span> Public: friends can see it on Social</span>
                </label>
            </fieldset>

            <div className="reflection-buttons">
                <button className="reflection-cancel" onClick={onCancel}>Not now</button>
                <button
                    className="button-primary"
                    disabled={!canSave}
                    onClick={() => onSave({ message: message.trim(), photoUrl, stickers: chosen, isPublic })}
                >
                    Save to my diary (+{REFLECTION_MOOLAH} Moolah)
                </button>
            </div>
        </JournalPage>
    )
}

export default Reflection
