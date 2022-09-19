import { createStore} from 'vuex' 
import vdgoObject from "./modules/vdgoObject.js";
import auth from "@/store/modules/auth"
import admin_register from '@/store/modules/admin_register'
import bypasses from "@/store/modules/bypasses"
import equipment from "./modules/equipment.js"
import units from "@/store/modules/units"
import executors from "./modules/executors.js"
import images from "./modules/images.js"
import itd from "./modules/itd.js"
import reasons from "./modules/reasons.js"
import loading  from './modules/loading.js';
import errors from './modules/errors.js';
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
 
  strict: debug,
  
  modules: {
  vdgoObject,
  bypasses,
  equipment,
  admin_register,
  auth,
  executors,
  units,
  images,
  itd,
  reasons,
  loading,
  errors
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
