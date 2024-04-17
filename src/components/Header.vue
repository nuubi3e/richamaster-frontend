<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type CoinList, type CoinStatus } from '@/lib/types'
import { connectToAPI } from '@/lib/util'
import { onMounted, ref } from 'vue'

const generateCoins = () =>
  Array.from({ length: 12 }).map((_, i) => {
    let status: CoinStatus = 'neutral'
    const defaultCoinValue = 212000000

    const coinValue =
      Math.floor(Math.random() * (215000000 - 150000000 + 1)) + 190000000

    if (coinValue > defaultCoinValue) status = 'up'
    else status = 'down'

    return {
      id: i.toString(),
      name: 'BTC-UAH',
      price: coinValue,
      status,
    }
  })

const coins = ref<CoinList[]>(generateCoins())

// generating coins
setInterval(() => {
  coins.value = generateCoins()
}, 1000)

defineProps<{
  openLoginForm: () => void
  isLoggedIn: boolean
  logOut: () => void
}>()

const fetchList = async () => {
  try {
    const res = await connectToAPI({
      endpoint: 'trade/currency_pairs',
      method: 'GET',
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchList()
})
</script>

<template>
  <header>
    <nav
      class="border-b border-top-br-grey py-3 pr-8 flex items-center justify-between text-off-white">
      <div class="flex items-center gap-5">
        <img src="../assets/logo.png" alt="logo" class="h-9 w-auto -mr-5" />

        <a
          href="https://richamster.com/kub/"
          target="_blank"
          class="outline-none transition-all hover:text-yellow-light uppercase"
          >КУБ</a
        >
        <a
          href="https://richamster.com/rates/"
          target="_blank"
          class="outline-none transition-all hover:text-yellow-light"
          >ТАРИФИ</a
        >
        <a
          href="https://news.richamster.com/"
          target="_blank"
          class="outline-none transition-all hover:text-yellow-light"
          >НОВИНИ</a
        >
        <a
          href="https://richamster.com/helpua/"
          target="_blank"
          class="outline-none transition-all hover:text-yellow-light"
          >#ДОПОМОГА</a
        >
      </div>

      <div class="flex items-center gap-5 font-[300]">
        <button
          type="button"
          @click="() => (isLoggedIn ? logOut() : openLoginForm())"
          class="flex items-center gap-3 outline-none hover:text-yellow-light">
          <font-awesome-icon icon="fa-solid fa-lock" v-if="!isLoggedIn" />
          {{ isLoggedIn ? 'EXIT' : 'LOGIN' }}
        </button>
        <!-- <p class="flex items-center gap-3">UA</p> -->
      </div>
    </nav>

    <!-- coins list -->
    <section
      class="w-full overflow-x-scroll hideScrollBar border-b border-top-br-grey">
      <ul
        class="py-3 text-sm flex items-center min-w-max max-w-full animate-left-right">
        <li
          v-for="coin in coins"
          :key="coin.id"
          class="px-4 flex items-center gap-2 border-r-2 border-top-br-grey font-semibold coinList">
          <p class="text-yellow-dark">{{ coin.name }}</p>
          <p :class="[coin.status]">
            {{ new Intl.NumberFormat('en-US').format(coin.price) }}
          </p>
        </li>
      </ul>
    </section>
  </header>
</template>
