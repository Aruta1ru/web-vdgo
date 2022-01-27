<template> 

<div v-if="bypasses" class="card"> 
  <div class="grid"> 
    <div class="col-12 md:col-6 lg:col-6 xl:col-3 mb-2 "> 
        <div class="flex justify-content-between mb-3">
          <div>
            <h3 class="block text-500 font-medium mb-3"> Дата </h3>
            <div class="text-900 font-medium text-xl"> 
        <Calendar @date-select="setDate(this.date)" style="width: 12em" id="calendar"  v-model="date" :monthNavigator="true" :yearNavigator="true" 
        yearRange="2019:2023"  :showIcon="true" :showButtonBar="true" :touchUI="true" dateFormat="yy-mm-dd"/>
  </div>
            </div>
              </div> 
            <span class="text-green-600 text-base">  {{bypassCount}} </span>
             адресов на
              <span class="text-blue-500 text-base" v-if="date"> {{new Date(date).toLocaleString().slice(0,10)}} </span> 
              <span class="text-orange-500 text-base" v-else> сегодня </span>
    </div>
</div>

 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center"> Адреса </h2>
						<span class="p-input-icon-left">
                            <i class="pi pi-search p-input-icon-left" />
                            <InputText style="width: 10em" v-model="filters['global'].value" placeholder="Поиск" />
                        </span>
					</div>
          
  <!--responsiveLayout="scroll"  не будет в мобильном варианте делать вертикальную развертку--> 
  <!--штатно breakpoint="960px"-->
  <div v-if="bypasses.length>0">
  <DataTable 
  :value="bypasses" 
  responsiveLayout="stack" 
  class="p-datatable-sm"
  breakpoint="800px" 
  :paginator="true" 
  v-model:selection.sync="selectedRows"
  selectionMode="single" 
  :rows="10" 
  @row-select="onRowSelect"
  v-model:filters="filters" 
  dataKey="id">
                <Column field="address" header="Адрес" :sortable="true"></Column>
                <Column field="statusText" header="Статус выполнения" :sortable="true">
                    <template #body="slotProps">  
                      
                      <Badge value="slotProps.data.statusText" :class="statusClass(slotProps.data)" > 
                        {{slotProps.data.statusText}}
                      </Badge>
                      
                    </template>
                </Column> 

                <Column field="undoneReason" header="Причина невыполнения" :sortable="true"> </Column>

                 <Column style="width: 3.5rem">  
                <template #body> 
                  <Button icon="pi pi-check" class="p-button-success p-button-outlined p-button-rounded" @click="doneClick"/>       
                    </template>
                </Column>  

                <Column style="width:3.5rem" >  
                <template #body> 
                  <ReasonsSelector :reasons="reasons" />
                    </template>
                </Column>  
                       </DataTable>
        </div>
        <div v-else>
          <h2>Адресов на выбранную дату не обнаружено</h2>
        </div>	

                   </div> 
</template>

<script>
import Badge from 'primevue/badge';
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column' 
import InputText from 'primevue/inputtext' 
import Calendar from 'primevue/calendar';
import Button from 'primevue/button'
import ReasonsSelector from './ReasonsSelector.vue' 
import {mapActions, mapGetters} from "vuex"

export default {
  
  components:{
  DataTable,
  Column,
  InputText,
  Calendar,
  Badge,
  Button,
  ReasonsSelector
  },

props: {
    bypasses: {
      type: Array,
    },
    bypassCount: {
      type: Number,
      required: true,
      default: 0
    }
  },

created() {  this.initFilters(); },

data() {
    return {  
        selectedRows: null,
        loading: false,
        filters:{},
        date: null,
        }
        },
computed: {
  ...mapGetters({
    reasons: "reasons"
  })
},
methods: { 
  ...mapActions({
    setDate: "setDate",
    getObject: "loadObject",
    getDogType: "getDogType"
  }),

    doneClick () {
						this.$toast.add({severity:'success', summary:'Статус изменен', detail:'Выполнено', life: 3000});
					}, 

  onRowSelect(e) {
				if (e.type === 'row')
					//this.$emit("row-select", e.data);
          this.getDogType(e.data.dogType)
          this.getObject(e.data.objectId)
          this.$router.push("/tabs");
			},      

        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
                    }}, 

         statusClass(data) {
            return [
                {
                    'undone': data.inventoryStatus === "Не выполнено",
                    'inwork': data.inventoryStatus === "В работе",
                    'done': data.inventoryStatus === "Выполнено"
                }
            ];
        }           
}
}
</script>              

<!--Медиазапрос, который уменьшает размер шрифта в таблице, при отображении на мобильном устройстве-->
<style lang="scss" scoped>
 @media screen and (max-width: 500px) {
    .p-datatable-sm {
      font-size: 0.8rem; 
       } 
} 
 
//Динамическое изменение цвета badge в зависимости от статуса 

.undone { 
    background-color: #FF5252;
}

.inwork { 
    background-color: #2196F3;
}

.done {
    background-color: #66BB6A;
}



</style>