<template>
    <div class="flex-none">
        <div class>
            <h1
                class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
            >Details</h1>
            <div
                v-if="this.isUserLoaded"
                class="mt-8 w-full flex justify-between sm:flex-row 2xs:flex-col items-center bg-secondary rounded-xl sm:pl-8 2xs:px-0 sm:py-8 2xs:pt-8 shadow-lg"
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
                    <div v-if="user.isAdmin" class="flex justify-center mt-4">
                        <h1
                            class="admin inline text-lg font-extrabold text-red-500 px-3 py-1 rounded bg-accent"
                        >Admin</h1>
                    </div>
                </div>
                <div class="flex flex-col px-8 py-10 w-full">
                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly" :class="{ 'md:flex-col lg:flex-row' : this.isEdit }">
                        <div v-if="!this.isEdit" class="justify-center">
                            <h1
                                class="inline font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                            >{{ user.firstname }}</h1>
                            <h1
                                class="inline font-extrabold text-t-accent hover:text-gray-500/70 text-xl uppercase"
                            >{{ ' ' + user.lastname }}</h1>
                        </div>
                        <div v-else class="flex justify-center mb-3">
                            <input
                                type="firstname"
                                name="firstname"
                                placeholder="Firstname"
                                class="inline max-w-[9.5rem] h-6 rounded focus:outline-none font-extrabold text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl uppercase text-right"
                                v-model="form.firstname"
                            />
                            <input
                                type="lastname"
                                name="lastname"
                                placeholder="Lastname"
                                class="inline ml-4 max-w-[9.5rem] h-6 rounded focus:outline-none font-extrabold text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl uppercase"
                                v-model="form.lastname"
                            />
                        </div>

                        <div>
                            <h1 class="text-lg font-semibold text-t-secondary hover:text-gray-400" >{{ user.email }}</h1>
                        </div>
                    </div>

                    <div class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4 " :class="{ 'md:flex-col lg:flex-row' : this.isEdit }">
                        <h1
                            class="font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Followers : ' + user.followers.length }}</h1>
                        <h1
                            class="2xs:mt-3 sm:mt-0 font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                        >{{ 'Following : ' + user.myFollowings }}</h1>
                    </div>
                    <div v-if="!this.isEdit" class="flex sm:flex-row 2xs:flex-col items-center">
                        <h3
                            v-if="user.bio"
                            class="text-t-secondary 2xs:mt-2 font-semibold italic sm:ml-auto hover:text-gray-400"
                        >{{ user.bio }}</h3>
                        <button
                            @click="notEdit"
                            class="bg-red-500/50 hover:bg-red-700/50 2xs:mt-4 sm:mt-10 sm:ml-auto text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                        >Edit</button>
                    </div>
                    <div v-else class="flex sm:flex-row 2xs:flex-col items-center" :class="{ 'md:flex-col lg:flex-row justify-evenly' : this.isEdit }">
                        <textarea
                            type="description"
                            name="description"
                            placeholder="Bio"
                            class="2xs:mt-2 sm:mt-4 inline min-h-[8rem] max-w-[16rem] h-6 rounded focus:outline-none font-semibold italic text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl"
                            v-model="form.bio"
                        />
                        <button
                            @click="saveEdit"
                            class="bg-green-500/50 hover:bg-green-700/50' 2xs:mt-4 sm:mt-8  text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                        >Save</button>
                        <button
                            @click="notEdit"
                            class="bg-gray-700/50 hover:bg-gray-600/50 2xs:mt-4 sm:mt-8  text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                        >Cancel</button>
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

import Post from '../cards/posts/Post.vue';

import axios from 'axios';

import { validateProfileEdit } from '../validator';

axios.defaults.baseURL = '/api';


export default {
    name: 'profile-page',
    props: ['isUserLoaded', 'user'],
    data() {
        return {
            isEdit: false,
            isPostsLoaded: false,
            posts: {},
            form: {
                firstname: "",
                lastname: "",
                email: "",
                bio: "",
            }
        }
    },
    methods: {
        async getPosts() {
            await axios.get('/posts/' + this.user._id + '/posts')
                .then(res => {
                    this.posts = res.data;
                    this.isPostsLoaded = true;
                })
        },
        updateInfo() {
            this.user.firstname = this.form.firstname;
            this.user.lastname = this.form.lastname;
            this.user.bio = this.form.bio;
        },
        notEdit() {
            this.isEdit = !this.isEdit
            if (this.isEdit) {
                this.form.firstname = this.user.firstname;
                this.form.lastname = this.user.lastname;
                this.form.bio = this.user.bio;
            }
        },
        async saveEdit() {
            if (!validateProfileEdit(this.form))
                return;
            await axios.put('/users/' + this.user._id + '/edit', {
                firstname: this.form.firstname,
                lastname: this.form.lastname,
                bio: this.form.bio,
                token: localStorage.getItem('auth_token')
            }).then(res => {
                if (res.status == 200) {
                    this.$notify({ type: 'success', text: 'Successfully edited profile.' })
                    this.updateInfo();
                }
                else
                    console.log(res.data)
            });

            this.notEdit();
        }
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