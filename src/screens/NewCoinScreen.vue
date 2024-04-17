<script setup lang="ts">
import { connectToAPI } from '@/lib/util'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'

const showPopup = ref<boolean>(false)
const popupText = ref<string>('')
const setShowPopup = (val: boolean) => (showPopup.value = val)

interface NewCoinInfo {
  description: string
  short_title: string
  telegram: string
  title: string
  website: string
  technical_details: string
  facebook: string
  twitter: string
}

const newCoinSchema = yup.object({
  description: yup.string().required('Field is Required').max(600),
  title: yup.string().required('Field is Required'),
  website: yup.string().url('Invalid Url').required('Field is Required'),
  short_title: yup.string().required('Field is Required'),
  technical_details: yup.string().required('Field is Required'),
  telegram: yup.string().url('Inavid URL').required('Field is Required'),
  facebook: yup.string().url('Inavid URL'),
  twitter: yup.string().url('Inavid URL'),
})

const onSubmit = async (values: any) => {
  const userData = values as NewCoinInfo
  console.log(values)
  try {
    const formData = new FormData()
    const social_pages = []

    userData?.facebook && social_pages.push({ url: userData?.facebook })
    userData?.twitter && social_pages.push({ url: userData?.twitter })

    formData.append('description', userData.description)
    formData.append('title', userData.title)
    formData.append('website', userData.website)
    formData.append('short_title', userData.short_title)
    formData.append('technical_details', userData.technical_details)
    formData.append('telegram', userData.telegram)
    formData.append('social_pages', social_pages as unknown as Blob)

    const res = await connectToAPI({
      endpoint: 'listing/coins',
      method: 'POST',
      body: JSON.stringify({
        description: userData.description,
        title: userData.title,
        website: userData.website,
        short_title: userData.short_title,
        technical_details: userData.technical_details,
        telegram: userData.telegram,
        social_pages: social_pages,
      }),
    })

    popupText.value = res?.message?.text
    setShowPopup(true)
  } catch (err) {
    console.error(err)
  }
}

defineProps<{
  changeMode: () => void
}>()
</script>

<template>
  <div
    v-if="showPopup"
    class="fixed top-0 left-0 w-full h-full bg-black z-[999] bg-opacity-20 backdrop-blur-[2px]">
    <div
      class="w-[400px] mx-auto mt-5 bg-primary text-white rounded-xl p-8 relative">
      <button
        type="button"
        @click="
          () => {
            changeMode()
          }
        "
        class="absolute top-0 right-0 bg-off-white bg-opacity-30 px-2 py-1">
        <font-awesome-icon icon="fa-solid fa-x" />
      </button>
      <p>
        {{
          popupText ||
          `Дякуємо! Ваша заявка на модерації. Протягом 48 годин вона буде
        розглянута. При позитивному рішенні монета буде додана в список
        претендентів для лістингу!.`
        }}
      </p>
    </div>
  </div>
  <Form
    :validation-schema="newCoinSchema"
    @submit="
      (e) => {
        onSubmit(e)
      }
    "
    class="grid grid-cols-2 gap-x-3 gap-y-2">
    <h2 class="col-span-2 text-3xl text-yellow-light mb-6 text-center">
      список нових монет
    </h2>

    <div class="flex flex-col">
      <label for="title" class="text-yellow-light"> *Назва монети: </label>
      <Field type="text" name="title" id="title" class="new-coin-inp" />
      <ErrorMessage name="title" class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="short_title" class="text-yellow-light">
        *Тикер монети:
      </label>
      <Field
        type="text"
        name="short_title"
        id="short_title"
        class="new-coin-inp" />
      <ErrorMessage
        name="short_title"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="website" class="text-yellow-light"> *Сайт монет: </label>
      <Field type="text" name="website" id="website" class="new-coin-inp" />
      <ErrorMessage
        name="website"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="technical_details" class="text-yellow-light">
        *Посилання на GitHub:
      </label>
      <Field
        type="text"
        name="technical_details"
        id="technical_details"
        class="new-coin-inp" />
      <ErrorMessage
        name="technical_details"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="facebook" class="text-yellow-light"> Facebook: </label>
      <Field type="text" name="facebook" id="facebook" class="new-coin-inp" />
      <ErrorMessage
        name="facebook"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="telegram" class="text-yellow-light"> Telegram: </label>
      <Field type="text" name="telegram" id="telegram" class="new-coin-inp" />
      <ErrorMessage
        name="telegram"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="twitter" class="text-yellow-light"> Twitter: </label>
      <Field type="text" name="twitter" id="twitter" class="new-coin-inp" />
      <ErrorMessage
        name="twitter"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="flex flex-col">
      <label for="title" class="text-yellow-light">
        *Пишіть для відгуків:
      </label>
      <input type="text" name="title" id="tile" class="new-coin-inp" />
    </div>
    <div class="flex flex-col">
      <label for="title" class="text-yellow-light">
        *Додайте рекламне відео:
      </label>
      <input type="file" name="title" id="tile" class="new-coin-inp" />
    </div>
    <div class="flex flex-col text-sm justify-center self-center">
      <label for="title" class="text-off-white">
        відео у форматі GIF розміром не більше 600*500 пікселів і розміром 10
        Мб.
      </label>
    </div>
    <div class="flex flex-col col-span-2">
      <label for="description" class="text-off-white">
        *Детальний опис монети:
      </label>
      <Field
        name="description"
        as="textarea"
        rows="6"
        id="description"
        class="new-coin-inp resize-none" />
      <ErrorMessage
        name="description"
        class="text-red-500 text-sm font-[300] mt-2" />
    </div>
    <div class="col-span-2 flex justify-center mt-5">
      <button
        type="submit"
        class="text-yellow-dark font-medium px-4 rounded-md border-2 border-yellow-dark transition-all hover:bg-yellow-dark hover:text-primary">
        подати заявку
      </button>
    </div>
  </Form>
</template>
