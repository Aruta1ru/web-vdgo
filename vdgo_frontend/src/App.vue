<template>

  <div class="layout-main-container">
    <div class="layout-main"> 
        <Toast/>
        <LoadingSpinner/>             
      <ScrollTop :threshold="150" />
      <Menubar/>  
    <router-view></router-view>
    
    </div>
  </div>
</template>

<script>

import ScrollTop from 'primevue/scrolltop';
import Menubar from './components/AppTopBar/Menubar.vue'
import LoadingSpinner from './components/Loaders/LoadingSpinner.vue';
import Toast from 'primevue/toast'

export default {
  name: 'App',
  components: {
    ScrollTop,
    Menubar,
    LoadingSpinner,
    Toast
  }, 


  created() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise( () => {
        if (err.status == 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      })

    }); 
  }
}
</script>

