<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
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
    class="container min-w-full min-h-lg bg-cover bg-center grid place-items-center"
    :style="{ 'background-image': `url(${landingPageBackground})` }"
  >
    <h2 class="font-sans text-7xl text-center text-slate-50">
      Where's muh deck
    </h2>
  </div>
  <div class="container mx-auto max-w-min min-h-min">
    <div
      class="container relative bottom-15 mx-auto bg-gray-100 h-32 w-192 rounded-lg shadow-md flex flex-row place-items-center"
    >
      <div class="w-full md:w-1/6 px-3">
        <label
          for="models"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Model
        </label>
        <select
          id="models"
          v-model="model"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div class="w-full md:w-1/6 px-3">
        <label
          for="regions"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Region
        </label>
        <select
          id="regions"
          v-model="region"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="reserve-time"
        >
          Reserve Time
        </label>
        <input
          id="reserve-time"
          v-model="reserveTime"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="number"
          placeholder="Reserve Time"
        >
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        @click="checkDeckProgress"
      >
        Check Deck
      </button>
    </div>
  </div>
</template>
