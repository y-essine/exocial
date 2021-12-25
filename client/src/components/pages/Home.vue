<script setup>

import Post from '../cards/posts/Post.vue';
import EmptyPost from '../cards/posts/EmptyPost.vue';

</script>

<template >
    <div class="flex justify-between">
        <h1
            class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
        >Feed :</h1>
        <button @click="notOpen" class="bg-green-700/50 hover:bg-green-600 text-lg font-extrabold text-gray-200 px-3 py-1 rounded">Post</button>
    </div>

    <EmptyPost v-if="this.open" v-bind:user="this.user"/>

    <Post v-bind:feed="feed" />

    <div v-if="loadingFeed" class="text-red-500 opacity-75 flex justify-center mt-56">
        <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
    </div>
</template>

<script>

import axios from 'axios';

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api';


export default {
    name: 'Home',
    data() {
        return {
            user: {},
            feed: [],
            loadingFeed: false,
            open: false
        }
    },
    methods: {
        notOpen() {
            this.open = !this.open;
        },
        async getUser() {
            await axios.get('/auth/user', { headers: { token: localStorage.getItem('auth_token') } })
                .then(res => {
                    this.user = res.data.user;
                })
        },
        async getFeed() {
            this.loadingFeed = true;
            await this.getUser().then(async () => {
                await axios.post('/posts/feed/all', { userId: this.user._id })
                    .then(res => {
                        this.feed = res.data;
                        this.loadingFeed = false;
                    })
            })
        }
    },
    async mounted() {
        await this.getFeed();
    },
    components: {
        Post,
        EmptyPost
    }

}

</script>