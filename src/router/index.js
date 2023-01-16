import { createRouter, createWebHistory } from "vue-router";
import Books from "../views/HomeView.vue";
import AddBook from "../views/AddBookView.vue";
import UpdateBook from "../views/UpdateBookView.vue";

const routes = [
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/book/add",
    name: "Add Book",
    component: AddBook,
  },
  {
    path: "/book/:id",
    name: "Update Book",
    component: UpdateBook,
  },
];

let router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
