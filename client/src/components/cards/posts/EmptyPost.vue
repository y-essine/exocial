<script>

import moment from 'moment'

export default {
    name: 'EmptyPost',
    props: ['user'],
    methods: {
        formatDate(date) {
            return moment(date, 'YYYY-MM-DDThh:mm:ss.sssZ').format('DD MMM YYYY')
        },
    }
}

</script>

<template >
    <!-- post card -->
    <div class="bg-neutral-900 shadow-lg rounded-lg md:mx-auto my-5 md:max-w-2xl">
        <div class="flex items-start px-4 py-6">
            <img
                class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left"
                v-bind:src="user.avatar"
                alt="avatar"
            />
            <div class="w-full">
                <div class="flex items-center justify-between">
                    <h2
                        class="text-lg font-semibold text-t-primary -mt-1"
                    >{{ user.firstname + ' ' + user.lastname }}</h2>
                        <small class="text-sm text-t-accent">Just now</small>
                </div>
                <p class="text-t-accent text-xs">Joined {{ formatDate(user.createdAt) }}.</p>
                <textarea class="mt-3 text-t-secondary rounded w-full h-32 sm:h-48 p-3 outline-none resize-none text-sm bg-primary">{{  }}</textarea>
                <div class="mt-2 flex items-center justify-between">
                    <div class="flex mr-2 text-t-accent text-xs">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-4 h-4 mr-1"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                    <button class="bg-green-700/50 hover:bg-green-700 text-sm font-semibold text-gray-200 px-4 py-2 rounded">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
