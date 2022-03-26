<template >
    <div class="flex justify-between">
        <h1
            class="mb-6 inline text-lg font-extrabold text-secondary px-3 py-1 rounded bg-t-secondary"
        >Chat</h1>
    </div>
    
    <Chatbox />
</template>

<script>

import Chatbox from '../../chat/box/Chatbox.vue'

import axios from 'axios';

axios.defaults.baseURL = '/api';


export default {
    name: 'Chatest',
    data() {
        return {

        }
    },
    components:{
        Chatbox
    }

}

</script>

<style scoped>
</style>