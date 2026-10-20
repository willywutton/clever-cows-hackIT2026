import './Confetti.css'

const PIECES = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 7) * 0.07}s`,
    colour: ["#f2c94c", "#b5442f", "#5a8f3d", "#6fb3c9", "#e9c6e0"][i % 5],
    turn: `${(i * 73) % 360}deg`,
}))

function Confetti() {
    return (
        <div className="confetti" aria-hidden="true">
            {PIECES.map((piece, i) => (
                <span key={i} style={{ left: piece.left, animationDelay: piece.delay, background: piece.colour, '--turn': piece.turn }}/>
            ))}
        </div>
    )
}

export default Confetti
