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
...mapGetters({
    showLoading: "showLoading",
  })
  },

}
</script> 


<style lang="scss" scoped> 

.progress-spinner {
    position: fixed;
    z-index: 999;
    width: 25%;
    overflow: show;
    margin: auto;
    top: 40%;
    left: 0;
    right: 0;
}

/* Transparent Overlay */
.progress-spinner:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  transition-duration: 0.2s;
}



</style>