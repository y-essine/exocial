<script>

import { useRoute } from "vue-router";

import { computed } from "vue";

export default {
    name: 'nav-sidebarlink',
    props: {
        to: { type: String },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute();
        const isActive = computed(() => route.path == props.to)
        return { isActive }
    }
}

</script>

<template >
    <router-link :to="to? to : ''">
        <a
            :class="{ 'bg-zinc-300 dark-mode:bg-zinc-700': isActive, 'bg-transparent dark-mode:bg-transparent': !isActive }"
            class="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-zinc-900 rounded-lg dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline cursor-pointer"
        >
            <div class="w-5 flex justify-center mr-2">
                <font-awesome-icon :icon="['fas', icon]" />
            </div>
            <slot />
        </a>
    </router-link>
</template>
