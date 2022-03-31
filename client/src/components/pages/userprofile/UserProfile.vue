<template>
    <div class="flex-none">
        <div class>
            <h1
                class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
            >Details</h1>

            <div
                v-if="this.isLoaded"
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
                    <div v-if="profileUser.isAdmin" class="flex justify-center mt-4">
                        <h1
                            class="admin inline text-lg font-extrabold text-red-500 px-3 py-1 rounded bg-accent"
                        >Admin</h1>
                    </div>
                </div>
                <div class="flex flex-col px-8 py-10 pt-6 w-full">
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
                                class="text-lg font-semibold text-t-secondary hover:text-gray-400"
                            >{{ profileUser.email }}</h1>
                        </div>
                    </div>
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4">
                        <h1
                            class="font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Followers : ' + profileFollowers }}</h1>
                        <h1
                            class="2xs:mt-3 sm:mt-0 font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Following : ' + profileUser.followings.length }}</h1>
                        
                    </div>
                    <div class="flex justify-center mt-2">
                        <h3
                            v-if="user.bio"
                            class="text-t-secondary 2xs:mt-2 font-semibold italic hover:text-gray-400"
                        >{{ profileUser.bio }}</h3>
                    </div>
                    
                    <div class="flex justify-center mt-4">
                        <button
                            @click="followUser"
                            class="inline text-lg font-extrabold text-t-secondary px-3 py-1 rounded bg-primary hover:bg-accent shadow-md"
                        >{{ Text = this.isFollowed ? 'Unfollow' : 'Follow' }}</button>
                    </div>
                    
                </div>
            </div>
            <div
                v-else
                class="mt-8 w-full flex sm:flex-row 2xs:flex-col items-center bg-secondary rounded-xl sm:pl-8 2xs:px-0 sm:py-8 2xs:pt-8 shadow-lg"
            >
                <div class="flex flex-col items-center min-w-fit">
                    <content-loader
                        class="mb-[0.9rem] h-full w-24"
                        viewBox="0 0 96 22"
                        primaryColor="#303030"
                        secondaryColor="#343434"
                    >
                        <rect x="0" y="0" rx="4" ry="4" width="96" height="22" />
                    </content-loader>

                    <content-loader
                        class="w-32 h-32 rounded-full object-cover shadow-md"
                        viewBox="0 0 1 1"
                        primaryColor="#303030"
                        secondaryColor="#343434"
                    >
                        <circle cx="50%" cy="50%" r="1" />
                    </content-loader>
                </div>
                <div class="flex flex-col px-8 py-10 pt-6 w-full">
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly">
                        <div class="justify-center">
                            <content-loader
                                class="inline mb-1 h-full w-24"
                                viewBox="0 0 96 22"
                                primaryColor="#303030"
                                secondaryColor="#343434"
                            >
                                <rect x="0" y="0" rx="4" ry="4" width="96" height="22" />
                            </content-loader>
                            <content-loader
                                class="inline ml-2 mb-1 h-full w-24"
                                viewBox="0 0 96 22"
                                primaryColor="#303030"
                                secondaryColor="#343434"
                            >
                                <rect x="0" y="0" rx="4" ry="4" width="96" height="22" />
                            </content-loader>
                        </div>

                        <div>
                            <content-loader
                                class="inline ml-2 mb-1 h-full w-56"
                                viewBox="0 0 224 22"
                                primaryColor="#303030"
                                secondaryColor="#343434"
                            >
                                <rect x="0" y="0" rx="4" ry="4" width="224" height="22" />
                            </content-loader>
                        </div>
                    </div>
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4">
                        <content-loader
                            class="inline ml-2 mb-1 h-full w-24"
                            viewBox="0 0 96 22"
                            primaryColor="#303030"
                            secondaryColor="#343434"
                        >
                            <rect x="0" y="0" rx="4" ry="4" width="96" height="22" />
                        </content-loader>
                        <content-loader
                            class="inline ml-2 mb-1 h-full w-24"
                            viewBox="0 0 96 22"
                            primaryColor="#303030"
                            secondaryColor="#343434"
                        >
                            <rect x="0" y="0" rx="4" ry="4" width="96" height="22" />
                        </content-loader>
                    </div>
                    <div class="flex justify-center mt-4">
                        <content-loader
                            class="inline ml-2 mb-1 h-full w-24"
                            viewBox="0 0 96 36"
                            primaryColor="#303030"
                            secondaryColor="#343434"
                        >
                            <rect x="0" y="0" rx="4" ry="4" width="96" height="36" />
                        </content-loader>
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
                    <li v-for="(post, index) in posts" :key="post">
                        <Post v-bind:post="post" :index="index" :currentUser="user" />
                    </li>
                </transition-group>
                <div
                    v-if="!this.isPostsLoaded"
                    class="text-red-500 opacity-75 flex justify-center mt-32"
                >
                    <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
                </div>
            </div>
        </div>
    </div>
</template> 

<script >

import { ContentLoader } from 'vue-content-loader';

import Post from '../../cards/posts/Post.vue';

import axios from 'axios';

axios.defaults.baseURL = '/api';


export default {
    name: 'user-profile-page',
    props: ['isUserLoaded', 'user'],
    data() {
        return {
            isFollowed: false,
            isLoaded: false,
            isPostsLoaded: false,
            profileFollowers: 0,
            profileUser: { followers: [], followings: [] },
            posts: {}
        }
    },
    methods: {
        async getUser() {
            await axios.get('/users/username/' + this.$route.params.username)
                .then(res => {
                    if (res.status == 201) {
                        this.$notify({ type: 'error', title: 'User not found!', text: "The user you're trying to reach is not found." });
                        this.$router.push('/');
                        return;
                    }
                    this.profileUser = res.data.user;
                    this.profileFollowers = this.profileUser.followers.length;
                    this.checkIfFollowed(this.profileUser);
                })
        },
        async getPosts() {
            await this.getUser().then(async () => {
                this.isLoaded = true;
                if (this.user.username == this.$route.params.username)
                    return this.$router.push('/profile')
                await axios.get('/posts/' + this.profileUser._id + '/posts')
                    .then(res => {
                        this.posts = res.data;
                        this.isPostsLoaded = true;
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
            let instruction = '';
            if (this.isFollowed) {
                instruction = '/unfollow';
                this.profileFollowers--;
                this.user.myFollowings--;
            }
            else {
                instruction = '/follow';
                this.profileFollowers++;
                this.user.myFollowings++;
            }
            this.isFollowed = !this.isFollowed;

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
        if (this.isUserLoaded)
            await this.getPosts()
    },
    components: {
        Post,
        ContentLoader
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