// DiaryBook.jsx shows the diary as a book: a cover, then one page per entry.
// Turning a page plays a page-flip animation, done with CSS only.
import { useState } from 'react'
import './DiaryBook.css'

// { name } is shown on the cover. { pages } is a list of rendered diary pages, oldest first.
function DiaryBook({ name, pages }) {
    // 0 is the cover; 1 is the first entry, and so on.
    const [index, setIndex] = useState(0)
    // Which way the last turn went, so the animation flips the right way.
    const [direction, setDirection] = useState("next")
    const last = pages.length

    function turn(step) {
        setDirection(step > 0 ? "next" : "prev")
        setIndex(Math.min(Math.max(index + step, 0), last))
    }

    return (
        <div className="diary-book">
            <div className="diary-book-stage">
                {/* key makes React draw a new page each time, which restarts the flip animation. */}
                <div key={index} className={`diary-book-page diary-book-flip-${direction}`}>
                    {index === 0 ? (
                        <div className="diary-book-cover">
                            <span aria-hidden="true">📔</span>
                            <p className="diary-book-cover-title">{name ? `${name}'s diary` : "My diary"}</p>
                            <p className="diary-book-cover-count">
                                {last} {last === 1 ? "page" : "pages"}
                            </p>
                        </div>
                    ) : pages[index - 1]}
                </div>
            </div>

            <div className="diary-book-controls">
                <button onClick={() => turn(-1)} disabled={index === 0} aria-label="Previous page">←</button>
                <span>{index === 0 ? "Cover" : `Page ${index} of ${last}`}</span>
                <button onClick={() => turn(1)} disabled={index === last} aria-label="Next page">→</button>
            </div>
        </div>
    )
}

export default DiaryBook
