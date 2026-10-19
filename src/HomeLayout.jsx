// HomeLayout.jsx arranges Home in two columns on wide screens:
// the student's own things (goal, cow, calendar) on the left, causes on the right.
// On phones the two columns stack.
import './HomeLayout.css'

// { side } and { main } are the contents of each column.
function HomeLayout({ side, main }) {
    return (
        <div className="home-layout">
            <aside className="home-side">{side}</aside>
            <div className="home-main">{main}</div>
        </div>
    )
}

export default HomeLayout
