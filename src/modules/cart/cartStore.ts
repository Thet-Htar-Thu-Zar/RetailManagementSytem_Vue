import { defineStore } from "pinia";
import { reactive } from "vue";

// export const useCounterStore = defineStore("counter", {
//     state: () => ({
//         cartItems: [] as {id: string; name: string; price: number; quantity: number }[],
//     }),
//     getters: {
//         totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
//         totalPrice: (state) => 
//             state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     },
//     actions: {

//         addToCart(product: { id: string; name: string; price: number }) {
//             const existingItem = this.cartItems.find((item) => item.id === product.id);
//             if (existingItem) {
                
//               existingItem.quantity++;
//             } else {
//               this.cartItems.push({...product, quantity: 1 });
//             }
//           },
//           removeFromCart(productId: string) {
//             const index = this.cartItems.findIndex((item) => item.id === productId);
//             if (index !== -1) {
//               if (this.cartItems[index].quantity > 1) {
//                 this.cartItems[index].quantity--;
//               } else {
//                 this.cartItems.splice(index, 1);
//               }
//             }
//     },
// },


// })

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