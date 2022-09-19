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
              <DogTypeInfo/>
              <PhoneEdit/>
              <EmailEdit/>  
            </div> 
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-file text-blue-500 text-lg"></i>
              </div>
                </div> 
       </div>
       </div>
        <ClientsList/>
</div>    
          <PrevBypasses/>
      </div>
</template>
<script>


import PhoneEdit from './PhoneEdit.vue'
import EmailEdit from './EmailEdit.vue'
import PrevBypasses from './PrevBypasses.vue'
import DogTypeInfo from './DogTypeInfo.vue'
import ClientsList from './ClientsList.vue'


export default {
  
components:{
    DogTypeInfo,
    PhoneEdit,
    EmailEdit,
    ClientsList,
    PrevBypasses
    
} 
}
</script>



