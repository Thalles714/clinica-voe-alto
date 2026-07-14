import { useId } from 'react'

/**
 * Jigsaw silhouettes matching the Hero Patterns "jigsaw" model the user provided:
 * square body + organic omega tabs/blanks (soft cubic necks, bulbous heads).
 * Side codes: T = tab out, B = blank in, F = flat
 */

const BODY = 28
const MID = 50
const NECK = 8

/**
 * Horizontal knob — proportions derived from heropatterns jigsaw connectors
 * (soft lead-in cubics + bulbous head, not a plain circle).
 */
function knobX(y, { tab, ltr }) {
  const a = ltr ? MID - NECK : MID + NECK
  const b = ltr ? MID + NECK : MID - NECK
  const sx = ltr ? 1 : -1
  // Top L→R: tab goes up (-Y). Bottom R→L: tab goes down (+Y).
  const dir = ltr ? (tab ? -1 : 1) : tab ? 1 : -1
  const d = 17.5 * dir

  return [
    `L ${a} ${y}`,
    `C ${a} ${y + d * 0.22}`,
    `${MID - 13.2 * sx} ${y + d * 0.48}`,
    `${MID - 11.4 * sx} ${y + d * 0.78}`,
    `C ${MID - 6.2 * sx} ${y + d * 1.06}`,
    `${MID + 6.2 * sx} ${y + d * 1.06}`,
    `${MID + 11.4 * sx} ${y + d * 0.78}`,
    `C ${MID + 13.2 * sx} ${y + d * 0.48}`,
    `${b} ${y + d * 0.22}`,
    `${b} ${y}`,
  ].join(' ')
}

function knobY(x, { tab, ttb }) {
  const a = ttb ? MID - NECK : MID + NECK
  const b = ttb ? MID + NECK : MID - NECK
  const sy = ttb ? 1 : -1
  // Right T→B: tab goes right (+X). Left B→T: tab goes left (-X).
  const dir = ttb ? (tab ? 1 : -1) : tab ? -1 : 1
  const d = 17.5 * dir

  return [
    `L ${x} ${a}`,
    `C ${x + d * 0.22} ${a}`,
    `${x + d * 0.48} ${MID - 13.2 * sy}`,
    `${x + d * 0.78} ${MID - 11.4 * sy}`,
    `C ${x + d * 1.06} ${MID - 6.2 * sy}`,
    `${x + d * 1.06} ${MID + 6.2 * sy}`,
    `${x + d * 0.78} ${MID + 11.4 * sy}`,
    `C ${x + d * 0.48} ${MID + 13.2 * sy}`,
    `${x + d * 0.22} ${b}`,
    `${x} ${b}`,
  ].join(' ')
}

function sideX(kind, y, ltr) {
  if (kind === 'F') return ltr ? `L ${100 - BODY} ${y}` : `L ${BODY} ${y}`
  return `${knobX(y, { tab: kind === 'T', ltr })} L ${ltr ? 100 - BODY : BODY} ${y}`
}

function sideY(kind, x, ttb) {
  if (kind === 'F') return ttb ? `L ${x} ${100 - BODY}` : `L ${x} ${BODY}`
  return `${knobY(x, { tab: kind === 'T', ttb })} L ${x} ${ttb ? 100 - BODY : BODY}`
}

function buildJigsaw(n, e, s, w) {
  return [
    `M ${BODY} ${BODY}`,
    sideX(n, BODY, true),
    sideY(e, 100 - BODY, true),
    sideX(s, 100 - BODY, false),
    sideY(w, BODY, false),
    'Z',
  ].join(' ')
}

const SHAPES = {
  classic: buildJigsaw('T', 'B', 'T', 'B'),
  alt: buildJigsaw('B', 'T', 'B', 'T'),
  adjacent: buildJigsaw('T', 'T', 'B', 'B'),
  adjacentAlt: buildJigsaw('B', 'B', 'T', 'T'),
  edge: buildJigsaw('F', 'T', 'B', 'T'),
  edgeAlt: buildJigsaw('T', 'F', 'T', 'B'),
  edgeBottom: buildJigsaw('T', 'B', 'F', 'T'),
  corner: buildJigsaw('F', 'F', 'T', 'B'),
  cornerAlt: buildJigsaw('F', 'T', 'B', 'F'),
  cornerBL: buildJigsaw('T', 'B', 'F', 'F'),
  tri: buildJigsaw('T', 'T', 'T', 'B'),
  triAlt: buildJigsaw('T', 'B', 'T', 'T'),
}

const VARIANT_CLASS = {
  blue: 'puzzle-piece--blue',
  pink: 'puzzle-piece--pink',
  'light-pink': 'puzzle-piece--light-pink',
  'blue-glass': 'puzzle-piece--blue-glass',
  'pink-glass': 'puzzle-piece--pink-glass',
  outline: 'puzzle-piece--outline',
  gradient: 'puzzle-piece--gradient',
  frosted: 'puzzle-piece--frosted',
}

export default function PuzzlePiece({
  size = 120,
  variant = 'blue',
  opacity = 1,
  className = '',
  rotation = 0,
  strokeOnly = false,
  blurred = false,
  shape = 'classic',
  style,
}) {
  const reactId = useId().replace(/:/g, '')
  const path = SHAPES[shape] ?? SHAPES.classic
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.blue
  const gradId = `puzzle-grad-${reactId}`

  return (
    <div
      className={[
        'puzzle-piece',
        variantClass,
        strokeOnly || variant === 'outline' ? 'puzzle-piece--stroke' : '',
        blurred ? 'puzzle-piece--blurred' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: size,
        height: size,
        opacity,
        '--piece-static-rot': `${rotation}deg`,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        focusable="false"
        aria-hidden="true"
        className="puzzle-piece__svg"
      >
        {variant === 'gradient' && (
          <defs>
            <linearGradient id={gradId} x1="14%" y1="10%" x2="86%" y2="90%">
              <stop offset="0%" stopColor="var(--piece-grad-a)" />
              <stop offset="100%" stopColor="var(--piece-grad-b)" />
            </linearGradient>
          </defs>
        )}
        <path
          d={path}
          className="puzzle-piece__path"
          fill={variant === 'gradient' ? `url(#${gradId})` : undefined}
        />
      </svg>
    </div>
  )
}
