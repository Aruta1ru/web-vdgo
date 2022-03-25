<template> 
<Galleria :value="images" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
    :circular="false" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false" v-model:visible="displayCustom">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="max-width: 100%; display: block; max-height:100vh !important;"/>
    
    </template>
    
    <template #caption>
        <Button icon="pi pi-download" class="p-button-primary p-button-text p-button-lg p-button-rounded"> </Button>
         <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button-lg p-button-rounded"> </Button>
    </template>
    
</Galleria>

<!-- Галерея с перелистыванием-->

<div v-if="images" class="grid"> 
    <div v-for="(image, index) of images" class="col-3" :key="index">
        <img :src="image.thumbnailImageSrc" :alt="image.alt" style="cursor: pointer; max-width:100%;" @click="imageClick(index)"
        aria-haspopup="true" />
    </div>
</div>


<!-- Галерея preview без перелистывания
<div v-if="images" class="grid">
    <div v-for="(image, index) of images" class="col-3" :key="index"> 
        <Image :src="image.thumbnailImageSrc" alt="Image" imageStyle="cursor: pointer; max-width:100% ; max-height:100vh !important;" preview>
        <template #indicator>
    </template>
    </Image>
    </div>
</div>-->

</template>

<script>

import Galleria from 'primevue/galleria';
import { mapGetters } from 'vuex'
//import Image from 'primevue/image';
import Button from 'primevue/button';
export default { 

    computed: mapGetters(['images']), 

    components:{
        Galleria,
       //Image,
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

            items: [
                {
                   label:'Скачать',
                   icon:'pi pi-fw pi-download',
                   command: () => {
						this.$toast.add({severity:'success', summary:'Загрузка файла', detail:'Файл загружен', life: 3000});}
                   },
                {
                    label: 'Удалить',
                    icon: 'pi pi-fw pi-trash',
                    command: () => {
						this.$toast.add({severity:'error', summary:'Удаление файла', detail:'Файл удален', life: 3000});}
                }
            ]
        }
    }, 

    methods: {
        imageClick(index) {
            this.activeIndex = index;
            this.displayCustom = true;
        }     
    },

beforeMount () {
    this.$store.dispatch('getImages') 
  }
}
</script> 

