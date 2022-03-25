<style>
@import "./bg.scss";
.log {
    padding: 10vh 5vw;
}
</style>

<template>
    <div class="bg-anim">
        <div v-for="x in 100" v-bind:key="x" class="circle-container" >
            <div class="circle"></div>
        </div>
    </div>
    <div class="space-y-10 flex flex-col items-center log">
        <a
            class="tracking-widest font-extrabold text-2xl uppercase rounded-lg text-t-secondary focus:outline-none focus:shadow-outline"
        >EXOCIAL</a>
        <h1 class="font-extrabold text-red-500 text-3xl">Signup</h1>

        <div class="form flex-col flex items-center space-y-5 text-t-secondary font-bold">
            <div class="space-y-3">
                <h4 class="block">First name:</h4>
                <input
                    type="firstname"
                    name="firstname"
                    placeholder="First name"
class="block rounded focus:outline-none text-secondary bg-t-accent p-4 placeholder:text-primary"
                    autocomplete="off"
                    v-model="form.firstname"
                />
            </div>
            <div class="space-y-3">
                <h4 class="block">Last name:</h4>
                <input
                    type="lastname"
                    name="lastname"
                    placeholder="Last name"
class="block rounded focus:outline-none text-secondary bg-t-accent p-4 placeholder:text-primary"
                    autocomplete="off"
                    v-model="form.lastname"
                />
            </div>
            <div class="space-y-3">
                <h4 class="block">Username:</h4>
                <input
                    type="username"
                    name="username"
                    placeholder="Username"
class="block rounded focus:outline-none text-secondary bg-t-accent p-4 placeholder:text-primary"
                    autocomplete="off"
                    v-model="form.username"
                />
            </div>
            <div class="space-y-3">
                <h4 class="block">Password:</h4>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    class="block rounded focus:outline-none text-secondary bg-t-accent p-4 placeholder:text-primary"
                    autocomplete="off"
                    v-model="form.password"
                />
            </div>
            <div class="space-y-3">
                <h4 class="block">Email:</h4>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
class="block rounded focus:outline-none text-secondary bg-t-accent p-4 placeholder:text-primary"
                    autocomplete="off"
                    v-model="form.email"
                />
            </div>
            <div>
                <button
                    class="rounded bg-indigo-500 hover:bg-indigo-500/75 shadow-xl  p-3 mt-5 text-gray-300"
                    @click="processUserInfo"
                >Submit</button>
            </div>

            <div>
                <button
                    class="rounded bg-cyan-700 hover:bg-cyan-700/75 p-3 mt-5 text-xs text-gray-300"
                    @click="$router.push('/login')"
                >Back to login</button>
            </div>

            <span v-if="loading" class="text-red-500 opacity-75 !mt-12">
                <font-awesome-icon icon="circle-notch" size="5x" class="animate-spin" />
            </span>
        </div>
    </div>
</template> 

<script>

import axios from 'axios';

import { validateRegister } from './validator';

axios.defaults.baseURL = '/api';

export default {
    name: 'signup-page',
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                username: '',
                password: '',
                email: ''
            },
            loading: false,
        }
    },
    created() {
        //user alrdy auth'd
        if (localStorage.getItem('auth_token')) {
            this.$notify({ type: 'warning', title: 'Logged!', text: "You are already logged in." });
            this.$router.push('/');
        }
    },
    methods: {
        async register() {
            this.loading = true;

            let user = this.form;

            const res = await axios.post('/auth/signup', user)
                .then(res => {
                    if (res.status == 201) {
                        this.$notify({ type: 'error', title: 'Error!', text: "Username already registered..." });
                        return;
                    }
                    this.$notify({ clean: true });
                    this.$notify({ type: 'success', title: 'Sucess!', text: 'User registered successfully' });
                    this.$router.push('/login');
                    return;

                }, err => {
                    this.$notify({ type: 'error', title: 'Error!', text: "Trouble registering..." });
                });

            this.loading = false;

        },
        reset() {
            this.form.firstname = "";
            this.form.lastname = "";
            this.form.username = "";
            this.form.password = "";
            this.form.email = "";
        },
        validate() {
            return validateRegister(this.form)
        },
        processUserInfo() {
            if (this.validate()) {
                this.register();
                this.reset();
            }
        }
    }

}
</script>

