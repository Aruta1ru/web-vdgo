<template>

<div class="layout-topbar" >
		<div class="layout-topbar-logo">
			<img alt="logo" :src="logo" />
		</div> 

		
		<div v-if="isLoggedIn" class="layout-topbar-menu lg:flex origin-top">

			<span> 
				<button @click="showProfile" class="p-link layout-topbar-button">
        <AvatarUser/>
					<span> Профиль </span>
				</button>
			</span>
      <span>
<button @click="onLogout" class="p-link layout-topbar-button">
          <i class="pi pi-sign-out"></i>
          <span> Выйти </span>
        </button>
			</span>
		</div>
	</div>


<OverlayPanel  ref="profilePanel" appendTo="body" :breakpoints="{'800px': '50vw', '640px': '70vw'}" :style="{width: '350px'}">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"> {{ userProfile.name }} </span>
            <div class="text-900 font-medium text-lg"> {{ userProfile.unit }} </div>
            <div class="text-900 font-medium text-lg"> {{ userProfile.post }} </div>
            <div class="text-900 font-medium text-lg"> {{ roleText }} </div>
            </div>
             <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-user text-blue-500 text-lg"></i>
              </div>
                </div>  
</OverlayPanel> 
   
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import logo from "@/assets/images/logo.png";
import AvatarUser from './AvatarUser.vue'
import { mapActions, mapGetters} from "vuex";
export default {
  components: {
    OverlayPanel,
    AvatarUser
  },

  data() {
    return {
      logo: logo,
    };
  },

  computed: {
    ...mapGetters([
     'isLoggedIn', 'isAdmin', 'roleText', 'userProfile']),
  }, 

  methods: { 

  ...mapActions(['logout']),

    onLogout() {
      this.logout()
      .then(() => this.$router.go("/login"));
    },

    showProfile(event) {
      this.$refs.profilePanel.toggle(event);
    }

  },  
 
}

</script>