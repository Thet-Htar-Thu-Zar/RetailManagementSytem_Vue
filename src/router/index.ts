import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "@/layouts/AppLayout.vue";
import Cart from "@/modules/cart/Cart.vue";
import Cashier from "@/modules/cashier/Cashier.vue";
import Manager from "@/modules/manager/Manager.vue";
import ProductView from "@/modules/product/ProductView.vue";
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
          component: Cart,
        },
        {
          path: "/cashier",
          name: "cashier",
          component: Cashier,
        },
        {
          path: "/manager",
          name: "manager",
          component: Manager,
        },
      ],
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
