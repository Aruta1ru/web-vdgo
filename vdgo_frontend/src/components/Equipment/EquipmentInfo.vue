<template>

<div class="card"> 

 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Оборудование </h2>
						<span class="p-input-icon-left">
                            <i class="pi pi-search p-input-icon-left" />
                            <InputText style="width: 10em" v-model="filters['global'].value" placeholder="Поиск" />
                        </span>
					</div>
    
  <DataTable 
  :value="equipment" 
  responsiveLayout="stack" 
  breakpoint="800px" 
  :paginator="true" 
  :rows="10" 
  v-model:filters="filters" 
  dataKey="id"
  class="p-datatable-sm">
               
                <Column bodyStyle="width:60%" field="type.name" header="Тип" :sortable="true"></Column>
                <Column bodyStyle="width:12%" field="manufacturer.name" header="Изготовитель" :sortable="true"></Column>
                <Column bodyStyle="width:12%" field="equipment_model.name" header="Модель" :sortable="true"></Column>
                <Column bodyStyle="width:9%" field="quantity" header="Количество" :sortable="true"></Column>
                <Column bodyStyle="width:7%" field="part" header="Доля" :sortable="true"></Column>
                
                       </DataTable> 

<!--Когда будет редактирование параметров оборудования вставить после 
<Column field="part" header="Доля" :sortable="true"></Column>, 
вот такой кусок кода для открытия модального окна с параметрами
<Column :exportable="false" style="min-width:8rem">
                    <template #body>
    <DialogEdit />
                    </template>
                </Column>-->



                       </div> 	
</template>

<script>

import DataTable from 'primevue/datatable'
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column' 
import InputText from 'primevue/inputtext' 
import { mapGetters } from 'vuex'
//import DialogEdit from './DialogEdit.vue'
export default {

  components:{
  DataTable,
  Column,
  InputText,
  //DialogEdit

  },
  
created() {
 this.initFilters();
        
    },

computed: mapGetters({
    'equipment': 'equipment'
    }),

data() {
        return {
         filters:{}
        }},
methods: {
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
                    }}            
                    },

}
</script>              


    
<style lang="scss" scoped>
 
</style>