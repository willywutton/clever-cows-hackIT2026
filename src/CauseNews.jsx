// CauseNews.jsx shows the latest updates posted by organisations the student
// has signed up for or saved. It shows nothing until there's news.
import { causes } from './data/causes'
import './CauseNews.css'

// { updates } are every organisation post. { causeIds } are the causes the student follows.
function CauseNews({ updates, causeIds }) {
    const mine = updates.filter((update) => causeIds.includes(update.causeId)).slice(-3).reverse()
    if (mine.length === 0) {
        return null
    }

    return (
        <section className="card cause-news">
            <h3><span aria-hidden="true">📣</span> News from your causes</h3>
            {mine.map((update) => (
                <p key={update.id} className="cause-news-item">
                    <strong>{causes.find((c) => c.id === update.causeId).name}</strong>
                    {update.text}
                </p>
            ))}
        </section>
    )
}

export default CauseNews
