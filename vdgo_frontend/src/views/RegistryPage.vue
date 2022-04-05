<template>
  <div class="registry">
    <RegistryForm/> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import RegistryForm from '@/components/Auth/RegistryForm.vue'
export default {
  name: 'RegistryPage',
  components: {
    RegistryForm
   
  }
}
</script>