<template> 

  <div class= "form-login">
<div class="p-d-flex p-jc-center">
            <div class="card">
                <h2 class="text-center">Авторизация</h2>
                <form class="p-fluid" @submit.prevent>
                    <div class="p-field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-user" />
                                          <InputText
                id="username"
                autocomplete="username"
                v-model="username"
              />
                            <label for="username">Имя пользователя</label>
                        </div>
                    </div>
                    <div class="p-field">
                        <div class="p-float-label">
                            <Password
                id="password"
                autocomplete="current-password"
                v-model="password"
                :feedback="false"
                toggleMask
              />
                            <label for="password">Пароль</label>
                        </div>
                    </div>
                    <Button @click="login"
            icon="pi pi-sign-in"
            label=" Войти в систему "
          />
                </form>
            </div>
        </div>
        </div>
           
</template>

<script> 


import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
export default {
components: {  
Button,
InputText,
Password
},

 data() {
    return {
      username: "",
      password: "",
    };
    },

    methods: {

    login() {
        let username = this.username
        let password = this.password
        this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err))
    }

    }


}
</script>

<style lang="scss" scoped>

.form-login {
    .card {
        width: 25rem;
        display: block;
        margin-left: auto;
        margin-right: auto;

        form {
            margin-top: 2rem;
        }

        .p-field {
            margin-bottom: 2rem;
        }
    }
}

</style>