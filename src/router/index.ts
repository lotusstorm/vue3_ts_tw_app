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
      },
      {
        path: "config",
        component: ConfigLayout,
        props: (route: RouteLocationNormalized) => ({
          title: route?.meta.title ?? "",
          needCreate: route?.meta.needCreate ?? false,
        }),
        children: [
          {
            path: "contacts",
            name: "Contacts",
            component: ContactsPage,
            meta: {
              title: "Select contact",
              needCreate: true,
            },
          },
          {
            path: "createContact",
            name: "CreateContact",
            component: CreateContactPage,
            meta: {
              title: "New contact",
              needCreate: false,
            },
          },
        ],
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  console.log();

  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});

export default router;
