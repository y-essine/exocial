<template>
    <section name="header">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col">
                <h1
                    class="font-extrabold text-red-500 hover:text-red-500/70 text-3xl"
                >{{ this.$route.name }}</h1>
                <h1 class="font-semibold text-t-accent text-sm mt-6">
                    Exocial >
                    <h1 class="inline text-t-secondary">{{ this.$route.name }}</h1>
                </h1>
            </div>
            <div class="flex items-center columns-2">
                <div class="col">
                    <img
                        class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left"
                        :src="user.avatar"
                        alt="avatar"
                    />
                </div>
                <div class="col">
                    <div class="flex justify-between">
                        <h1
                            class="font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                        >{{ user.firstname }}</h1>
                        <h1
                            class="ml-2 font-extrabold text-t-accent hover:text-gray-500/70 text-xl uppercase 2xs:hidden xs:block"
                        >{{ ' ' + user.lastname }}</h1>
                    </div>
                    <h1
                        class="font-semibold text-t-accent hover:text-gray-500/50 text-sm 2xs:hidden xs:block"
                    >{{ user.email }}</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapState({
            user: state => state.user
        })
    },
}
</script>