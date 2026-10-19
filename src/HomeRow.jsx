import { useEffect, useRef, useState } from 'react'
import './HomeRow.css'

function HomeRow({ eyebrow, title, actionLabel, onAction, children }) {
    const track = useRef(null)
    const [edges, setEdges] = useState({ start: true, end: true })

    function measure() {
        const el = track.current
        if (!el) {
            return
        }
        setEdges({
            start: el.scrollLeft <= 4,
            end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
        })
    }

    useEffect(() => {
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(track.current)
        return () => observer.disconnect()
    }, [])

    function scroll(direction) {
        track.current.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: 'smooth' })
    }

    const scrollable = !(edges.start && edges.end)

    return (
        <section className="home-row">
            <header className="home-row-head">
                <div>
                    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                    <h3>{title}</h3>
                </div>
                <div className="home-row-controls">
                    {actionLabel && <button className="home-row-action" onClick={onAction}>{actionLabel}</button>}
                    {scrollable && (
                        <>
                            <button className="home-row-arrow" aria-label={`Scroll ${title} left`} disabled={edges.start} onClick={() => scroll(-1)}>‹</button>
                            <button className="home-row-arrow" aria-label={`Scroll ${title} right`} disabled={edges.end} onClick={() => scroll(1)}>›</button>
                        </>
                    )}
                </div>
            </header>
            <div
                ref={track}
                className={edges.end ? "home-row-track" : "home-row-track home-row-track-more"}
                onScroll={measure}
            >
                {children}
            </div>
        </section>
    )
}

export default HomeRow
