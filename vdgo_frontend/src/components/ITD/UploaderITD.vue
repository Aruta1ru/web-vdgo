<template>
            <div class="card"> 
                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
					<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Инженерно-техническая документация </h2>
                    </div>
           
                
<FormKit  type="form" @submit="uploadDocuments">
<FormKit type="file" label="Выбор документации для загрузки" 
name="files" accept=".pdf" multiple />
</FormKit>   
              
<div v-if="itd.length > 0">
<div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Список файлов </h2>
					</div>

      <DataTable 
  :value="itd" 
  responsiveLayout="stack" 
  class="p-datatable-sm"
  breakpoint="700px" 
  :paginator="true" 
  :rows="10" 
  dataKey="id">
             <Column bodyStyle="width:90%" field="filename" header="Имя файла" :sortable="true"></Column>
               <Column header="" bodyStyle="min-width:2rem">  
                <template #body="slotProps"> 
                   <Button icon="pi pi-download" class="p-button-primary p-button-text p-button-lg p-button-rounded" @click="onDownload(slotProps.data)" /> 
                    </template>
                </Column>
                <Column header="" bodyStyle="min-width:2rem">  
                <template #body="slotProps"> 
						<Button icon="pi pi-times" class="p-button-text p-button-danger p-button-rounded" @click="deleteITD(slotProps.data.id)" /> 
                    </template>
                </Column>    
                       </DataTable>
                        </div>
<div v-else>
          <h2 class="text-500 font-medium text-xl text-center">Документация по данному объекту не обнаружена</h2>
        </div>	
            </div> 
</template>

<script> 

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { mapGetters,mapActions } from 'vuex'


export default { 
    components: {
        Button,
        DataTable,
        Column
        
    },
    computed: mapGetters(['itd']), 

    methods: { 

        ...mapActions({
            deleteITD: "deleteITD",
            downloadITD: "downloadITD",
            uploadITD: "uploadITD"
        }),


        onDownload(data) {
            this.downloadITD(data.filename)
        },
       
  async uploadDocuments (data) {  
      await new Promise((r) => setTimeout(r, 1000))
        let fd = new FormData()
        data.files.forEach((fileItem) => {
        let category = 1;     
        fd.append('files', fileItem.file)
        fd.append("file_category", category)
        fd.append("object",this.$store.state.vdgoObject.vdgoObject.id )
        fd.append("bypass_date", this.$store.getters.bypassDate)
        })
        this.uploadITD(fd) 
    }   
    },
    }
   

</script> 

