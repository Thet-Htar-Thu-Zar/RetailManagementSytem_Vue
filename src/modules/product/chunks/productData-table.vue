<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, VisibilityState } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    ColumnFiltersState,
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),

    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
    },
})
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm ml-10" placeholder="Filter Product Name..."
                :model-value="table.getColumn('productName')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('productName')?.setFilterValue($event)" />

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" :key="column.id"
                        class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                            column.toggleVisibility(!!value)
                        }">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id"
                            class="bg-slate-600 text-green-200 to-green-50">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    <template v-if="table.getRowModel().rows?.length">
                        <template v-for="row in table.getRowModel().rows" :key="row.id">
                            <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined"
                                class="hover:bg-gradient-to-r from-blue-300 to-green-50">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="row.getIsExpanded()">
                                <TableCell :colspan="row.getAllCells().length">
                                    {{ JSON.stringify(row.original) }}
                                </TableCell>
                            </TableRow>
                        </template>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
    </div>
    <template v-if="table.getRowModel().rows?.length">
        <div class="flex items-center justify-end py-4 space-x-2">
            <Button variant="primary" size="md" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()"
                class="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out">
                Previous
            </Button>
            <span class="mx-4">
                Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
            </span>
            <Button variant="primary" size="md" :disabled="!table.getCanNextPage()" @click="table.nextPage()"
                class="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out">
                Next
            </Button>
        </div>
    </template>
</template>
