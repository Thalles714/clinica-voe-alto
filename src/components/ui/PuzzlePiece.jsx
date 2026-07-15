import { useId } from 'react'

/**
 * Classical jigsaw silhouettes: a consistent square body with circular tabs
 * and blanks. Side codes: T = tab out, B = blank in, F = flat.
 * Side codes: T = tab out, B = blank in, F = flat
 */

function topSide(kind) {
  if (kind === 'F') return 'L 96 24'
  if (kind === 'T') {
    return 'L 50 24 C 53 24 54 21 52 18 C 46 4 74 4 68 18 C 66 21 67 24 70 24 L 96 24'
  }
  return 'L 50 24 C 53 24 54 27 52 30 C 46 44 74 44 68 30 C 66 27 67 24 70 24 L 96 24'
}

function rightSide(kind) {
  if (kind === 'F') return 'L 96 96'
  if (kind === 'T') {
    return 'L 96 50 C 96 53 99 54 102 52 C 116 46 116 74 102 68 C 99 66 96 67 96 70 L 96 96'
  }
  return 'L 96 50 C 96 53 93 54 90 52 C 76 46 76 74 90 68 C 93 66 96 67 96 70 L 96 96'
}

function bottomSide(kind) {
  if (kind === 'F') return 'L 24 96'
  if (kind === 'T') {
    return 'L 70 96 C 67 96 66 99 68 102 C 74 116 46 116 52 102 C 54 99 53 96 50 96 L 24 96'
  }
  return 'L 70 96 C 67 96 66 93 68 90 C 74 76 46 76 52 90 C 54 93 53 96 50 96 L 24 96'
}

function leftSide(kind) {
  if (kind === 'F') return 'L 24 24'
  if (kind === 'T') {
    return 'L 24 70 C 24 67 21 66 18 68 C 4 74 4 46 18 52 C 21 54 24 53 24 50 L 24 24'
  }
  return 'L 24 70 C 24 67 27 66 30 68 C 44 74 44 46 30 52 C 27 54 24 53 24 50 L 24 24'
}

function buildJigsaw(north, east, south, west) {
  return [
    'M 24 24',
    topSide(north),
    rightSide(east),
    bottomSide(south),
    leftSide(west),
    'Z',
  ].join(' ')
}

const CORE_SHAPES = {
  classic: buildJigsaw('T', 'B', 'T', 'B'),
  opposite: buildJigsaw('B', 'T', 'B', 'T'),
  'top-tab': buildJigsaw('T', 'B', 'B', 'T'),
  'top-blank': buildJigsaw('B', 'T', 'T', 'B'),
  'side-tab': buildJigsaw('B', 'T', 'B', 'T'),
  'side-blank': buildJigsaw('T', 'B', 'T', 'B'),
  adjacent: buildJigsaw('T', 'T', 'B', 'B'),
  'adjacent-blank': buildJigsaw('B', 'B', 'T', 'T'),
}

const SHAPES = {
  ...CORE_SHAPES,
  // Backwards-compatible aliases for previous piece configurations.
  alt: CORE_SHAPES.opposite,
  adjacentAlt: CORE_SHAPES['adjacent-blank'],
  edge: CORE_SHAPES['top-tab'],
  edgeAlt: CORE_SHAPES['side-tab'],
  edgeBottom: CORE_SHAPES['top-blank'],
  corner: CORE_SHAPES.adjacent,
  cornerAlt: CORE_SHAPES['adjacent-blank'],
  cornerBL: CORE_SHAPES['top-tab'],
  tri: CORE_SHAPES.classic,
  triAlt: CORE_SHAPES.opposite,
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
        viewBox="0 0 120 120"
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
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
