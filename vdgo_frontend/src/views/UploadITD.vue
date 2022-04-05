<template>
  <div class="upload">
    <UploaderITD /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import UploaderITD from '@/components/ITD/UploaderITD.vue'
export default {
  name: 'UploadITD',
  components: {
    UploaderITD
   
  },

created () {
    this.$store.dispatch('loadITD') 
  }


}
</script>