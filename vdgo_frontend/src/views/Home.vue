<template>
  <div class="home">
    <AddressList /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import AddressList from '@/components/AddressList/AddressList.vue'
export default {
  name: 'Home',
  components: {
    AddressList
  }
}
</script>