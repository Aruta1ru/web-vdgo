<template>
            <div class="card">
                 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Фото </h2>
                    </div> 

<FormKit id="FormImage" ref= "formImage" type="form" 
submit-label="Загрузить"
@submit="uploadImage">
<FormKit v-model="files" type="file" label="Выбор изображений для загрузки" 
name="files" accept="image/*"  multiple />
</FormKit>  

                <div class="mt-3"> 
                <PhotoGallery/>
                </div> 
                </div>

</template>

<script> 

import PhotoGallery from './PhotoGallery.vue'
import { mapActions, mapGetters } from 'vuex'
export default { 
    components: {
        PhotoGallery
    }, 

    data() {
        return {
            files: []
         }
    },
     
    computed: {
        ...mapGetters(['idObject', 'bypassDate', 'errorMessage', 'errorStatus'])
    }, 

    methods: { 

   ...mapActions(['uploadPhoto']),    

   async uploadImage (data) { 
       await new Promise((r) => setTimeout(r, 1000)) 
        let fd = new FormData()
        data.files.forEach((fileItem) => {
        let category = 0;     
        fd.append('files', fileItem.file)
        fd.append("file_category", category)
        fd.append("object",this.idObject )
        fd.append("bypass_date", this.bypassDate)
        })
        
        this.uploadPhoto(fd)
        .then(() => { 
                   
                  this.$toast.add({severity:'success', summary:'Загрузка изображений', detail:'Загружено', life: 3000});     
                  this.files = []  
            }) 
        .catch(() => {
             this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
             })

      
    }
}
}
</script> 
