<script setup lang="ts">
import AddCoinButton from '@/components/AddCoinButton.vue'
import CoinLinks from '@/components/CoinLinks.vue'
import UserCoinList from '@/components/UserCoinList.vue'
import VoteForm from '@/components/VoteForm.vue'
import type { CoinDetails, Modes } from '@/lib/types'

defineProps<{
  changeMode: () => void
  mode: Modes
  coinDetails: CoinDetails | null
  isLoggedIn: boolean
  getAllCoins: () => Promise<void>
}>()
</script>

<template>
  <div
    class="flex flex-col border-b-2 border-bd-aside-gray items-center gap-3 pb-3">
    <h2 class="text-off-white text-center text-2xl">список нових монет</h2>

    <AddCoinButton :change-mode="changeMode" />
  </div>

  <section class="flex-1 overflow-y-auto hideScrollBar px-10">
    <UserCoinList v-if="mode !== 'list' || !isLoggedIn" />
    <VoteForm
      v-if="mode === 'list' && coinDetails && isLoggedIn"
      :get-all-coins="getAllCoins"
      :coin="coinDetails" />
    <CoinLinks v-if="mode === 'list' && isLoggedIn" />
  </section>
</template>
