<script>
export default {
    props: ['posts'],
}
</script>

<template>
    <!-- post card -->
    <div
        v-for="post in posts"
        class="bg-neutral-800 shadow-lg rounded-lg md:mx-auto my-5 md:max-w-2xl"
    >
        <!--horizantil margin is just for display-->
        <div class="flex items-start px-4 py-6">
            <img
                class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left"
                v-bind:src="post.avatar"
                alt="avatar"
            />
            <div class>
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-200 -mt-1">{{ post.author }}</h2>
                    <small class="text-sm text-gray-300">{{ post.dateAgo }} ago</small>
                </div>
                <p class="text-gray-300 text-xs">JOINED {{ post.joinDate }}.</p>
                <p class="mt-3 text-gray-300 text-sm">{{ post.content }}</p>
                <div class="mt-4 flex items-center">
                    <div class="flex mr-2 text-gray-300 text-xs">
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
                        <span>{{ post.likes }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
