<template> 

<div v-if="bypasses" class="card"> 
 <SelectDate/> 
 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Адреса </h2>
						<span class="p-input-icon-left">
                            <i class="pi pi-search p-input-icon-left" />
                            <InputText style="width: 10em" v-model="filters['global'].value" placeholder="Поиск" />
                        </span>
					</div>
          
  <!--responsiveLayout="scroll"  не будет в мобильном варианте делать вертикальную развертку--> 
  <!--штатно breakpoint="960px"--> 
  
  <div v-if="bypasses.length > 0">
  <DataTable 
  :value="bypasses" 
  responsiveLayout="stack" 
  class="p-datatable-sm"
  breakpoint="700px" 
  :paginator="true" 
  v-model:selection.sync="selectedRows"
  selectionMode="single" 
  :rows="8" 
  @row-select="onRowSelect"
  v-model:filters="filters" 
  dataKey="id">
                <Column bodyStyle="width:62%" field="address" header="Адрес" :sortable="true"></Column>
                <Column bodyStyle="width:15%" field="statusText" header="Статус выполнения">
                    <template #body="slotProps">   
                      <Badge value="slotProps.data.statusText" :class="statusClass(slotProps.data)" > 
                        {{slotProps.data.statusText}}
                      </Badge> 
                    </template>
                </Column> 
                <Column bodyStyle="width:15%" field="undoneReason" header="Причина невыполнения"> </Column>
                 <Column header="" bodyStyle="min-width:8rem">  
                <template #body="slotProps"> 
                  <Button :disabled="getDoneBtnStatus(slotProps.data)" icon="pi pi-check" class="p-button-success p-button-text p-button-lg p-button-rounded" 
                  @click="doneStatus(slotProps.data)"/>       
                   <ReasonsSelector :status="slotProps.data.statusText" :id="slotProps.data.id" /> 
                    </template>
                </Column>  
                       </DataTable>
        </div>
        <div v-else>
          <h2 class="text-500 font-medium text-xl text-center">Адресов на выбранную дату не обнаружено</h2>
        </div>	
                   </div> 
</template>

<script>
import Badge from 'primevue/badge'
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from 'primevue/api'
import Column from 'primevue/column' 
import InputText from 'primevue/inputtext' 
import SelectDate from './SelectDate.vue'
import Button from 'primevue/button'
import ReasonsSelector from './ReasonsSelector.vue' 
import {mapActions, mapGetters} from "vuex"
export default {
  
  components:{
  DataTable,
  Column,
  InputText,
  SelectDate,
  Badge,
  Button,
  ReasonsSelector
  },

created() {  
this.initFilters();
 },
 
data() {
    return {  
        selectedRows: null,
        filters:{},
        disabledButton: false
        }
        },

computed: {
  ...mapGetters(['bypasses','errorMessage', 'errorStatus'])
  },

methods: { 
  ...mapActions(['loadObject','getDogType','updateStatusDone']), 

    doneStatus (data) {     
            this.updateStatusDone(data.id)
            .then(() => {
                  this.$toast.add({severity:'success', summary:'Изменение статуса', detail:'Статус изменен на ВЫПОЛНЕНО', life: 3000});
            })
            .catch(() => {
              this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })
					},     
          
  onRowSelect(e) {
				if (e.type === 'row')
					//this.$emit("row-select", e.data);
          this.getDogType(e.data.dogType)
          this.loadObject(e.data.objectId)
          this.$router.push("/tabs");
			},      
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
                    }},       
         

         statusClass(data) {
            return [
                {
                    'undone': data.statusText === "не выполнено",
                    'inwork': data.statusText === "в работе",
                    'done': data.statusText === 'выполнено'
                }
            ];
        },
        
       getDoneBtnStatus (data) {
                    if (data.statusText === "в работе" || data.statusText === "не выполнено")  return false
                        else return true
                }, 

}, 

}
</script>              
     