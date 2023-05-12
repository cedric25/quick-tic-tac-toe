export function isWin(game) {
  if (game[0][0] !== null && game[0][0] === game[0][1] && game[0][1] === game[0][2]) return 'v-left'
  if (game[1][0] !== null && game[1][0] === game[1][1] && game[1][1] === game[1][2])
    return 'v-center'
  if (game[2][0] !== null && game[2][0] === game[2][1] && game[2][1] === game[2][2])
    return 'v-right'

  if (game[0][0] !== null && game[0][0] === game[1][0] && game[1][0] === game[2][0]) return 'h-top'
  if (game[0][1] !== null && game[0][1] === game[1][1] && game[1][1] === game[2][1])
    return 'h-center'
  if (game[0][2] !== null && game[0][2] === game[1][2] && game[1][2] === game[2][2])
    return 'h-bottom'

  if (game[0][0] !== null && game[0][0] === game[1][1] && game[1][1] === game[2][2])
    return 'diag-down'
  if (game[2][0] !== null && game[2][0] === game[1][1] && game[1][1] === game[0][2])
    return 'diag-up'

  return false
}
