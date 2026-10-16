// NavBar.jsx is the menu shown after the quiz result, for moving between Home and Profile.
import './NavBar.css'

const LINKS = [
    { screen: "home", emoji: "🏡", label: "Home" },
    { screen: "profile", emoji: "🐄", label: "Profile" },
]

// { screen } is the screen showing now. { onNavigate } is App's function for changing it.
function NavBar({ screen, onNavigate }) {
    return (
        <nav className="nav-bar" aria-label="Main">
            {LINKS.map((link) => (
                <button
                    key={link.screen}
                    aria-current={screen === link.screen ? "page" : undefined}
                    onClick={() => onNavigate(link.screen)}
                >
                    <span aria-hidden="true">{link.emoji}</span> {link.label}
                </button>
            ))}
        </nav>
    )
}

export default NavBar
