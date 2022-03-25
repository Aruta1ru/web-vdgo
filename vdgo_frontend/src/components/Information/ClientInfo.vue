<template> 

 <div class="card"> 
<div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Общие сведения </h2> 
					</div>

   <div class="grid"> 

<div class="col-12 md:col-6 lg:col-6 xl:col-3"> 
                <div class="card mb-0">
                  <div class="flex justify-content-between mb-3">
          <div>
            <h3 class="block text-500 font-medium mb-3"> Тип договора </h3>
            <div class="text-900 font-medium text-lg"> {{ dogType }} </div> 
          <div class="mt-2 mb-2">
                <Inplace :closable="true" @close="updatePhone(idObject,setPhone(this.newPhone))"> 
      <!--После того как появятся события по измененеию телефона
<Inplace :closable="true" @close="savePhone"> -->
    <template #display>
        Телефон: {{ phoneVdgo }}
    </template>
    <template #content>
        <InputMask v-model="newPhone" mask="9 (999) 999-9999" :placeholder="phoneVdgo" />
    </template>
</Inplace>
                    
        </div> 
              <div class="mt-2 mb-2"> 
<Inplace :closable="true" @close="updateEmail(idObject,setEmail(this.newEmail))"> 
<!--После того как появятся события по измененеию email
<Inplace :closable="true" @close="saveEmail"> -->
    <template #display>
        Адрес электронной почты: {{ emailVdgo }}
    </template>
    <template #content>
        <InputText :placeholder="emailVdgo" v-model="newEmail" />
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
            <h3 class="block text-500 font-medium mb-3"> Информация о клиентах </h3>
            <div v-if="clients && clients.length > 0">
            <div v-for="client in clients" :key="client.id">
              <div class="text-900 font-medium text-lg"> {{ client.name }} </div> 
              <div class="mt-2 mb-2"> 
              <div class="text-900  text-base" > Телефон: {{ client.phone }} </div> 
          
              </div> 
            </div>
            </div>
            <div v-else>
              <div class="text-900 font-medium text-lg"> Данные по клиенту отсутствуют </div> 
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
                <Column bodyStyle="width:25%" field="date_action" header="Дата обхода" :sortable="true"></Column>
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
        <h4>Предыдущих ВДГО не обнаружено</h4>
      </div>
      </div>
</template>

<script>

import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Badge from 'primevue/badge'
import { mapGetters, mapActions } from 'vuex'
import Inplace from 'primevue/inplace'


export default {

  
components:{
  InputMask,
  InputText,
  DataTable,
  Column,
  Badge,
  Inplace
  
 }, 

 data () {
   return {
     newEmail: null,
     newPhone: null
   }
 },
 
 computed: {
   ...mapGetters({
     idObject: "idObject",
     clients: "clients",
     prevBypasses: "prevBypasses",
     phoneVdgo: "phoneVdgo",
     emailVdgo: "emailVdgo",
     reasons: "reasons",
     dogType: "dogType"
   }),
 },

  methods: { 

    ...mapActions({
      updateEmail: 'updateEmail',
      updatePhone: 'updatePhone',
      setEmail: 'setEmail',
      setPhone: 'setPhone'
    }),

    statusClass(data) {
            return [
                {
                    'undone': data.exec_status === 2,
                    'inwork': data.exec_status === 0,
                    'done': data.exec_status === 1 
                 }
            ];
        },
    execStatusTxt: (status) => {
      switch (status) {
            case 0: return 'в работе';
            case 1: return 'выполнено';
            case 2: return 'не выполнено';
            default: return 'неизвестный статус';
        }
   }      
  },  

}
</script>



<style lang="scss" scoped> 
 
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
