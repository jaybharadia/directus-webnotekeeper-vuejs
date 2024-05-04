import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/home.vue";
import LoginView from "../views/login.vue";
import Upsert from "../views/upsert.vue";
import { inject } from "vue";
const routes = [
    { path: "/:catchAll(.*)*", name: "catch-all", component: HomeView },
    { path: "/", name: "home", meta: { public: false }, component: HomeView },
    {
        path: "/note/:id",
        name: "upsert",
        meta: { public: false },
        component: Upsert,
    },
    {
        path: "/login",
        name: "login",
        meta: { public: true },
        component: LoginView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const directus = inject("directus");
    if (!to.meta.public) {
        const token = await directus.getToken();
        if (!token) return { name: "login" };
    }
});

export default router;
