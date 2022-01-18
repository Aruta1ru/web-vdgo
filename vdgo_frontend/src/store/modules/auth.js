import { AUTH_REQUEST } from '../mutation-types'
import { AUTH_SUCCESS } from '../mutation-types'
import { AUTH_ERROR } from '../mutation-types'
import { LOGOUT,
         SET_REGISTER_EXECUTOR,
         SET_REGISTER_USERNAME,
         SET_REGISTER_PASSWORD,
         SET_USER_PROFILE } from '../mutation-types'
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
    user: {
        name: '',
        unit: '',
        post: '',
        role: '',
        id: 0
    }
},

getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userProfile: state => state.user,
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
    }
}, 
 
actions: {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST')
            axios({url: 'http://127.0.0.1:8000/api/v1/token/',
        data: user, method: 'POST' })
        .then(response => {
            const token = response.data.access
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('AUTH_SUCCESS', token, user)
            resolve(response)
        })
        .catch(err => {
            commit('AUTH_ERROR')
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
    logout({commit}) {
        return new Promise((resolve) => {
            commit('LOGOUT')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    loadUserProfile({commit}) {
        return new Promise((resolve, reject) => {
            axios({ 
                url: 'http://127.0.0.1:8000/api/v1/users/profile/',
                method: 'GET'
            })
            .then(response => {
                commit(SET_USER_PROFILE, response.data)
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}      
}