// SiteHeader.jsx is the bar across the top of every page: the Clever Cows name,
// the Home / Profile menu (once there is a quiz result), and the Student / Organisation switch.
import NavBar from './NavBar'
import './SiteHeader.css'

// { view } is 'student' or 'organisation', changed with { onViewChange }.
// { showNav } shows the Home / Profile menu. { screen } and { onNavigate } are passed to it.
function SiteHeader({ view, onViewChange, showNav, screen, onNavigate }) {
    return (
        <header className="site-header">
            <div className="site-header-inner">
                <p className="site-logo">
                    <span className="site-logo-mark" aria-hidden="true">🐮</span>
                    Clever Cows
                </p>

                {showNav && <NavBar screen={screen} onNavigate={onNavigate}/>}

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
