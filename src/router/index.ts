import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { ROUTS_NAMES, getAnimate } from "@/utils/helters";

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
        name: ROUTS_NAMES.MAIN,
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
        name: ROUTS_NAMES.CONTACTS,
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
        name: ROUTS_NAMES.CREATE_CONTACTS,
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
  if (to.name !== undefined && to.name !== null && from.name !== undefined && from.name !== null) {
    const toName: string = to.name.toString();
    const fromName: string = from.name.toString();

    const { fromSlide, toSlide } = getAnimate(toName, fromName);
    to.meta.transition = toSlide;
    from.meta.transition = fromSlide;
  }
});

export default router;
