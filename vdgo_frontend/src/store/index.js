import { createStore } from 'vuex' 
import vdgoObject from "./modules/vdgoObject";
import auth from "@/store/modules/auth"
import bypasses from "@/store/modules/bypasses"
import equipment from "./modules/equipment"
import units from "@/store/modules/units"
import executors from "./modules/executors"
import images from "./modules/images"
import itd from "./modules/itd"
import reasons from "./modules/reasons"
import loading  from './modules/loading';
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
