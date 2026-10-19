// BarnFront.jsx draws the front of a barn around the Welcome card: a hay-loft window
// with open shutters above it, and a window on each side.
// Everything here is decoration, so it is hidden from screen readers.
import './BarnFront.css'

// { children } is the Welcome card, which sits where the barn's big door would be.
function BarnFront({ children }) {
    return (
        <div className="barn-front">
            <div className="barn-loft" aria-hidden="true">
                <span className="barn-shutter barn-shutter-left"/>
                <span className="barn-loft-opening">
                    <span className="barn-hay"/>
                </span>
                <span className="barn-shutter barn-shutter-right"/>
            </div>

            <div className="barn-row">
                <span className="barn-window" aria-hidden="true"><span/><span/></span>
                <div className="barn-door">{children}</div>
                <span className="barn-window" aria-hidden="true"><span/><span/></span>
            </div>
        </div>
    )
}

export default BarnFront
