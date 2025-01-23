<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { DeleteProductType, ProductType } from '@/api/product/types';
import { inject } from 'vue';
import { EditIcon, MinusIcon, PlusIcon, Trash2 } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import { useCounterStore } from '@/modules/stores/cartStore';
import { DotLottie, DotLottieVue } from '@lottiefiles/dotlottie-vue';


const cartStore = useCounterStore()
const { cartItems } = storeToRefs(cartStore)

const openUpdateProductDialog = inject('openUpdateProductDialog') as (product: ProductType) => void
const opendeleteProductDialog = inject('opendeleteProductDialog') as (product: DeleteProductType) => void

const props = defineProps<{
    product: ProductType
}>()
</script>

<template class="flex flex-col items-center">
    <Button
        v-if="!cartStore.cartItems.find((item) => item.productID === props.product.productID) || cartStore.cartItems.find((item) => item.productID === props.product.productID)?.quantity === 0"
        class="bg-blue-500 hover:bg-blue-600 rounded-full  mb-5 flex justify-center items-center space-x-2"
        @click="cartStore.addToCart(props.product)">
        <DotLottieVue class="w-8 h-8" autoplay loop
            src="https://lottie.host/8fefe20b-7e96-45cf-a3ad-c2234290ed53/pPANOzbuMZ.lottie"></DotLottieVue>
        <span>Add to Cart</span>
    </Button>
    <div v-else class="flex justify-evenly items-center mb-5">
        <span class="rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
            @click="cartStore.decreaseItem(props.product)">
            <MinusIcon />
        </span>
        <span class="w-[30px] text-black text-center">{{ cartStore.cartItems.find((item) => item.productID ===
            props.product.productID)?.quantity }}</span>
        <span
            class="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
            @click="cartStore.addToCart(props.product)">
            <PlusIcon />
        </span>
    </div>
    <div>
        <Button class="bg-yellow-400 hover:bg-yellow-500 rounded-full p-2 px-4 me-2 shadow-md"
            @click="openUpdateProductDialog(props.product)">
            <EditIcon /> Edit
        </Button>
        <Button class="bg-red-400 hover:bg-red-500 rounded-full p-2 px-4 shadow-md"
            @click="opendeleteProductDialog(props.product)">
            <Trash2 /> Delete
        </Button>
    </div>
</template>