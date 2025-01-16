<script setup lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import { useCounterStore } from './cartStore';
import { Button } from '@/components/ui/button';
import { LucideShoppingCart, ShoppingBag } from 'lucide-vue-next';

const cartStore = useCounterStore();
// console.log(cartStore);

</script>

<!-- <template>

    <section class="p-3 h-full">
    <TableCaption class="w-full text-4xl flex justify-center pb-7">Cart Page</TableCaption>
   
    <Table class="w-full border-collapse border border-gray-300">
      <TableRow>
        <TableCell class="w-[200px]">
            Product Name
        </TableCell>
        <TableCell>Remaining Stock</TableCell>
        <TableCell>Product Price</TableCell>
        <TableCell>Product Quantity</TableCell>
        <TableCell>Total</TableCell>
        <TableCell class="pr-7 ">Action</TableCell>

      </TableRow>
    <TableBody>
      <TableRow v-for="item in cartStore.cartItems" :key="item.id">
       
        <TableCell>{{ item.name }}</TableCell>
        <TableCell>{{ item.price }}</TableCell>
        <TableCell>{{ item.quantity }}</TableCell>
        <TableCell>{{ item.price * item.quantity }}</TableCell>

        <TableCell><Button
          @click="cartStore.addToCart(item)" class="mr-4 bg-green-500 text-white px-2 py-1">
          + </Button>
          <Button 
          @click="cartStore.removeFromCart(item.id)" class="mr-4 bg-red-500 text-white px-2 py-1">
            - </Button>
          
          </TableCell>
        
      </TableRow>
    </TableBody>
    </Table>
    <div class="mt-4">
      <p>Total Items: {{ cartStore.totalItems }}</p>
      <p>Total Price: {{ cartStore.totalPrice }}</p>
      <Button class="text-lg px-4 py-2 mt-4 flex justify-center h-100">
        <RouterLink to="/cashier">Proceed to Cashier</RouterLink>
      </Button>
    </div>
    </section>
</template> -->

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
          <button class="px-4 py-2 text-white bg-black rounded-lg hover:bg-red-600" @click="cartStore.clearCart">Clear All Cart</button>
          <RouterLink to="/cashier">
            <button class="px-4 py-2 text-white bg-black rounded-lg hover:bg-green-600">Proceed to Cashier</button>
          </RouterLink>
        </div>
      </div>

      <table class="w-full border-collapse border border-gray-300 text-left">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2 border border-gray-300">Product Name</th>
            <th class="px-4 py-2 border border-gray-300">Product Price</th>
            <th class="px-4 py-2 border border-gray-300">Quantity</th>
            <th class="px-4 py-2 border border-gray-300">Total</th>
            <th class="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.cartItems" :key="item.productID" class="hover:bg-gray-100">
            <td class="px-4 py-2 border border-gray-300">{{ item.productName }}</td>
            <td class="px-4 py-2 border border-gray-300">${{ item.productPrice }}</td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="flex items-center gap-2">
                <button @click="cartStore.addToCart(item)" 
                  :disabled="item.quantity === item.remainingStock" 
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  +
                </button>
                {{ item.quantity }}
                <button @click="cartStore.removeFromCart(item.productID)" 
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  -
                </button>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">${{ item.productPrice * item.quantity }}</td>
            <td class="px-4 py-2 border border-gray-300">
              <button @click="cartStore.removeFromCart(item.productID)" 
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

