// Sidebar.jsx is the main menu. On wide screens it runs down the left side;
// on phones it becomes a bar along the bottom of the screen.
// The Student / Organisation switch sits at the bottom.
import ViewSwitch from './ViewSwitch'
import './Sidebar.css'

// { items } are the menu entries. { screen } is the screen showing now, changed with { onNavigate }.
// { top } is shown above the menu. { view } and { onViewChange } drive the view switch.
function Sidebar({ items, screen, onNavigate, top, view, onViewChange }) {
    return (
        <nav className="sidebar" aria-label="Main">
            {top && <div className="sidebar-top">{top}</div>}
            <ul>
                {items.map((item) => {
                    const current = screen === item.screen || (item.also || []).includes(screen)
                    return (
                        <li key={item.screen}>
                            <button aria-current={current ? "page" : undefined} onClick={() => onNavigate(item.screen)}>
                                <span className="sidebar-emoji" aria-hidden="true">{item.emoji}</span>
                                <span className="sidebar-label">{item.label}</span>
                                <span className="sidebar-short" aria-hidden="true">{item.short || item.label}</span>
                                {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="sidebar-switch">
                <ViewSwitch view={view} onChange={onViewChange}/>
            </div>
        </nav>
    )
}

export default Sidebar
