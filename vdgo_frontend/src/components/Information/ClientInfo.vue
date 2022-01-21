<template> 

 <div class="card"> 
<div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center"> Общие сведения </h2> 
					</div>

   <div class="grid"> 

<div class="col-12 md:col-6 lg:col-6 xl:col-3"> 
                <div class="card mb-0">
                  <div class="flex justify-content-between mb-3">
          <div>
            <h3 class="block text-500 font-medium mb-3"> Тип договора </h3>
            <div class="text-900 font-medium text-lg"> !!!Частное лицо!!! </div> 
          <div class="mt-2 mb-2">
                <Inplace :closable="true">
    <template #display>
        {{ phoneVdgo }}
    </template>
    <template #content>
        <InputMask v-model="phone" mask="9 (999) 999-9999" placeholder="9 (999) 999-9999" />
                    <Button icon="pi pi-check" class="p-button-success"/>
    </template>
</Inplace>
                    
        </div> 
              <div class="mt-2 mb-2"> 
<Inplace :closable="true">
    <template #display>
        {{ emailVdgo }}
    </template>
    <template #content>
        <InputText placeholder="Email" v-model="email" />
        <Button icon="pi pi-check" class="p-button-success"/>
    </template>
</Inplace>       
                </div>      
            </div> 
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-file text-blue-500 text-lg"></i>
              </div>
                </div> 
       </div>
       </div>
      

<div class="col-12 md:col-6 lg:col-6 xl:col-3"> 
                   <div class="card">
                  <div class="flex justify-content-between mb-3">
          <div>
            <h3 class="block text-500 font-medium mb-3"> Информация о клиенте </h3>
            <div v-if="clients===0">
              <div class="text-900 font-medium text-lg"> {{ clients.name }} </div> 
              <div class="mt-2 mb-2"> 
              <div class="text-900  text-base" > Телефон: {{ clients.phone }} </div> 
          
              </div> 

            <div class="mt-2 mb-2"> 
<div class="text-900 text-base"> !!!Email: client@mail.ru!!! </div>
            </div>
            </div>
            <div v-else>
              <h4>Данные по клиенту отсутствуют</h4>
            </div>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-user text-blue-500 text-lg"></i>
              </div>
                </div>         
     </div>
     </div>
</div>

                  <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h3 class="p-mb-2 p-m-md-0 p-as-md-center"> Предыдущее ВДГО </h3> 
					</div>
          <div v-if="prevBypasses===0">
      <DataTable 
  :value="prevBypasses" 
  responsiveLayout="stack" 
  class="p-datatable-sm"
  breakpoint="700px" 
  :paginator="true" 
  :rows="10" 
  dataKey="id">
                <Column field="executor.name" header="Исполнитель" :sortable="true"></Column>
                <Column field="date_action" header="Дата обхода" :sortable="true"></Column>
                <Column field="execStatus" header="Статус выполнения" :sortable="true">
                    <template #body="slotProps">  
                      <Badge value="slotProps.data.execStatus" :class="statusClass(slotProps.data)" > 
                        {{slotProps.data.execStatus}}
                      </Badge>
                      
                    </template>
                </Column> 
                <Column field="undone_reason" header="Причина невыполнения" :sortable="true" > </Column>
                       </DataTable>
                        </div>
      <div v-else>
        <h4>Предыдущих ВДГО не обнаружено</h4>
      </div>
      </div>
</template>

<script>

import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Badge from 'primevue/badge'
import { mapGetters } from 'vuex'
import Inplace from 'primevue/inplace'


export default {

  
components:{
  InputMask,
  InputText,
  Button,
  DataTable,
  Column,
  Badge,
  Inplace
  
 },
 
 computed: {
   ...mapGetters({
     idObject: "idObject",
     clients: "clients",
     prevBypasses: "prevBypasses",
     phoneVdgo: "phoneVdgo",
     emailVdgo: "emailVdgo",
     reasons: "reasons"
   })
 },

  methods: {

     statusClass(data) {
            return [
                {
                    'undone': data.inventoryStatus === "Не выполнено",
                    'inwork': data.inventoryStatus === "В работе",
                    'done': data.inventoryStatus === "Выполнено"
                 }
            ];
        }        
  },  

}
</script>


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
