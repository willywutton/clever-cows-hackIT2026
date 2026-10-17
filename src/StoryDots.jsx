// StoryDots.jsx shows one dot per story scene, with the current scene's dot greyed,
// so the player can see how far through the story they are.
import './StoryDots.css'

// { total } is the number of scenes. { current } is the scene showing now, counting from 0.
function StoryDots({ total, current }) {
    return (
        <ol className="story-dots" aria-label={`Scene ${current + 1} of ${total}`}>
            {Array.from({ length: total }, (_, index) => (
                <li
                    key={index}
                    className={index === current ? "story-dot story-dot-current" : "story-dot"}
                    aria-current={index === current ? "step" : undefined}
                />
            ))}
        </ol>
    )
}

export default StoryDots
