<script setup>
</script>

<template> 
<div class="flex w-full h-screen bg-gray-100">
    <!-- <aside class="w-64 bg-gray-600 text-white">
      <div class="p-4 text-center font-bold text-lg">
        Dashboard
      </div>
      <nav>
        <ul>
          <li>
            
            <router-link to="/stock" class="block py-2 px-4 hover:bg-pink-500">Stock</router-link>
          </li>
          <li>
            <router-link to="/cart" class="block py-2 px-4 hover:bg-pink-500">Cart</router-link>
          </li>
          <li>
            <router-link to="/manager" class="block py-2 px-4 hover:bg-pink-500">Manager</router-link>
          </li>
        </ul>
      </nav>
    </aside> -->

    <main class="flex-1 p-6 w-full">
      <h1 class="text-2xl font-bold mb-4 flex justify-center">Welcome to the Dashboard</h1>
      <br>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Card 1 -->
        <div class="p-4 bg-white shadow rounded-lg">
          <h2 class="text-lg font-semibold">Total Sales</h2>
          <p class="text-2xl font-bold">$</p>
        </div>
        <!-- Card 2 -->
        <div class="p-4 bg-white shadow rounded-lg">
          <h2 class="text-lg font-semibold">Total Orders</h2>
          <p class="text-2xl font-bold">0</p>
        </div>
        <!-- Card 3 -->
        <div class="p-4 bg-white shadow rounded-lg">
          <h2 class="text-lg font-semibold">Total Customers</h2>
          <p class="text-2xl font-bold">0</p>
        </div>
      </div>
    </main>
    </div>
</template>