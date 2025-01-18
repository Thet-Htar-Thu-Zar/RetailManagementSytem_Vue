import { defineStore } from "pinia";
import { reactive } from "vue";

export interface Product{
  productID : string;
  productName: string;
  productPrice: number;
  remainingStock: number;
}

export interface productItem extends Product{
  quantity : number,
}

export const useCounterStore = defineStore('counter', () => {
  const cartItems = reactive<productItem[]>([]);

  // const addToCart = (product:Product) => {
  //   const existingItem = cartItems.find(item => item.productID === product.productID);

  //   if(existingItem){
  //     existingItem.quantity += 1;
  //   }
  //   else{
  //     cartItems.push({...product, quantity: 1});
  //   }
  // }

  const addToCart = (product: Product) => {

    if(product.remainingStock === 0){
      alert("Remaining Stock is not enough!");
      return;
    }

    const existingItem = cartItems.find(item => item.productID === product.productID);
  
    if (existingItem) {
      const checkQty = existingItem.quantity + 1;
      if (existingItem.quantity < product.remainingStock ) {
       existingItem.quantity += 1;
      }
      else if(product.remainingStock < checkQty){
        alert("Remaining Stock is not enough!");
        return;
      }
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
  };
  
  
  const removeFromCart = (productId: string) =>{
    const index = cartItems.findIndex(item => item.productID === productId);

    if(index !== -1) {
      cartItems.splice(index, 1);
    }
  };

//   const decreaseItem = (product: CartType) => {
//     if(product.quantity > 1){
//         product.quantity -= 1;
//     }else{
//         removeFromCart(product);
//     }
// }

// const IncreaseItem = (product: CartType) => {
//     if(product.quantity >= product.stock) {
//         toast({
//             title: 'Product is out of stock',
//             variant: 'destructive'
//         })
//         return;
//     }
//     product.quantity += 1;
//     toast({
//         title: 'Successfully added to cart'
//     })
// }

  // const decreaseQuantity = (productId: string, quantity: number) => {
  //   const item = cartItems.findIndex(item => item.productID === productId);

  //   if(!item)
  //     return;

  //   if(quantity > 1){
  //     item.quantity -= 1;
  //   }
  //   else{
  //     cartItems = cartItems.filter
  //   }
  // }

  const clearCart = () => {
    cartItems.length = 0;
  };

  return{
    cartItems,
    addToCart,
    removeFromCart,
    // abstractItem,
    // updateQuantity,
    clearCart
  }
});