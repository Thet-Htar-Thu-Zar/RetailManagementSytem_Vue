import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "@/layouts/AppLayout.vue";
import ProductView from "@/modules/product/ProductView.vue";
import CartView from "@/modules/cart/CartView.vue";
import CashierView from "@/modules/cashier/CashierView.vue";
import ManagerView from "@/modules/manager/ManagerView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: AppLayout,
      children: [
        // {
        //   path: '/',
        //   name: 'dashboard',
        //   component: Dashboard,
        // },
        {
          path: "/",
          name: "product",
          component: ProductView,
        },
        {
          path: "/cart",
          name: "cart",
          component: CartView,
        },
        {
          path: "/cashier",
          name: "cashier",
          component: CashierView,
        },
        {
          path: "/manager",
          name: "manager",
          component: ManagerView,
        },
      ],
    },
  ],
});

export default router;
