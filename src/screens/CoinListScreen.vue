<script setup lang="ts">
import type { CoinDetails, Modes } from '@/lib/types'
import { onMounted, ref } from 'vue'

// defining props
const props = defineProps<{
  changeMode: () => void
  setActiveCoin: (coin: CoinDetails) => void
  mode: Modes
  coins: CoinDetails[]
  getAllCoins: () => Promise<void>
}>()
const loading = ref<boolean>(false)
const searchInp = ref<string>('')
const curActiveCoin = ref<number>(0) // to store index of currently selected coin
const setCurActiveCoin = (coinId: number) => (curActiveCoin.value = coinId) // fn to set active coin index
const filteredCoins = ref<CoinDetails[]>([]) // to store filtered coins to add search functionality of coins
// function to filter coins based on user input
const filterCoins = (e: Event) => {
  const value = (e.target as HTMLInputElement).value.trim().toLowerCase()
  searchInp.value = value
  if (!value) return (filteredCoins.value = [])

  filteredCoins.value = props.coins.filter(
    (coin) =>
      coin.title.toLowerCase().includes(value) ||
      coin.short_title.toLowerCase().includes(value)
  )
}

// function to fetch coins
async function fetchCoins() {
  loading.value = true

  await props.getAllCoins()

  loading.value = false
}

// fetching coins when component get mounted
onMounted(() => {
  fetchCoins()
})
</script>

<template>
  <div
    class="flex flex-col border-b-2 border-bd-aside-gray items-center gap-3 pb-3">
    <h2 class="text-off-white text-center text-2xl">список монет</h2>

    <input
      type="search"
      name="coinSearch"
      id="coinSearch"
      @input="filterCoins"
      placeholder="ПОШУК МОНЕТ"
      class="outline-none px-3 py-1 text-white border border-off-white rounded-md text-center bg-transparent" />
  </div>

  <section class="flex flex-col px-6 py-3 flex-1 overflow-y-auto coinScroll">
    <h3 class="bg-yellow-dark rounded text-white text-center px-3 text-2xl">
      всі монети
    </h3>
    <ul class="flex flex-col mt-2 gap-2" v-if="searchInp">
      <li
        role="button"
        v-for="(coin, index) in filteredCoins"
        :key="coin.pk"
        @click="
          () => {
            setActiveCoin(coin)
            setCurActiveCoin(coin.pk)
            changeMode()
          }
        "
        class="py-1 px-3 text-sm border-2 rounded-md outline-none transition-all flex justify-between items-center select-none font-medium"
        :class="{
          'text-off-white border-off-white':
            curActiveCoin !== coin.pk || mode !== 'list',
          'text-yellow-dark border-yellow-dark':
            curActiveCoin === coin.pk && mode === 'list',
        }">
        {{ index + 1 }}. {{ coin.short_title }} ({{ coin.title }})
        <p>{{ coin.user_votes }} / {{ coin.total_votes }}</p>
      </li>
    </ul>
    <ul class="flex flex-col mt-2 gap-2" v-if="!searchInp">
      <li class="text-center mt-3 text-xl text-off-white" v-if="loading">
        Loading...
      </li>
      <li
        class="text-center mt-3 text-xl text-off-white"
        v-if="coins.length === 0 && !loading">
        No Coins Found!!
      </li>
      <li
        role="button"
        v-for="(coin, index) in coins"
        :key="coin.pk"
        @click="
          () => {
            setActiveCoin(coin)
            setCurActiveCoin(coin.pk)
            changeMode()
          }
        "
        class="py-1 px-3 text-sm border-2 rounded-md outline-none transition-all flex justify-between items-center select-none font-medium"
        :class="{
          'text-off-white border-off-white':
            curActiveCoin !== coin.pk || mode !== 'list',
          'text-yellow-dark border-yellow-dark':
            curActiveCoin === coin.pk && mode === 'list',
        }">
        {{ index + 1 }}. {{ coin.short_title }} ({{ coin.title }})
        <p>{{ coin.user_votes }} / {{ coin.total_votes }}</p>
      </li>
    </ul>
  </section>
</template>
