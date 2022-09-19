<template> 
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
</template> 



<script>
import { mapGetters } from 'vuex'

export default {
computed: {
   ...mapGetters(['clients', /* 'idObject' */ ])
 },

}


</script>