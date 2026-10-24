// PortfolioPrint.jsx is a plain, print-friendly version of the portfolio.
// "Print" uses the browser's own print window, which can also save as a PDF.
import { causes } from './data/causes'
import { results } from './data/chapters'
import './PortfolioPrint.css'

// { name }, { quizResult } and { hoursWorked } describe the student.
// { diary } and { portfolio } give the saved pages. { onBack } returns to Profile.
function PortfolioPrint({ name, quizResult, hoursWorked, diary, portfolio, onBack }) {
    const entries = diary.filter((entry) => portfolio.includes(entry.id))

    return (
        <article className="portfolio-print-page">
            <div className="portfolio-print-buttons no-print">
                <button onClick={onBack}>← Back to Profile</button>
                <button className="button-primary" onClick={() => window.print()}>Print or save as PDF</button>
            </div>

            <header>
                <h2>{name}'s volunteering portfolio</h2>
                <p>
                    Helper type: {results[quizResult].name} · {hoursWorked} {hoursWorked === 1 ? "hour" : "hours"} volunteered
                </p>
            </header>

            {entries.map((entry) => {
                const cause = causes.find((c) => c.id === entry.causeId)
                return (
                    <section key={entry.id} className="portfolio-print-entry">
                        <h3>{cause.name}</h3>
                        <p className="portfolio-print-date">
                            {new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        {entry.photoUrl && <img src={entry.photoUrl} alt={`Photo from ${cause.name}`}/>}
                        {entry.message && <p>{entry.message}</p>}
                    </section>
                )
            })}

            <footer>Made with Moomunity, by team Clever Cows (a HackIT 2026 student project).</footer>
        </article>
    )
}

export default PortfolioPrint
