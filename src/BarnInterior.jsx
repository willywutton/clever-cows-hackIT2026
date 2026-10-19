// BarnInterior.jsx paints the inside of a barn as an SVG drawing: a gabled roof with
// rafters, plank walls, big double doors at the back with sunlight coming through,
// hay bales, sacks on a shelf and straw on the floor. It fills the screen under the
// header and is the backdrop wherever the farmer talks; { children } sit on top of it.
// { centred } puts the children in the middle of the screen instead of at the bottom.
import './BarnInterior.css'

// The drawing is 1600 by 900 units. The room narrows from the edges of the screen
// (the front) to the back wall, which makes it look deep.
const FRONT = { left: 0, right: 1600, eave: 60, peak: -260, floor: 900 }
const BACK = { left: 520, right: 1080, eave: 280, peak: 170, floor: 640 }
const MIDDLE = 800

function lerp(a, b, t) {
    return a + (b - a) * t
}

// A point on a side wall. depth runs from 0 (front) to 1 (back wall);
// height runs from 0 (where the roof meets the wall) to 1 (the floor).
function wallPoint(side, depth, height) {
    const x = side === "left" ? lerp(FRONT.left, BACK.left, depth) : lerp(FRONT.right, BACK.right, depth)
    const top = lerp(FRONT.eave, BACK.eave, depth)
    const bottom = lerp(FRONT.floor, BACK.floor, depth)
    return [x, lerp(top, bottom, height)]
}

function points(list) {
    return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
}

// Planks get closer together towards the back, like they would in real life.
const PLANK_DEPTHS = Array.from({ length: 13 }, (_, i) => 1 - (1 - (i + 1) / 14) ** 2)
const RAFTER_DEPTHS = [0.12, 0.38, 0.62, 0.84]
const BACK_PLANKS = Array.from({ length: 13 }, (_, i) => BACK.left + (i + 1) * 40)
const FLOOR_BOARDS = Array.from({ length: 15 }, (_, i) => i + 1)

// Loose straw and dust are spread with fixed sums rather than random numbers,
// so the picture is the same every time.
const STRAW = Array.from({ length: 70 }, (_, i) => ({
    x: (i * 263) % 1600,
    y: 700 + ((i * 97) % 200),
    angle: (i * 47) % 180,
    length: 14 + (i % 4) * 6,
}))
const PILE_STRAWS = [1170, 1215, 1260, 1310, 1355, 1400, 1450, 1500, 1550]
const DUST = Array.from({ length: 26 }, (_, i) => ({
    x: 730 + ((i * 71) % 260) + i * 6,
    y: 280 + ((i * 113) % 520),
    r: 1.5 + (i % 3),
}))

// Where the roof meets the back wall, for the top of each back plank.
function backWallTop(x) {
    const t = x < MIDDLE ? (x - BACK.left) / (MIDDLE - BACK.left) : (BACK.right - x) / (BACK.right - MIDDLE)
    return lerp(BACK.eave, BACK.peak, t)
}

function Sack({ x, y }) {
    return (
        <g>
            <path
                d={`M ${x - 42} ${y} C ${x - 52} ${y - 60} ${x - 30} ${y - 96} ${x - 10} ${y - 100}
                    L ${x + 10} ${y - 100} C ${x + 30} ${y - 96} ${x + 52} ${y - 60} ${x + 42} ${y} Z`}
                fill="#f6e8d6"
                stroke="#c9946c"
                strokeWidth="3"
            />
            <path d={`M ${x - 12} ${y - 100} L ${x} ${y - 122} L ${x + 12} ${y - 100}`} fill="#f6e8d6" stroke="#c9946c" strokeWidth="3"/>
            <rect x={x - 14} y={y - 106} width="28" height="7" rx="3" fill="#a5532a"/>
            <path d={`M ${x - 20} ${y - 40} q 20 10 40 0`} fill="none" stroke="#e2c9ae" strokeWidth="3"/>
        </g>
    )
}

