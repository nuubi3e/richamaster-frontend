<script setup lang="ts">
import AddCoinButton from '@/components/AddCoinButton.vue'
import { ref } from 'vue'

defineProps<{
  changeMode: () => void
}>()

const data = ref<{ id: number; title: string; desc: string[] }[]>([
  {
    id: 1,
    title: 'Подання заявки',
    desc: [
      'Для того, щоб додати криптовалюту на біржу Richamster, необхідно подати заявку та зробити оплату у вигляді монети, яку хочете додати, у еквіваленті не менше 5000 USDT.',
    ],
  },
  {
    id: 2,
    title: 'Початок голосування',
    desc: [
      `Після модерації і оплати заявки, криптовалюта з'являється на біржі, і користувачі можуть почати голосування за неї.`,
    ],
  },
  {
    id: 3,
    title: 'Збір голосів',
    desc: [
      `Для збору голосів надається 45 днів.`,
      `Необхідно набрати 5000 голосів, що еквівалентно 5000 монетам KUB.`,
    ],
  },
  {
    id: 4,
    title: 'Проведення робіт',
    desc: [
      `Коли криптовалюта набирає 100% голосів, вона переходить до розділу лістингу, де проводяться роботи.`,
    ],
  },
  {
    id: 5,
    title: 'Вилучення зі списку',
    desc: [
      `Якщо протягом 45 днів не набрано необхідну кількість голосів, криптовалюта вилучається зі списку учасників на лістинг`,
      `Голоси та оплата за заявку повертаються.`,
    ],
  },
  {
    id: 6,
    title: 'Голосування за монету',
    desc: [
      `Користувачі, які хочуть віддати голоси за монету, повинні мати на рахунку монету KUB.`,
      `Користувачі, обирають монету, за яку хочуть віддати голоси, та вказують кількість голосів.`,
      `Одна монета KUB дорівнює одному голосу.`,
      `Користувач, який віддає голос (де голос - це монета KUB), матиме можливість отримати винагороду у вигляді стейкінгу, що становить 1% за 30 днів від наданих голосів. Виплата здійснюється після закінчення голосування.`,
    ],
  },
  {
    id: 7,
    title: 'Відображення голосів',
    desc: [
      `Після віддання голосу користувачам в умовах відображається список монет, за які вони віддали свої голоси. Голос, який відданий, не може бути скасований до завершення голосування. Якщо монета не набрала 100% за 45 днів і знімається з лістингу, монету (голоси) KUB буде повернено на ваш баланс.`,
    ],
  },
  {
    id: 8,
    title: 'Розділення AIRDROP',
    desc: [
      `Користувачі, які проголосували за монету, яка пройшла лістинг, отримують AIRDROP, що становить половину від оплаченої суми за лістинг. Ці монети будуть додані на біржу і розподілені  у відсотках серед усіх учасників які віддали свої голоси.`,
    ],
  },
])
</script>

<template>
  <div class="flex flex-col gap-4 h-max py-3">
    <h2 class="text-center text-xl text-yellow-light">
      Опис процесу лістингу на біржі криптовалют Richamster:
    </h2>

    <ol class="flex flex-col gap-2 font-[300] text-base">
      <li v-for="el in data" :key="el.id" class="text-yellow-light">
        {{ el.id }}. {{ el.title }}

        <ul>
          <li v-for="list in el.desc" :key="list" class="text-white pl-3">
            - {{ list }}
          </li>
        </ul>
      </li>
    </ol>

    <div class="self-center mb-5 mt-1">
      <AddCoinButton :change-mode="changeMode" />
    </div>
  </div>
</template>
