const HIGHLIGHT_COLOR = 'rgb(167 139 250 / 0.9)'
const HIGHLIGHT_WIDTH = 2

export function getColumnHighlight(
  isHovered: boolean,
  edges: { top?: boolean; bottom?: boolean } = {}
) {
  if (!isHovered) return undefined

  const shadows = [
    `inset ${HIGHLIGHT_WIDTH}px 0 0 0 ${HIGHLIGHT_COLOR}`,
    `inset -${HIGHLIGHT_WIDTH}px 0 0 0 ${HIGHLIGHT_COLOR}`
  ]

  if (edges.top) shadows.push(`inset 0 ${HIGHLIGHT_WIDTH}px 0 0 ${HIGHLIGHT_COLOR}`)
  if (edges.bottom) shadows.push(`inset 0 -${HIGHLIGHT_WIDTH}px 0 0 ${HIGHLIGHT_COLOR}`)

  return shadows.join(', ')
}