function HayBale({ x, y, width, height }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx="14" fill="url(#barn-hay)"/>
            {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1={x + 8} y1={y + height * f} x2={x + width - 8} y2={y + height * f} stroke="#d39c35" strokeWidth="3"/>
            ))}
            <line x1={x + width * 0.3} y1={y} x2={x + width * 0.3} y2={y + height} stroke="#9c6a24" strokeWidth="5"/>
            <line x1={x + width * 0.7} y1={y} x2={x + width * 0.7} y2={y + height} stroke="#9c6a24" strokeWidth="5"/>
            <rect x={x} y={y} width={width} height={height} rx="14" fill="none" stroke="#c48a2c" strokeWidth="4"/>
        </g>
    )
}

function BarnScene() {
    const [postX, postTop] = wallPoint("left", 0.3, 0)
    const [, postBottom] = wallPoint("left", 0.3, 1)
    const [rightPostX] = wallPoint("right", 0.3, 0)
    const shelfStart = wallPoint("right", 0.36, 0.5)
    const shelfEnd = wallPoint("right", 0.7, 0.5)

    return (
        <svg className="barn-inside-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <linearGradient id="barn-left-wall" x1="0" x2="1">
                    <stop offset="0" stopColor="#e9933f"/>
                    <stop offset="1" stopColor="#c8692a"/>
                </linearGradient>
                <linearGradient id="barn-right-wall" x1="1" x2="0">
                    <stop offset="0" stopColor="#f0a04a"/>
                    <stop offset="1" stopColor="#cf722e"/>
                </linearGradient>
                <linearGradient id="barn-floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#9c4a22"/>
                    <stop offset="1" stopColor="#7e3818"/>
                </linearGradient>
                <linearGradient id="barn-back" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e48a3b"/>
                    <stop offset="1" stopColor="#c86a2b"/>
                </linearGradient>
                <linearGradient id="barn-hay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f6cf6a"/>
                    <stop offset="1" stopColor="#e2a83f"/>
                </linearGradient>
                <linearGradient id="barn-beam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff6d8" stopOpacity="0.55"/>
                    <stop offset="1" stopColor="#fff6d8" stopOpacity="0"/>
                </linearGradient>
                <radialGradient id="barn-glow">
                    <stop offset="0" stopColor="#fff3c8" stopOpacity="0.9"/>
                    <stop offset="1" stopColor="#fff3c8" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="barn-shade" cx="0.5" cy="0.45" r="0.75">
                    <stop offset="0.55" stopColor="#3a1405" stopOpacity="0"/>
                    <stop offset="1" stopColor="#3a1405" stopOpacity="0.45"/>
                </radialGradient>
            </defs>

            {/* Roof */}
            <rect width="1600" height="900" fill="#a9481b"/>
            <polygon points={points([[FRONT.left, FRONT.eave], [MIDDLE, FRONT.peak], [MIDDLE, BACK.peak], [BACK.left, BACK.eave]])} fill="#c25a21"/>
            <polygon points={points([[FRONT.right, FRONT.eave], [MIDDLE, FRONT.peak], [MIDDLE, BACK.peak], [BACK.right, BACK.eave]])} fill="#cf6626"/>
            {[0.33, 0.66].map((f) => (
                <g key={f} stroke="#8a3a15" strokeWidth="10">
                    <line x1={lerp(FRONT.left, MIDDLE, f)} y1={lerp(FRONT.eave, FRONT.peak, f)} x2={lerp(BACK.left, MIDDLE, f)} y2={lerp(BACK.eave, BACK.peak, f)}/>
                    <line x1={lerp(FRONT.right, MIDDLE, f)} y1={lerp(FRONT.eave, FRONT.peak, f)} x2={lerp(BACK.right, MIDDLE, f)} y2={lerp(BACK.eave, BACK.peak, f)}/>
                </g>
            ))}

            {/* Side walls */}
            <polygon points={points([[FRONT.left, FRONT.eave], [BACK.left, BACK.eave], [BACK.left, BACK.floor], [FRONT.left, FRONT.floor]])} fill="url(#barn-left-wall)"/>
            <polygon points={points([[FRONT.right, FRONT.eave], [BACK.right, BACK.eave], [BACK.right, BACK.floor], [FRONT.right, FRONT.floor]])} fill="url(#barn-right-wall)"/>
            {PLANK_DEPTHS.map((depth) => (
                <g key={depth} stroke="#a2501f" strokeWidth={lerp(4, 2, depth)}>
                    <line x1={wallPoint("left", depth, 0)[0]} y1={wallPoint("left", depth, 0)[1]} x2={wallPoint("left", depth, 1)[0]} y2={wallPoint("left", depth, 1)[1]}/>
                    <line x1={wallPoint("right", depth, 0)[0]} y1={wallPoint("right", depth, 0)[1]} x2={wallPoint("right", depth, 1)[0]} y2={wallPoint("right", depth, 1)[1]}/>
                </g>
            ))}

            {/* Back wall, with sunlight around the doors */}
            <polygon
                points={points([[BACK.left, BACK.floor], [BACK.left, BACK.eave], [MIDDLE, BACK.peak], [BACK.right, BACK.eave], [BACK.right, BACK.floor]])}
                fill="url(#barn-back)"
            />
            {BACK_PLANKS.map((x) => (
                <line key={x} x1={x} y1={backWallTop(x)} x2={x} y2={BACK.floor} stroke="#b35c25" strokeWidth="2"/>
            ))}
            <circle cx={MIDDLE} cy="420" r="300" fill="url(#barn-glow)" opacity="0.55"/>

            {/* The window high in the gable */}
            <polygon points="690,262 722,220 878,220 910,262" fill="#fff4cf" stroke="#8a3a15" strokeWidth="8"/>
            <line x1="770" y1="220" x2="770" y2="262" stroke="#8a3a15" strokeWidth="6"/>
            <line x1="830" y1="220" x2="830" y2="262" stroke="#8a3a15" strokeWidth="6"/>

            {/* Double doors with cross braces */}
            <rect x="620" y="356" width="360" height="26" fill="#8a3a15"/>
            {[[646, 798], [802, 954]].map(([x1, x2]) => (
                <g key={x1}>
                    <rect x={x1} y="384" width={x2 - x1} height={BACK.floor - 384} fill="#c9662b" stroke="#f2b46a" strokeWidth="8"/>
                    <line x1={x1 + 6} y1="390" x2={x2 - 6} y2={BACK.floor - 4} stroke="#f2b46a" strokeWidth="7"/>
                    <line x1={x2 - 6} y1="390" x2={x1 + 6} y2={BACK.floor - 4} stroke="#f2b46a" strokeWidth="7"/>
                </g>
            ))}
            <line x1={MIDDLE} y1="388" x2={MIDDLE} y2={BACK.floor} stroke="#fff3c0" strokeWidth="4"/>

            {/* Floor boards */}
            <polygon points={points([[FRONT.left, FRONT.floor], [BACK.left, BACK.floor], [BACK.right, BACK.floor], [FRONT.right, FRONT.floor]])} fill="url(#barn-floor)"/>
            {FLOOR_BOARDS.map((i) => (
                <line key={i} x1={i * 100} y1={FRONT.floor} x2={BACK.left + i * 35} y2={BACK.floor} stroke="#6d2f14" strokeWidth="2"/>
            ))}

            {/* Rafters across the roof, and a tie beam between the front posts */}
            {RAFTER_DEPTHS.map((depth) => {
                const left = wallPoint("left", depth, 0)
                const right = wallPoint("right", depth, 0)
                return (
                    <polyline
                        key={depth}
                        points={points([left, [MIDDLE, lerp(FRONT.peak, BACK.peak, depth)], right])}
                        fill="none"
                        stroke="#7a3212"
                        strokeWidth={lerp(42, 12, depth)}
                        strokeLinejoin="round"
                    />
                )
            })}
            <rect x={postX} y="112" width={rightPostX - postX} height="30" fill="#8a3a15"/>
            <rect x={postX} y="112" width={rightPostX - postX} height="8" fill="#b4541f"/>
            <rect x={postX - 17} y={postTop} width="34" height={postBottom - postTop} fill="#8a3a15"/>
            <rect x={postX - 17} y={postTop} width="10" height={postBottom - postTop} fill="#b4541f"/>
            <rect x={rightPostX - 17} y={postTop} width="34" height={postBottom - postTop} fill="#8a3a15"/>
            <rect x={rightPostX + 7} y={postTop} width="10" height={postBottom - postTop} fill="#b4541f"/>

            {/* A coil of rope hanging on the left post */}
            <path d={`M ${postX} 300 q -6 -14 0 -18`} fill="none" stroke="#3b1c0c" strokeWidth="5"/>
            <ellipse cx={postX + 4} cy="370" rx="24" ry="74" fill="none" stroke="#f1d6bd" strokeWidth="7"/>
            <ellipse cx={postX + 10} cy="378" rx="18" ry="66" fill="none" stroke="#e3bfa0" strokeWidth="5"/>

            {/* A shelf of sacks on the right wall */}
            <polygon points={points([shelfStart, shelfEnd, [shelfEnd[0], shelfEnd[1] + 14], [shelfStart[0], shelfStart[1] + 20]])} fill="#8a3a15"/>
            <Sack x={shelfStart[0] - 70} y={shelfStart[1] + 2}/>
            <Sack x={shelfStart[0] - 160} y={shelfStart[1]}/>

            {/* A pitchfork leaning on the right wall */}
            <line x1="1172" y1="690" x2="1146" y2="440" stroke="#c07a33" strokeWidth="8" strokeLinecap="round"/>
            <path d="M 1122 384 L 1125 438 Q 1146 456 1168 436 L 1170 380 M 1146 446 L 1146 376" fill="none" stroke="#3b2418" strokeWidth="5" strokeLinecap="round"/>

            {/* Loose straw on the floor, then the hay bales and a pile of straw */}
            {STRAW.map((piece, i) => (
                <line
                    key={i}
                    x1={piece.x}
                    y1={piece.y}
                    x2={piece.x + piece.length * Math.cos((piece.angle * Math.PI) / 180)}
                    y2={piece.y + piece.length * Math.sin((piece.angle * Math.PI) / 180) * 0.4}
                    stroke="#f2c55c"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            ))}
            <HayBale x={1000} y={590} width={96} height={56}/>
            <HayBale x={30} y={640} width={320} height={180}/>
            <HayBale x={80} y={480} width={250} height={160}/>
            <path d="M 1120 900 Q 1170 790 1300 800 Q 1420 770 1520 840 Q 1600 860 1600 900 Z" fill="#e9b84d"/>
            {PILE_STRAWS.map((x, i) => (
                <path key={x} d={`M ${x} 900 q ${i % 2 ? 18 : -18} -50 ${i % 3 ? 30 : -10} -80`} fill="none" stroke="#c99230" strokeWidth="3" strokeLinecap="round"/>
            ))}

            {/* Sunbeam from the window, with dust in it */}
            <polygon points="700,262 900,262 1180,900 820,900" fill="url(#barn-beam)"/>
            {DUST.map((speck, i) => (
                <circle key={i} cx={speck.x} cy={speck.y} r={speck.r} fill="#fff5d6" opacity="0.7"/>
            ))}

            {/* Darker corners, so the middle of the barn glows */}
            <rect width="1600" height="900" fill="url(#barn-shade)"/>
        </svg>
    )
}

function BarnInterior({ centred, children }) {
    return (
        <div className="barn-inside">
            <BarnScene/>
            <div className={centred ? "barn-inside-content barn-inside-content-centred" : "barn-inside-content"}>{children}</div>
        </div>
    )
}

export default BarnInterior
