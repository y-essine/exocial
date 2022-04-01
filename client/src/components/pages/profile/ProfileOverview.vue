<template>
    <div
        class="mt-8 w-full flex justify-between sm:flex-row 2xs:flex-col items-center bg-secondary rounded-xl sm:pl-8 2xs:px-0 sm:py-8 2xs:pt-8 shadow-lg"
    >
        <div class="flex flex-col items-center min-w-fit">
            <h1
                class="mb-2 font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
            >{{ user.username }}</h1>
            <img
                :class="{ 'admin': user.isAdmin }"
                class="w-32 h-32 rounded-full object-cover shadow-lg"
                :src="user.avatar"
                alt="avatar"
            />
            <div v-if="this.isEdit" class="flex justify-center mb-4 items-center">
                <input
                    type="file"
                    class="hidden"
                    ref="fileInput"
                    accept=".png, .jpg, .jpeg, .gif"
                    @change="onAvatarSelected"
                />
                <button
                    @click="$refs.fileInput.click()"
                    class="bg-indigo-700/70 hover:bg-indigo-700/90 2xs:mt-6 sm:mt-10 sm:ml-auto text-lg font-extrabold text-gray-200 py-1 rounded w-20"
                >Change avatar</button>
                <button
                    v-show="this.isAvatarSelected"
                    :disabled="this.isAvatarUploading"
                    @click="uploadAvatar"
                    class="bg-green-700/70 hover:bg-green-700/90 2xs:mt-6 sm:mt-10 ml-2 text-lg font-extrabold text-gray-200 py-1 rounded w-10 h-10"
                >↑</button>
            </div>

            <div
                v-show="this.isAvatarSelected && !this.isAvatarUploading"
                class="flex justify-center mb-4"
            >
                <h3
                    class="2xs:mt-4 sm:mt-4 sm:ml-auto text-lg font-semibold text-t-secondary hover:text-gray-400"
                    ref="avatarName"
                >File</h3>
            </div>

            <div v-show="this.isAvatarUploading" class="w-36 mb-4">
                <div class="mb-1 text-base font-medium text-green-500">Uploading...</div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full transition-all" style="width: 35%"></div>
                </div>
            </div>

            <div v-if="user.isAdmin" class="flex justify-center mt-4">
                <h1
                    class="admin inline text-lg font-extrabold text-red-500 px-3 py-1 rounded bg-accent"
                >Admin</h1>
            </div>
        </div>
        <div class="flex flex-col px-8 py-10 w-full">
            <div
                class="flex sm:flex-row 2xs:flex-col items-center justify-evenly"
                :class="{ 'md:flex-col lg:flex-row': this.isEdit }"
            >
                <div v-if="!this.isEdit" class="justify-center">
                    <h1
                        class="inline font-extrabold text-t-secondary hover:text-gray-400 text-xl uppercase"
                    >{{ user.firstname }}</h1>
                    <h1
                        class="inline font-extrabold text-t-accent hover:text-gray-500/70 text-xl uppercase"
                    >{{ ' ' + user.lastname }}</h1>
                </div>
                <div v-else class="flex justify-center mb-3">
                    <input
                        type="firstname"
                        name="firstname"
                        placeholder="Firstname"
                        class="inline max-w-[9.5rem] h-6 rounded focus:outline-none font-extrabold text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl uppercase text-right"
                        v-model="form.firstname"
                    />
                    <input
                        type="lastname"
                        name="lastname"
                        placeholder="Lastname"
                        class="inline ml-4 max-w-[9.5rem] h-6 rounded focus:outline-none font-extrabold text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl uppercase"
                        v-model="form.lastname"
                    />
                </div>

                <div>
                    <h1
                        class="text-lg font-semibold text-t-secondary hover:text-gray-400"
                    >{{ user.email }}</h1>
                </div>
            </div>

            <div
                class="flex sm:flex-row 2xs:flex-col items-center justify-evenly mt-4"
                :class="{ 'md:flex-col lg:flex-row': this.isEdit }"
            >
                <h1
                    class="font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                >{{ 'Followers : ' + user.followers.length }}</h1>
                <h1
                    class="2xs:mt-3 sm:mt-0 font-semibold text-t-secondary hover:text-gray-400 text-md cursor-pointer"
                >{{ 'Following : ' + user.myFollowings }}</h1>
            </div>
            <div v-if="!this.isEdit" class="flex sm:flex-row 2xs:flex-col items-center">
                <h3
                    v-if="user.bio"
                    class="text-t-secondary 2xs:mt-2 font-semibold italic sm:ml-auto hover:text-gray-400"
                >{{ user.bio }}</h3>
                <button
                    @click="notEdit"
                    class="bg-red-700/70 hover:bg-red-700/90 2xs:mt-4 sm:mt-10 sm:ml-auto text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                >Edit</button>
            </div>
            <div
                v-else
                class="flex sm:flex-row 2xs:flex-col items-center"
                :class="{ 'md:flex-col lg:flex-row justify-evenly': this.isEdit }"
            >
                <textarea
                    type="description"
                    name="description"
                    placeholder="Bio"
                    class="2xs:mt-2 sm:mt-4 inline min-h-[8rem] max-w-[16rem] h-6 rounded focus:outline-none font-semibold italic text-secondary bg-t-accent p-4 placeholder:text-tertiary text-xl"
                    v-model="form.bio"
                />
                <button
                    @click="saveEdit"
                    class="bg-green-700/70 hover:bg-green-700/90 2xs:mt-4 sm:mt-8 text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                >Save</button>
                <button
                    @click="notEdit"
                    class="bg-gray-700/70 hover:bg-gray-700/90 2xs:mt-4 sm:mt-8 text-lg font-extrabold text-gray-200 px-3 py-1 rounded w-20 h-10"
                >Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

