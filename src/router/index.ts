import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'

// went away from CamelCase to avoid 404 browser
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
        import(/*webpackChunkName:"aboutview"*/ "@/views/AboutView.vue"),
    },
    {
      path: "/editabletable",
      name: "EditableTable",
      component: () =>
        import(/*webpackChunkName:"editabletable"*/ "@/pages/EditableTable.vue"),
    },
    {
      path: "/addcustomer",
      name: "AddCustomer",
      component: () =>
        import(
          /*webpackChunkName:"addcustomer"*/ "@/views/AddCustomerDetails.vue"),
    },
    {
      path: "/addcontract",
      name: "AddContract",
      component: () =>
        import(
          /*webpackChunkName:"addcontract"*/ "@/pages/AddContract.vue"),
    },
    {
      path: "/yearfilter",
      name: "YearFilter",
      component: () =>
        import(
          /*webpackChunkName:"yearfilter"*/ "@/pages/YearFilter.vue"
        ),
    },
    {
      path: "/profile",
      name: "UserProfile",
      component: () =>
        import(
          /*webpackChunkName:"profile"*/ "@/pages/UserProfile.vue"
        ),
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () =>
        import(
          /*webpackChunkName:"profile"*/ "@/pages/SignIn.vue"
        ),
    },
  ]
})

export default router;
