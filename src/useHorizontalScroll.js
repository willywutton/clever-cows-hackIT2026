import { useEffect, useRef, useState } from 'react'

const DRAG_THRESHOLD = 6

export function useHorizontalScroll() {
    const ref = useRef(null)
    const [edges, setEdges] = useState({ start: true, end: true })

    useEffect(() => {
        const el = ref.current
        let down = false
        let moved = false
        let startX = 0
        let startLeft = 0

        function measure() {
            setEdges({
                start: el.scrollLeft <= 4,
                end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
            })
        }

        function onDown(event) {
            if (event.pointerType !== 'mouse' || event.button !== 0) {
                return
            }
            down = true
            moved = false
            startX = event.clientX
            startLeft = el.scrollLeft
        }

        function onMove(event) {
            if (!down) {
                return
            }
            const distance = event.clientX - startX
            if (!moved && Math.abs(distance) > DRAG_THRESHOLD) {
                moved = true
                el.classList.add('is-dragging')
            }
            if (moved) {
                el.scrollLeft = startLeft - distance
            }
        }

        function onUp() {
            down = false
            el.classList.remove('is-dragging')
        }

        function onDragStart(event) {
            event.preventDefault()
        }

        function onClick(event) {
            if (moved) {
                event.preventDefault()
                event.stopPropagation()
                moved = false
            }
        }

        const observer = new ResizeObserver(measure)
        observer.observe(el)
        el.addEventListener('scroll', measure, { passive: true })
        el.addEventListener('pointerdown', onDown)
        el.addEventListener('click', onClick, true)
        el.addEventListener('dragstart', onDragStart)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)

        return () => {
            observer.disconnect()
            el.removeEventListener('scroll', measure)
            el.removeEventListener('pointerdown', onDown)
            el.removeEventListener('click', onClick, true)
            el.removeEventListener('dragstart', onDragStart)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
        }
    }, [])

    function scrollBy(direction) {
        const el = ref.current
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
    }

    return { ref, edges, scrollBy }
}
