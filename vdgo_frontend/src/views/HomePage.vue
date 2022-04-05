<template>
  <div class="home">
    <AddressList/> 
  </div>
</template>

<script>
// @ is an alias to /src
import AddressList from '@/components/AddressList/AddressList.vue'
export default {
  name: 'HomePage',
  components: {
    AddressList
  },


created() {
this.$store.dispatch("loadUserProfile") 
this.$store.dispatch("loadReasons")
}
}

</script>