// PortfolioSection.jsx lists the diary pages the student saved to their portfolio,
// with a button to open the print-friendly version.
import Graphic from './Graphic'
import { causes } from './data/causes'
import './PortfolioSection.css'

// { diary } is every diary entry and { portfolio } the ids saved to the portfolio.
// { hoursWorked } is the student's total hours. { onOpenPrint } opens the printable page.
function PortfolioSection({ diary, portfolio, hoursWorked, onOpenPrint }) {
    const entries = diary.filter((entry) => portfolio.includes(entry.id))

    return (
        <section className="card portfolio">
            <h3>Portfolio</h3>
            <p className="portfolio-hours"><strong>{hoursWorked}</strong> {hoursWorked === 1 ? "hour" : "hours"} volunteered so far</p>
            {entries.length === 0 && (
                <p className="portfolio-empty">Save diary pages to your portfolio from the Diary tab.</p>
            )}
            <ul className="portfolio-list">
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <strong>{causes.find((c) => c.id === entry.causeId).name}</strong>
                        <span>{new Date(entry.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </li>
                ))}
            </ul>
            {entries.length > 0 && (
                <button className="portfolio-print" onClick={onOpenPrint}><Graphic symbol="print"/> Print-friendly portfolio</button>
            )}
        </section>
    )
}

export default PortfolioSection
