import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({ title, icon, eyebrow, wide = false, onClose, children }) {
    const box = useRef(null)
    const closeRef = useRef(onClose)

    useEffect(() => {
        closeRef.current = onClose
    })

    useEffect(() => {
        const previous = document.activeElement
        box.current.focus()
        function onKey(event) {
            if (event.key === 'Escape') {
                closeRef.current()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('keydown', onKey)
            previous?.focus?.()
        }
    }, [])

    return createPortal(
        <div className="modal-backdrop" onPointerDown={(event) => event.target === event.currentTarget && onClose()}>
            <div className={wide ? "modal modal-wide card" : "modal card"} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={box}>
                {icon && <span className="modal-icon" aria-hidden="true">{icon}</span>}
                {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                <h3 id="modal-title">{title}</h3>
                {children}
            </div>
        </div>,
        document.body,
    )
}

export default Modal
