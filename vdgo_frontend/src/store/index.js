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

export default createStore({
  
  modules: {
  vdgoObject,
  bypasses,
  equipment,
  auth,
  executors,
  units,
  images,
  itd,
  reasons
  }
})