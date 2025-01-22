import { SaleReportType } from "@/api/sale/types";
import { ColumnDef } from "@tanstack/vue-table";
import { formatDate } from "@vueuse/core";
import { h } from "vue";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export const salecolumns: ColumnDef<SaleReportType>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) =>
  //       h(Checkbox, {
  //         checked: table.getIsAllPageRowsSelected(),
  //         "onUpdate:checked": (value: boolean) =>
  //           table.toggleAllPageRowsSelected(!!value),
  //         ariaLabel: "Select all",
  //       }),
  //     cell: ({ row }) =>
  //       h(Checkbox, {
  //         checked: row.getIsSelected(),
  //         "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
  //         ariaLabel: "Select row",
  //       }),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "No",
    header: () => h("div", { class: "text-right" }, "No"),
    cell: ({ row }) => {
      const no = row.index + 1;

      return h("div", { class: "text-right font-medium" }, no);
    },
  },
  {
    accessorKey: "productID",
    header: () => h("div", { class: "text-center" }, "ProductID"),
    cell: ({ row }) => {
      const id = row.getValue("productID") as string;

      return h("div", { class: "text-right font-medium" }, id);
    },
  },
  {
    accessorKey: "quantitySold",
    header: () => h("div", { class: "text-right" }, "QuantitySold"),
    cell: ({ row }) => {
      const quantity = Number.parseFloat(row.getValue("quantitySold"));

      return h("div", { class: "text-right font-medium" }, quantity);
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => h("div", { class: "text-right" }, "TotalPrice"),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "totalProfit",
    header: () => h("div", { class: "text-right" }, "TotalProfit"),
    cell: ({ row }) => {
      const profit = Number.parseFloat(row.getValue("totalProfit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  //   {
  //     accessorKey: "createdDate",
  //     header: () => h("div", { class: "text-right" }, "createdDate"),
  //     cell: ({ row }) => {
  //       const date = new Date(row.original.createdDate);
  //       const formattedDate = formatDate(date, "MM/dd/yyyy"); // Adjust the format as needed
  //       return h("div", { class: "text-right font-medium" }, formattedDate);
  //     },
  //     sortingFn: "datetime", // Enable sorting by date
  //   },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "desc"),
        },
        () => ["Sale Date", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const saleDate = (row.getValue("createdDate") as string).split("T")[0];

      return h("div", { class: "text-center font-medium" }, saleDate);
    },
  },
];
