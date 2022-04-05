<template>
  <div class="upload">
    <UploaderPhoto /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import UploaderPhoto from '@/components/Photo/UploaderPhoto.vue'
export default {
  name: 'UploadPhoto',
  components: {
    UploaderPhoto
   
  },

  created () {
    this.$store.dispatch('getImages') 
  }
}
</script>