<script>

import Like from './ui/Like.vue'

import moment from 'moment'

import axios from 'axios';

axios.defaults.baseURL = '/api';


// import io from 'socket.io-client';


export default {
    name: 'post-item',
    props: {
        post: {
            required: true
        },
        index: {
            required: true
        },
        currentUser: {
            required: true
        }
    },
    data() {
        return {
            isLiked: false,
            isLocallyLiked: false,
            // socket: io('/'),
        }
    },
    methods: {
        formatDate(date) {
            return moment(date, 'YYYY-MM-DDThh:mm:ss.sssZ').format('DD MMM YYYY')
        },
        fromNow(date) {
            return moment(date, "YYYY-MM-DDThh:mm:ss.sssZ").fromNow()
        },
        checkIfLiked() {
            this.post.likes.forEach(element => {
                if (this.currentUser._id == element._id) {
                    this.isLiked = true
                    this.isLocallyLiked = true
                }
            });
        },
        async likePost(postId) {
            let likers = this.post.likes;
            let userId = this.currentUser._id;
            if (!this.isLocallyLiked) {
                likers.push(this.currentUser)
                this.isLocallyLiked = true

                await axios.put('/posts/' + postId + '/like', { userId: userId })
                    .then(res => {
                        // this.socket.emit('likedpost', {from: this.currentUser, post: this.post} );
                        console.log('likedpost', {from: this.currentUser.username, to: this.post.author.username, post: this.post.content} );
                    }, err => {
                        this.$notify({ type: 'error', title: 'Error!', text: "Trouble in like/dislike..." });
                    });

                return;
            }
            likers.forEach(async (element, index) => {
                if (element._id == this.currentUser._id) {
                    likers.splice(index, 1);
                    this.isLocallyLiked = false;

                    await axios.put('/posts/' + postId + '/like', { userId: userId })
                        .then(res => {
                            // this.$notify(res.data.message);
                        }, err => {
                            this.$notify({ type: 'error', title: 'Error!', text: "Trouble in like/dislike..." });
                        });
                }
            })
        },

    },
    created() {
        this.currentUser.id = this.currentUser._id;
        this.checkIfLiked();
    },
    components: {
        Like
    }

}
</script>

<template>
    <!-- post card -->
    <div class="post bg-secondary shadow-lg rounded-lg md:mx-auto my-5 md:max-w-2xl">
        <!--horizantil margin is just for display-->
        <div class="flex items-start px-4 py-6">
            <router-link :to="'/user/' + post.author.username">
                <img class="w-12 h-12 rounded-full object-cover mr-4 shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] float-left cursor-pointer"
                    v-bind:src="post.author.avatar" alt="avatar" />
            </router-link>
            <div class="w-full 2xs:ml-1">
                <div class="flex items-center justify-between">
                    <router-link :to="'/user/' + post.author.username">
                        <h2 class="text-lg font-semibold text-t-primary -mt-1 cursor-pointer hover:text-gray-400">{{
                            post.author.firstname + ' ' + post.author.lastname
                        }}</h2>
                    </router-link>
                    <small class="text-sm text-t-accent cursor-pointer">{{ fromNow(post.createdAt) }}</small>
                </div>
                <p class="text-t-accent text-xs">Joined {{ formatDate(post.author.createdAt) }}.</p>
                <p class="mt-3 text-t-secondary text-sm">{{ post.content }}</p>
                <div class="mt-4 flex">
                    <span class="flex items-center">
                        <div class="flex mr-2 text-t-accent text-xs">
                            <Like @mouseup="likePost(post._id)" :checked="this.isLiked" :index="index" />
                            <span>{{ post.likes.length }}</span>
                        </div>
                        <div class="-space-x-2">
                            <span v-for="(liker, index) in post.likes.slice(0, 10)" v-bind:key="liker.username">
                                <router-link :to="'/user/' + liker.username" :key="liker.username">
                                    <img :src="liker.avatar" :style="{ 'z-index': 20 - index }"
                                        class="relative inline object-cover w-6 h-6 border-2 border-secondary rounded-full"
                                        :alt="liker.username" :title="liker.username" />
                                </router-link>
                            </span>
                        </div>
                    </span>
                    <span class="ml-auto" v-if="currentUser.id == post.author._id">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"
                            class="mr-3 w-4 cursor-pointer text-t-accent hover:text-red-500/70" />
                        <font-awesome-icon :icon="['fas', 'edit']"
                            class="mr-3 w-4 cursor-pointer text-t-accent hover:text-blue-500/70" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
