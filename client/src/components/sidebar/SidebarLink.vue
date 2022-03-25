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
            :class="{ 'bg-gray-300 dark-mode:bg-gray-700': isActive, 'bg-transparent dark-mode:bg-transparent': !isActive }"
            class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer"
        >
            <font-awesome-icon :icon="['fas', icon]" class="mr-3 w-4" />
            <slot />
        </a>
    </router-link>
</template>
