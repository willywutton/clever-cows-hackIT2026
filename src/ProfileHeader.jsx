// ProfileHeader.jsx greets the student and shows their character and latest title,
// with a small field for their nickname.
import './ProfileHeader.css'

// { nickname } and { onNicknameChange } let the student set a nickname.
// { character } is their quiz result. { latestTitle } is a title from titles.js, or undefined.
function ProfileHeader({ nickname, onNicknameChange, character, latestTitle }) {
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

            <label className="profile-header-nickname">
                <span>Your nickname</span>
                <input
                    type="text"
                    value={nickname}
                    maxLength={20}
                    placeholder="e.g. Alex T."
                    onChange={(event) => onNicknameChange(event.target.value)}
                />
                <small>First name and initial only</small>
            </label>
        </div>
    )
}

export default ProfileHeader
