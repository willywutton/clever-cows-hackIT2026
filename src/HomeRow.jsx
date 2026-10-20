import { useHorizontalScroll } from './useHorizontalScroll'
import './HomeRow.css'

function HomeRow({ eyebrow, title, actionLabel, onAction, children }) {
    const { ref, edges, scrollBy } = useHorizontalScroll()

    return (
        <section className="home-row">
            <header className="home-row-head">
                <div>
                    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                    <h3>{title}</h3>
                </div>
                <div className="home-row-controls">
                    {actionLabel && <button className="home-row-action" onClick={onAction}>{actionLabel}</button>}
                    <button className="home-row-arrow" aria-label={`Scroll ${title} left`} disabled={edges.start} onClick={() => scrollBy(-1)}>‹</button>
                    <button className="home-row-arrow" aria-label={`Scroll ${title} right`} disabled={edges.end} onClick={() => scrollBy(1)}>›</button>
                </div>
            </header>
            <div ref={ref} className={edges.end ? "home-row-track drag-scroll" : "home-row-track drag-scroll home-row-track-more"}>
                {children}
            </div>
        </section>
    )
}

export default HomeRow
