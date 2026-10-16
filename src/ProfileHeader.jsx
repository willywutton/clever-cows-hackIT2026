// ProfileHeader.jsx shows the student's nickname, character and latest title.
import './ProfileHeader.css'

// { nickname } and { onNicknameChange } let the student set a nickname.
// { character } is their quiz result. { latestTitle } is a title from titles.js, or undefined.
function ProfileHeader({ nickname, onNicknameChange, character, latestTitle }) {
    return (
        <div className="profile-header card">
            <span className="profile-header-emoji" aria-hidden="true">🐮</span>
            <div className="profile-header-text">
                <label className="profile-header-nickname">
                    <span>Nickname</span>
                    <input
                        type="text"
                        value={nickname}
                        maxLength={20}
                        placeholder="First name and initial, e.g. Alex T."
                        onChange={(event) => onNicknameChange(event.target.value)}
                    />
                </label>
                <h2>{character.name}</h2>
                {latestTitle && (
                    <p className="profile-header-title">
                        <span aria-hidden="true">🏅</span> {latestTitle.name}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ProfileHeader
