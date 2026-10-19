// ProfileHeader.jsx greets the student and shows their character and latest title,
// with a small form for setting their nickname.
import { useState } from 'react'
import './ProfileHeader.css'

// True if the name looks like it has a full surname (e.g. "Willy Wutton"),
// rather than a first name and initial (e.g. "Willy W.").
function hasFullSurname(name) {
    const parts = name.trim().split(/\s+/)
    return parts.length > 1 && parts[parts.length - 1].replace('.', '').length > 1
}

// { nickname } and { onNicknameChange } let the student set a nickname.
// { character } is their quiz result. { latestTitle } is a title from titles.js, or undefined.
function ProfileHeader({ nickname, onNicknameChange, character, latestTitle }) {
    // What is typed in the box, saved only when the student presses Enter or Save.
    const [draft, setDraft] = useState(nickname)
    const [saved, setSaved] = useState(false)

    // A form's onSubmit runs on the Save button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        onNicknameChange(draft.trim())
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
                <p className="profile-header-hello">Hi, {nickname.trim() || "there"}!</p>
                <h2>{character.name}</h2>
                {latestTitle && (
                    <p className="profile-header-title">
                        <span aria-hidden="true">🏅</span> {latestTitle.name}
                    </p>
                )}
            </div>

            <form className="profile-header-nickname" onSubmit={handleSubmit}>
                <label htmlFor="nickname">Your nickname</label>
                <div className="profile-header-nickname-row">
                    <input
                        id="nickname"
                        type="text"
                        value={draft}
                        maxLength={20}
                        placeholder="e.g. Alex T."
                        onChange={(event) => handleType(event.target.value)}
                    />
                    <button type="submit" disabled={draft.trim() === nickname.trim()}>Save</button>
                </div>
                <p className="profile-header-nickname-note" role="status">
                    {saved
                        ? "✓ Saved"
                        : hasFullSurname(draft)
                            ? "Tip: first name and initial is enough, e.g. Alex T."
                            : "First name and initial only"}
                </p>
            </form>
        </div>
    )
}

export default ProfileHeader
