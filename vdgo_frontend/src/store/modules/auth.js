import { AUTH_REQUEST } from '../mutation-types.js'
import { AUTH_SUCCESS } from '../mutation-types.js'
import { AUTH_ERROR } from '../mutation-types.js'
import { LOGOUT,
         SET_REGISTER_EXECUTOR,
         SET_REGISTER_USERNAME,
         SET_REGISTER_PASSWORD,
         SET_USER_PROFILE
        } from '../mutation-types.js'
import axios from 'axios'

export default {

state: {
    status: '',
    token: localStorage.getItem('token') || '',
    registerUser : {
        username: null,
        password: null,
        executor: 0
    },
    user: {}
},

getters: { 
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userProfile: state => state.user, 
    isUser: state => state.user.role === 'user',
    isAdmin: state => state.user.role === 'admin',
    roleText: state => {
        if (state.user.role === 'user') return 'Пользователь'
        else if (state.user.role === 'admin') return 'Администратор'
        else return ''
    },
},

mutations:{
    [AUTH_REQUEST] (state) {
        state.status = 'loading'
      },
    [AUTH_SUCCESS] (state, token) {
        state.status = 'success'
        state.token = token
      },
    [AUTH_ERROR] (state) {
        state.status = 'error'
      },
    [LOGOUT] (state) {
        state.status = ''
        state.token = ''
      },
    [SET_REGISTER_EXECUTOR] (state, executor) {
        state.registerUser.executor = executor.id
    },
    [SET_REGISTER_USERNAME] (state, username) {
        state.registerUser.username = username
    },
    [SET_REGISTER_PASSWORD] (state, password) {
        state.registerUser.password = password
    },
    [SET_USER_PROFILE] (state, profile) {
        state.user.name = profile.executor.name
        state.user.post = profile.executor.post
        state.user.unit = profile.executor.unit.name_short
        state.user.role = profile.role
        state.user.id = profile.executor.id
    },

}, 
 
actions: {
    login({commit, dispatch}, user) {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST') 
            dispatch('showLoadingSpinner')
            axios({url: 'http://127.0.0.1:8000/api/v1/token/',
        data: user, method: 'POST' })
        .then(response => {
            const token = response.data.access
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('AUTH_SUCCESS', token, user) 
            resolve(response)
            dispatch('hideLoadingSpinner')      
        }
        
        )
        .catch(err => { 
            commit('AUTH_ERROR')
            dispatch('hideLoadingSpinner')
            localStorage.removeItem('token')
            reject(err)
        })
        })
    },
    register({state}) {
        return new Promise((resolve, reject) => {
            axios({url: 'http://127.0.0.1:8000/api/v1/users/',
        data: state.registerUser, method: 'POST' })
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
        })
    },
    logout({commit, dispatch}) {
        return new Promise((resolve) => {
            dispatch('showLoadingSpinner')
            commit('LOGOUT')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
            dispatch('hideLoadingSpinner')
        })
    },
    async loadUserProfile({commit, dispatch}) { 
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/v1/users/profile/'
            )
            commit(SET_USER_PROFILE, response.data)
            dispatch('getBypasses')
        } catch (e) {
            alert("Ошибка!");
        }
    }
}      
}