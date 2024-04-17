<script setup lang="ts">
import { connectToAPI } from '@/lib/util'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
const logging = ref<boolean>(false)
defineProps<{
  closeForm: () => void
  login: () => void
}>()

const loginSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
})

const loginHandler = async (data: any) => {
  logging.value = true
  try {
    console.log(data.username)

    const loginFormData = new FormData()

    loginFormData.append('username', data.username)
    loginFormData.append('password', data.password)
    loginFormData.append('recaptcha', null as unknown as Blob)

    console.log(loginFormData)

    const res = await connectToAPI({
      endpoint:
        'http://localhost:8001/login/https://api.trs.kharkiv.ua/api/v1/login/',
      method: 'POST',
      body: loginFormData,
    })

    localStorage.setItem('isLoggedIn', 'yes')
    localStorage.setItem('csrftoken', res?.cookies?.csrftoken)
    localStorage.setItem('sessionid', res?.cookies?.sessionid)
    return true
  } catch (err) {
    return false
  } finally {
    logging.value = false
  }
}
</script>

<template>
  <div
    class="w-full h-[100dvh] fixed z-[555] top-0 left-0 hideScrollBar py-10 overflow-y-auto backdrop-blur-[1px] bg-black bg-opacity-30">
    <section
      class="flex flex-col gap-8 p-6 rounded shadow-md relative bg-primary w-[300px] mx-auto text-off-white">
      <button
        type="button"
        @click="() => closeForm()"
        class="absolute top-0 right-0 bg-off-white bg-opacity-30 px-2 py-1">
        <font-awesome-icon icon="fa-solid fa-x" />
      </button>

      <h3 class="text-3xl">LOGIN</h3>

      <Form
        :validation-schema="loginSchema"
        @submit=" (d: any) => {
             loginHandler(d).then(success => {
               if (success) {
                 login()
                 closeForm()
                }
              })
          }
        "
        class="flex flex-col">
        <div class="flex flex-col">
          <label for="username" class="text-yellow-light">
            *ім'я користувача:
          </label>
          <Field
            type="text"
            name="username"
            id="username"
            class="new-coin-inp" />
          <ErrorMessage
            name="username"
            class="text-red-500 text-sm font-[300] mt-2" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="password" class="text-yellow-light"> *пароль: </label>
          <Field
            type="password"
            name="password"
            id="password"
            class="new-coin-inp" />
          <ErrorMessage
            name="password"
            class="text-red-500 text-sm font-[300] mt-2" />
        </div>

        <button
          type="submit"
          :disabled="logging"
          class="mt-8 rounded-md bg-yellow-dark hover:bg-yellow-light py-2 text-center w-full">
          {{ logging ? 'logging...' : 'Login' }}
        </button>
      </Form>
    </section>
  </div>
</template>