import { validateProfileEdit } from '../../validator';

axios.defaults.baseURL = '/api';


export default {
    name: 'profile-overview',
    props: ['user'],
    data() {
        return {
            isEdit: false,
            form: {
                firstname: '',
                lastname: '',
                bio: '',
            },
            selectedAvatar: null,
            isAvatarSelected: false,
            isAvatarUploading: false,
            isAvatarUploaded: false,
        };
    },
    methods: {
        updateInfo() {
            this.user.firstname = this.form.firstname;
            this.user.lastname = this.form.lastname;
            this.user.bio = this.form.bio;
        },
        notEdit() {

            this.isEdit = !this.isEdit
            if (this.isEdit) {
                this.form.firstname = this.user.firstname;
                this.form.lastname = this.user.lastname;
                this.form.bio = this.user.bio;
                return;
            }
            this.avatarUnselected();
            this.cancelUploadAvatar();

        },
        async saveEdit() {
            if (!validateProfileEdit(this.form))
                return;
            await axios.put('/users/' + this.user._id + '/edit', {
                firstname: this.form.firstname,
                lastname: this.form.lastname,
                bio: this.form.bio,
                token: localStorage.getItem('auth_token')
            }).then(res => {
                if (res.status == 200) {
                    this.$notify({ type: 'success', text: 'Successfully edited profile.' })
                    this.updateInfo();
                }
                else
                    console.log(res.data)
            });

            this.notEdit();
        },
        onAvatarSelected(event) {
            let file = event.target.files[0]
            if (file) {
                this.selectedAvatar = file;
                this.avatarSelected();
                this.$refs.avatarName.innerText = file.name;
            }
        },
        avatarSelected() {
            this.isAvatarSelected = true;
        },
        avatarUnselected() {
            this.isAvatarSelected = false;
        },
        uploadAvatar() {
            this.isAvatarUploading = true;
            // let formData = new FormData();
            // formData.append('avatar', this.selectedAvatar);
            // axios.post('/users/' + this.user._id + '/avatar', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'token': localStorage.getItem('auth_token')
            //     }
            // }).then(res => {
            //     if (res.status == 200) {
            //         this.$notify({ type: 'success', text: 'Successfully uploaded avatar.' })
            //         this.isAvatarUploaded = true;
            //         this.isAvatarUploading = false;
            //     }
            //     else
            //         console.log(res.data)
            // });
        },
        cancelUploadAvatar() {
            this.isAvatarUploading = false;
        }
    }

}

</script>


<style>
.admin {
    padding: 0.5rem;
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