import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import notifications from '@kyvg/vue3-notification'


import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch, faUser, faCog, faHome, faSignOutAlt, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCircleNotch, faUser, faCog, faHome, faSignOutAlt, faTrashAlt, faEdit)

import './index.css'

createApp(App)
    .use(router)
    .use(store)
    .use(notifications)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')

