  <script setup lang="ts">
  import { fetchStocks } from '@/api/stock/queries';
  import { Button } from '@/components/ui/button';
  import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
  import { useCounterStore } from '../cart/cartStore';
import { LucideShoppingCart } from 'lucide-vue-next';
import { computed } from 'vue';

  //To fetch data
  const {data} = fetchStocks.useQuery();
  // const cartStore = useCounterStore();
  const cartStore = useCounterStore();

  const totalItemsInCart = computed(() => cartStore.cartItems.reduce((total, item) => total + item.quantity, 0) );
  </script>

  <template>
    <section class="p-3 h-full">
      <TableCaption class="w-full text-5xl flex justify-center">Stock Page</TableCaption>
      <Button class="flex hover:bg-green-600 text-white px-4 py-2 rounded pr-7 pl-7 ml-auto">
        <RouterLink to="/cart" class="flex">
          <LucideShoppingCart class="h-4 w-4 text-8xl" />
          {{ totalItemsInCart }}
        </RouterLink>
      </Button>
  
      <br>
      <Table class="bg-slate-200">
        <TableHeader class="bg-slate-300">
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Remaining Stock</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Product Profit</TableHead>
            <TableHead class="ml-10 ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="products in data" :key="products.productID">
            <TableCell class="w-[200px]">{{ products.productName }}</TableCell>
            <TableCell class="w-[200px]">{{ products.remainingStock }}</TableCell>
            <TableCell class="w-[200px]">${{ products.productPrice }}</TableCell>
            <TableCell class="w-[200px]">${{ products.productProfit }}</TableCell>
            <TableCell class="">
              <Button class="bg-blue-500 mb-3" 
              @click="cartStore.addToCart(products)" >
                Add to Cart <LucideShoppingCart />
              </Button>
              <Button class="bg-red-500"
               @click="cartStore.removeFromCart(products.productID)">
                Remove From Cart <LucideShoppingCart />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  </template>
  