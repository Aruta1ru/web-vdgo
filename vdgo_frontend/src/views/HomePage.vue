<template> 
<!--После подгрузки профиля рендерим компонент в зависимости от роли пользователя-->

<!--Если пользователь, список адресов-->
  <div v-if="isUser" class="home"> 
    <AddressList/> 
  </div> 

<!--Если админ, список пользователей-->
<div v-else> 
  <UsersList/>
</div>

</template>

<script>

import AddressList from '@/components/AddressList/AddressList.vue'
import UsersList from '@/components/Admin/UsersList.vue'
import { mapGetters, mapActions} from 'vuex'

export default {
  name: 'HomePage',
  components: {
    AddressList,
    UsersList
  },
  computed: {
    ...mapGetters(['isUser', 'isLoggedIn'])
  },

  methods: {
    ...mapActions(['loadUserProfile', 'getBypasses', 'loadReasons', 'loadUsers', 'getUnits', 'getExecutors'])
  },

  

async created() { 

await this.loadUserProfile() // дожидаемся пока загрузится профиль пользователя
// затем, если user.role === 'user' подгружаем список адресов и причины 
if (this.isUser) {
this.getBypasses()
this.loadReasons()
}
// если, user.role === 'admin' подгружаем список пользователей, исполнителей и подразделения для регистрации 
else { 
  this.loadUsers()
  this.getUnits()
  this.getExecutors()
}
}
}

</script>