<template >
    <div class="flex justify-between">
        <h1
            class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
        >Feed</h1>

        <button
            @click="notOpen"
            :class="{ 'bg-green-700/70 hover:bg-green-700': !isPostOpen, 'bg-red-700/70 hover:bg-red-700/90 ': isPostOpen }"
            class="text-lg font-extrabold text-gray-200 px-3 py-1 rounded"
        >{{ Text = isPostOpen ? 'Cancel' : 'Post' }}</button>
    </div>

    <NewPost
        :isOpen="isPostOpen"
        @closePost="notOpen"
        @newPost="addPost"
        v-bind:user="this.user"
    />

    <transition-group name="post-list" tag="ul">
        <li v-for="(post,index) in feed" :key="post._id">
            <Post v-bind:post="post" :index="index" :currentUser="user" />
        </li>
    </transition-group>

    <div v-if="!isFeedLoaded" class="text-red-500 opacity-75 flex justify-center mt-56">
        <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
    </div>
</template>

<script>

import Post from '../../cards/posts/Post.vue';
import NewPost from '../../cards/posts/NewPost.vue';

import moment from 'moment'

import axios from 'axios';

axios.defaults.baseURL = '/api';


export default {
    name: 'home-page',
    props: ['isUserLoaded', 'user'],
    data() {
        return {
            isPostOpen: false,
            isFeedLoaded: false,
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
            this.isPostOpen = !this.isPostOpen;
        },
        async getFeed() {
            await axios.post('/posts/feed/all', { userId: this.user._id })
                .then(res => {
                    this.feed = res.data;
                    this.isFeedLoaded = true;
                })

        }
    },
    watch: {
        isUserLoaded: async function (newer, old) {
            if (newer)
                await this.getFeed()
        }
    },
    async created() {
        if(this.isUserLoaded)
            await this.getFeed()
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