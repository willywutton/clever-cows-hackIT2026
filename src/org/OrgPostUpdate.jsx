// OrgPostUpdate.jsx lets the organisation post a short update. It appears on the
// cause page, and on the Home page of students who saved or signed up for the cause.
import { useState } from 'react'
import './OrgPostUpdate.css'

const UPDATE_LENGTH = 200

// { updates } are this cause's earlier posts. { onPost } receives the new text.
function OrgPostUpdate({ updates, onPost }) {
    const [text, setText] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        if (text.trim() !== "") {
            onPost(text.trim())
            setText("")
        }
    }

    return (
        <section className="card org-post">
            <h3>Post an update</h3>
            <form className="org-post-form" onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    rows={3}
                    maxLength={UPDATE_LENGTH}
                    aria-label="Update for volunteers"
                    placeholder="e.g. Thank you to everyone who came on Saturday! Next week we're baking."
                    onChange={(event) => setText(event.target.value)}
                />
                <button type="submit" disabled={text.trim() === ""}>Post update</button>
            </form>
            {[...updates].reverse().map((update) => (
                <p key={update.id} className="org-post-item">
                    <span>{new Date(update.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}</span>
                    {update.text}
                </p>
            ))}
        </section>
    )
}

export default OrgPostUpdate
