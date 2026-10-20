// OrgPostUpdate.jsx lets the organisation post a short update. Students who signed up
// or saved the cause hear it from Clover on their Home page, and it shows on the cause page.
// A live preview shows the organisation exactly how students will see it.
import { useState } from 'react'
import CowAvatar from '../CowAvatar'
import './OrgPostUpdate.css'

const UPDATE_LENGTH = 200

// { cause } is the cause posting. { audience } is how many volunteers will see it.
// { updates } are this cause's earlier posts. { onPost } receives the new text.
function OrgPostUpdate({ cause, audience, updates, onPost }) {
    const [text, setText] = useState("")
    const [sent, setSent] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        if (text.trim() !== "") {
            onPost(text.trim())
            setText("")
            setSent(true)
        }
    }

    return (
        <section className="card org-post">
            <h3>Post an update</h3>
            <div className="org-post-columns">
                <form className="org-post-form" onSubmit={handleSubmit}>
                    <textarea
                        value={text}
                        rows={4}
                        maxLength={UPDATE_LENGTH}
                        aria-label="Update for volunteers"
                        placeholder="e.g. Thank you to everyone who came on Saturday! Biscuit found a home this week."
                        onChange={(event) => {
                            setText(event.target.value)
                            setSent(false)
                        }}
                    />
                    <div className="org-post-actions">
                        <span>{text.length}/{UPDATE_LENGTH} · reaches {audience} {audience === 1 ? "volunteer" : "volunteers"}</span>
                        <button type="submit" disabled={text.trim() === ""}>Post update</button>
                    </div>
                    {sent && <p className="org-post-sent" role="status">Posted. Students will hear it from Clover next time they open Home.</p>}
                </form>

                <div className="org-post-preview" aria-label="Preview of how students see it">
                    <p className="eyebrow">How students see it</p>
                    <div className="org-post-preview-row">
                        <CowAvatar size="small" label="Clover Cowdini"/>
                        <p className="org-post-bubble">
                            Moo! News from {cause.name}: "{text.trim() || "your update will appear here"}"
                        </p>
                    </div>
                </div>
            </div>

            {updates.length > 0 && (
                <div className="org-post-history">
                    <p className="eyebrow">Posted</p>
                    {[...updates].reverse().map((update) => (
                        <p key={update.id} className="org-post-item">
                            <span>{new Date(update.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}</span>
                            {update.text}
                        </p>
                    ))}
                </div>
            )}
        </section>
    )
}

export default OrgPostUpdate
