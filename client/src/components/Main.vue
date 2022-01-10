
<style>
@import "./bg.scss";

.bg-anim {
    overflow: hidden;
    width: 80vw;
}
</style>

<template>
    <div class="bg-anim flex">
        <div v-for="x in 100" class="circle-container">
            <div class="circle"></div>
        </div>
    </div>
    <div class="md:flex">
        <Sidebar />
        <div class="px-6 py-4 space-y-3.5 flex-row md:flex-col md:w-full">
            <Header v-bind:user="this.user" />
            <div class="page-container py-3">
                <router-view />
            </div>
        </div>
    </div>
</template> 

<script >


import Sidebar from './sidebar/Sidebar.vue'
import Header from './header/Header.vue'

import axios from 'axios';

axios.defaults.baseURL = '/api';

export default {
    components: {
        Header,
        Sidebar,
    },
    data() {
        return {
            user: { _id: 'Loading...', firstname: 'Loading...', lastname: 'Loading...', avatar: '' },
        }
    },
    created() {
        //user not auth'd
        if (localStorage.getItem('auth_token') === null) {
            this.$notify({ type: 'error', title: 'No login!', text: "Please log in first." });
            this.$router.push('/login');
        }
    },
    mounted() {
        axios.get('/auth/user', { headers: { token: localStorage.getItem('auth_token') } })
            .then(res => {
                this.user = res.data.user;
                this.$store.dispatch('saveUser', this.user)
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
