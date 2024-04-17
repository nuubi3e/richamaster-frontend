<script setup lang="ts">
import type { CoinDetails } from '@/lib/types'
import { connectToAPI } from '@/lib/util'
import { ref } from 'vue'
const props = defineProps<{
  coin: CoinDetails
  getAllCoins: () => Promise<void>
}>()
const vote = ref<string>()
const totalCoin = ref<number>(1000)
const remainingCoin = ref<number>(1000)
const showPopup = ref<boolean>(false)

const coinVoteHandler = async () => {
  try {
    if (!vote.value || isNaN(+vote.value)) return

    const formData = new FormData()

    formData.append('votes', +vote.value as unknown as Blob)

    const res = await connectToAPI({
      endpoint: `listing/coins/${props.coin.pk}/vote`,
      method: 'POST',
      body: formData,
    })

    console.log(res)
    showPopup.value = true
    props.getAllCoins()
    vote.value = ''
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div
    v-if="showPopup"
    class="fixed top-0 left-0 w-full h-full bg-black z-[999] bg-opacity-20 backdrop-blur-[2px]">
    <div
      class="w-[400px] mx-auto mt-5 bg-primary text-white rounded-xl p-8 relative">
      <button
        @click="showPopup = false"
        type="button"
        class="absolute top-0 right-0 bg-off-white bg-opacity-30 px-2 py-1">
        <font-awesome-icon icon="fa-solid fa-x" />
      </button>
      <p>
        {{ `Vote has been added.` }}
      </p>
    </div>
  </div>
  <div class="flex flex-col my-5">
    <h2 class="text-lg text-off-white text-center">
      голосувати за включення: {{ coin.short_title }}
    </h2>
    <p class="text-xl text-yellow-light text-center">100 KUB</p>

    <form
      action=""
      @submit.prevent="() => coinVoteHandler()"
      class="flex flex-col gap-3 mt-5">
      <div class="flex flex-col">
        <label for="curBalance" class="text-off-white">
          поточний баланс:
        </label>
        <input
          type="text"
          name="curBalance"
          id="tile"
          class="new-coin-inp"
          v-model="totalCoin"
          disabled />
      </div>
      <div class="flex flex-col">
        <label for="voteAmount" class="text-off-white">
          сума для голосування:
        </label>
        <input
          type="number"
          v-model="vote"
          @input="(e) => {
            const value = (e.target as HTMLInputElement).value
            vote = value
            remainingCoin = totalCoin - +vote
          }"
          name="voteAmount"
          id="tile"
          class="new-coin-inp" />
      </div>
      <div class="flex flex-col">
        <label for="title" class="text-off-white"> залишковий баланс: </label>
        <input
          type="text"
          name="title"
          id="tile"
          class="new-coin-inp"
          v-model="remainingCoin"
          disabled />
      </div>

      <button
        type="submit"
        class="text-yellow-dark self-center font-medium px-4 rounded-md border-2 border-yellow-dark transition-all hover:bg-yellow-dark hover:text-primary mt-1">
        голосувати
      </button>
    </form>
  </div>
</template>
