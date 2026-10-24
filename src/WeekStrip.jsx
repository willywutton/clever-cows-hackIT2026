import './WeekStrip.css'

// { dates } labels each week shown. { count } is how many of them are going, from
// the first; Infinity means it carries on every week, which adds an "and on" end.
// { compact } draws small dots with no labels, for inside the option cards.
function WeekStrip({ dates, count, compact = false }) {
    const ongoing = count === Infinity
    const columns = dates.length + (ongoing ? 1 : 0)

    return (
        <ol className={compact ? "week-strip week-strip-compact" : "week-strip"} style={{ "--weeks": columns }} aria-hidden="true">
            {dates.map((date, index) => {
                const going = index < count
                return (
                    <li key={date} className={going ? "week-strip-going" : undefined}>
                        <span className="week-strip-dot">{going ? "✓" : ""}</span>
                        {!compact && <small>{date}</small>}
                    </li>
                )
            })}
            {ongoing && (
                <li className="week-strip-on">
                    <span className="week-strip-dot">→</span>
                    {!compact && <small>and on</small>}
                </li>
            )}
        </ol>
    )
}

export default WeekStrip
