<template >
        <div class="sidebar md:flex flex-col md:flex-row md:min-h-screen md:relative opacity-75 shadow-lg">
            <div
                class="flex flex-col w-full md:w-64 text-gray-800 bg-white dark-mode:text-gray-300 dark-mode:bg-neutral-900 flex-shrink-0"
                x-data="{ open: false }"
            >
                <div class="flex-shrink-0 px-6 py-4 flex flex-row items-center justify-between">
                    <a
                        @click="this.$router.push('/')"
                        class=" tracking-widest font-extrabold text-2xl uppercase rounded-lg dark-mode:text-gray-200 focus:outline-none focus:shadow-outline cursor-pointer"
                    >EXOCIAL</a>
                    <button
                        class="rounded-lg md:hidden focus:outline-none focus:shadow-outline text-t-primary hover:text-gray-300/80"
                        @click="open = !open"
                    >
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                            <path
                                v-show="!open"
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            />
                            <path
                                v-show="open"
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <nav
                    :class="{ 'block': open, 'hidden': !open }"
                    class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto"
                >
                    <SidebarLink to="/" icon="home" @click="notOpen">Home</SidebarLink>
                    <SidebarLink to="/profile" icon="user" @click="notOpen">Profile</SidebarLink>
                    <SidebarLink to="/settings" icon="cog" @click="notOpen">Settings</SidebarLink>
                    <SidebarLink to="" icon="sign-out-alt" @click="logout">Logout</SidebarLink>
                </nav>
            </div>
        </div>
</template>

<script>

import SidebarLink from './SidebarLink.vue'


export default {
    name: 'nav-sidebar',
    data() {
        return {
            open: false
        }
    },
    methods: {
        notOpen() {
            this.open = false;
        },
        logout() {
            this.$notify({ clean: true });
            this.$notify({ type: 'warning', title: 'Logged out', text: "Logged out successfully." });
            this.$router.push('/login');
            localStorage.clear();
        }
    },
    components: {
        SidebarLink
    }

}
</script>
