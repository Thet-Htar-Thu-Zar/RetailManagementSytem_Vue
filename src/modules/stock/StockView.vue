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

  //For Add to cart
  // const addToCart = (ProductID: string) => {
  //   const existingItem = cartItems.value.find((item) => item.id === ProductID);
  //   if(existingItem) {
  //     existingItem.quantity++;
  //   }
  //   else{
  //     cartItems.value.push({id: ProductID, quantity: 1});
  //   }
  // };
  // const addToCart = (product: {id: string; name: string; price: number}) =>{
  //   cartStore.addToCart(product);
  // };

  // //For Remove from Cart

  // // const removeFromCart = (ProductID: string) => {
  // //   const existingItem = cartItems.value.find((item)=> item.id !== ProductID);
  // //   if(existingItem){
  // //     existingItem.quantity--;
  // //     if(existingItem.quantity == 0){
  // //       cartItems.value = cartItems.value.filter((item) => item.id !== ProductID);
  // //     }
  // //   }
  // // };
  
  // const removeFromCart = (productId: string) => {
  //   cartStore.removeFromCart(productId);
  // };

  //To get total items in cart
//   const totalItemsInCart = computed(() => 
//   cartItems.value.reduce((total, item) => total + item.quantity, 0)
// );

  const totalItemsInCart = computed(() => cartStore.cartItems.reduce((total, item) => total + item.quantity, 0) );
  </script>

  <!-- <template>

      <section class="p-3 h-full">
      <TableCaption class="w-full text-5xl flex justify-center">Stock Page</TableCaption>
      <Button class="flex hover:bg-green-600 text-white px-4 py-2 rounded pr-7 pl-7 ml-auto"> 
        <RouterLink to="/cart" class="flex">
          <LucideShoppingCart class="h-4 w-4 text-8xl" />
          {{ cartStore.totalItems }}</RouterLink> 
        </Button>

      <br>
      <Table>
      <TableHeader>
        <TableRow>
          
          <TableHead>Product Name</TableHead>
          <TableHead>Remaining Stock</TableHead>
          <TableHead>Product Price</TableHead>
          <TableHead >Product Profit</TableHead>
          <TableHead class="ml-30">Action</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="products in data" :key="products.productID">
          
          <TableCell class="w-[200px]">{{ products.productName }}</TableCell>
          <TableCell class="w-[200px]">{{ products.remainingStock }}</TableCell>
          <TableCell class="w-[200px]">{{ products.productPrice }}</TableCell>
          <TableCell class="w-[200px]">{{ products.productProfit }}</TableCell>
          <TableCell ><Button class="bg-sky-500/100 mr-4"
            @click = "addToCart({
              id: products.productID,
              name: products.productName,
              price: products.productPrice,
            })">
            Add to Cart <LucideShoppingCart/></Button>
            <Button class="bg-red-500"
            @click = "removeFromCart(products.productID)">
              Remove From Cart <LucideShoppingCart/></Button>
            
            </TableCell>
          
        </TableRow>
      </TableBody>
      </Table>

      </section>
  </template> -->

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
            <TableHead class="ml-30 pl-40">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="products in data" :key="products.productID">
            <TableCell class="w-[200px]">{{ products.productName }}</TableCell>
            <TableCell class="w-[200px]">{{ products.remainingStock }}</TableCell>
            <TableCell class="w-[200px]">${{ products.productPrice }}</TableCell>
            <TableCell class="w-[200px]">${{ products.productProfit }}</TableCell>
            <TableCell class="pl-10">
              <Button class="bg-blue-500 mr-4" 
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
  