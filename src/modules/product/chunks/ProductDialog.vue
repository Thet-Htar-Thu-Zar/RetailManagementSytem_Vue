<script setup lang="ts">
import { GetAllProductType, ProductType } from '@/api/product/types';
import * as z from 'zod';
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast';
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { addProduct, deleteProduct, updateProduct } from '@/api/product/queries';
import { watch } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';

const queryClient = useQueryClient();

const { toast } = useToast();

const props = defineProps<{
    isOpen: boolean,
    isEdit: boolean,
    allProduct: ProductType | undefined,
    closeDialog: () => void
}>()

const formSchema = toTypedSchema(z.object({
    pname: z.string().nonempty('Product name is required'),
    remaingStock: z.number().int().positive('Stock must be a positive number'),
    price: z.number().int().positive('Price must be a positive number'),
    profit: z.number().int().positive('Profit must be a positive number'),
}))

const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        pname: '',
        remaingStock: undefined,
        price: undefined,
        profit: undefined,
    },
})

const { mutate: newAddProduct } = addProduct.useMutation({
    onError: (error) => {
        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
            duration: 1000,
        })
    },
    onSuccess: (data) => {
        console.log(data)
        toast({
            title: 'Success',
            description: 'Product added successfully',
            duration: 1500,
        })
        props.closeDialog();
    },
    onSettled: () => {
        queryClient.invalidateQueries({
            queryKey: ['getAllProduct'],
        });
    }
})

const { mutate: updateOldProduct } = updateProduct.useMutation({
    onError: (data) => {
        toast({
            title: 'Error',
            description: data.message,
            variant: 'destructive',
            duration: 1000,
        })
    },
    onSuccess: async (data) => {
        console.log(data)
        toast({
            title: 'Success',
            description: 'Product updated successfully',
            duration: 1500,
        })
        queryClient.invalidateQueries({
            queryKey: ['getAllProduct'],
        });
        props.closeDialog();
    },
    // onSettled: () => {
    //     queryClient.invalidateQueries({
    //         queryKey: ['getAllProduct'],
    //     });
    // }
})

const onSubmit = handleSubmit((values) => {
    try {
        const loaddata = props.isEdit ? {
            productID: props.allProduct?.productID,
            productName: values.pname,
            remainingStock: values.remaingStock,
            productPrice: values.price,
            productProfit: values.profit,
        } : {
            productName: values.pname,
            remainingStock: values.remaingStock,
            productPrice: values.price,
            productProfit: values.profit,
        };

        if (props.isEdit) {
            updateOldProduct(loaddata as ProductType)
        } else {
            newAddProduct(loaddata as GetAllProductType)
        }
    }
    catch (error) {
        console.error(error)
    }
    props.closeDialog();
})

const startingForm = () => {
    if (props.isEdit) {
        setValues({
            pname: props.allProduct?.productName,
            remaingStock: props.allProduct?.remainingStock,
            price: props.allProduct?.productPrice,
            profit: props.allProduct?.productProfit,
        })
    } else {
        resetForm();
    }
}

watch([() => props.isEdit, () => props.allProduct],
    () => {
        resetForm();
        startingForm();
    }
);

</script>

<template>
    <Dialog v-model:open="props.isOpen">

        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ props.isEdit ? 'Update' : 'Add' }} Product Detail</DialogTitle>
                <!-- <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> -->
            </DialogHeader>
            <!-- <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="pname" class="text-right">
                        Product Name
                    </Label>
                    <Input id="pname" default-value="Pedro Duarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="stock" class="text-right">
                        Remaining Stock
                    </Label>
                    <Input id="stock" default-value="@peduarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="stock" class="text-right">
                        Price per Item
                    </Label>
                    <Input id="stock" default-value="@peduarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="stock" class="text-right">
                        Profit per Item
                    </Label>
                    <Input id="stock" default-value="@peduarte" class="col-span-3" />
                </div>
            </div> -->

            <form id="dialogForm" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="pname">
                    <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="remaingStock">
                    <FormItem>
                        <FormLabel>Remaining Stock</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                        <FormLabel>Product Price Per Item</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" min="1" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="profit">
                    <FormItem>
                        <FormLabel>Product Profit Per Item</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" min="1" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

            </form>

            <DialogFooter>
                <Button @click="props.closeDialog" type="button" variant="outline">
                    Cancel
                </Button>
                <Button type="submit" form="dialogForm" class="bg-gradient-to-r from-green-400 to-blue-500">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>