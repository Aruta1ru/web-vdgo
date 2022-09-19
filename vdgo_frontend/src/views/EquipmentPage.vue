<template>
  <div class="equipment">
    <EquipmentInfo /> 
    
  </div>
</template>

<script>

import EquipmentInfo from '@/components/Equipment/EquipmentInfo.vue'
import { mapActions } from 'vuex'

export default {
  name: 'EquipmentPage',
  components: {
    EquipmentInfo  
  },

  methods: {
    ...mapActions(['loadEquipment'])
  },


  created() {
  this.loadEquipment()  
}

}
</script>