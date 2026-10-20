import CowAvatar from './CowAvatar'
import Sticker from './Sticker'
import './PostTile.css'

function PostTile({ entry, author, cause, onOpen }) {
    const date = new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })

    return (
        <article className={onOpen ? "post-tile lift" : "post-tile"}>
            <header className="post-tile-top">
                <CowAvatar accessories={author.accessories} face={author.face} size="small" label={`${author.name}'s cow`}/>
                <div>
                    <p className="post-tile-name">
                        {onOpen ? <button className="post-tile-open" onClick={onOpen}>{author.name}</button> : author.name}
                    </p>
                    <p className="post-tile-meta">{cause.name} · {date}</p>
                </div>
            </header>
            <p className="post-tile-text">{entry.message}</p>
            {entry.stickers && entry.stickers.length > 0 && (
                <p className="post-tile-stickers">
                    {entry.stickers.map((id) => <Sticker key={id} id={id}/>)}
                </p>
            )}
        </article>
    )
}

export default PostTile
