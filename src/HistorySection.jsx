// HistorySection.jsx shows plain counts of what the student has done,
// and the titles they have earned. Nothing is compared with anyone else.
import './HistorySection.css'

const COUNTS = [
    { type: "share", one: "time shared", many: "times shared" },
    { type: "signup", one: "sign-up", many: "sign-ups" },
    { type: "reflection", one: "reflection", many: "reflections" },
    { type: "donate", one: "pledge", many: "pledges" },
]

// { history } is App's list of actions. { titles } is the list from earnedTitles().
// { titlesVisible } is true when the student shows their titles to friends.
function HistorySection({ history, titles, titlesVisible }) {
    return (
        <section className="card history">
            <h3>History</h3>
            <ul className="history-counts">
                {COUNTS.map((count) => {
                    const total = history.filter((item) => item.type === count.type).length
                    return (
                        <li key={count.type}>
                            <strong>{total}</strong> {total === 1 ? count.one : count.many}
                        </li>
                    )
                })}
            </ul>

            {titles.length > 0 && (
                <>
                    <ul className="history-titles" aria-label="Titles earned">
                        {titles.map((title) => (
                            <li key={title.id} title={title.description}>
                                <span aria-hidden="true">🏅</span> {title.name}
                            </li>
                        ))}
                    </ul>
                    <p className="history-visibility">
                        {titlesVisible ? "Friends can see your titles." : "Only you can see your titles."}
                    </p>
                </>
            )}
        </section>
    )
}

export default HistorySection
