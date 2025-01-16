<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useCounterStore } from './cartStore';
import Table from '@/components/ui/table/Table.vue';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const cartStore = useCounterStore();

</script>

<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-center mb-8">Cart Page</h1>

    <div v-if="cartStore.cartItems.length === 0" class="flex items-center justify-center h-full">
      <div class="text-center p-8 bg-white rounded-lg shadow-md">
        <p class="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty... 🛒</p>
      </div>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-xl font-medium text-gray-700">Total Amount: <span class="font-bold">${{ cartStore.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0) }}</span></p>
          <p class="text-xl font-medium text-gray-700">Total Items: <span class="font-bold">{{ cartStore.cartItems.reduce((total, item) => total + item.quantity, 0) }}</span></p>
        </div>
        <div class="flex gap-4">
          <Button class="px-4 py-2 text-white bg-black rounded-lg hover:bg-red-600" @click="cartStore.clearCart">Clear All Cart</Button>
          <RouterLink to="/cashier">
            <Button class="px-4 py-2 text-white bg-black rounded-lg hover:bg-green-600">Proceed to Cashier</Button>
          </RouterLink>
        </div>
      </div>

      <Table class="w-full border-collapse border border-gray-300 text-left">
        <TableHeader class="bg-gray-200">
          <TableRow>
            <TableHead class="px-4 py-2 border border-gray-300">Product Name</TableHead>
            <TableHead class="px-4 py-2 border border-gray-300">Product Price</TableHead>
            <TableHead class="px-4 py-2 border border-gray-300">Quantity</TableHead>
            <TableHead class="px-4 py-2 border border-gray-300">Total</TableHead>
            <TableHead class="px-4 py-2 border border-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in cartStore.cartItems" :key="item.productID" class="hover:bg-gray-100">
            <TableCell class="px-4 py-2 border border-gray-300">{{ item.productName }}</TableCell>
            <TableCell class="px-4 py-2 border border-gray-300">${{ item.productPrice }}</TableCell>
            <TableCell class="px-4 py-2 border border-gray-300">
              <div class="flex items-center gap-2">
                <Button @click="cartStore.addToCart(item)" 
                  :disabled="item.quantity === item.remainingStock" 
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  +
                </Button>
                {{ item.quantity }}
                <Button @click="cartStore.removeFromCart(item.productID)" 
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  -
                </Button>
              </div>
            </TableCell>
            <TableCell class="px-4 py-2 border border-gray-300">${{ item.productPrice * item.quantity }}</TableCell>
            <TableCell class="px-4 py-2 border border-gray-300">
              <Button @click="cartStore.removeFromCart(item.productID)" 
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Remove
            </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

