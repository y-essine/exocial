export default {
    state: () => ({
        _id: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        avatar: '',
        isAdmin: '',
        isMod: '',
    }),
    getters: {
        getUser() {
            return user = {
                _id: state.id,
                firstname: state.firstname,
                lastname: state.lastname,
                username: state.username,
                email: state.email,
                avatar: state.avatar,
                isAdmin: state.isAdmin,
                isMod: state.isMod,
            }
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state._id = payload._id;
            state.firstname = payload.firstname;
            state.lastname = payload.lastname;
            state.username = payload.username;
            state.email = payload.email;
            state.avatar = payload.avatar;
            state.isAdmin = payload.isAdmin;
            state.isMod = payload.isMod;
        }
    },
    actions: {
        saveUser({ commit }, data) {
            commit('SET_USER', data)
        }
    }
}