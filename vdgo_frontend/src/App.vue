<template>
  <Toast />
  <ScrollTop :threshold="150" />
  <Menubar :userProfile="userProfile" />

  <div class="layout-main-container">
    <div class="layout-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import ScrollTop from 'primevue/scrolltop';
import Menubar from './components/AppTopBar/Menubar.vue'
import Toast from 'primevue/toast'
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'App',
  components: {
    ScrollTop,
    Menubar,
    Toast
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      userProfile: "userProfile"
    })
  }, 

  methods: {
    ...mapActions({
      loadUserProfile: "loadUserProfile",
      loadReasons: "loadReasons"
    }),
  },

  mounted() {
    if (this.isLoggedIn) {
      this.loadUserProfile()
      this.loadReasons()
    } 

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
  },

  }
</script>
