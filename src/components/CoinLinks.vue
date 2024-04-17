<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-5">
    <h3 class="text-center text-off-white text-2xl font-[300]">
      зображення монети
    </h3>
    <figure class="w-full aspect-[1/0.7] border-2 border-yellow-light">
      <img
        src="../assets/bitcoin.gif"
        alt=""
        class="w-full h-full object-cover object-center" />
    </figure>
    <div class="flex items-center gap-4 justify-center">
      <figure
        class="overflow-hidden rounded-full border-white border-2 w-8 h-8">
        <a href="https://www.facebook.com">
          <img
            src="../assets/facebook.png"
            alt="facebook"
            class="w-full h-full object-cover object-center" />
        </a>
      </figure>
      <figure
        class="overflow-hidden rounded-full border-white border-2 w-8 h-8">
        <a href="https://www.x.com">
          <img
            src="../assets/twitter.png"
            alt="facebook"
            class="w-full h-full object-cover object-center" />
        </a>
      </figure>
      <figure
        class="overflow-hidden rounded-full border-white border-2 w-8 h-8">
        <a href="https://www.telegram.com">
          <img
            src="../assets/telegram.png"
            alt="facebook"
            class="w-full h-full object-cover object-center" />
        </a>
      </figure>
    </div>
  </div>
</template>
