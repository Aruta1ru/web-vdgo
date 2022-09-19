<template>
  <div class="login">
    <LoginForm /> 
    
  </div>
</template>

<script>

import LoginForm from '@/components/Auth/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
}
</script>