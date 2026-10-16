// PrivacySettings.jsx holds the student's two sharing choices. Both start off.
// In this demo there are no real friends' accounts, so the choices only change
// the labels shown on the Profile.
import './PrivacySettings.css'

const OPTIONS = [
    { id: "showTitles", label: "Show my titles to friends" },
    { id: "shareDiary", label: "Share my diary with friends" },
]

// { settings } is { showTitles, shareDiary }. { onChange } receives the updated settings.
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
                        checked={settings[option.id]}
                        onChange={(event) => onChange({ ...settings, [option.id]: event.target.checked })}
                    />
                </label>
            ))}
            <p className="privacy-note">Both are off unless you turn them on.</p>
        </section>
    )
}

export default PrivacySettings
