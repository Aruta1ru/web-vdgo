<template>
<h3 class="block text-500 font-medium mb-2"> Адрес электронной почты </h3> 
              <div > 
<Inplace :closable="true" 
@close="updateEmailValue(idObject, this.newEmail)"> 

    <template #display>
        {{ emailVdgo }}
    </template>
    <template #content>
        <InputText :modelValue="emailVdgo" 
        :placeholder="emailVdgo" 
        v-model="newEmail" />
    </template>
</Inplace>       
                </div>    

</template>



<script>
import Inplace from 'primevue/inplace'
import InputText from 'primevue/inputtext'
import { mapActions, mapGetters } from "vuex"


export default {

components:{
    InputText,
    Inplace
},

data () {
   return {
     newEmail: null
   }
 },

computed: {
   ...mapGetters(['idObject', 'emailVdgo', 'errorStatus', 'errorMessage']),
 },

 methods:{
     ...mapActions(['updateEmail', 'setEmail']),


updateEmailValue(idObject, newEmail) { 
      if (newEmail !== null & newEmail !== this.emailVdgo)
      this.updateEmail(idObject, this.setEmail(newEmail))
      .then(() => { 
      this.$toast.add({severity:'success', summary:'Изменение данных', 
      detail:'Адрес электронной почты изменен', life: 3000});
            }) 
       .catch(() => {
              this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })
    },

 }

}
</script>