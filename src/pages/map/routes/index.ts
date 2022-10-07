import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "./main";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [],
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
