<template>
 <h3 class="block text-500 font-medium mb-2"> Телефон </h3>   
          <div >
                <Inplace :closable="true" @close="updatePhoneValue(idObject, this.newPhone)" > 
    <template #display>
        {{ phoneVdgo }}
    </template>
    <template #content>
        <InputMask :modelValue="phoneVdgo" v-model="newPhone" 
        mask="9 (999) 999-9999" :placeholder="phoneVdgo" />
    </template>
</Inplace>
                    
        </div> 
</template> 



<script>
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import { mapActions, mapGetters } from "vuex"


export default {

components:{
    InputMask,
    Inplace
},

data () {
   return {
     newPhone: null
   }
 },

 computed: {
   ...mapGetters(['idObject','phoneVdgo','errorStatus', 'errorMessage']),
 },

methods:{
    ...mapActions(['updatePhone', 'setPhone']),


updatePhoneValue(idObject, newPhone) { 
      if (newPhone !== null && newPhone !== this.phoneVdgo)
      this.updatePhone(idObject, this.setPhone(newPhone))
      .then(() => { 
      this.$toast.add({severity:'success', summary:'Изменение данных', 
      detail:'Телефон изменен', life: 3000});
            }) 
      .catch(() => {
              this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })
    },
}
}

</script>