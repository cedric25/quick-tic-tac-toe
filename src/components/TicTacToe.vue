<template>
  <div class="flex flex-col gap-y-8 px-10 text-center">
    <div class="text-xl">
      Playing: <span class="pl-3 text-4xl font-light">{{ currentPlayer }}</span>
    </div>

    <div class="relative mx-auto flex h-full w-full max-w-lg border">
      <div
        v-for="(row, rowIndex) in gameToDisplay"
        :key="rowIndex"
        class="flex w-full flex-col items-center"
      >
        <button
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          type="button"
          class="flex aspect-square w-full items-center justify-center border text-2xl font-light transition-colors hover:bg-gray-100"
          :class="disableAll ? 'bg-amber-50 hover:!bg-amber-50' : ''"
          :disabled="cell !== null || disableAll"
          @click="play(rowIndex * 3 + cellIndex)"
        >
          {{ cell }}
        </button>
      </div>

      <div
        class="absolute h-px w-[90%] origin-left scale-0 bg-gray-400"
        :class="{
          'scale-100 transition duration-700 ease-in-out': startDrawingLine,
          'left-[5%] top-[calc(50%-33%+1px)]': winResult === 'h-top',
          'left-[5%] top-[calc(50%+2px)]': winResult === 'h-center',
          'left-[5%] top-[calc(50%+33%+3px)]': winResult === 'h-bottom',
          'left-[calc(50%-33%-1px)] top-[5%] rotate-90': winResult === 'v-left',
          'left-[50%] top-[5%] rotate-90': winResult === 'v-center',
          'left-[calc(50%+33%+1px)] top-[5%] rotate-90': winResult === 'v-right',
          'left-[10%] top-[10%] w-[115%] rotate-[45deg]': winResult === 'diag-down',
          'left-[10%] top-[90%] w-[115%] -rotate-[45deg]': winResult === 'diag-up',
        }"
      ></div>
    </div>

    <div class="text-xl">
      {{ endMessage }}
    </div>

    <div class="mt-2">
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
import { ref, reactive, computed, watch } from 'vue'
import { isWin } from '../models/ticTacToe.models.js'

const game = reactive(Array(9).fill(null))

const currentPlayer = ref('x')
const endMessage = ref('')
const disableAll = ref(false)
const startDrawingLine = ref(false)
const winResult = ref('')

const gameToDisplay = computed(() => {
  return [game.slice(0, 3), game.slice(3, 6), game.slice(6, 9)]
})

function play(cellIndex) {
  game[cellIndex] = currentPlayer.value
  currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
}

function restart() {
  startDrawingLine.value = false
  Object.assign(game, Array(9).fill(null))
  endMessage.value = ''
  disableAll.value = false
  currentPlayer.value = 'x'
}

watch(
  game,
  newGame => {
    winResult.value = isWin(newGame)
    if (winResult.value) {
      endMessage.value = `There is a winner! ${currentPlayer.value === 'x' ? 'o' : 'x'}`
      endOfGame()
    } else if (newGame.every(cell => cell !== null)) {
      endMessage.value = 'Game over!'
      endOfGame()
    }
  },
  { deep: true }
)

function endOfGame() {
  disableAll.value = true
  if (winResult.value) {
    setTimeout(() => {
      startDrawingLine.value = true
    })
  }
  currentPlayer.value = '-'
}
</script>
