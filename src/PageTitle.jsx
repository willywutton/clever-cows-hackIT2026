// PageTitle.jsx is the heading at the top of a page, with an optional line under it.
import './PageTitle.css'

// { title } is the heading. { subtitle } is an optional short line underneath.
// { children } can add buttons or other bits on the right.
function PageTitle({ title, subtitle, children }) {
    return (
        <div className="page-title">
            <div>
                <h2 className="squiggle">{title}</h2>
                {subtitle && <p className="page-title-subtitle">{subtitle}</p>}
            </div>
            {children && <div className="page-title-extra">{children}</div>}
        </div>
    )
}

export default PageTitle
