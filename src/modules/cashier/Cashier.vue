<script setup lang="ts">
import { addSale } from '@/api/sale/queries';
import { useCounterStore } from '../cart/cartStore';
import { Button } from '@/components/ui/button';
import { RouterLink, useRouter } from 'vue-router';

const cartStore = useCounterStore();

// const {mutate} = addTodo.useMutation({   
//     onMutate: loadingOn,
//     onError: () => {
//         toast({
//             title: t('error-msg.error'),
//             description: t('error-msg.fail-create-todo'),
//             variant: 'destructive'
//         })
//     },
//     onSettled: () => {
//         loadingOff()
//         isOpen.value = false
//     }
// })

const {mutate} = addSale.useMutation({})

const router = useRouter();

function handleCashOut() {
  
  if (cartStore.cartItems.length === 0) {
    alert('Cart is empty. Add items before checking out.');
    return;
  }

  const saleData = cartStore.cartItems.map((item) => ({
    productID: item.productID,
    quantitySold: item.quantity,
    createdBy: 'user',
  }));

  saleData.forEach(data => {
    try {
      mutate(data);
    } catch (error) {
      console.error(`Error processing item ${data.productID}: `, error);
    }
  });
  
  alert('Transaction completed successfully!');
  clearCashier();
  router.push('/');
}

const clearCashier = () => {
    cartStore.cartItems.length = 0;
  };
</script>

<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg border border-green-300 mt-10">
        <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Receipt</h1>
        
        <div class="space-y-4 text-gray-700">
            <div v-for="item in cartStore.cartItems" :key="item.productID" class="border-b border-dashed py-3">
                <div class="flex justify-between">
                    <span class="font-medium">{{ item.productName }}</span>
                    <span>${{ item.productPrice * item.quantity }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                    <span>Quantity: {{ item.quantity }}</span>
                    <span class="text-right">${{ item.productPrice }}</span>
                </div>
            </div>

            <div class="flex justify-between text-xl font-bold mt-4 border-t pt-4 text-gray-700">
                <span>Total:</span>
                <span>${{ cartStore.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0) }}</span>
            </div>
        </div>
    
        <Button class="mt-8 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transform transition-transform duration-200 ease-in-out"
        @click="handleCashOut" 
        >
            Cash Out  
        </Button>
       
    </div>
</template>
