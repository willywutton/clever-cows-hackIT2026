import { nameOf } from './people'
import CowAvatar from './CowAvatar'
import './PersonChip.css'

// { id } is a person (YOU or a friend id). { face } is { face, accessories } for their avatar.
function PersonChip({ id, face = {} }) {
    return (
        <span className="person-chip">
            <CowAvatar face={face.face} accessories={face.accessories || []} size="tiny" label=""/>
            {nameOf(id)}
        </span>
    )
}

export default PersonChip
