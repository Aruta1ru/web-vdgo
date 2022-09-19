<template>

<div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h3 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Предыдущее ВДГО </h3> 
					</div>
<div v-if="prevBypasses">
      <DataTable 
  :value="prevBypasses" 
  responsiveLayout="stack" 
  class="p-datatable-sm"
  breakpoint="700px" 
  :paginator="true" 
  :rows="10" 
  dataKey="id">
                <Column bodyStyle="width:25%" field="executor.name" header="Исполнитель" :sortable="true"></Column>
                <Column bodyStyle="width:25%" field="date_action"  header="Дата обхода" :sortable="true">
                <template #body="slotProps">   
                     {{dateActionTransform(slotProps.data.date_action)}}
                    </template>
                </Column>
                <Column bodyStyle="width:25%" field="execStatus" header="Статус выполнения">
                    <template #body="slotProps">  
                      <Badge value="execStatusTxt(slotProps.data.exec_status)" :class="statusClass(slotProps.data)" > 
                        {{execStatusTxt(slotProps.data.exec_status)}}
                      </Badge>
                      
                    </template>
                </Column> 
                <Column bodyStyle="width:25%" field="undone_reason.name_short" header="Причина невыполнения" > </Column>
                       </DataTable>
                        </div> 

        <div v-else>
          <h2 class="text-500 font-medium text-xl text-center">Предыдущих ВДГО не обнаружено</h2>
        </div>	

</template> 


<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Badge from 'primevue/badge'
import { mapGetters } from 'vuex'



export default {
components:{
  DataTable,
  Column,
  Badge
 }, 

 computed: {
   ...mapGetters(['idObject', 'prevBypasses', 'reasons'])
 },

 methods: { 

    statusClass(data) {
            return [
                {
                    'undone': data.exec_status === 2,
                    'inwork': data.exec_status === 0,
                    'done': data.exec_status === 1 
                 }
            ];
        }, 

    dateActionTransform(date_action) { 
      return new Date(date_action).toLocaleDateString().slice(0,10)
    },

    execStatusTxt: (status) => {
      switch (status) {
            case 0: return 'в работе';
            case 1: return 'выполнено';
            case 2: return 'не выполнено';
            default: return 'неизвестный статус';
        }
   },
  },  

}

</script> 


