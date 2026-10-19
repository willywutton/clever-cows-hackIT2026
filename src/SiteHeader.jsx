// SiteHeader.jsx is the bar across the top of every page: the Clever Cows name,
// and once the student has a character, Surprise me, their Moolah and their name.
// The Student / Organisation switch is always at the far right.
import './SiteHeader.css'

// { view } is 'student' or 'organisation', changed with { onViewChange }.
// { signedIn } is true once the student has finished (or skipped) the story.
// { name } and { moolah } are shown at the top. { onSurprise } opens a surprise cause.
// { onLogo } goes Home when the logo is clicked.
function SiteHeader({ view, onViewChange, signedIn, name, moolah, onSurprise, onLogo }) {
    const showStudentBar = signedIn && view === 'student'

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <button className="site-logo" onClick={onLogo} disabled={!showStudentBar}>
                    <span className="site-logo-mark" aria-hidden="true">🐮</span>
                    Clever Cows
                </button>

                {showStudentBar && (
                    <div className="site-header-student">
                        <button className="site-surprise" onClick={onSurprise}>
                            <span aria-hidden="true">🎲</span> Surprise me
                        </button>
                        <p className="site-moolah" title="Moolah is earned by helping. It can't be bought.">
                            <span aria-hidden="true">🪙</span> {moolah} <span className="site-moolah-word">Moolah</span>
                        </p>
                        <p className="site-name">{name}</p>
                    </div>
                )}

                {/* aria-pressed tells screen readers which button is currently selected. */}
                <div className="view-toggle" role="group" aria-label="View">
                    <button aria-pressed={view === 'student'} onClick={() => onViewChange('student')}>
                        Student
                    </button>
                    <button aria-pressed={view === 'organisation'} onClick={() => onViewChange('organisation')}>
                        Organisation
                    </button>
                </div>
            </div>
        </header>
    )
}

export default SiteHeader
