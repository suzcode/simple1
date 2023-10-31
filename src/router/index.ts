import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/*webpackChunkName:"editabletable"*/ "@/pages/AboutView.vue"),
    },
    // {
    //   path: "/customerdata",
    //   name: "CustomerData",
    //   component: () =>
    //     import(/*webpackChunkName:"customerdata"*/ "@/pages/CustomerData.vue"),
    // },
    // {
    //   path: "/editabletable",
    //   name: "EditableTable",
    //   component: () =>
    //     import(/*webpackChunkName:"editabletable"*/ "@/pages/EditableTable.vue"),
    // },
    // {
    //   path: "/toggleview",
    //   name: "ToggleView",
    //   component: () =>
    //     import(/*webpackChunkName:"toggleview"*/ "@/pages/ToggleView.vue"),
    // },
    // {
    //   path: "/filtered",
    //   name: "Filtered",
    //   component: () =>
    //     import(/*webpackChunkName:"editabletable"*/ "@/pages/FilterView.vue"),
    // },
    // {
    //   path: "/addcustomer",
    //   name: "AddCustomer",
    //   component: () =>
    //     import(
    //       /*webpackChunkName:"editabletable"*/ "@/pages/addCustomerDetails.vue"
    //     ),
    // },
  ]
})

export default router;
