<template> 
	<Dialog v-model:visible="display" 
	:breakpoints="{'960px': '70vw', '640px': '100vw'}" :style="{width: '30vw'}"
	closeOnEscape
	dismissableMask
	:maximizable="true"
	:modal="true"
	>
    <template #header> 
		<h3 class="text-900 font-medium text-xl">Укажите причину невыполнения</h3>
	</template>
 
        <div v-for="reason of reasons" :key="reason.id" class="p-field-radiobutton">
            <RadioButton v-model="selectedReason" :value="reason.id" :name="reason.name_full"  />
            <label :for="reason.id">{{reason.name_full}}</label>
        </div>
<!--Блокировка пункта из списка :disabled="reason.key === '1'" -->
	<template #footer>
        <Button label="Сохранить" icon="pi pi-check" class="p-button-outlined p-button-primary p-button-rounded" autofocus @click="undoneToast(id, selectedReason)" />
	</template>
</Dialog>

<!--Кнопка статуса "Не выполнено", открывающая модальное окно с выбором причины-->
<Button icon="pi pi-times" class="p-button-danger p-button-text p-button-rounded" @click="undoneClick(this.id)"/> 
        
   
</template> 


<script> 
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import {mapGetters, mapActions} from "vuex"
export default { 

props: ['id'],

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
  ...mapGetters({
    reasons: "reasons"
  }),
},
	methods: { 
	...mapActions({
    updateStatusUndone: "updateStatusUndone",
	setReason: "setReason" 
	
  }),
		undoneClick() {
			this.display=true
		},

		undoneToast(id, selectedReason) { 
			this.updateStatusUndone(id,this.setReason(selectedReason))
			.then(() => {
				this.display =false	
                this.$toast.add({severity:'error', summary:'Изменение статуса', detail:'Не выполнено', life: 3000});
            })
            .catch(err => {
            this.$toast.add({severity:'error', summary:'Изменение статуса', detail:'Ошибка', life: 3000});
            console.log(err)})
		}
	},

}

</script> 

<style lang="scss" scoped> 

.p-field-radiobutton {
	margin-bottom: 1rem;
	margin-top:1rem;
	display: flex;
	align-items: center; 

 label {
	margin-left: 0.5rem;
    line-height: 1;
}
} 


</style>