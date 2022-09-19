<template> 


<div class="card"> 
<div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Список пользователей </h2>
					</div>
 <Toolbar class="mb-4">
 <template #start>
    <AddUserDialog/>
    </template>
   
   <template #end>
  <span class="p-input-icon-left">
  <i class="pi pi-search p-input-icon-left" />
  <InputText style="width: 10em" v-model="filters['global'].value" placeholder="Поиск" />
    </span>
  </template>
  </Toolbar>


  <DataTable 
  :value="users" 
  responsiveLayout="stack" 
  breakpoint="700px" 
  :paginator="true" 
  :rows="10" 
  v-model:filters="filters" 
  dataKey="id"
  class="p-datatable-sm">
              <Column bodyStyle="width:30%" field="executorName" header="Исполнитель" :sortable="true"></Column>
              <Column bodyStyle="width:20%" field="executorPost" header="Должность"></Column>
              <Column bodyStyle="width:20%" field="unitName" header="Подразделение"></Column>
              <Column bodyStyle="width:20%" field="username" header="Имя пользователя" ></Column>
              <Column bodyStyle="width:10%" field="role" header="Роль" ></Column>
              </DataTable> 
</div>

</template>

<script>
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext' 
import { FilterMatchMode } from 'primevue/api';
import AddUserDialog from '@/components/Admin/AddUserDialog.vue'
import Toolbar from 'primevue/toolbar'
import Column from 'primevue/column' 
import { mapGetters} from "vuex";

export default {
  components: {
   
    Toolbar,
    DataTable,
    Column,
    
    InputText,
    AddUserDialog
  },

data() {
        return {
         filters:{}
        }},

  computed: {
   
    ...mapGetters(['users'])
  },

  methods: { 
    
 initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
                    }},     
  },

 created()  { 
    this.initFilters()
}
}
</script>


