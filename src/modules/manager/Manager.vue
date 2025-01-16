<script setup lang="ts">
import { fetchSales, fetchSaleSummary } from '@/api/sale/queries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { computed } from 'vue';

const {data} = fetchSales.useQuery();

const{data:summary} = fetchSaleSummary.useQuery();


</script>

<template>
    <div class="container mx-auto p-6">
      <!-- Page Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold">Manager Page</h1>
        <p class="text-gray-600">Overview of Sales Performance</p>
      </header>
  
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
            <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-slate-200">
                <h2 class="text-sm font-semibold text-gray-500">Total Sale Profit</h2>
                <p class="text-xl font-bold text-gray-800">${{ summary?.totalSaleProfit }}</p>
            </div>

            <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-slate-200">
                <h2 class="text-sm font-semibold text-gray-500">Total Sale Revenue</h2>
                <p class="text-xl font-bold text-gray-800">${{ summary?.totalSaleRevenue }}</p>
            </div>
            
        </div>

        <div class="bg-white shadow-md rounded-lg">
        <Table class="table-auto w-full">
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="px-4 py-2 text-left">Product ID</TableHead>
              <TableHead class="px-4 py-2 text-left">Quantity Sold </TableHead>
              <TableHead class="px-4 py-2 text-left">Total Price</TableHead>
              <TableHead class="px-4 py-2 text-left">Total Profit</TableHead>
              <TableHead class="px-4 py-2 text-left">Sale Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="sale in data" :key="sale.saleID" class="border-b hover:bg-gray-50">
              <TableCell class="px-4 py-2">{{ sale.productID }}</TableCell>
              <TableCell class="px-4 py-2">{{ sale.quantitySold }}</TableCell>
              <TableCell class="px-4 py-2">${{ sale.totalPrice }}</TableCell>
              <TableCell class="px-4 py-2">${{ sale.totalProfit }}</TableCell>
              <TableCell class="px-4 py-2">{{ sale.createdDate }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </template>