<script setup lang="ts">
import landingPageBackground from '../assets/steamdeckrender1.jpeg'

const emit = defineEmits(['checkDeckProgress'])

const model = ref('64GB')
const region = ref('US')
const reserveTime = ref()

const deck = computed(() => {
  return region.value + model.value
})

function checkDeckProgress() {
  if (reserveTime.value) {
    emit('checkDeckProgress', {
      deck: deck.value,
      reserveTime: reserveTime.value,
    })
  }
}
</script>

<template>
  <div
    class="container grid place-items-center min-w-full h-80 bg-center bg-cover"
    :style="{ 'background-image': `url(${landingPageBackground})` }"
  >
    <h2 class="font-sans text-7xl text-center text-slate-50">
      Where's muh deck
    </h2>
  </div>
  <div class="mx-auto min-w-max min-h-min">
    <div
      class="flex relative bottom-16 flex-col place-items-center p-4 mx-auto w-3/4 bg-gray-100 rounded-lg shadow-md lg:flex-row"
    >
      <div class="pr-3 w-full">
        <label
          for="models"
          class=" block mb-2 text-xs font-bold  tracking-wide text-gray-700 uppercase"
        >
          Model
        </label>
        <select
          id="models"
          v-model="model"
          class="block p-2.5 w-full text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
        >
          <option value="64GB" selected>
            64GB
          </option>
          <option value="256GB">
            256GB
          </option>
          <option value="512GB">
            512GB
          </option>
        </select>
      </div>

      <div class="pr-3 w-full">
        <label
          for="regions"
          class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        >
          Region
        </label>
        <select
          id="regions"
          v-model="region"
          class="block p-2.5 w-full text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
        >
          <option value="US">
            US
          </option>
          <option value="UK">
            UK
          </option>
          <option value="EU">
            EU
          </option>
        </select>
      </div>

      <div class="pr-3 w-full">
        <label
          class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
          for="reserve-time"
        >
          Reserve Time
        </label>
        <input
          id="reserve-time"
          v-model="reserveTime"
          class="block py-3 px-4 w-full leading-tight text-gray-700 bg-gray-200 focus:bg-white rounded border border-gray-200 focus:border-gray-500 focus:outline-none appearance-none"
          type="number"
          placeholder="Reserve Time"
        >
      </div>
      <button
        class="py-2 px-4 mt-5 w-1/2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
        @click="checkDeckProgress"
      >
        Check Deck
      </button>
    </div>
  </div>
</template>
