<script setup lang="ts">
import type { CoinDetails } from '@/lib/types'
import { API_URL } from '@/lib/util'
import { onMounted, ref } from 'vue'

const coins = ref<CoinDetails[]>([])
const mode = ref<'vote' | 'list'>('vote')

async function getAllCoins() {
  try {
    const res = await fetch(`${API_URL}/listing/coins/`)
    const data = await res.json()

    console.log(data)
    coins.value = data.filter((coin: CoinDetails) => coin.user_votes > 0)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getAllCoins()
})
</script>

<template>
  <div class="flex flex-col mt-5 mb-8">
    <h3 class="text-off-white text-center">сума голосу за останню монету</h3>
    <p class="text-yellow-light font-medium text-center text-xl mb-4">
      100 KUB
    </p>
    <h3 class="text-off-white text-center">залишковий баланс</h3>
    <p class="text-yellow-light font-medium text-center text-xl">900 KUB</p>
  </div>

  <div class="flex flex-col gap-2">
    <div class="flex gap-1">
      <input
        type="radio"
        name="filter"
        id="userCoin"
        @change="(e) => {if((e.target as HTMLInputElement).checked) mode = 'vote'}"
        hidden
        checked
        class="filterCheckbox" />
      <label
        for="userCoin"
        class="px-1 flex-1 border-2 font-medium rounded outline-none transition-all flex justify-center items-center select-none border-off-white text-off-white cursor-pointer">
        ваша голос
      </label>
      <input
        type="radio"
        name="filter"
        id="userList"
        @change="(e) => {if((e.target as HTMLInputElement).checked) mode = 'list'}"
        hidden
        class="filterCheckbox" />
      <label
        for="userList"
        class="px-1 flex-1 border-2 border-off-white font-medium rounded outline-none transition-all flex justify-center items-center select-none text-off-white cursor-pointer">
        ваша монета
      </label>
    </div>

    <ul class="flex flex-col gap-2">
      <li v-if="mode === 'list'" class="text-center text-off-white text-xl">
        Comming Soon
      </li>
      <li
        v-if="coins.length === 0 && mode !== 'list'"
        class="text-center text-off-white text-xl">
        No Coins Found!!
      </li>
      <li
        role="button"
        v-for="(coin, index) in coins"
        :key="coin.pk"
        class="py-1 px-3 text-off-white text-sm border-2 border-off-white rounded-md outline-none transition-all flex justify-between items-center select-none font-medium">
        {{ index + 1 }}. {{ coin.short_title }} ({{ coin.title }})
        <p>{{ coin.user_votes }} / {{ coin.total_votes }}</p>
      </li>
    </ul>
  </div>
</template>
