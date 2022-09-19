<template> 
	<Dialog v-model:visible="display" 
	:breakpoints="{'960px': '70vw', '640px': '100vw'}" :style="{width: '30vw'}"
	closeOnEscape
	dismissableMask
	:modal="true"
	>
    <template #header> 
		<h3 class="text-900 font-medium text-xl">Укажите причину невыполнения</h3>
	</template>
 
        <div v-for="reason of reasons" :key="reason.id" class="p-field-radiobutton">
            <RadioButton v-model="selectedReason" :value="reason.id" :name="reason.name_full"  />
            <label :for="reason.id">{{reason.name_full}}</label>
        </div>
<!--Блокировка пункта из списка :disabled="reason.id === '1'" -->
	<template #footer> 
        <Button label="Сохранить" icon="pi pi-check" class="p-button-outlined p-button-primary p-button-rounded"  @click="undoneStatus(id, selectedReason)" />
	</template>
</Dialog>

<!--Кнопка статуса "Не выполнено", открывающая модальное окно с выбором причины-->
<Button :disabled="getUndoneBtnStatus(status)" icon="pi pi-times" class="p-button-danger p-button-text p-button-lg p-button-rounded" @click="undoneClick(this.id)"/> 
        
   
</template> 


<script> 
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import {mapGetters, mapActions} from "vuex"
export default { 

props: ['id', 'status'],

components: {
RadioButton,
Dialog,
Button
},


	data() {
		return {
			display: false,
			selectedReason: null
		}
	}, 

	computed: {
  ...mapGetters([ 'reasons', 'errorMessage', 'errorStatus']),
},
	methods: { 
	...mapActions(['updateStatusUndone', 'setReason']),
		
	undoneClick() {
			this.display=true
		},

		undoneStatus(id, selectedReason) {
			this.updateStatusUndone(id,this.setReason(selectedReason))
			.then(() => {
				this.display =false
				this.selectedReason = null	
                this.$toast.add({severity:'error', summary:'Изменение статуса', detail:'Статус изменен на НЕ ВЫПОЛНЕНО', life: 3000});
            })
             .catch(() => {
              this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })
		},

	getUndoneBtnStatus (status) {
                    if (status === 'в работе' || status === 'выполнено') return false
                        else return true
                },

	}
}

</script> 
