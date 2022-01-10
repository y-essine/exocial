<template >
    <div class="flex justify-between">
        <h1
            class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
        >Feed </h1>
        <!-- <button
            @click="addPost('🌊😒 Newest Post 🌊😒')"
            class="text-lg font-extrabold text-gray-200 px-3 py-1 rounded bg-green-700/50 hover:bg-green-700"
        >AddPost
        </button> -->
        <button
            @click="notOpen"
            :class="{ 'bg-green-700/50 hover:bg-green-700': !this.postOpen, 'bg-red-500/50 hover:bg-red-700/50 ': this.postOpen }"
            class="text-lg font-extrabold text-gray-200 px-3 py-1 rounded"
        >{{ Text = this.postOpen ? 'Cancel' : 'Post' }}</button>
    </div>

    <NewPost
        :isOpen="this.postOpen"
        @closePost="notOpen"
        @newPost="addPost"
        v-bind:user="this.user"
    />

    <transition-group name="post-list" tag="ul">
        <li v-for="(post,index) in feed" :key="post._id">
            <Post v-bind:post="post" :index="index" :currentUser="user"/>
        </li>
    </transition-group>
    <div v-if="loadingFeed" class="text-red-500 opacity-75 flex justify-center mt-56">
        <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
    </div>
</template>

<script>

import Post from '../cards/posts/Post.vue';
import NewPost from '../cards/posts/NewPost.vue';

import moment from 'moment'

import axios from 'axios';

axios.defaults.baseURL = '/api';


export default {
    name: 'Home',
    data() {
        return {
            postOpen: false,
            loadingFeed: false,
            user: {},
            feed: [],
        }
    },
    methods: {
        addPost(newContent) {
            let post = {
                author: this.user,
                content: newContent,
                likes: [],
                createdAt: moment()
            }
            this.feed.unshift(post)
        },
        notOpen() {
            this.postOpen = !this.postOpen;
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
    async created() {
        await this.getFeed();
    },
    components: {
        Post,
        NewPost
    }

}

</script>

<style scoped>
.post-list-move {
    transition: transform 0.7s ease;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.3s ease-in;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
}
</style>