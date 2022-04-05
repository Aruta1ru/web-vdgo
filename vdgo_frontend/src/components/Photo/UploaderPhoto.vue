<template>
    
        
            <div class="card">
                 <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h2 class="p-mb-2 p-m-md-0 p-as-md-center text-900 font-medium text-xl"> Фото </h2>
                    </div> 



  

<FormKit id="myForm" type="form" @submit="uploadImage">
<FormKit  type="file" label="Выбор изображений для загрузки" 
name="files" accept="image/*" multiple />
</FormKit>  
              

                <div class="mt-3"> 
                <PhotoGallery/>
                </div> 

                </div>
</template>

<script> 

import PhotoGallery from './PhotoGallery.vue'
import { mapActions } from 'vuex'
export default { 
    components: {
        PhotoGallery
        
    }, 
    

    methods: { 

        ...mapActions({
            uploadPhoto: "uploadPhoto"
        }),    

   async uploadImage (data) { 
       await new Promise((r) => setTimeout(r, 1000)) 
        let fd = new FormData()
        data.files.forEach((fileItem) => {
        let category = 0;     
        fd.append('files', fileItem.file)
        fd.append("file_category", category)
        fd.append("object",this.$store.state.vdgoObject.vdgoObject.id )
        fd.append("bypass_date", this.$store.getters.bypassDate)
        })
        this.uploadPhoto(fd)
    },




}
}
</script> 


<style scoped lang="scss">

</style>