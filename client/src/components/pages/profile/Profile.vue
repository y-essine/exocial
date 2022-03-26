<template>
    <div class="flex-none">
        <div class>
            <h1
                class="inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
            >Overview</h1>
            <div 
                v-if="this.isUserLoaded">
                <ProfileOverview v-bind:user="this.user"></ProfileOverview>
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

import ProfileOverview from './ProfileOverview.vue';

import Post from '../../cards/posts/Post.vue';

import axios from 'axios';
import ProfileOverview1 from './ProfileOverview.vue';

axios.defaults.baseURL = '/api';


export default {
    name: 'profile-page',
    props: ['isUserLoaded', 'user'],
    data() {
        return {
            isPostsLoaded: false,
            posts: {},
            // isEdit: false,
            // form: {
            //     firstname: "",
            //     lastname: "",
            //     email: "",
            //     bio: "",
            // },
            // selectedAvatar: null,
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
        // updateInfo() {
        //     this.user.firstname = this.form.firstname;
        //     this.user.lastname = this.form.lastname;
        //     this.user.bio = this.form.bio;
        // },
        // notEdit() {
        //     this.isEdit = !this.isEdit
        //     if (this.isEdit) {
        //         this.form.firstname = this.user.firstname;
        //         this.form.lastname = this.user.lastname;
        //         this.form.bio = this.user.bio;
        //     }
        // },
        // async saveEdit() {
        //     if (!validateProfileEdit(this.form))
        //         return;
        //     await axios.put('/users/' + this.user._id + '/edit', {
        //         firstname: this.form.firstname,
        //         lastname: this.form.lastname,
        //         bio: this.form.bio,
        //         token: localStorage.getItem('auth_token')
        //     }).then(res => {
        //         if (res.status == 200) {
        //             this.$notify({ type: 'success', text: 'Successfully edited profile.' })
        //             this.updateInfo();
        //         }
        //         else
        //             console.log(res.data)
        //     });

        //     this.notEdit();
        // },
        // onAvatarSelected(event) {
        //     let file = event.target.files[0]
        //     if(file){
        //         this.selectedAvatar = file;
        //         this.$refs.avatarName.innerText = file.name;
        //         console.log(file.name);
        //     }
        // }
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
    ProfileOverview,
    Post,
    ContentLoader,
    ProfileOverview1
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