<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ProductType } from '@/api/product/types';
import { inject } from 'vue';
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import { useCounterStore } from '@/modules/stores/cartStore';


const cartStore = useCounterStore()
const { cartItems } = storeToRefs(cartStore)

const openEditDialog = inject('openUpdateProductDialog') as (product: ProductType) => void
const openDeleteDialog = inject('opendeleteProductDialog') as (id: string) => void

const props = defineProps<{
    product: ProductType
}>()
</script>

<template>
    <Button v-if="!cartStore.cartItems.find((item) => item.productID === props.product.productID)"
        class="bg-blue-500 hover:bg-blue-600 rounded-md p-2 px-4" @click="cartStore.addToCart(props.product)">Add to
        Cart</Button>
    <div v-else class="flex justify-evenly items-center">
        <span class=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
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
        <Button class="bg-yellow-500 hover:bg-yellow-600 rounded-md p-2 px-4 me-2"
            @click="openEditDialog(props.product)">Edit</Button>
        <Button class="bg-red-500 hover:bg-red-600 rounded-md p-2 px-4"
            @click="openDeleteDialog(props.product.productID)">Delete</Button>
    </div>
</template>