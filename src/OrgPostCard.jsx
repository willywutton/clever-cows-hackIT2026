import Graphic from './Graphic'
import { causes } from './data/causes'
import FollowButton from './FollowButton'
import './OrgPostCard.css'

function OrgPostCard({ post, following, onToggleFollow, onOpenOrg, liked, onToggleLike }) {
    const programme = post.causeId ? causes.find((c) => c.id === post.causeId) : null
    const date = new Date(post.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
    const likeCount = post.likes + (liked ? 1 : 0)

    return (
        <article className="card org-post-card" style={{ '--org-color': post.org.color }}>
            <header className="org-post-card-top">
                <span className="org-post-card-mark" aria-hidden="true"><Graphic symbol={post.org.emoji}/></span>
                <div>
                    <p className="org-post-card-name">
                        {onOpenOrg ? <button onClick={() => onOpenOrg(post.org.id)}>{post.org.name}</button> : <strong>{post.org.name}</strong>}
                        <span className="org-post-card-badge">Organisation</span>
                    </p>
                    <p className="org-post-card-meta">{programme ? `${programme.name} · ` : ""}{date}</p>
                </div>
                {onToggleFollow && <FollowButton following={following} onToggle={onToggleFollow} name={post.org.name} size="small"/>}
            </header>
            <p className="org-post-card-text">{post.text}</p>
            {onToggleLike && (
                <div className="org-post-card-actions">
                    <button className="org-post-card-like" aria-pressed={liked} onClick={onToggleLike}>
                        <Graphic symbol={liked ? "heart" : "heart-outline"}/> {liked ? "Liked" : "Like"}
                    </button>
                    <span>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
                </div>
            )}
        </article>
    )
}

export default OrgPostCard
