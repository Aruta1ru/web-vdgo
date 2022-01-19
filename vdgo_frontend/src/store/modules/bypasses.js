import { GET_BYPASSES, GET_BYPASS_COUNT, CHANGE_DATE } from "../mutation-types";
import axios from "axios";

export default {
  state: {
    bypasses: [],
    selectedDate: Date.now(),
    bypassCount: 0,
  },

  getters: {
    bypasses: (state) => state.bypasses,
    bypassCount: (state) => state.bypassCount,
    selectedDateTxt: (state) => {
        return JSON.stringify(new Date(state.selectedDate)).slice(1,11)
    }
  },

  mutations: {
    [GET_BYPASSES](state, bypasses) {
      state.bypasses = []  
      for (const bypass of bypasses) {
        let element = {};
        element.id = bypass.id;
        element.address = bypass.object.address;
        element.execStatus = bypass.exec_status;
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
    }
  },

  actions: {
    async getBypasses({ commit, getters, rootState}) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/bypasses",
          {
            params: {
              executor: rootState.auth.user.id,
              action_date: getters.selectedDateTxt,
            },
          }
        );
        commit(GET_BYPASSES, response.data.results);
        commit(GET_BYPASS_COUNT, response.data.count);
      } catch (e) {
        console.log(e);
      }
    },
    setDate({commit, dispatch}, selectedDate) {
        commit(CHANGE_DATE, selectedDate)
        dispatch('getBypasses')
    }
  },
};
