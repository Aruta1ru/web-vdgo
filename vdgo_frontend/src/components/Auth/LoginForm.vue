<template> 

<div class= "form-login" >
<div class="p-d-flex p-jc-center">
            <div class="card"> 
                <div class="text-center mb-5"> 
        <div class="text-900 text-2xl font-medium mb-3">Авторизация</div>
        <span class="text-600 font-medium line-height-3">Нет учетной записи?</span>
        <a class="font-medium no-underline ml-2 text-blue-500">Обратитесь к администратору!</a>
    </div>
                <form class="p-fluid" @submit.prevent="onLogin" >
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
                    <Button @click="onLogin"
            icon="pi pi-sign-in"
            label=" Войти в систему"
            class="w-full"
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
import { mapActions, mapGetters } from 'vuex';

export default {
components: {  
Button,
InputText,
Password
},

 data() {
    return {
      username: "",
      password: ""
    }
    },

    computed:{
        ...mapGetters(['errorMessage', 'errorStatus'])
    },

    methods: { 
    ...mapActions(['login']),
    
    onLogin() {
        let username = this.username;
        let password = this.password;
        this.login({ username, password })
        .then(() => {
            this.$router.push('/') 
            this.$toast.add({severity:'success', summary:'Авторизация', detail:'Успешно', life: 3000})} 
        )
        .catch(() => {
             this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 3000}) 
        }
        );
    }
    }    
}
</script>
