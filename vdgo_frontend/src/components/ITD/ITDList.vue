<template>
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
             <Column bodyStyle="width:80%" field="filename" header="Имя файла" :sortable="true"></Column>
                <Column header="" bodyStyle="width:20%">  
                <template #body="slotProps">
                    <Button icon="pi pi-eye" class="p-button-text p-button-lg p-button-success p-button-rounded" @click="onOpen(slotProps.data)" />
                    <Button icon="pi pi-download" class="p-button-primary p-button-text p-button-lg p-button-rounded" @click="onDownload(slotProps.data)" />  
						<Button icon="pi pi-times" class="p-button-text p-button-lg p-button-danger p-button-rounded" @click="onDelete(slotProps.data)" />
                    </template>
                </Column>    
                       </DataTable>
                        </div>
<div v-else>
          <h2 class="text-500 font-medium text-xl text-center">Документация по данному объекту не обнаружена</h2>
        </div>	
</template> 


<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button' 
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        DataTable,
        Column,
        Button
    },

    computed: mapGetters(['itd', 'idObject', 'bypassDate','errorMessage', 'errorStatus' ]), 

    methods: {
        ...mapActions(['deleteITD', 'downloadITD','openITD']),
    
        onOpen(data) {
            this.openITD(data.filename)
            .catch(() => {
                this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
            })
        },

         onDownload(data) {
            this.downloadITD(data.filename)
            .catch(() => {
                this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
            })
        },

        onDelete(data) {
            this.deleteITD(data.id)
            .catch(() => {
            this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
            })
        }
    }
}

</script>