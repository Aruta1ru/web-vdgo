<template> 
<Galleria :value="images" :id="images.id" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
    :circular="false" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false" v-model:visible="displayCustom">
    <template #item="slotProps">
        <img :src="require(`../../../../vdgo_backend/media/${this.$store.state.vdgoObject.vdgoObject.id}/${slotProps.item.filename}`)" :alt="slotProps.item.alt" style="max-width: 100%; display: block; max-height:100vh !important;"/>

    </template>
    
    <template #caption="slotProps">
        <Button icon="pi pi-download" class="p-button-primary p-button-text p-button-lg p-button-rounded" @click="onDownload(slotProps.item)" > </Button>
         <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button-lg p-button-rounded" @click="onDelete(slotProps.item)"> </Button>
    </template>
    
</Galleria>


<div v-if="images.length > 0" class="grid"> 
    <div v-for="(image, id) of images" class="col-3" :key="id"> 
        <img :src="require(`../../../../vdgo_backend/media/${this.$store.state.vdgoObject.vdgoObject.id}/${image.filename}`)"  :alt="image.alt" style="cursor: pointer; max-width:100%;" @click="imageClick(id)"
        aria-haspopup="true" />
    </div>
</div>
<div v-else>
<h2 class="text-500 font-medium text-xl text-center">Изображений по данному объекту не обнаружено</h2>
</div>	

</template>

<script>

import Galleria from 'primevue/galleria';
import { mapGetters, mapActions } from 'vuex'
import Button from 'primevue/button';

export default { 

    computed: mapGetters({
        images: 'images' }),

    components:{
      Galleria,
       Button
        
    },
    data() {
        return { 
           activeIndex: 0,
           displayCustom: false,
           responsiveOptions: [
				{
                    breakpoint: '1024px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
            ],
        }
    }, 

    methods: {
        imageClick(id) {
            this.activeIndex = id;
            this.displayCustom = true;
        },
        
        ...mapActions({
            deletePhoto: "deletePhoto",
            downloadPhoto: "downloadPhoto"
        }),

        onDownload(item) {
        this.downloadPhoto(item.filename) 
        .catch(err => {
            this.$toast.add({severity:'error', summary:'Загрузка изображения', detail:'Ошибка', life: 3000});
            console.log(err)})
        },

        onDelete(item) {
        this.deletePhoto(item.id)
        .then(() => { 
                  this.displayCustom = false 
                  this.$toast.add({severity:'success', summary:'Удаление изображения', detail:'Удалено', life: 3000});
            })
            .catch(err => {
            this.$toast.add({severity:'error', summary:'Удаление изображения', detail:'Ошибка', life: 3000});
            console.log(err)})
        }
    },
}
</script> 

