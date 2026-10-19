// ProfileHeader.jsx greets the student and shows their character and latest title,
// with a small form for changing their first name.
import { useState } from 'react'
import './ProfileHeader.css'

// A first name: letters, plus hyphens or apostrophes, with no spaces.
const FIRST_NAME = /^[A-Za-z][A-Za-z'-]*$/

// { name } and { onNameChange } let the student change their first name.
// { character } is their quiz result. { latestTitle } is a title from titles.js, or undefined.
function ProfileHeader({ name, onNameChange, character, latestTitle }) {
    // What is typed in the box, saved only when the student presses Enter or Save.
    const [draft, setDraft] = useState(name)
    const [saved, setSaved] = useState(false)

    // A form's onSubmit runs on the Save button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        if (!FIRST_NAME.test(draft.trim())) {
            return
        }
        onNameChange(draft.trim())
        setSaved(true)
    }

    function handleType(value) {
        setDraft(value)
        setSaved(false)
    }

    return (
        <div className="profile-header card">
            <span className="profile-header-avatar" aria-hidden="true">🐮</span>

            <div className="profile-header-text">
                <p className="profile-header-hello">Hi, {name.trim() || "there"}!</p>
                <h2>{character.name}</h2>
                {latestTitle && (
                    <p className="profile-header-title">
                        <span aria-hidden="true">🏅</span> {latestTitle.name}
                    </p>
                )}
            </div>

            <form className="profile-header-name" onSubmit={handleSubmit}>
                <label htmlFor="profile-name">Your first name</label>
                <div className="profile-header-name-row">
                    <input
                        id="profile-name"
                        type="text"
                        value={draft}
                        maxLength={20}
                        placeholder="e.g. Alex"
                        onChange={(event) => handleType(event.target.value)}
                    />
                    <button type="submit" disabled={draft.trim() === name.trim() || !FIRST_NAME.test(draft.trim())}>Save</button>
                </div>
                <p className="profile-header-name-note" role="status">
                    {saved
                        ? "✓ Saved"
                        : draft.trim() !== "" && !FIRST_NAME.test(draft.trim())
                            ? "Just your first name, please: letters only, no spaces."
                            : "First name only"}
                </p>
            </form>
        </div>
    )
}

export default ProfileHeader
