import { createStore } from 'vuex' 
import vdgoObject from "./modules/vdgoObject.js";
import auth from "@/store/modules/auth"
import bypasses from "@/store/modules/bypasses"
import equipment from "./modules/equipment.js"
import units from "@/store/modules/units"
import executors from "./modules/executors.js"
import images from "./modules/images.js"
import itd from "./modules/itd.js"
import reasons from "./modules/reasons.js"
import loading  from './modules/loading.js';
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });


export default createStore({
 
  strict: process.env.NODE_ENV !== 'production',
  
  modules: {
  vdgoObject,
  bypasses,
  equipment,
  auth,
  executors,
  units,
  images,
  itd,
  reasons,
  loading
  }, 

  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ]
})
