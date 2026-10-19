// Sidebar.jsx is the main menu. On wide screens it runs down the left side;
// on phones it becomes a bar along the bottom of the screen.
import './Sidebar.css'

const NAV_ITEMS = [
    { screen: "home", emoji: "🏡", label: "Home" },
    { screen: "friends", emoji: "🤝", label: "Friends" },
    { screen: "social", emoji: "💬", label: "Social" },
    { screen: "cow", emoji: "🐄", label: "Cow" },
    { screen: "diary", emoji: "📔", label: "Diary" },
    { screen: "favourites", emoji: "⭐", label: "Favourites" },
    { screen: "profile", emoji: "🙂", label: "Profile" },
    { screen: "host", emoji: "📮", label: "Host your own event", short: "Host" },
]

// { screen } is the screen showing now. { onNavigate } changes it.
function Sidebar({ screen, onNavigate }) {
    return (
        <nav className="sidebar" aria-label="Main">
            <ul>
                {NAV_ITEMS.map((item) => (
                    <li key={item.screen}>
                        <button
                            aria-current={screen === item.screen ? "page" : undefined}
                            onClick={() => onNavigate(item.screen)}
                        >
                            <span className="sidebar-emoji" aria-hidden="true">{item.emoji}</span>
                            <span className="sidebar-label">{item.label}</span>
                            <span className="sidebar-short" aria-hidden="true">{item.short || item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar
