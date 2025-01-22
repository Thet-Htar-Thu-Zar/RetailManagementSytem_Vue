import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { ProductType, UpdateProductInputType } from "@/api/product/types";
import ProductAction from "./productAction.vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export const productcolumns: ColumnDef<UpdateProductInputType>[] = [
  {
    accessorKey: "No",
    header: () => h("div", { class: "text-right" }, "No"),
    cell: ({ row }) => {
      const no = row.index + 1;

      return h("div", { class: "text-right font-medium" }, no);
    },
  },
  // {
  //   accessorKey: "productName",
  //   header: () => h("div", { class: "text-center" }, "Product Name"),
  //   cell: ({ row }) => {
  //     const name = row.getValue("productName") as string;

  //     return h("div", { class: "text-right font-medium" }, name);
  //   },
  // },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "text-left",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Product Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const name = (row.getValue("productName") as string).toUpperCase();

      return h("div", { class: "text-right font-medium" }, name);
    },
  },
  {
    accessorKey: "remainingStock",
    header: () => h("div", { class: "text-right" }, "Remaining Stock"),
    cell: ({ row }) => {
      const stock = Number.parseFloat(row.getValue("remainingStock"));

      return h("div", { class: "text-right font-medium" }, stock);
    },
  },
  {
    accessorKey: "productPrice",
    header: () => h("div", { class: "text-right" }, "Price"),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("Product Price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "productProfit",
    header: () => h("div", { class: "text-right" }, "Product Profit"),
    cell: ({ row }) => {
      const profit = Number.parseFloat(row.getValue("productProfit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-center font-medium" }, "Action"),
    cell: ({ row }) => {
      return h(ProductAction, { product: row.original as ProductType });
    },
  },
];
