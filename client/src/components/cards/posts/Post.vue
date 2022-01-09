<script>

import moment from 'moment'

export default {
    props: {
        post: {
            required: true
        }
    },
    methods: {
        formatDate(date) {
            return moment(date, 'YYYY-MM-DDThh:mm:ss.sssZ').format('DD MMM YYYY')
        },
        fromNow(date) {
            return moment(date, "YYYY-MM-DDThh:mm:ss.sssZ").fromNow()
        },
        likePost(postId) {
            
        }
    }
}
</script>

<template>
    <!-- post card -->
    <div class="post bg-secondary shadow-lg rounded-lg md:mx-auto my-5 md:max-w-2xl">
        <!--horizantil margin is just for display-->
        <div class="flex items-start px-4 py-6">
            <router-link :to="'/user/' + post.author.username">
                <img
                    class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left cursor-pointer"
                    v-bind:src="post.author.avatar"
                    alt="avatar"
                />
            </router-link>
            <div class="w-full">
                <div class="flex items-center justify-between">
                    <h2
                        class="text-lg font-semibold text-t-primary -mt-1 cursor-pointer"
                    >{{ post.author.firstname + ' ' + post.author.lastname }}</h2>
                    <small
                        class="text-sm text-t-accent cursor-pointer"
                    >{{ fromNow(post.createdAt) }}</small>
                </div>
                <p class="text-t-accent text-xs">Joined {{ formatDate(post.author.createdAt) }}.</p>
                <p class="mt-3 text-t-secondary text-sm">{{ post.content }}</p>
                <div class="mt-4 flex items-center">
                    <div class="flex mr-2 text-t-accent text-xs">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-4 h-4 mr-1 cursor-pointer"
                            stroke="currentColor"
                            @click="likePost(post._id)"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span>{{ post.likes.length }}</span>
                    </div>
                    <div class="-space-x-2">
                        <img
                            v-for="(liker,index) in post.likes.slice(0,10)"
                            :src="liker.avatar"
                            :style="{'z-index': 20-index}"
                            class="relative inline object-cover w-6 h-6 border-2 border-secondary rounded-full"
                            alt="{{liker.username}}"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
