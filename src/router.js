import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main-page",
            component: () => import("./components/mainPage")
        },
        {
            path: "/filter",
            name: "filter",
            component: () => import("./components/provincesList")
        },
        {
            path: "/provinces/:id",
            name: "province-detail",
            component: () => import("./components/provinceDetail")
        },
        {
            path: "/organizations/:id",
            name: "organization-detail",
            component: () => import("./components/organizationDetail")
        },
        {
            path: "/new",
            name: "organization-create",
            component: () => import("./components/createOrganization")
        }
    ]
})
