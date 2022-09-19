<template> 
<Galleria :value="images" :id="images.id" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
    :circular="false" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false" v-model:visible="displayCustom">
    <template #item="slotProps">
        <img :src="getPath(slotProps.item.filename)" :alt="slotProps.item.alt" style="max-width: 100%; display: block; max-height:100vh !important;"/>
    </template>
</Galleria>


<div v-if="images.length > 0" class="grid"> 
    <div v-for="(image, id) of images" class="col-3" :key="id"> 
        <img :src="getPath(image.filename)"  :alt="image.alt" style="cursor: pointer; max-width:100%;" @click="imageClick(id)"
        aria-haspopup="true" />
    <!--Нужен source from response-->
    <!--У другого объекта он ссылается на это же имя файла!!!-->
    <!--Так, как сейчас, webpack пытается с помощью require получить файл в процессе сборки, 
        но выходит ошибка о потере модуля, так как сборка, по всей видимости, идет быстрее, 
        чем получение данных с сервера (рассинхрон:)-->
        <Button icon="pi pi-download" class="p-button-primary p-button-text p-button p-button-rounded" @click="onDownload(image.filename)" > </Button>
        <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button p-button-rounded" @click="onDelete(image.id)"> </Button>
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

    computed: { 
        ...mapGetters(['images','idObject','errorStatus','errorMessage' ])
    },

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

    ...mapActions(['deletePhoto', 'downloadPhoto']),    

    getPath(filename) { 
            let path = require(`../../../../vdgo_backend/media/${this.idObject}/${filename}`)
            return path
        },

        imageClick(id) {
            this.activeIndex = id;
            this.displayCustom = true;
        },

        onDownload(filename) {
        this.downloadPhoto(filename) 
        .catch(() => {
                this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
            })
        },

        onDelete(id) {
        this.deletePhoto(id)
        .then(() => { 
                  this.displayCustom = false 
                  this.$toast.add({severity:'success', summary:'Удаление изображения', detail:'Удалено', life: 3000});
            })
            .catch(() => {
                this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 5000})
            })
        }
    },
}
</script> 

