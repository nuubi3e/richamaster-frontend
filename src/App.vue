<script setup lang="ts">
import Header from './components/Header.vue'
import HomeScreen from './screens/HomeScreen.vue'
import CoinListScreen from './screens/CoinListScreen.vue'
import NewCoinScreen from './screens/NewCoinScreen.vue'
import CoinInfoScreen from './screens/CoinInfoScreen.vue'
import type { CoinDetails, Modes } from './lib/types'
import CoinDetailScreen from './screens/CoinDetailScreen.vue'
import { ref } from 'vue'
import LoginModal from './components/LoginModal.vue'
import { connectToAPI } from './lib/util'

const mode = ref<Modes>('default')
const coinInfo = ref<CoinDetails | null>(null)
const setCoinDetails = (coin: CoinDetails) => {
  coinInfo.value = coin

  console.log(coin)
}
const changeMode = (value: Modes) => (mode.value = value)

const isLoggedIn = ref<boolean>(
  localStorage.getItem('isLoggedIn') ? true : false
)
const showAuthForm = ref<boolean>(false)
const setShowForm = (value: boolean) => (showAuthForm.value = value)
const logOut = () => {
  localStorage.clear()
  isLoggedIn.value = false
  changeMode('default')
}

const changeModeToListCoin = () => {
  isLoggedIn.value ? changeMode('add') : setShowForm(true)
}

const coins = ref<CoinDetails[]>([]) // to store all
// function to fetch coins
async function getAllCoins() {
  try {
    const res = await connectToAPI({ method: 'GET', endpoint: 'listing/coins' })
    coins.value = res
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <LoginModal
    v-if="showAuthForm"
    :close-form="() => setShowForm(false)"
    :login="() => (isLoggedIn = true)" />
  <Header
    :open-login-form="() => setShowForm(true)"
    :is-logged-in="isLoggedIn"
    :log-out="logOut" />
  <section class="px-5 py-3 flex-1 overflow-hidden">
    <main class="flex w-[1400px] max-[1410px]:w-full mx-auto h-full">
      <!-- Left -->
      <aside class="w-[23%] h-full flex flex-col">
        <CoinListScreen
          :change-mode="() => changeMode('list')"
          :set-active-coin="setCoinDetails"
          :coins="coins"
          :get-all-coins="getAllCoins"
          :mode="mode" />
      </aside>

      <div class="h-full w-[2px] bg-bdy-grey rounded-full" />
      <!-- middle -->
      <section class="w-[54%] px-8 overflow-y-auto hideScrollBar">
        <HomeScreen
          :change-mode="() => changeModeToListCoin()"
          v-if="mode === 'default'" />
        <NewCoinScreen
          v-if="mode === 'add'"
          :change-mode="() => changeMode('default')" />
        <CoinDetailScreen v-if="mode === 'list' && coinInfo" :coin="coinInfo" />
      </section>

      <div class="h-full w-[2px] bg-bdy-grey rounded-full" />
      <!-- Right -->
      <aside class="w-[23%] h-full flex flex-col">
        <CoinInfoScreen
          :change-mode="() => changeModeToListCoin()"
          :mode="mode"
          :get-all-coins="getAllCoins"
          :is-logged-in="isLoggedIn"
          :coin-details="coinInfo" />
      </aside>
    </main>
  </section>
</template>
