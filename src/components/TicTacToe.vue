<template>
  <div class="flex flex-col gap-y-4 text-center">
    <div>Playing: {{ currentPlayer }}</div>

    <div class="relative mx-auto flex h-full w-full max-w-xl border">
      <div v-for="(row, rowIndex) in game" class="flex w-full flex-col items-center">
        <button
          type="button"
          v-for="(cell, cellIndex) in row"
          class="flex w-full flex-1 justify-center border py-10 text-2xl font-light hover:bg-gray-100"
          :class="disableAll ? 'bg-amber-50 hover:!bg-amber-50' : ''"
          :disabled="cell !== null || disableAll"
          @click="play(rowIndex, cellIndex)"
        >
          {{ cell ?? '&nbsp;' }}
        </button>
      </div>

      <div
        class="absolute left-7 h-px w-[90%] origin-left scale-0 bg-gray-400"
        :class="{
          'scale-100 transition duration-700 ease-in-out': startDrawingLine,
          'top-[59px]': winResult === 'h-top',
          'top-[173px]': winResult === 'h-center',
          'top-[287px]': winResult === 'h-bottom',
          'left-[96px] top-7 w-[290px] rotate-90': winResult === 'v-left',
          'left-[287px] top-7 w-[290px] rotate-90': winResult === 'v-center',
          'left-[478.5px] top-7 w-[290px] rotate-90': winResult === 'v-right',
          'left-[46px] top-7 w-[545px] rotate-[31deg]': winResult === 'diag-down',
          'left-[50px] top-[314px] w-[550px] rotate-[-30.6deg]': winResult === 'diag-up',
        }"
      ></div>
    </div>

    <div>
      {{ message }}
    </div>

    <div class="mt-4">
      <button
        type="button"
        class="rounded border border-cyan-200 px-4 py-2 transition hover:scale-[1.05] hover:bg-cyan-100"
        :class="disableAll ? 'animate-bounce shadow-lg' : ''"
        @click="restart"
      >
        Restart game
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { isWin } from '../models/ticTacToe.models.js'

let game = reactive([
  [null, null, null],
  [null, null, null],
  [null, null, null],
])

const currentPlayer = ref('x')
const message = ref('')
const disableAll = ref(false)
const startDrawingLine = ref(false)
const winResult = ref('')

function play(row, col) {
  game[row][col] = currentPlayer.value
  currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
}

function restart() {
  startDrawingLine.value = false
  Object.assign(game, [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  message.value = ''
  disableAll.value = false
  currentPlayer.value = 'x'
}

watch(
  game,
  newGame => {
    winResult.value = isWin(newGame)
    if (winResult.value) {
      message.value = `There is a winner! ${currentPlayer.value === 'x' ? 'o' : 'x'}`
      endOfGame()
    } else if (newGame.flat().every(cell => cell !== null)) {
      message.value = 'Game over!'
      endOfGame()
    }
  },
  { deep: true }
)

function endOfGame() {
  disableAll.value = true
  setTimeout(() => {
    startDrawingLine.value = true
  })
  currentPlayer.value = '-'
}
</script>
