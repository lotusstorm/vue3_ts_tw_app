import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

const store = reactive({
  firstName: "",
  lastName: "",
  email: "",
  contactsList: [
    { id: 1, first_name: "contact-1", last_name: "rrw", email: "aaade@adad.com" },
    { id: 2, first_name: "contact-2", last_name: "rrw", email: "aaade@adad.com" },
    { id: 3, first_name: "contact-3", last_name: "rrw", email: "aaade@adad.com" },
    { id: 4, first_name: "contact-4", last_name: "rrw", email: "aaade@adad.com" },
    { id: 5, first_name: "contact-5", last_name: "rrw", email: "aaade@adad.com" },
  ],
});

const mutation = (data: object) => {
  Object.assign(store, data);
};

app.provide("store", {
  store,
  mutation,
});
app.use(router);
app.mount("#app");
