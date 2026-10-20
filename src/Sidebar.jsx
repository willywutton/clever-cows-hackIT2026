// Sidebar.jsx is the main menu. On wide screens it runs down the left side;
// on phones it becomes a bar along the bottom of the screen.
// Who is logged in, with a Log out button, sits at the bottom.
import Graphic from './Graphic'
import './Sidebar.css'

// { items } are the menu entries. { screen } is the screen showing now, changed with { onNavigate }.
// { top } is shown above the menu. { account } is { name, role, picture } for the footer,
// and { onLogOut } logs out.
function Sidebar({ items, screen, onNavigate, top, account, onLogOut }) {
    return (
        <nav className="sidebar" aria-label="Main">
            {top && <div className="sidebar-top">{top}</div>}
            <ul>
                {items.map((item) => {
                    const current = screen === item.screen || (item.also || []).includes(screen)
                    return (
                        <li key={item.screen}>
                            <button aria-current={current ? "page" : undefined} onClick={() => onNavigate(item.screen)}>
                                <span className="sidebar-emoji" aria-hidden="true"><Graphic symbol={item.emoji}/></span>
                                <span className="sidebar-label">{item.label}</span>
                                <span className="sidebar-short" aria-hidden="true">{item.short || item.label}</span>
                                {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="sidebar-account">
                <span className="sidebar-account-picture" aria-hidden="true">{account.picture}</span>
                <span className="sidebar-account-who">
                    <strong>{account.name}</strong>
                    <small>{account.role}</small>
                </span>
                <button className="sidebar-logout" onClick={onLogOut}>Log out</button>
            </div>
        </nav>
    )
}

export default Sidebar
