<template>
  <div class="equipment">
    <EquipmentInfo /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import EquipmentInfo from '@/components/Equipment/EquipmentInfo.vue'
export default {
  name: 'Equipment',
  components: {
    EquipmentInfo
   
  }
}
</script>