// DiaryPage.jsx is the Diary tab: every diary entry as a book (with page flips)
// or as a plain list, and a button to write a new entry.
import { useState } from 'react'
import { causes } from './data/causes'
import PageTitle from './PageTitle'
import DiaryBook from './DiaryBook'
import DiaryEntryPage from './DiaryEntryPage'
import JournalPage from './JournalPage'
import './DiaryPage.css'

// { app } is everything from useCleverCows: the diary, sign-ups and the actions used here.
function DiaryPage({ app }) {
    const [view, setView] = useState("book")
    const [choosing, setChoosing] = useState(false)
    const signedUpCauses = app.signedUp.map((entry) => causes.find((c) => c.id === entry.causeId))

    function hoursAt(causeId) {
        return app.attendance.filter((visit) => visit.causeId === causeId).reduce((sum, visit) => sum + visit.hours, 0)
    }

    function handleWrite() {
        if (signedUpCauses.length === 1) {
            app.startReflection(signedUpCauses[0].id)
        }
        else {
            setChoosing(true)
        }
    }

    const pages = app.diary.map((entry, index) => (
        <DiaryEntryPage
            key={entry.id}
            entry={entry}
            cause={causes.find((c) => c.id === entry.causeId)}
            hoursAtCause={hoursAt(entry.causeId)}
            inPortfolio={app.portfolio.includes(entry.id)}
            onTogglePortfolio={() => app.togglePortfolio(entry.id)}
            onSetPublic={(isPublic) => app.setEntryPublic(entry.id, isPublic)}
            tilt={index % 2 === 0 ? "left" : "right"}
        />
    ))

    return (
        <div className="diary-tab">
            <PageTitle title="Diary" subtitle="Your sessions, in your own words.">
                <div className="diary-view-toggle" role="group" aria-label="Diary view">
                    <button aria-pressed={view === "book"} onClick={() => setView("book")}>📖 Book</button>
                    <button aria-pressed={view === "list"} onClick={() => setView("list")}>☰ List</button>
                </div>
                {signedUpCauses.length > 0 && (
                    <button className="diary-write" onClick={handleWrite}>✏️ Write a diary entry</button>
                )}
            </PageTitle>

            {choosing && (
                <div className="card diary-choose">
                    <p>Which session is it about?</p>
                    {signedUpCauses.map((cause) => (
                        <button key={cause.id} onClick={() => app.startReflection(cause.id)}>{cause.name}</button>
                    ))}
                    <button className="diary-choose-cancel" onClick={() => setChoosing(false)}>Cancel</button>
                </div>
            )}

            {pages.length === 0 && (
                <JournalPage className="diary-sample">
                    <p className="diary-sample-tag">Sample page</p>
                    <h4>What a diary page looks like</h4>
                    <p>
                        After a session, press "I went to this session" under Next up on your Profile.
                        You can add a photo, a few words and some stickers, and choose who sees it.
                    </p>
                </JournalPage>
            )}

            {pages.length > 0 && view === "book" && <DiaryBook name={app.profile.name} pages={pages}/>}
            {pages.length > 0 && view === "list" && <div className="diary-list">{[...pages].reverse()}</div>}
        </div>
    )
}

export default DiaryPage
