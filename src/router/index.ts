import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ConfigLayout from "@/layouts/ConfigLayout.vue";

import NotFound from "@/views/NotFound.vue";
import ContactsPage from "@/views/ContactsPage.vue";
import CreateContactPage from "@/views/CreateContactPage.vue";
import MakePymentPage from "@/views/MakePymentPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Main",
        component: MakePymentPage,
      },
      {
        path: "config",
        component: ConfigLayout,
        children: [
          {
            path: "contacts",
            name: "Contacts",
            component: ContactsPage,
          },
          {
            path: "contacts/:id",
            name: "Contact",
            component: CreateContactPage,
          },
        ],
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
