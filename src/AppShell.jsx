// AppShell.jsx places a menu beside the page content. On phones the menu moves
// to a bar along the bottom. The student and organisation views each pass their own menu.
import './AppShell.css'

// { sidebar } is the menu. { children } is the page.
function AppShell({ sidebar, children }) {
    return (
        <div className="app-shell">
            {sidebar}
            <div className="app-content">{children}</div>
        </div>
    )
}

export default AppShell
