// StoryDots.jsx shows one dot per step (story scenes, or About you questions),
// with the current step's dot greyed, so the player can see how far through they are.
import './StoryDots.css'

// { total } is the number of steps. { current } is the step showing now, counting from 0.
// { label } names a step for screen readers, e.g. "Scene 2 of 8".
function StoryDots({ total, current, label = "Scene" }) {
    return (
        <ol className="story-dots" aria-label={`${label} ${current + 1} of ${total}`}>
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
