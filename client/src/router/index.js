import { createRouter, createWebHistory } from "vue-router";


import Main from '/src/components/Main.vue'
import Home from '/src/components/pages/home/Home.vue'
import Login from '/src/components/Login.vue'
import Signup from '/src/components/Signup.vue'

import NProgress from 'nprogress'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home

            },
            {
                path: '/chat',
                name: 'Chatest',
                component: () => import('/src/components/pages/chat/Chatest.vue')

            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('/src/components/pages/profile/Profile.vue')
            },
            {
                path: '/settings',
                name: 'Settings',
                component: () => import('/src/components/pages/settings/Settings.vue')
            },
            {
                path: '/user/:username',
                name: 'User',
                component: () => import('/src/components/pages/userprofile/UserProfile.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        NProgress.start()
    }

    next()
})


router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})


//page setup
router.beforeEach((to, from) => {
    //check which page


    switch (to.name) {
        case 'Login':
            document.title = 'EXOCIAL - Login';
            break;
        case 'Signup':
            document.title = 'EXOCIAL - Sign Up';
            break;
        case 'Home':
            document.title = 'EXOCIAL - Home';
            break;

        case 'Profile':
            document.title = 'EXOCIAL - Profile';
            break;
        case 'Settings':
            document.title = 'EXOCIAL - Settings';
            break;
        case 'User Profile':
                document.title = 'EXOCIAL - User Profile';
                break;
        default:
            document.title = 'EXOCIAL';
            break;

        // }
    }
})

export default router