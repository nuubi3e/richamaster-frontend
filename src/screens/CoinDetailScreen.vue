<script setup lang="ts">
import type { CoinDetails } from '@/lib/types'

defineProps<{ coin: CoinDetails | null }>()
</script>

<template>
  <div class="flex flex-col">
    <!-- heading -->
    <h2 class="text-center text-3xl font-medium text-white mb-10">
      деталі монети
    </h2>
    <!-- Vote Info -->
    <section class="flex justify-between items-start">
      <div class="flex flex-col text-off-white">
        <p class="text-yellow-light text-center text-lg">
          Днів, що залишилися:
        </p>
        <p class="text-4xl text-center"><strong>2500</strong></p>
      </div>
      <div class="flex flex-col text-off-white">
        <p class="text-yellow-light text-center text-lg">залишилася монета:</p>
        <p class="text-4xl text-center"><strong>10000</strong></p>
      </div>
    </section>

    <!-- Graph -->
    <section class="relative self-center">
      <div class="piechart w-[210px] aspect-square rounded-full" />
      <div
        class="absolute top-1/2 left-1/2 rounded-full w-[160px] aspect-square border-[10px] border-primary flex flex-col gap-2 items-center justify-center translate-x-[-50%] translate-y-[-50%] bg-graph-center">
        <h3 class="text-2xl text-white font-semibold">
          {{ coin?.short_title }}
        </h3>
        <p class="text-center text-yellow-light text-lg font-semibold">
          2500/10000
        </p>
      </div>
    </section>

    <!-- Coin Info -->
    <div class="flex flex-col gap-4 mt-3">
      <div class="flex flex-col text-justify">
        <h4 class="text-yellow-light">Тикер монети:</h4>
        <p class="text-white">{{ coin?.short_title }}</p>
      </div>
      <div class="flex flex-col text-justify">
        <h4 class="text-yellow-light">монетне посилання:</h4>
        <p class="text-white">
          <a :href="coin?.website" target="_blank">{{ coin?.website }}</a>
        </p>
      </div>
      <div class="flex flex-col text-justify">
        <h4 class="text-yellow-light">Опис монети:</h4>
        <p class="text-white">{{ coin?.description }}</p>
      </div>
    </div>
  </div>
</template>
