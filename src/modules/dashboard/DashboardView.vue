<script setup lang="ts">
import { fetchStocks } from '@/api/product/queries';
import { fetchSales, fetchSaleSummary } from '@/api/sale/queries';
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import Autoplay from 'embla-carousel-autoplay'

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})

// const { data: sales } = fetchSales.useQuery();

const { data: stocks } = fetchStocks.useQuery();
const { data: summary } = fetchSaleSummary.useQuery();


</script>

<template>

  <div class="p-6  min-h-screen  bg-cover bg-center">
    <!-- bg-[url(../../assets/Photos/F2.png)] -->
    <h1 class="text-3xl font-semibold text-center text-gray-600 flex justify-center mb-5">Welcome to the Dashboard
      <DotLottieVue class="w-20 h-10" autoplay loop
        src="https://lottie.host/e43dde6f-0aaf-4816-bd8c-956d046268b3/KASRkwTmpq.lottie"></DotLottieVue>
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class=" shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-700">Total Sale Profit💸</h2>
        <p class="text-3xl font-bold text-blue-600">${{ summary?.totalSaleProfit }}</p>
      </div>
      <div class=" shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-700">Total Sale Revenue💵</h2>
        <p class="text-3xl font-bold text-green-600">${{ summary?.totalSaleRevenue }}</p>
      </div>
      <!-- <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-700">Total Sale Count🛍</h2>
        <p class="text-3xl font-bold text-yellow-600">{{ sales?.length }}</p>
      </div> -->
      <div class=" shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-700">Total Product Count🍱</h2>
        <p class="text-3xl font-bold text-red-600">{{ stocks?.length }}</p>
      </div>
    </div>

    <!-- <div class="bg-white shadow-lg rounded-lg p-8 mb-10">
      <h2 class="text-xl font-semibold mb-6 text-gray-700">Sales Overview</h2>
      <div class="h-64 bg-gray-200 flex items-center justify-center rounded-lg"> -->

    <div class=" shadow-lg rounded-lg p-3 w-full h-full flex flex-col items-center mb-10">
      <!-- <h2 class="text-xl font-semibold mb-3 text-gray-700">Featured Video</h2> -->

      <div class="flex items-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/bH8zxnUeZLg?autoplay=1"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div class="ml-40 text-gray-700 bg-gradient-to-r from-red-100 to-blue-300 p-10 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Basic Add-ins</h3>
          <ul class="list-disc list-inside">
            <li>Chocolate🍫</li>
            <li>Strawberry🍓</li>
            <li>Caramel🧉</li>
            <li>Vanilla🥫</li>
            <li>Mint🧂</li>
            <li>Peanut Butter🧀</li>
          </ul>
        </div>
      </div>
    </div>

    <div>

    </div>
    <Carousel class="relative w-full max-w-lg mx-auto items-center bg-gradient-to-r from-green-200 to-blue-300"
      :plugins="[plugin]" @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')];">

      <CarouselContent>

        <CarouselItem v-for="(_, index) in 5" :key="index">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6 w-full h-full">
                <img v-if="index % 4 === 0" src="../../assets/Photos/F1.png" alt="Photo"
                  class="w-70 h-30 object-cover rounded-lg" />
                <img v-else-if="index % 4 === 1" src="../../assets/Photos/F2.png" alt="Photo"
                  class="w-full h-full object-cover rounded-lg" />
                <img v-else-if="index % 4 === 2" src="../../assets/Photos/F3.png" alt="Photo"
                  class="w-full h-full object-cover rounded-lg" />
                <img v-else src="../../assets/Photos/F4.png" alt="Photo"
                  class="w-full h-full object-cover rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  </div>

  <!-- </div>
  </div> -->

</template>