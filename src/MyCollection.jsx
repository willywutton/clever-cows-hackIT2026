// MyCollection.jsx shows the student's diary entries, newest first.
import { causes } from './data/causes'
import './MyCollection.css'

// { diary } is App's list of entries: { id, causeId, message, photoUrl, at }.
// { shared } is true when the student has chosen to share their diary with friends.
function MyCollection({ diary, shared }) {
    const entries = [...diary].reverse()

    return (
        <section className="card collection">
            <h3>My collection</h3>

            {entries.length === 0 && (
                <p className="collection-empty">
                    After a session, tap "I went to this session" to add a photo or a few words here.
                </p>
            )}

            {entries.map((entry) => {
                const cause = causes.find((c) => c.id === entry.causeId)
                const date = new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'long' })
                return (
                    <article className="collection-entry" key={entry.id}>
                        {entry.photoUrl && (
                            <img className="collection-photo" src={entry.photoUrl} alt={`Photo from ${cause.name}`}/>
                        )}
                        <div className="collection-text">
                            <strong>{cause.name}</strong>
                            <span className="collection-meta">
                                {date} · {shared ? "Shared with friends" : "Private"}
                            </span>
                            {entry.message && <p>{entry.message}</p>}
                        </div>
                    </article>
                )
            })}
        </section>
    )
}

export default MyCollection
