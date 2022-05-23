import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";

import WithHeaderLayout from "@/layouts/WithHeaderLayout.vue";

import NotFound from "@/views/NotFound.vue";
import ContactsPage from "@/views/ContactsPage.vue";
import CreateContactPage from "@/views/CreateContactPage.vue";
import MakePymentPage from "@/views/MakePymentPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: WithHeaderLayout,
    props: (route: RouteLocationNormalized) => ({
      title: route?.meta.title ?? "",
      create: route?.meta.create ?? false,
      back: route?.meta.back ?? false,
      backRoute: route?.meta.backRoute ?? "",
    }),
    children: [
      {
        path: "",
        name: "Main",
        component: MakePymentPage,
        meta: {
          title: "Make a payment",
          back: false,
          backRoute: "",
          create: false,
        },
      },
      {
        path: "contacts",
        name: "Contacts",
        component: ContactsPage,
        meta: {
          title: "Select contact",
          back: true,
          backRoute: "Main",
          create: true,
        },
      },
      {
        path: "createContact",
        name: "CreateContact",
        component: CreateContactPage,
        meta: {
          title: "New contact",
          back: true,
          backRoute: "Contacts",
          create: false,
        },
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
  if (to.name === "Main" && from.name === "Contacts") {
    to.meta.transition = "slide-right";
    from.meta.transition = "slide-right";
  }

  if (to.name === "Contacts") {
    if (from.name === "Main") {
      to.meta.transition = "slide-left";
      from.meta.transition = "slide-left";
    }

    if (from.name === "CreateContact") {
      to.meta.transition = "slide-right";
      from.meta.transition = "slide-right";
    }
  }

  if (to.name === "CreateContact" && from.name === "Contacts") {
    to.meta.transition = "slide-left";
    from.meta.transition = "slide-left";
  }

  if (to.name === "Main" && from.name === "Contacts") {
    to.meta.transition = "slide-right";
    from.meta.transition = "slide-right";
  }
});

export default router;
