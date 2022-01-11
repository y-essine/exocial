<template>
    <div class="flex-none">
        <div class>
            <h1
                class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
            >Details</h1>
            <div
                class="mt-8 w-full flex sm:flex-row 2xs:flex-col items-center bg-secondary rounded-xl sm:pl-8 2xs:px-0 sm:py-8 2xs:pt-8 shadow-lg"
            >
                <div class="flex flex-col items-center min-w-fit">
                    <h1
                        class="mb-2 font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                    >{{ user.username }}</h1>
                    <img
                        :class="{ 'admin': user.isAdmin }"
                        class="w-32 h-32 rounded-full object-cover shadow-lg"
                        :src="user.avatar"
                        alt="avatar"
                    />
                </div>
                <div class="flex flex-col px-8 py-10 w-full">
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly">
                        <div class="justify-center">
                            <h1
                                class="inline font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                            >{{ user.firstname }}</h1>
                            <h1
                                class="inline font-extrabold text-t-accent hover:text-gray-500/70 text-xl uppercase"
                            >{{ ' ' + user.lastname }}</h1>
                        </div>

                        <div>
                            <h1 class="text-lg font-semibold text-t-secondary">{{ user.email }}</h1>
                        </div>
                    </div>
                    <div v-if="user.isAdmin" class="flex justify-center mt-4 ">
                        <h1
                            class="admin inline text-lg font-extrabold text-red-500 px-3 py-1 rounded bg-accent"
                        >Admin</h1>
                    </div>
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4">
                        <h1
                            class="font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Followers : ' + user.followers.length }}</h1>
                        <h1
                            class="2xs:mt-3 sm:mt-0 font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Following : ' + user.followings.length }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-12">
            <h1
                class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
            >Posts</h1>
            <div class="mt-8">
                <transition-group name="post-list" tag="ul">
                    <li v-for="(post,index) in posts" :key="post">
                        <Post v-bind:post="post" :index="index" :currentUser="user"/>
                    </li>
                </transition-group>
                <div
                    v-if="this.loadingPosts"
                    class="text-red-500 opacity-75 flex justify-center mt-32"
                >
                    <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
                </div>
            </div>
        </div>
    </div>
</template> 

<script >

import Post from '../cards/posts/Post.vue';

import axios from 'axios';

axios.defaults.baseURL = '/api';


export default {
    name: 'Profile',
    data() {
        return {
            loadingPosts: false,
            user: { username:'Loading...' , firstname: 'Loading...' , lastname:'Loading...' , followers: [], followings: [] },
            posts: {}
        }
    },
    methods: {
        async getUser() {
            await axios.get('/auth/user', { headers: { token: localStorage.getItem('auth_token') } })
                .then(res => {
                    this.user = res.data.user;
                })
        },
        async getPosts() {
            this.loadingPosts = true;
            await this.getUser().then(async () => {
                await axios.get('/posts/' + this.user._id + '/posts')
                    .then(res => {
                        this.posts = res.data;
                        this.loadingPosts = false;
                    })
            })
        }
    },
    async mounted() {
        await this.getPosts();
    },
    components: {
        Post
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

.admin {
    padding: 0.5rem;
    box-shadow: 0 1px 5px 2px rgba(225, 131, 131, 0.25),
        0 -1px 0 0 rgba(165, 181, 222, 0.25),
        1px 0 0 0 rgba(225, 131, 151, 0.25),
        -1px 0 0 0 rgba(165, 181, 222, 0.25),
        1px -1px 0 0 rgba(195, 156, 208, 0.5),
        -1px 1px 0 0 rgba(188, 208, 156, 0.5),
        1px 1px 0 0 rgba(255, 105, 105, 0.75),
        -1px -1px 0 0 rgba(235, 208, 135, 0.75);
}
</style>