<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useCounterStore } from './cartStore';
import Table from '@/components/ui/table/Table.vue';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { MinusIcon, PlusIcon } from 'lucide-vue-next';

const cartStore = useCounterStore();

// const decreaseQuantity = (productId: string, quantity: number) => {

//   const data = cartStore.cartItems.find(p => p.productID == productId)

//   if(!data){
//     return;
//   }
//   const remainingStock = data.remainingStock;

//   if(quantity <= 0){
//     cartStore.removeFromCart(productId);
//   } 
//   else if(quantity<=remainingStock){
//     decreaseQuantity(productId, quantity);
//   }
//     else {
//     decreaseQuantity(productId, remainingStock);
//   }

// };

</script>

<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <TableCaption class="text-3xl font-semibold text-center text-black flex justify-center mb-5">Cart Page
      <DotLottieVue class="w-10 h-10" autoplay loop src="https://lottie.host/8fefe20b-7e96-45cf-a3ad-c2234290ed53/pPANOzbuMZ.lottie"></DotLottieVue>   

    </TableCaption>

    <div 
          v-if="cartStore.cartItems.length === 0" 
          class="flex items-center justify-center min-h-64"
        >
          <div class="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg border border-green-300 mt-10">
            <p class="text-xl font-semibold text-center text-gray-800"> 
              <DotLottieVue class="h-200 w-200" autoplay loop src="https://lottie.host/e6a4a470-58cd-45b4-9803-bfb87ce1878c/ZL22cIuBrP.lottie"></DotLottieVue>
              Empty Cart!
            </p>
          </div>
    </div>


    <div v-else class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-xl font-medium text-gray-700">Total Amount: <span class="font-bold">${{ cartStore.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0) }}</span></p>
          <p class="text-xl font-medium text-gray-700">Total Items: <span class="font-bold">{{ cartStore.cartItems.reduce((total, item) => total + item.quantity, 0) }}</span></p>
        </div>
        <div class="flex gap-4">
          <Button class="px-4 py-6 text-white bg-black rounded-lg hover:bg-red-600" @click="cartStore.clearCart">Clear All Cart</Button>
          <RouterLink to="/cashier">
            <Button class="px-4 py-6 text-white bg-black rounded-lg hover:bg-gradient-to-r from-blue-300 to-green-600">Proceed to Cashier</Button>
          </RouterLink>
        </div>
      </div>

      <Table class="w-full border-collapse border border-gray-300 text-left">
        <TableHeader class="bg-gray-200 bg-gradient-to-r from-blue-300 to-green-300">
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
                  class="px-3 py-1 bg-black text-white rounded hover:bg-black hover:bg-gradient-to-r from-blue-300 to-green-300">
                  <PlusIcon class="h-3 w-3" />
                </Button>
                {{ item.quantity }}
                <Button @click="cartStore.decreaseItem(item)" 
                :disabled="item.quantity <= 1" 
                  class="px-3 py-1 bg-black text-white rounded hover:bg-red-600">
                  <MinusIcon class="h-3 w-3" />
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

