import type { RouterOptions } from "@nuxt/schema"
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
    routes: (_routes) => {
        const { ssrContext } = useNuxtApp()
        const subdomain = useSubdomain()
        if (ssrContext?.event.context.subdomain) subdomain.value = ssrContext?.event.context.subdomain

        if (subdomain.value) {
            const userRoute = _routes.filter((i) => {
                console.log('origin', i);

                return i.path.includes("/user/:siteId")
            })
            /**
             * {
                    path: '/user/:siteId',
                    file: 'C:/Users/Chuia/keypress/pages/user/[siteId].vue',
                    children: [
                        {
                        name: 'user-siteId-slug',
                        path: ':slug',
                        file: 'C:/Users/Chuia/keypress/pages/user/[siteId]/[slug].vue',
                        children: [],
                        meta: undefined,
                        alias: [],
                        component: [Function: component]
                        },
                        {
                        name: 'user-siteId-home',
                        path: 'home',
                        file: 'C:/Users/Chuia/keypress/pages/user/[siteId]/home.vue',
                        children: [],
                        meta: undefined,
                        alias: [],
                        component: [Function: component]
                        },
                        {
                        name: 'user-siteId',
                        path: '',
                        file: 'C:/Users/Chuia/keypress/pages/user/[siteId]/index.vue',
                        children: [],
                        meta: undefined,
                        alias: [],
                        component: [Function: component]
                        }
                    ],
                    meta: { layout: 'user' },
                    alias: [],
                    component: [Function: component]
                    }
             */
            const userRouteMapped = userRoute.map((i) => {
                console.log('mapped', i);

                console.log('i.path', i.path);
                const isUserSite = i.path === "/user/:siteId"

                let path = isUserSite ? i.path.replace("/user/:siteId()", "/") : i.path.replace("/user/:siteId()/", "/")
                console.log('path', path);
                return {
                    ...i,
                    path: path,
                }
            })

            return userRouteMapped
        }
    },
}