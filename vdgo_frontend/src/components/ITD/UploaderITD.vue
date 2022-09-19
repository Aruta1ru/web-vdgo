<template>
            <div class="card"> 
                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
					<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Инженерно-техническая документация </h2>
                    </div>
           
                
<FormKit type="form" 
submit-label="Загрузить"
@submit="uploadDocuments">
<FormKit  v-model="files" type="file" label="Выбор документации для загрузки" 
name="files" accept=".pdf" multiple />
</FormKit>   
              
<ITDList/>
            </div> 
</template>

<script> 



import { mapActions, mapGetters } from 'vuex'
import ITDList from './ITDList.vue'


export default { 
    components: {
    ITDList
},

    data() {
        return {
            files: []
         }
    },

    computed: mapGetters(['idObject', 'bypassDate', 'errorStatus', 'errorMessage']),

    methods: { 

        ...mapActions(['uploadITD']),

  async uploadDocuments (data) {  
      await new Promise((r) => setTimeout(r, 1000))
        let fd = new FormData()
        data.files.forEach((fileItem) => {
        let category = 1;     
        fd.append('files', fileItem.file)
        fd.append("file_category", category)
        fd.append("object", this.idObject )
        fd.append("bypass_date", this.bypassDate)
        }) 
        this.uploadITD(fd)
        .then(() => { 
                  this.files = []  
                  this.$toast.add({severity:'success', summary:'Загрузка документации', detail:'Загружено', life: 3000});
                  
            })
        .catch(() => {
              this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })
    }   
    },
    }
   

</script> 

