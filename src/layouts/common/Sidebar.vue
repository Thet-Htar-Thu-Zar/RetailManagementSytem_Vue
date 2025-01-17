<script setup lang="ts">

import { Button } from '@/components/ui/button'
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-gradient-to-r from-green-200 to-blue-300 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Chris Market</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <!-- <RouterLink
              to="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <Home class="h-4 w-4" />
              Dashboard
            </RouterLink> -->
        
            <RouterLink
              to="/"
              class="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <Package class="h-4 w-4" />
              Product Stock
            </RouterLink>

            <RouterLink
              to="/cart"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <ShoppingCart class="h-4 w-4" />
              Cart
         
            </RouterLink>
          
            <RouterLink
              to="/cashier"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <LineChart class="h-4 w-4" />
              Cashier
            </RouterLink>
             
            <RouterLink
              to="/manager"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <Users class="h-4 w-4" />
              Manager View
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
   
  </div>
</template>