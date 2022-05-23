import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

const store = reactive({
  firstName: "",
  lastName: "",
  email: "",
  contactsList: [],
});

const mutation = (data: object) => {
  Object.assign(store, data);
};

app.provide("store", <
  {
    store: object;
    mutation: () => void;
  }
>{
  store,
  mutation,
});
app.use(router);
app.mount("#app");
