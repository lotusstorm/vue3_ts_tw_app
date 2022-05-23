import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";

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
        meta: {
          transition: "slide-left",
        },
      },
      {
        path: "config",
        component: ConfigLayout,
        props: (route: RouteLocationNormalized) => ({
          title: route?.meta.title ?? "",
          needCreate: route?.meta.needCreate ?? false,
        }),
        meta: {
          transition: "slide-right",
        },
        children: [
          {
            path: "contacts",
            name: "Contacts",
            component: ContactsPage,
            meta: {
              title: "Select contact",
              needCreate: true,
              transition: "slide-right",
            },
          },
          {
            path: "createContact",
            name: "CreateContact",
            component: CreateContactPage,
            meta: {
              title: "New contact",
              needCreate: false,
              transition: "slide-left",
            },
          },
        ],
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
