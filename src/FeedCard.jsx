// FeedCard.jsx is one public diary page in the Social feed, with a Like button and
// a sticker picker for reacting. Sample entries and their like counts are labelled.
import { useState } from 'react'
import { causes } from './data/causes'
import { stickers } from './assets/stickers'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import Sticker from './Sticker'
import './FeedCard.css'

// { entry } is the diary entry. { author } is { name, accessories, sample }.
// { baseLikes } is the sample like count (0 for the student's own entries).
// { liked }, { reacted } and the two handlers record the student's own like and stickers.
function FeedCard({ entry, author, baseLikes, liked, reacted, onToggleLike, onToggleReaction }) {
    const [picking, setPicking] = useState(false)
    const cause = causes.find((c) => c.id === entry.causeId)
    const likeCount = baseLikes + (liked ? 1 : 0)

    return (
        <article className="card feed-card">
            <header className="feed-card-top">
                <CowAvatar accessories={author.accessories} size="small" label={`${author.name}'s cow`}/>
                <div>
                    <strong>{author.name}</strong> {author.sample && <SampleTag/>}
                    <p className="feed-card-meta">
                        {cause.name} · {new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}
                    </p>
                </div>
            </header>

            {entry.photoUrl && <img className="feed-card-photo" src={entry.photoUrl} alt={`Photo from ${cause.name}`}/>}
            <p className="feed-card-text">{entry.message}</p>
            {entry.stickers && entry.stickers.length > 0 && (
                <p className="feed-card-stickers">{entry.stickers.map((id) => <Sticker key={id} id={id} size="large"/>)}</p>
            )}

            <div className="feed-card-actions">
                <button className="feed-card-like" aria-pressed={liked} onClick={onToggleLike}>
                    {liked ? "💛 Liked" : "🤍 Like"}
                </button>
                <span className="feed-card-count">
                    {likeCount} {likeCount === 1 ? "like" : "likes"} {author.sample && <SampleTag text="Sample count"/>}
                </span>
                <button className="feed-card-react" aria-expanded={picking} onClick={() => setPicking(!picking)}>
                    + Sticker
                </button>
                {reacted.length > 0 && (
                    <span className="feed-card-reactions" aria-label="Your sticker reactions">
                        {reacted.map((id) => <Sticker key={id} id={id}/>)}
                    </span>
                )}
            </div>

            {picking && (
                <div className="feed-card-picker" role="group" aria-label="React with a sticker">
                    {stickers.map((sticker) => (
                        <button
                            key={sticker.id}
                            aria-pressed={reacted.includes(sticker.id)}
                            onClick={() => onToggleReaction(sticker.id)}
                        >
                            <Sticker id={sticker.id}/>
                        </button>
                    ))}
                </div>
            )}
        </article>
    )
}

export default FeedCard
