import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { ProductType, UpdateProductInputType } from "@/api/product/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import ProductAction from "./ProductAction.vue";

export const productcolumns: ColumnDef<UpdateProductInputType>[] = [
  {
    accessorKey: "No",
    header: () => h("div", { class: "text-right" }, "No"),
    cell: ({ row }) => {
      const no = row.index + 1;

      return h("div", { class: "text-right font-medium" }, no);
    },
  },

  {
    accessorKey: "productName",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "text-center ml-20",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Product Name", h(ArrowUpDown, { class: "text-center  " })]
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("productName") as string;

      return h("div", { class: "text-center font-medium" }, name);
    },
  },
  {
    accessorKey: "remainingStock",
    header: () => h("div", { class: "text-center" }, "Remaining Stock"),
    cell: ({ row }) => {
      const stock = Number.parseFloat(row.getValue("remainingStock"));

      return h("div", { class: "text-center font-medium" }, stock);
    },
  },
  {
    accessorKey: "productPrice",
    header: () => h("div", { class: "text-center" }, "Price"),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("productPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return h("div", { class: "text-center font-medium" }, formatted);
    },
  },
  {
    accessorKey: "productProfit",
    header: () => h("div", { class: "text-center" }, "Product Profit"),
    cell: ({ row }) => {
      const profit = Number.parseFloat(row.getValue("productProfit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return h("div", { class: "text-center font-medium" }, formatted);
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
