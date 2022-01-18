<template>
            <div class="card"> 
                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center"> Инженерно-техническая документация </h2>
                    </div>
            <div class="flex justify-content-between mb-3">
                
               <FileUpload 
                name="demo[]" 
                url="./upload.php" 
                mode="basic"
                @upload="onUpload" 
                :multiple="true" 
                accept="application/pdf, application/msword" 
                :maxFileSize="1000000"
                chooseLabel="Добавить"
                >
                </FileUpload>
                <!--Если в FileUpload добавить :auto="true" загрузка файлов будет происходить сразу после нажатия 
                кнопки Выбрать в окне выбора файлов-->

              </div>
              
            <div v-if="itd" >
			<div v-for="(itdFile, id) of itd" :key="id"> 
                
<ul class="list-none p-0 m-0"> 
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4 border-bottom-1 py-2 surface-border">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">
                            <a href=''>{{itdFile.name}}</a>
                            </span> 
					</div>
                  <div class="mt-2 md:mt-0 flex align-items-end">
						<Button icon="pi pi-times" class="p-button-outlined p-button-danger p-button-rounded" /> 
					</div>  
				</li> 
			</ul>
            </div> 
		</div>
                </div> 



</template>

<script> 
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { mapGetters } from 'vuex'
export default { 
    components: {
        FileUpload,
        Button
    },
    computed: mapGetters(['itd']), 
    
    methods: {
        onUpload() {
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
        }
    },
    beforeMount () { 
    this.$store.dispatch('getITD')
  }
    

}
</script> 

