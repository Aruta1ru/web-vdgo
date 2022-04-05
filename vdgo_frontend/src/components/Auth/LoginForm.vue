<template> 

<div class= "form-login" >
<div class="p-d-flex p-jc-center">
            <div class="card"> 
                <div class="text-center mb-5"> 
        <div class="text-900 text-2xl font-medium mb-3">Авторизация</div>
        <span class="text-600 font-medium line-height-3">Нет учетной записи?</span>
        <a class="font-medium no-underline ml-2 text-blue-500">Обратитесь к администратору!</a>
    </div>
                <form class="p-fluid" @submit.prevent="login" >
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

    methods: { 
      
    login() {
        let username = this.username;
        let password = this.password;
        this.$store.dispatch('login', { username, password })
        .then(() => { 
            this.$router.push('/')
            this.$toast.add({severity:'success', summary:'Авторизация', detail:'Успешно', life: 3000})})
        .catch(err => { 
            this.$toast.add({severity:'error', summary:'Авторизация', detail:'Ошибка', life: 3000})
            console.log(err)
        });
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