<script setup>

import Sidebar from './sidebar/Sidebar.vue'
import Header from './header/Header.vue'
</script>

<template>
    <div class="md:flex">
        <Sidebar />
        <div class="px-6 py-4 space-y-3.5 flex-row md:flex-col md:w-full">
            <Header v-bind:user="user" />
            <div class="page-container">
                <router-view />
            </div>
        </div>
    </div>
</template> 

<script >
import axios from 'axios';

let prefix = import.meta.env.DEV ? 'http://localhost:3000' : '';

export default {
    components: {
        Header,
        Sidebar,
    },
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
