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
                    >{{ profileUser.username }}</h1>
                    <img
                        :class="{ 'admin': profileUser.isAdmin }"
                        class="w-32 h-32 rounded-full object-cover shadow-md"
                        :src="profileUser.avatar"
                        alt="avatar"
                    />
                </div>
                <div class="flex flex-col px-8 py-10 w-full">
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly">
                        <div class="justify-center">
                            <h1
                                class="inline font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                            >{{ profileUser.firstname }}</h1>
                            <h1
                                class="inline font-extrabold text-t-accent hover:text-gray-500/70 text-xl uppercase"
                            >{{ ' ' + profileUser.lastname }}</h1>
                        </div>

                        <div>
                            <h1
                                class="text-lg font-semibold text-t-secondary"
                            >{{ profileUser.email }}</h1>
                        </div>
                    </div>
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4">
                        <h1
                            class="font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Followers : ' + profileUser.followers.length }}</h1>
                        <h1
                            class="2xs:mt-3 sm:mt-0 font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Following : ' + profileUser.followings.length }}</h1>
                    </div>
                    <div class="flex justify-center mt-4">
                        <button
                            @click="followUser"
                            class="inline text-lg font-extrabold text-t-secondary px-3 py-1 rounded bg-primary hover:bg-accent shadow-md"
                        >{{ Text = this.isFollowed ? 'Unfollow' : 'Follow' }}</button>
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
                    <li v-for="(post,index) in posts" :key="post._id">
                        <Post v-bind:post="post" :index="index" :currentUser="this.user" />
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
    props: ['isUserLoaded', 'user'],
    data() {
        return {
            isFollowed: false,
            isLocallyFollowed: false,
            loadingPosts: false,
            profileUser: { followers: [], followings: [] },
            posts: {}
        }
    },
    methods: {
        async getUser() {
            await axios.get('/users/username/' + this.$route.params.username)
                .then(res => {
                    this.profileUser = res.data.user;
                    this.checkIfFollowed(this.profileUser);
                })



        },
        async getPosts() {
            this.loadingPosts = true;
            await this.getUser().then(async () => {
                if (this.user.username == this.$route.params.username)
                    return this.$router.push('/profile')
                await axios.get('/posts/' + this.profileUser._id + '/posts')
                    .then(res => {
                        this.posts = res.data;
                        this.loadingPosts = false;
                    })
            })
        },
        checkIfFollowed(user) {
            user.followers.forEach(element => {
                if (element._id == this.user._id) {
                    this.isFollowed = true;
                }

            });
        },
        async followUser() {
            let instruction = !this.isFollowed ? '/follow' : '/unfollow'
            this.isFollowed = !this.isFollowed;
            console.log(this.user.username + ' ' + instruction + ' ' + this.profileUser.username);
            await axios.put('/users/' + this.profileUser._id + instruction, { userId: this.user.id })
                .then(res => {
                    console.log(res.data);
                })
        },
    },
    watch: {
        isUserLoaded: async function (newValue) {
            if (newValue)
                await this.getPosts()
        }
    },
    async created() {
        if(this.isUserLoaded)
            await this.getPosts()
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