// DiaryEntryPage.jsx draws one diary entry as a journal page, with buttons to change
// who can see it, save it to the portfolio, or copy it as a LinkedIn post.
import Graphic from './Graphic'
import { useState } from 'react'
import { linkedinText } from './linkedinText'
import JournalPage from './JournalPage'
import InstantPhoto from './InstantPhoto'
import Sticker from './Sticker'
import './DiaryEntryPage.css'

// { entry } is the diary entry and { cause } its cause. { hoursAtCause } is for the LinkedIn text.
// { inPortfolio }, { onTogglePortfolio } and { onSetPublic } change the entry.
// { tilt } is "left" or "right" for the photo, so pages don't all look the same.
function DiaryEntryPage({ entry, cause, hoursAtCause, inPortfolio, onTogglePortfolio, onSetPublic, tilt = "left" }) {
    // The copy result: "copied", "failed" (shows the text to copy by hand) or null.
    const [copyState, setCopyState] = useState(null)
    const text = linkedinText(entry, cause.name, hoursAtCause)
    const date = new Date(entry.at).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })

    // Copies the post text, then opens LinkedIn in a new tab for the student to paste it.
    async function handleLinkedIn() {
        try {
            await navigator.clipboard.writeText(text)
            setCopyState("copied")
        } catch {
            setCopyState("failed")
        }
        window.open('https://www.linkedin.com/', '_blank', 'noopener,noreferrer')
    }

    return (
        <JournalPage className="diary-entry-page">
            <p className="diary-entry-date">{date}</p>
            <h4 className="diary-entry-cause">{cause.name}</h4>

            {entry.photoUrl && (
                <InstantPhoto src={entry.photoUrl} alt={`Photo from ${cause.name}`} caption={cause.name} tilt={tilt}/>
            )}
            {entry.message && <p className="diary-entry-text">{entry.message}</p>}

            {entry.stickers && entry.stickers.length > 0 && (
                <p className="diary-entry-stickers">
                    {entry.stickers.map((id) => <Sticker key={id} id={id} size="large"/>)}
                </p>
            )}

            <div className="diary-entry-actions">
                <button onClick={() => onSetPublic(!entry.isPublic)} title="Change who can see this page">
                    <Graphic symbol={entry.isPublic ? "flower" : "lock"}/> {entry.isPublic ? "Public" : "Private"}
                </button>
                <button aria-pressed={inPortfolio} onClick={onTogglePortfolio}>
                    {inPortfolio ? "✓ In portfolio" : "Save to portfolio"}
                </button>
                <button onClick={handleLinkedIn}>Copy for LinkedIn</button>
            </div>

            {copyState === "copied" && (
                <p className="diary-entry-copied" role="status">Copied! Paste it into a new LinkedIn post.</p>
            )}
            {copyState === "failed" && (
                <label className="diary-entry-copytext">
                    <span>Copy this text, then paste it into LinkedIn:</span>
                    <textarea readOnly value={text} rows={6} onFocus={(event) => event.target.select()}/>
                </label>
            )}
        </JournalPage>
    )
}

export default DiaryEntryPage
