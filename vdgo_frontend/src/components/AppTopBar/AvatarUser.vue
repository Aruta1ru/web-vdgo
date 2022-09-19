<template> 

  <Avatar v-if="isUser" size="large" 
        style="background-color:transparent" 
        shape="circle" >
        {{isAvatarName}} 
        </Avatar>
				<Avatar v-else size="large" 
        style="background-color:transparent" 
        shape="circle" >
          AD 
        </Avatar>
</template>

<script>
import Avatar from "primevue/avatar"
import {mapGetters} from 'vuex'
export default {
components: {
    Avatar
  },
  
computed: {
    ...mapGetters(['isUser', 'isAvatarName']),
  }

}
</script>
