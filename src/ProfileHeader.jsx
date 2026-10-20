// ProfileHeader.jsx is the banner at the top of Profile: Clover Cowdini's picture,
// the student's name, character and titles, their hours and Moolah, and an editable
// "About me" line. The name can be changed too (first name only).
import Graphic from './Graphic'
import { useState } from 'react'
import CowFigure from './CowFigure'
import './ProfileHeader.css'

// A first name: letters, plus hyphens or apostrophes, with no spaces.
const FIRST_NAME = /^[A-Za-z][A-Za-z'-]*$/
const ABOUT_LENGTH = 140

// { name }, { about } and their handlers let the student edit their name and About me.
// { character } is their quiz result. { titles } are every title earned, latest last.
// { art } is the helper-type cow (see characters.js). { hours } and { moolah } are shown in the banner.
function ProfileHeader({ name, onNameChange, about, onAboutChange, character, art, titles, hours, moolah }) {
    const [editing, setEditing] = useState(false)
    const [draftName, setDraftName] = useState(name)
    const [draftAbout, setDraftAbout] = useState(about)
    const nameValid = FIRST_NAME.test(draftName.trim())

    // A form's onSubmit runs on the Save button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        if (!nameValid) {
            return
        }
        onNameChange(draftName.trim())
        onAboutChange(draftAbout.trim())
        setEditing(false)
    }

    return (
        <div className="profile-header card">
            <span className="profile-header-figure">
                <CowFigure art={art} label={`${character.name} cow`}/>
            </span>

            <div className="profile-header-text">
                <p className="profile-header-hello">Hi, {name || "there"}!</p>
                <h2>{character.name}</h2>
                {!editing && (
                    <p className="profile-header-about">{about || "Add a line about yourself, like what you enjoy helping with."}</p>
                )}
                {titles.length > 0 && (
                    <ul className="profile-header-titles" aria-label="Titles earned">
                        {titles.map((title) => <li key={title.id} title={title.description}><Graphic symbol="medal"/> {title.name}</li>)}
                    </ul>
                )}
            </div>

            <div className="profile-header-side">
                <div className="profile-header-stats">
                    <p><strong>{hours}</strong> {hours === 1 ? "hour" : "hours"} worked</p>
                    <p><strong>{moolah}</strong> Moolah</p>
                </div>
                {!editing && (
                    <button className="profile-header-edit" onClick={() => setEditing(true)}><Graphic symbol="pencil"/> Edit profile</button>
                )}
            </div>

            {editing && (
                <form className="profile-header-form" onSubmit={handleSubmit}>
                    <label>
                        <span>First name</span>
                        <input type="text" value={draftName} maxLength={20} onChange={(event) => setDraftName(event.target.value)}/>
                    </label>
                    {!nameValid && <p className="profile-header-hint">Just your first name, please: letters only, no spaces.</p>}
                    <label>
                        <span>About me</span>
                        <textarea
                            value={draftAbout}
                            rows={2}
                            maxLength={ABOUT_LENGTH}
                            placeholder="e.g. Happiest outdoors, and I love animals."
                            onChange={(event) => setDraftAbout(event.target.value)}
                        />
                    </label>
                    <div className="profile-header-form-buttons">
                        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                        <button type="submit" className="button-primary" disabled={!nameValid}>Save</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ProfileHeader
