<template>
    <div class="m-6 space-y-3.5">
        <div class="flex justify-between">
            <h1 class="font-extrabold text-red-500 text-3xl">Home</h1>
            <div class="flex-col flex items-center">
                <h1 class="font-extrabold text-indigo-500 text-3xl">{{ user.username }}</h1>
                <button
                    class="rounded bg-red-500/50 hover:bg-red-500/30 p-3 mt-5 text-slate-300 ml-auto"
                    @click="logout"
                >Logout</button>
            </div>
        </div>
        <div>
            <!-- post card -->
            <div class="bg-neutral-800 shadow-lg rounded-lg md:mx-auto my-5 max-w-md md:max-w-2xl">
                <!--horizantil margin is just for display-->
                <div class="flex items-start px-4 py-6">
                    <img
                        class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left"
                        src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="avatar"
                    />
                    <div class>
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold text-gray-200 -mt-1">Brad Adams</h2>
                            <small class="text-sm text-gray-300">22h ago</small>
                        </div>
                        <p class="text-gray-300 text-xs">Joined 12 SEP 2012.</p>
                        <p
                            class="mt-3 text-gray-300 text-sm"
                        >Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!</p>
                        <div class="mt-4 flex items-center">
                            <div class="flex mr-2 text-gray-300 text-sm">
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    class="w-4 h-4 mr-1"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span>12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template> 

<script >

import axios from 'axios';


export default {
    name: 'Home',
    data() {
        return {
            user: {}
        }
    },
    created() {
        //used not auth
        if (localStorage.getItem('auth_token') === null) {
            this.$notify({ type: 'error', title: 'No login!', text: "Please log in first." });
            this.$router.push('/login');
        }
    },
    mounted() {
        axios.get(prefix + '/api/users/user', { headers: { token: localStorage.getItem('auth_token') } })
            .then(res => {
                this.user = res.data.user;
            })
    },
    methods: {
        logout() {
            this.$notify({ clean: true });
            this.$notify({ type: 'warning', title: 'Logged out', text: "Logged out successfully." });
            this.$router.push('/login');
            localStorage.clear();
        }
    }
}
</script>
