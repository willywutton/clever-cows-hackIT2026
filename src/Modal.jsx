import { useEffect, useRef } from 'react'
import './Modal.css'

function Modal({ title, icon, onClose, children }) {
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

    return (
        <div className="modal-backdrop" onPointerDown={(event) => event.target === event.currentTarget && onClose()}>
            <div className="modal card" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={box}>
                {icon && <span className="modal-icon" aria-hidden="true">{icon}</span>}
                <h3 id="modal-title">{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default Modal
