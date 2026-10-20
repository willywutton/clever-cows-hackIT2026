import { TOPICS } from './causeRows'
import { useHorizontalScroll } from './useHorizontalScroll'
import './TopicBar.css'

function TopicBar({ topic, onChange, calendarConnected, onLockedCalendar }) {
    const { ref, edges, scrollBy } = useHorizontalScroll()

    return (
        <div className="topic-bar">
            <button className="topic-bar-arrow" aria-label="Scroll topics left" disabled={edges.start} onClick={() => scrollBy(-1)}>‹</button>
            <div
                ref={ref}
                className={`topic-bar-track drag-scroll${edges.start ? "" : " topic-bar-fade-start"}${edges.end ? "" : " topic-bar-fade-end"}`}
                role="group"
                aria-label="Browse causes"
            >
                <button aria-pressed={topic === "all"} onClick={() => onChange("all")}>
                    <span aria-hidden="true">✨</span> For you
                </button>
                <button
                    className={calendarConnected ? "topic-bar-calendar" : "topic-bar-calendar topic-bar-locked"}
                    aria-pressed={topic === "calendar"}
                    aria-label={calendarConnected ? "Fits my week" : "Fits my week (connect your calendar first)"}
                    onClick={() => (calendarConnected ? onChange("calendar") : onLockedCalendar())}
                >
                    <span aria-hidden="true">{calendarConnected ? "📅" : "🔒"}</span> Fits my week
                </button>
                <span className="topic-bar-divider" aria-hidden="true"/>
                {TOPICS.map((option) => (
                    <button key={option.id} aria-pressed={topic === option.id} onClick={() => onChange(option.id)}>
                        <span aria-hidden="true">{option.emoji}</span> {option.label}
                    </button>
                ))}
            </div>
            <button className="topic-bar-arrow" aria-label="Scroll topics right" disabled={edges.end} onClick={() => scrollBy(1)}>›</button>
        </div>
    )
}

export default TopicBar
