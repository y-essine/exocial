<script setup>

import Postcard from '../cards/Post.vue'

</script>

<template >
    <Postcard v-bind:posts="posts" />
</template>

<script>

// indicate wether to send a cookie in a cross-site

export default {
    name: 'Home',
    data() {
        return {
            posts: [
                {
                    author: 'Eren Jaeger',
                    avatar: 'https://i.imgur.com/le5ob6m.gif',
                    dateAgo: '3m',
                    joinDate: '19 DEC 2018',
                    content: 'Saepe optio minus rem dolor sit amet! Amet, dolor sit amet conse dolor sit amet!',
                    likes: 69
                },
                {
                    author: 'Steve Harvey',
                    avatar: 'https://i.imgur.com/iRDybbZ_d.webp?maxwidth=500',
                    dateAgo: '1w',
                    joinDate: '4 APR 2020',
                    content: 'Saepe optio minus rem dolor sit amet! Amet, dolor sit amet conse dolor sit amet!',
                    likes: 99
                },
                {
                    author: 'Itachi Uchiha',
                    avatar: 'https://i.imgur.com/lF6Ybco.gif',
                    dateAgo: '3w',
                    joinDate: '29 FEB 2021',
                    content: 'Saepe optio minus rem dolor sit amet! Amet, dolor sit amet conse dolor sit amet!inus rem dolor sit amet! Amet, dolor sit lorem',
                    likes: 613
                },
                {
                    author: 'Brad Adams',
                    avatar: 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    dateAgo: '22mo',
                    joinDate: '12 SEP 2012',
                    content: 'Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!',
                    likes: 12
                }

            ]

        }
    },
    components: {
        Postcard
    }

}
</script>