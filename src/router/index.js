import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Form from "../views/Form";
import Login from "../views/Login";
import FeedbackList from "@/views/FeedbackList";
import Registration from "@/views/Registration";
import userInfo from "@/views/userInfo";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/calculator",
    name: "Home",
    component: Home,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/feedbacklist",
    name: "FeedbackList",
    component: FeedbackList,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/userInfo",
    name: "userInfo",
    component: userInfo,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
