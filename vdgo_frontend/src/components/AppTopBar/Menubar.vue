<template>

<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="logo" :src="logo" />
		</router-link> 

		
		<div class="layout-topbar-menu lg:flex origin-top">
			<span>
				<button @click="showProfile" class="p-link layout-topbar-button">
					<i class="pi pi-user"></i>
					<span> Профиль </span>
				</button>
			</span>
      <span>
<button v-if="isLoggedIn" @click="logout" class="p-link layout-topbar-button">
          <i class="pi pi-sign-out"></i>
          <span> Выйти </span>
        </button>
			</span>
		</div>
	</div>


<OverlayPanel  ref="profilePanel" :breakpoints="{'800px': '50vw', '640px': '70vw'}" :style="{width: '350px'}">
	
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"> {{ this.userProfile.name }} </span>
            <div class="text-900 font-medium text-lg"> {{ this.userProfile.unit }} </div>
            <div class="text-900 font-medium text-lg"> {{ this.userProfile.post }} </div>
            <div class="text-900 font-medium text-lg"> {{ this.roleText }} </div>
            </div>
             <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-user text-blue-500 text-lg"></i>
              </div>
                </div> 
          
</OverlayPanel> 
<!-- Если задать <OverlayPanel showCloseIcon будет отображать кнопка закрытия окошка-->
<!-- Для активации стиля, указанного ниже в style scss scoped, необходимо задать класс 
<OverlayPanel class ="profile-panel".. -->

   
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import logo from "@/assets/images/logo.png";
import { mapGetters} from "vuex";
export default {
  components: {
    OverlayPanel,
  },

  data() {
    return {
      logo: logo,
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },

    showProfile(event) {
      this.$refs.profilePanel.toggle(event);
    },

    /*...mapActions({
      loadUserProfile: "loadUserProfile"
    }),*/
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      userProfile: "userProfile",
      roleText: "roleText"
    }),
  },

};
</script>

<style lang="scss" scoped>
.layout-topbar-icons {
    float: right;
    display: block;
    animation-duration: .5s;
}
</style>

<!--Стиль для окошка профиля, если вдруг произойдет смещение от иконки>
<style lang="scss" scoped>
.p-overlaypanel.profile-panel:before {
  right: 10px !important;
}

.p-overlaypanel.profile-panel:after {
  right: 10px !important;
}
</style> --> 


