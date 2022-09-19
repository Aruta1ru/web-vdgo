<template>
  <div class="upload">
    <UploaderITD /> 
    
  </div>
</template>

<script>

import UploaderITD from '@/components/ITD/UploaderITD.vue'
import { mapActions } from 'vuex'
export default {
  name: 'UploadITD',
  components: {
    UploaderITD
   
  }, 

  methods: {
    ...mapActions(['loadITD'])
  },

  created() {
    this.loadITD() 
  }
}
</script>