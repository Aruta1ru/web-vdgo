<template> 
<ProgressSpinner v-if="showLoading" 
  class="progress-spinner" animationDuration=".5s"/> 
</template> 


<script> 
import { mapGetters } from 'vuex';
import ProgressSpinner from 'primevue/progressspinner';
export default {
components: {
   ProgressSpinner
},

 computed: { 
...mapGetters(['showLoading'])
  },

}
</script> 

