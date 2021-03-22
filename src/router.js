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
            path: "/about",
            name: "about-page",
            component: () => import("./components/AboutPage")
        },
        {
            path: "/provinces",
            name: "province-list",
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
        },
        {
            path: "/thematic_fields",
            name: "thematic-field-list",
            component: () => import("./components/ThematicFieldList")
        },
        {
            path: "/thematic_fields/:id",
            name: "thematic-field-detail",
            component: () => import("./components/ThematicFieldDetail")
        },
        {
            path: "/facilities",
            name: "facility-list",
            component: () => import("./components/FacilityList")
        },
        {
            path: "/facilities/:id",
            name: "facility-detail",
            component: () => import("./components/FacilityDetail")
        }
    ]
})
