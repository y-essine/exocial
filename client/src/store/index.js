import { createStore } from "vuex";

import user from "../store/modules/user";

const store = createStore({
    authToken: '',
    modules: {
        user,
    },
})

export default store