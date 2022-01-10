<template>
    <section name="header">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col">
                <h1
                    class="font-extrabold text-red-500 hover:text-red-500/70 text-3xl"
                >{{ this.$route.name }}</h1>
                <div class="mt-6 flex">
                    <router-link to="/">
                        <h1
                            class="text-t-accent font-semibold text-sm hover:text-t-secondary cursor-pointer"
                        >Exocial</h1>
                    </router-link>
                    <h1 class="ml-1 text-t-accent font-semibold text-sm">{{ '>' }}</h1>
                    <h1 class="ml-1 text-t-secondary font-semibold text-sm">{{ this.$route.name }}</h1>
                </div>
            </div>
            <div class="flex items-center columns-2">
                <div class="col">
                    <router-link to="/profile" class=" min-w-fit">
                        <img
                            :class="{ 'admin': user.isAdmin }"
                            class="w-12 h-12 rounded-full object-cover mr-4 shadow float-left"
                            :src="user.avatar"
                            alt="avatar"
                        />
                    </router-link>
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

export default {
    name: 'Header',
    props: ['user']
}
</script>



<style scoped>
.admin {
    padding: 0.25rem;
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