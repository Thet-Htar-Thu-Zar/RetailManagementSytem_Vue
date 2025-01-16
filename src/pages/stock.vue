<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

// export default {
//     name: "stockView",
//     data() {
//     return{
//        productLists: [],
//     };
// },
// methods: {
//     GetAllProduct(){
//         axios 
//         .get ("https://localhost:7281/api/Product/GetAllProduct")
//         .then((response) => {
//             console.log(response)
//             if(response.data.status === 0){
//                 this.productLists = response.data.data;
//                 console.log(this.productLists);
//             }
//             else{
//                 console.error("Error fetching products:", response.data.message);
//             }
//         })
//         .catch((err)=> {
//             console.error("Error fetching products:", err);
//         });
//     }
// }

// }

const productLists = ref([])

onMounted(() => {
    axios 
        .get ("https://localhost:7281/api/Product/GetAllProduct")
        .then((response) => {
            console.log(response)
            if(response.data.status === 0){
                productLists.value = response.data.data;
                console.log(productLists.value);
            }
            else{
                console.error("Error fetching products:", response.data.message);
            }
        })
        .catch((err)=> {
            console.error("Error fetching products:", err.message);
        });
})

</script>

<template>
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Stock Page</h1>
        <button
          @click="goToCart"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cart
          <!-- ({{ cartCount }}) -->
        </button>
      </div>
  
      <!-- Toggle View -->
      <!-- <div class="mb-4">
        <button
          @click="viewMode = 'card'"
          :class="viewMode === 'card' ? 'bg-gray-300' : ''"
          class="px-4 py-2 rounded-l border"
        >
          Card View
        </button>
        <button
          @click="viewMode = 'table'"
          :class="viewMode === 'table' ? 'bg-gray-300' : ''"
          class="px-4 py-2 rounded-r border"
        >
          Table View
        </button>
      </div> -->
  
      <!-- Items Display -->
      <!-- <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="border rounded-lg p-4 shadow-md"
        >
          <h2 class="text-lg font-semibold">{{ item.name }}</h2>
          <p class="text-gray-500">Price: {{ item.price }}</p>
          <div class="mt-4 flex space-x-2">
            <button
              @click="addToCart(item)"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              @click="removeFromCart(item)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      </div> -->
  
      <table
        class="w-full border-collapse border border-gray-300 mt-4 text-left"
      >
        <thead>
          <tr>
            <th class="border px-4 py-2">Product ID</th>
            <th class="border px-4 py-2">Product Name</th>
            <th class="border px-4 py-2">Remaining Stock</th>
            <th class="border px-4 py-2">Product Price</th>
            <th class="border px-4 py-2">Product Profit</th>
            <th class="border px-4 py-2 mt-5 place-content-center justify-center">Action</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="products in productLists" :key="products.productID">
            <td class="border px-4 py-2">{{ products.productID }}</td>
            <td class="border px-4 py-2">{{ products.productName }}</td>
            <td class="border px-4 py-2">{{ products.remainingStock }}</td>
            <td class="border px-4 py-2">{{ products.productPrice }}</td>
            <td class="border px-4 py-2">{{ products.productProfit }}</td>
            
            <td class="border px-4 py-2">
              <div class="flex justify-center space-x-5">
                <button
                  @click="addToCart(products)"
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded "
                >
                  Add
                </button>
                <button
                  @click="updateProduct(products)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded "
                >
                  Update
                </button>
                <button
                  @click="removeFromCart(products)"
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
 
  