import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/aboutview.vue'

// went away from CamelCase to avoid 404 browser error
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
      component: AboutView
    },
    {
      path: "/editabletable",
      name: "EditableTable",
      component: () =>
        import(/*webpackChunkName:"editabletable"*/ "@/pages/editabletable.vue"),
    },
    {
      path: "/addcustomer",
      name: "AddCustomer",
      component: () =>
        import(
          /*webpackChunkName:"addcustomer"*/ "@/views/addcustomerdetails.vue"
        ),
    },
    {
      path: "/addcontract",
      name: "AddContract",
      component: () =>
        import(
          /*webpackChunkName:"addcontract"*/ "@/pages/addcontract.vue"
        ),
    },
    {
      path: "/yearfilter",
      name: "YearFilter",
      component: () =>
        import(
          /*webpackChunkName:"yearfilter"*/ "@/pages/yearfilter.vue"
        ),
    },
    {
      path: "/profile",
      name: "UserProfile",
      component: () =>
        import(
          /*webpackChunkName:"profile"*/ "@/pages/userprofile.vue"
        ),
    },
  ]
})

export default router;
