const winConditions = {
  'v-left': [0, 1, 2], // vertical left
  'v-center': [3, 4, 5], // vertical center
  'v-right': [6, 7, 8], // vertical right
  'h-top': [0, 3, 6], // horizontal top
  'h-center': [1, 4, 7], // horizontal center
  'h-bottom': [2, 5, 8], // horizontal bottom
  'diag-down': [0, 4, 8], // diagonal down
  'diag-up': [2, 4, 6], // diagonal up
}

export function isWin(game) {
  for (const [winKey, [a, b, c]] of Object.entries(winConditions)) {
    if (game[a] !== null && game[a] === game[b] && game[b] === game[c]) {
      return winKey
    }
  }

  return false
}
