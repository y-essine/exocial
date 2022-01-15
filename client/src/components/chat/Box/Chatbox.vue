<template>

    <div class="h-screen w-screen">
        <div class="bg-secondary p-8 w-80 h-auto fixed top-40 right-40 z-20">
            <div class="max-w-xl mx-auto space-y-5 grid grid-cols-1">
                <div class="place-self-start">
                    <div
                        class="bg-primary text-t-primary p-5 rounded-2xl rounded-tl-none"
                    >Hey, there! It's been a while!</div>
                </div>
                <div class="place-self-start text-left">
                    <div
                        class="bg-primary text-t-primary p-5 rounded-2xl rounded-tl-none"
                    >Wanted to know if you wanted to get lunch sometime this week?</div>
                </div>
                <div class="place-self-start text-left">
                    <div
                        class="bg-primary text-t-primary p-5 rounded-2xl rounded-tl-none"
                    >Or next week. I'm also free during the evenings next week.</div>
                </div>
                <div class="place-self-end text-right">
                    <div
                        class="bg-accent text-t-secondary p-5 rounded-2xl rounded-tr-none"
                    >Oops! Sorry for the late response!</div>
                </div>
                <div class="place-self-end text-right">
                    <div
                        class="bg-accent text-t-secondary p-5 rounded-2xl rounded-tr-none"
                    >I'd love to get lunch sometime next week!</div>
                </div>
                <div class="place-self-end text-right">
                    <div
                        class="bg-accent text-t-secondary p-5 rounded-2xl rounded-tr-none"
                    >Do you have any places in mind where you'd want to meet?</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    Name: 'Chatbox',
    data() {
        return {

        }
    }
}

</script>


<style>
</style>