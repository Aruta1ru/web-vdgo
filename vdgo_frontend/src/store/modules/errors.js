import { ERROR } from "../mutation-types.js"


export default {
state : {
error: null
},

getters: {
    errorStatus: state => state.error.response.status,
    errorMessage: (state) => {
        switch(state.error.response.status) {
        case 400: return state.error.message = 'Отсутствуют данные для выполнения запроса'    
        case 401: return state.error.message = 'Введены неверные учетные данные';
        case 403: return state.error.message = 'Нет прав доступа к содержимому';
        case 404: return state.error.message = 'Запрашиваемый ресурс не найден';
        case 500: return state.error.message = 'Внутренняя ошибка сервера'
        default: return state.error.message
    }
    }   
    },

mutations: {
    [ERROR] (state, data) {
        state.error = data;
      }
},
actions: {
catchError({commit}, data) {
    commit('ERROR', data)
}
}
}