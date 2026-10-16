// JournalPage.jsx is a notebook page with a spiral binding, ruled lines and a margin,
// used for the diary and the reflection page.
import './JournalPage.css'

// { as } is the HTML element to use (e.g. "section"), { className } adds extra classes.
function JournalPage({ as: Tag = "div", className = "", children }) {
    return (
        <Tag className={`journal ${className}`}>
            <span className="journal-spiral" aria-hidden="true"/>
            {children}
        </Tag>
    )
}

export default JournalPage
