<script setup lang="ts">
import { fetchStocks } from '@/api/product/queries';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCounterStore } from '../cart/cartStore';
import { DeleteIcon, LucideShoppingCart, ShoppingBagIcon, Trash2 } from 'lucide-vue-next';
import { computed } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const { data } = fetchStocks.useQuery();
const cartStore = useCounterStore();

const totalItemsInCart = computed(() => cartStore.cartItems.reduce((total, item) => total + item.quantity, 0));



</script>

<template>
  <section class="p-3 h-full bg-gray-50">
    <TableCaption class="text-3xl font-semibold text-center text-slate-700 flex justify-center">Stock Page🛍🎗
    </TableCaption>

    <div class="flex justify-end mb-5">
      <RouterLink to="/cart"
        class="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 hover:bg-black text-white rounded-lg shadow-2xl transition duration-300 relative gap-2 mr-2 pr-2">
        <ShoppingBagIcon class="h-4 w-4 ml-1"></ShoppingBagIcon>
        <p class="text-sm">Add New Product </p>
      </RouterLink>
      <RouterLink to="/cart"
        class="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 hover:bg-black text-white py-2 px-4 rounded-lg shadow-2xl transition duration-300 relative">
        <LucideShoppingCart class="h-6 w-6 text-white" />
        <span
          class="absolute top-0 right-0 bg-black text-white rounded-full px-2 py-1 text-xs font-semibold transform translate-x-1/2 -translate-y-1/2">
          {{ totalItemsInCart }}
        </span>
      </RouterLink>

    </div>

    <Table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <TableHeader class="bg-gradient-to-r from-green-200 to-blue-300">
        <TableRow>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600">No</TableHead>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600">Product Name</TableHead>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600">Remaining Stock</TableHead>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</TableHead>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600">Profit</TableHead>
          <TableHead class="px-6 py-3 text-left text-sm font-medium text-gray-600 flex justify-center">Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(product, index) in data" :key="index" class="hover:bg-gray-100 transition duration-200">
          <TableCell class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</TableCell>
          <TableCell class="px-6 py-4 text-sm text-gray-700">{{ product.productName }}</TableCell>
          <TableCell class="px-6 py-4 text-sm text-gray-700">{{ product.remainingStock }}</TableCell>
          <TableCell class="px-6 py-4 text-sm text-gray-700">${{ product.productPrice }}</TableCell>
          <TableCell class="px-6 py-4 text-sm text-gray-700">${{ product.productProfit }}</TableCell>
          <TableCell class="px-6 py-4 pr-0 mr-0 flex gap-4 ml-5">
            <!-- <Toggle> -->
            <Button
              class="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              @click="cartStore.addToCart(product)">
              Add to Cart
              <!-- <LucideShoppingCart class="inline h-4 w-4 ml-1" /> -->
              <DotLottieVue class="w-10 h-10" autoplay loop
                src="https://lottie.host/8fefe20b-7e96-45cf-a3ad-c2234290ed53/pPANOzbuMZ.lottie"></DotLottieVue>
            </Button>
            <!-- </Toggle> -->
            <Button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              @click="cartStore.removeFromCart(product.productID)">
              Remove
              <LucideShoppingCart class="inline h-4 w-4 ml-1" />
            </Button>
            <Button class="bg-orange-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
              Edit
            </Button>
            <Trash2 class="h-6 w-6 text-red-500 mt-2" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>