<script setup>

</script>

<template>
    <section name="header">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col">
                <h1 class="font-extrabold text-red-500 text-2xl">{{ this.$route.name }}</h1>
                <h1 class="font-semibold text-gray-300/50 text-sm mt-6">
                    Exocial >
                    <h1 class="inline text-gray-300/80">{{ this.$route.name }}</h1>
                </h1>
            </div>
            <div class="flex-col flex items-center uppercase">
                <h1
                    class="font-extrabold text-gray-300 hover:text-gray-400 text-xl"
                >{{ user.username }}</h1>
                <button
                    class="rounded bg-red-500 hover:bg-red-500/80 p-3 mt-5 text-white ml-auto"
                    @click="this.$router.push('Profile')"
                >Profile</button>
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