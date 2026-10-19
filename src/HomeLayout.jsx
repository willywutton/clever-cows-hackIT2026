import './HomeLayout.css'

function HomeLayout({ hero, main, side }) {
    return (
        <div className="home-layout">
            <header className="home-hero">{hero}</header>
            <div className="home-main">{main}</div>
            <aside className="home-side">{side}</aside>
        </div>
    )
}

export default HomeLayout
