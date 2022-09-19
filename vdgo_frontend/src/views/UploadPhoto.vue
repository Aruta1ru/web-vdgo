<template>
  <div class="upload">
    <UploaderPhoto /> 
    
  </div>
</template>

<script>

import UploaderPhoto from '@/components/Photo/UploaderPhoto.vue'
import { mapActions } from 'vuex'
export default {
  name: 'UploadPhoto',
  components: {
    UploaderPhoto
   
  }, 

  methods: {
    ...mapActions(['getImages'])
  },

  created() {
    this.getImages()
  }
}
</script>