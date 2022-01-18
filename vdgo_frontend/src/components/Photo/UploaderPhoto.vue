<template>
    
        
            <div class="card">
                 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center"> Фото </h2>
                    </div> 

    <FileUpload mode="basic" name="demo[]" url="./upload" :auto="true"  :multiple="true" 
                accept="image/*"  :maxFileSize="1000000" chooseLabel="Добавить"/>

                <div class="mt-3"> 
                <Gallery/>
                </div>
                </div>
                



   
</template>

<script> 
import FileUpload from 'primevue/fileupload'
import Gallery from './Gallery.vue'

export default { 
    components: {
        FileUpload,
        Gallery
    },

    methods: {
        onUpload() {
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
        }
    },
}
</script>