// PrivacySettings.jsx holds the student's sharing choices. All start off.
// In this demo the friends are sample people, so these choices change what the
// sample Social feed and leaderboard would show of the student.
import './PrivacySettings.css'

const OPTIONS = [
    { id: "showTitles", label: "Show my titles to friends" },
    { id: "publicDiary", label: "Make new diary entries public" },
    { id: "showOnLeaderboard", label: "Show me on my friends' leaderboard" },
]

// { settings } is { showTitles, publicDiary, showOnLeaderboard }. { onChange } receives the updated settings.
function PrivacySettings({ settings, onChange }) {
    return (
        <section className="card privacy">
            <h3>Privacy</h3>
            {OPTIONS.map((option) => (
                <label className="privacy-option" key={option.id}>
                    <span>{option.label}</span>
                    <input
                        type="checkbox"
                        role="switch"
                        checked={Boolean(settings[option.id])}
                        onChange={(event) => onChange({ ...settings, [option.id]: event.target.checked })}
                    />
                </label>
            ))}
            <p className="privacy-note">All are off unless you turn them on.</p>
        </section>
    )
}

export default PrivacySettings
