<template>
  <div class="equipment">
    <EquipmentInfo /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import EquipmentInfo from '@/components/Equipment/EquipmentInfo.vue'
import { mapActions } from 'vuex'

export default {
  name: 'EquipmentPage',
  components: {
    EquipmentInfo  
  },

methods: {
  ...mapActions({
    getEquipment: "loadEquipment"
  })
},

created() {
  this.getEquipment()
}

}
</script>