<template> 
	<Dialog v-model:visible="display" 
	:breakpoints="{'960px': '70vw', '640px': '100vw'}" :style="{width: '30vw'}"
	closeOnEscape
	dismissableMask
	:maximizable="true"
	:modal="true"
	>
    <template #header>
		<h3>Укажите причину невыполнения </h3>
	</template>
 
        <div v-for="reason of reasons" :key="reason.key" class="p-field-radiobutton">
            <RadioButton :id="reason.key" :value="reason" v-model="selectedReasons"  />
            <label :for="reason.key">{{reason.name}}</label>
        </div>
<!--Блокировка пункта из списка :disabled="reason.key === '1'" -->
	<template #footer>
        <Button label="Сохранить" icon="pi pi-check" class="p-button-outlined p-button-primary p-button-rounded" @click="saveReason" autofocus />
	</template>
</Dialog>

<!--Кнопка статуса "Не выполнено", открывающая модальное окно с выбором причины-->
<Button icon="pi pi-times" class="p-button-danger p-button-outlined p-button-rounded" @click="undoneClick"/> 
        
   
</template> 


<script> 
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import { mapGetters } from 'vuex'
export default { 

components: {
RadioButton,
Dialog,
Button
},


	data() {
		return {
			display:false,
			selectedReasons: null
		}
	}, 

	methods: { 
		undoneClick() {
			this.display=true
		},

		saveReason() {
			this.$toast.add({severity:'error', summary:'Статус изменен', detail:'Не выполнено', life: 3000});
			this.display= false;
		}
	},

	computed: mapGetters(['reasons']),
	
	beforeMount () { 
    this.$store.dispatch('getReasons') 
  }

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