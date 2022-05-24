<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from "vue-router";
import { useFetch } from '@vueuse/core'

const currentDeckShipmentProgress = ref();
const userDeckProgress = ref();
onMounted(async () => {
  // Fetch latest steam order date
  const { data } = await useFetch("/ordertracking.json").json();
  currentDeckShipmentProgress.value = data.value;
});

const computeDeckProgress = (deckDetails) => {
  const { deck, reserveTime } = deckDetails;
  const preorderEpoch = 1626454800;
  const bestTime = currentDeckShipmentProgress.value[deck].reserveTime;

  userDeckProgress.value = ((bestTime - preorderEpoch) / (reserveTime - preorderEpoch)) * 100;
}
</script>

<template>
  <RouterView @checkDeckProgress="computeDeckProgress" />
  <p v-if="userDeckProgress">Your SteamDeck is currently {{userDeckProgress}}% of the way there!</p>
</template>

<style>
</style>
