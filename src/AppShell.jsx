// AppShell.jsx places the main menu beside the page content once the student
// has finished the story. On phones the menu moves to a bar along the bottom.
import Sidebar from './Sidebar'
import './AppShell.css'

// { screen } and { onNavigate } are passed to the menu. { children } is the page.
function AppShell({ screen, onNavigate, children }) {
    return (
        <div className="app-shell">
            <Sidebar screen={screen} onNavigate={onNavigate}/>
            <div className="app-content">{children}</div>
        </div>
    )
}

export default AppShell
