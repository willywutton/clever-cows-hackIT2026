// SiteHeader.jsx is the bar across the top of every page: the Clever Cows name on the left,
// and once the student has a character, their name and Moolah on the right.
// The Student / Organisation switch lives at the bottom of the side menu.
import Graphic from './Graphic'
import CowAvatar from './CowAvatar'
import { CLOVER } from './assets/characters'
import './SiteHeader.css'

// { view } is 'student' or 'organisation'. { signedIn } is true once the student has
// finished (or skipped) the story. { name } and { moolah } are shown on the right.
// { onLogo } goes Home when the logo is clicked.
function SiteHeader({ view, orgName, signedIn, name, moolah, characterHead, onLogo }) {
    const showStudentBar = signedIn && view === 'student'

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <button className="site-logo" onClick={onLogo} disabled={!showStudentBar}>
                    <span className="site-logo-mark" aria-hidden="true"><img src={CLOVER.head} alt=""/></span>
                    Moomunity
                </button>

                {showStudentBar && (
                    <div className="site-header-student">
                        <p className="site-name">
                            {characterHead && <CowAvatar face={characterHead} size="tiny" label="Your helper type"/>}
                            {name}
                        </p>
                        <p className="site-moolah" title="Moolah is earned by helping. It can't be bought.">
                            <span aria-hidden="true"><Graphic symbol="coin"/></span> <strong key={moolah} className="site-moolah-count">{moolah}</strong>
                            <span className="site-moolah-word">Moolah</span>
                        </p>
                    </div>
                )}

                {view === 'organisation' && <p className="site-org-label">{orgName} · Coordinator</p>}
            </div>
        </header>
    )
}

export default SiteHeader
