import FollowButton from './FollowButton'
import './OrgTile.css'

function OrgTile({ org, following, onToggleFollow, onOpen, note }) {
    return (
        <article className="org-tile lift" style={{ '--org-color': org.color }}>
            <div className="org-tile-top">
                <span className="org-tile-mark" aria-hidden="true">{org.emoji}</span>
                <FollowButton following={following} onToggle={onToggleFollow} name={org.name} size="small"/>
            </div>
            <h4>
                <button className="org-tile-open" onClick={() => onOpen(org.id)}>{org.name}</button>
            </h4>
            <p className="org-tile-tagline">{org.tagline}</p>
            <p className="org-tile-meta">
                {org.causeIds.length} {org.causeIds.length === 1 ? "programme" : "programmes"} · {org.followers + (following ? 1 : 0)} followers
            </p>
            {note && <p className="org-tile-note">{note}</p>}
        </article>
    )
}

export default OrgTile
