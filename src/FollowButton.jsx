import './FollowButton.css'

function FollowButton({ following, onToggle, name, size = "normal" }) {
    return (
        <button
            className={`follow-button follow-button-${size}`}
            aria-pressed={following}
            aria-label={following ? `Unfollow ${name}` : `Follow ${name}`}
            onClick={(event) => {
                event.stopPropagation()
                onToggle()
            }}
        >
            {following ? "Following ✓" : "+ Follow"}
        </button>
    )
}

export default FollowButton
