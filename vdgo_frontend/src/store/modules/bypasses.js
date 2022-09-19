import { GET_BYPASSES, GET_BYPASS_COUNT, CHANGE_DATE, UPDATE_STATUS
} from "../mutation-types.js";
import axios from "axios";

export default {
  state: {
    bypasses: [],
    selectedDate: Date.now(),
    bypassCount: 0
  },

  getters: {
    
    bypasses: state => state.bypasses,
    bypassCount: (state) => state.bypassCount, 
    selectedDateTxt: (state) => {
        return new Date(state.selectedDate).toLocaleDateString().slice(0,10)
    },
    selectedDateTime: (state) => { 
      return new Date((new Date(state.selectedDate).setHours(new Date(state.selectedDate).getHours() - (new Date(state.selectedDate).getTimezoneOffset() / 60)))).toISOString()
  },

    bypassDate: (state) => {
    return new Date((new Date(state.selectedDate).setHours(new Date(state.selectedDate).getHours() - (new Date(state.selectedDate).getTimezoneOffset() / 60)))).toISOString().slice(0,10)
  }

  },

  mutations: {
    [GET_BYPASSES](state, bypasses) {
      state.bypasses = []  
      for (const bypass of bypasses) {
        let element = {};
        element.id = bypass.id;
        element.objectId = bypass.object.id;
        element.address = bypass.object.address;
        element.dogType = bypass.dog_type;
        element.execStatus = bypass.exec_status;
        element.dateAction = bypass.date_action;
        element.fixed = bypass.is_fixed;
        element.undoneReason = bypass.undone_reason.name_short;
        switch (bypass.exec_status) {
            case 0: element.statusText = 'в работе'; break;
            case 1: element.statusText = 'выполнено'; break;
            case 2: element.statusText = 'не выполнено'; break;
        }
        state.bypasses.push(element);
      }
    }, 
    
    [GET_BYPASS_COUNT] (state, bypassCount) {
        state.bypassCount = bypassCount
    },
    [CHANGE_DATE] (state, selectedDate) {
        state.selectedDate = selectedDate
    }, 

    [UPDATE_STATUS] (state, data) { 
        const index = state.bypasses.findIndex(item => item.id === data.id)
        let newElement = {};
        newElement.id = data.id;
        newElement.objectId = data.object.id;
        newElement.address = data.object.address;
        newElement.dogType = data.dog_type;
        newElement.dateAction = data.date_action
        newElement.execStatus = data.exec_status;
        newElement.fixed = data.is_fixed;
        newElement.undoneReason = data.undone_reason.name_short;
        switch (data.exec_status) {
            case 0: newElement.statusText = 'в работе'; break;
            case 1: newElement.statusText = 'выполнено'; break;
            case 2: newElement.statusText = 'не выполнено'; break;
        }
        state.bypasses.splice(index, 1, newElement )
    }
  },

  actions: {
    async getBypasses({ commit, dispatch,getters, rootGetters}) {
      dispatch('showLoadingSpinner')
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/bypasses/",
          {
            params: {
              executor: rootGetters.idUser,
              action_date: getters.selectedDateTxt,
            },
          }
        );
        commit(GET_BYPASSES, response.data.results);
        commit(GET_BYPASS_COUNT, response.data.count);
        dispatch('hideLoadingSpinner')
      } catch (e) {
        console.log(e);
        dispatch('hideLoadingSpinner')
        alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) ;
      }
    }, 

  
    updateStatusDone({dispatch,commit, getters, rootGetters}, id) {
      return new Promise((resolve, reject) => {
          axios({url: `http://127.0.0.1:8000/api/v1/bypasses/${id}/load_data/`,
      data: {
            exec_vdgo: 1,
            id_bypass: id,
            date_action: getters.selectedDateTime,
            id_exec: rootGetters.idUser,
            id_obj: rootGetters.idObject,
            undone_reason: 0
      }, method: 'POST' })
      .then(response => { 
        if (response.status === 200) {
          commit('UPDATE_STATUS', response.data) 
          resolve(response) 
        }
      })
      .catch(err => {
        dispatch("catchError", err)
          reject(err)
      })
      })
  },


  updateStatusUndone({commit, dispatch, getters, rootGetters}, id) {
    return new Promise((resolve, reject) => {
        axios({url: `http://127.0.0.1:8000/api/v1/bypasses/${id}/load_data/`,
    data: {
          exec_vdgo: 2,
          id_bypass: id,
          date_action: getters.selectedDateTime,
          id_exec: rootGetters.idUser,
          id_obj: rootGetters.idObject,
          undone_reason: rootGetters.selectedReason
    }, method: 'POST' })
    .then(response => { 
      if (response.status === 200) {
        commit('UPDATE_STATUS', response.data)
        resolve(response) 
      }
    })
    .catch(err => {
        dispatch("catchError", err)
        reject(err)
    })
    })
},

    setDate({commit, dispatch}, selectedDate) {
        commit(CHANGE_DATE, selectedDate)
        dispatch('getBypasses')
    }
  },
};