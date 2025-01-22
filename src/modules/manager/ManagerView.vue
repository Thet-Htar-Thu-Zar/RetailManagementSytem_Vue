<script setup lang="ts">
import { fetchSales, fetchSaleSummary } from '@/api/sale/queries';
import DataTable from '@/modules/manager/chunks/saleData-table.vue';
import { salecolumns } from '@/modules/manager/chunks/saleColumns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useVueTable } from '@tanstack/vue-table';
import SaleDataTable from '@/modules/manager/chunks/saleData-table.vue';

const { data: records } = fetchSales.useQuery();

const { data: summary } = fetchSaleSummary.useQuery();

</script>

<template>
  <div class="container mx-auto p-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Manager Page👨🏻‍💼</h1>
      <p class="text-gray-600">Overview of Sales Performance</p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
      <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-gradient-to-r from-green-200 to-blue-300">
        <h2 class="text-sm font-semibold text-gray-500">Total Sale Profit💸 </h2>
        <p class="text-xl font-bold text-gray-800">${{ summary?.totalSaleProfit }}</p>
      </div>

      <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-gradient-to-r from-green-200 to-blue-300">
        <h2 class="text-sm font-semibold text-gray-500">Total Sale Revenue💵</h2>
        <p class="text-xl font-bold text-gray-800">${{ summary?.totalSaleRevenue }}</p>
      </div>

      <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-gradient-to-r from-green-200 to-blue-300">
        <h2 class="text-sm font-semibold text-gray-500">Total Sale Count🛍</h2>
        <p class="text-xl font-bold text-gray-800">{{ records?.length }}</p>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg">

      <SaleDataTable :columns="salecolumns" :data="records || []" />

      <!-- <Table class="table-auto w-full">
        <TableHeader class="bg-slate-700">
          <TableRow>
            <TableHead class="px-4 py-2 text-white">No</TableHead>
            <TableHead class="px-4 py-2 text-white">Product ID</TableHead>
            <TableHead class="px-4 py-2 text-white">Quantity Sold </TableHead>
            <TableHead class="px-4 py-2 text-white">Total Price</TableHead>
            <TableHead class="px-4 py-2 text-white">Total Profit</TableHead>
            <TableHead class="px-4 py-2 text-white">Sale Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(sale, index) in data" :key="index"
            class="border-b hover:bg-gradient-to-r from-blue-300 to-green-50">
            <TableCell class="px-4 py-2">{{ index + 1 }}</TableCell>
            <TableCell class="px-4 py-2">{{ sale.productID }}</TableCell>
            <TableCell class="px-4 py-2">{{ sale.quantitySold }}</TableCell>
            <TableCell class="px-4 py-2">${{ sale.totalPrice }}</TableCell>
            <TableCell class="px-4 py-2">${{ sale.totalProfit }}</TableCell>
            <TableCell class="px-4 py-2">{{ sale.createdDate }}</TableCell>
          </TableRow>
        </TableBody>
      </Table> -->
    </div>
  </div>
</template>