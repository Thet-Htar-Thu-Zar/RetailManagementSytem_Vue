import { toast } from "@/components/ui/toast";
import { defineStore } from "pinia";
import { reactive } from "vue";

export interface Product {
  productID: string;
  productName: string;
  productPrice: number;
  remainingStock: number;
}

export interface productItem extends Product {
  quantity: number;
}

export const useCounterStore = defineStore("counter", () => {
  const cartItems = reactive<productItem[]>([]);

  const addToCart = (product: Product) => {
    if (product.remainingStock === 0) {
      toast({
        title: "Remaining Stock is not enough!",
        variant: "destructive",
        duration: 600,
      });
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (existingItem) {
      const checkQty = existingItem.quantity + 1;
      if (existingItem.quantity < product.remainingStock) {
        existingItem.quantity += 1;
      } else if (product.remainingStock < checkQty) {
        toast({
          title: "Remaining Stock is not enough!",
          variant: "destructive",
          duration: 600,
        });
        return;
      }
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    toast({
      title: "Successfully added to cart!",
      duration: 600,
    });
  };

  const removeFromCart = (productId: string) => {
    const index = cartItems.findIndex((item) => item.productID === productId);

    if (index !== -1) {
      cartItems.splice(index, 1);
    }
    toast({
      title: "Successfully removed from cart!",
      duration: 600,
    });
  };

  const decreaseItem = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (existingItem) {
      if (existingItem.quantity < product.remainingStock) {
        existingItem.quantity -= 1;
      } else {
        toast({
          title: "Remaining Stock is not enough!",
          variant: "destructive",
          duration: 600,
        });
        return;
      }
      toast({
        title: "Successfully removed from cart!",
        duration: 600,
      });
    }
  };

  const clearCart = () => {
    cartItems.length = 0;
    toast({
      title: "Cart is cleared!",
      duration: 600,
    });
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseItem,
    clearCart,
  };
});
