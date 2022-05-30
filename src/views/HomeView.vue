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
    class="container grid place-items-center min-w-full h-56 bg-center bg-cover sm:h-80"
    :style="{ 'background-image': `url(${landingPageBackground})` }"
  >
    <p class="font-sans text-5xl text-center text-slate-50 md:text-6xl lg:text-7xl">
      Where's muh deck
    </p>
  </div>
  <div class="mx-auto min-w-max min-h-min">
    <div
      class="flex relative bottom-16 flex-col place-items-center p-6 mx-auto  w-3/4 bg-gray-100 rounded-lg shadow-md lg:flex-row lg:p-6 "
    >
      <div class="flex flex-col items-end w-full lg:flex-row">
        <div class="pr-3 w-full">
          <label
            for="models"
            class="block mb-2 text-sm tracking-wide  text-gray-700"
          >
            Model
          </label>
          <select
            id="models"
            v-model="model"
            class="px-2 w-full h-14 text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
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
            class="block my-2 mt-4 text-sm font-medium tracking-wide text-gray-700 lg:mt-0"
          >
            Region
          </label>
          <select
            id="regions"
            v-model="region"
            class="px-2 w-full h-14 text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
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
            class="block mt-4 mb-2 text-sm font-medium tracking-wide text-gray-700  lg:mt-0"
            for="reserve-time"
          >
            Reserve Time
          </label>
          <input
            id="reserve-time"
            v-model="reserveTime"
            class="px-2 w-full h-14 text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
            type="number"
            placeholder="1626459367"
          >
        </div>
        <button
          class="inline-flex justify-center items-center py-3 px-6 mt-6 ml-8 w-full h-14 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm lg:mt-0 lg:w-7/12"
          @click="checkDeckProgress"
        >
          Check Deck
        </button>
      </div>
    </div>
  </div>
</template>
