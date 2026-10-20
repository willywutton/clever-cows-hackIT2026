import { useEffect, useRef, useState } from 'react'
import './ViewSwitch.css'

const VIEWS = [
    { id: "student", emoji: "🎓", label: "Student", hint: "Find causes and keep going" },
    { id: "organisation", emoji: "🏡", label: "Organisation", hint: "Manage volunteers" },
]

function ViewSwitch({ view, onChange }) {
    const [open, setOpen] = useState(false)
    const box = useRef(null)
    const current = VIEWS.find((v) => v.id === view)

    useEffect(() => {
        if (!open) {
            return
        }
        function close(event) {
            if (event.type === 'keydown' ? event.key === 'Escape' : !box.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('pointerdown', close)
        document.addEventListener('keydown', close)
        return () => {
            document.removeEventListener('pointerdown', close)
            document.removeEventListener('keydown', close)
        }
    }, [open])

    function choose(id) {
        setOpen(false)
        if (id !== view) {
            onChange(id)
            window.scrollTo(0, 0)
        }
    }

    return (
        <div className="view-switch" ref={box}>
            <button className="view-switch-button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
                <span className="view-switch-emoji" aria-hidden="true">{current.emoji}</span>
                <span className="view-switch-text">
                    <small>Viewing as</small>
                    {current.label}
                </span>
                <span className="view-switch-caret" aria-hidden="true">▾</span>
            </button>
            {open && (
                <ul className="view-switch-menu" role="menu">
                    {VIEWS.map((v) => (
                        <li key={v.id} role="none">
                            <button role="menuitemradio" aria-checked={v.id === view} onClick={() => choose(v.id)}>
                                <span aria-hidden="true">{v.emoji}</span>
                                <span>
                                    {v.label}
                                    <small>{v.hint}</small>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ViewSwitch
