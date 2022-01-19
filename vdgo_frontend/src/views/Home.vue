<template>
  <div class="home">
    <AddressList :bypasses="bypasses" :bypassCount="bypassCount" />  
  </div>
</template>

<script>
// @ is an alias to /src
import AddressList from '@/components/AddressList/AddressList.vue'
import {mapGetters} from "vuex"
export default {
  name: 'Home',
  components: {
    AddressList
  },
  computed: {
    ...mapGetters({
      bypasses: "bypasses",
      userProfile: "userProfile",
      bypassCount: "bypassCount"
    }),
  },
}
</script>