<template> 
<Galleria :value="images" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
    :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false" v-model:visible="displayCustom">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="max-width: 100%; display: block; max-height:100vh !important;"/>
     
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="max-width:100%; display: block; max-height:100vh !important;" />
   
    </template>
</Galleria>

<!-- Галерея с перелистыванием-->

<div v-if="images" class="grid"> 
    <div v-for="(image, index) of images" class="col-3" :key="index">
        <img :src="image.thumbnailImageSrc" :alt="image.alt" style="cursor: pointer; max-width:100%;" @click="imageClick(index)"
        @contextmenu="onImageRightClick" aria-haspopup="true" />
        <ContextMenu ref="menu" :model="items" />
    </div>
</div>


<!-- Галерея preview без перелистывания
<div v-if="images" class="grid">
    <div v-for="(image, index) of images" class="col-3" :key="index"> 
        <Image :src="image.thumbnailImageSrc" alt="Image" imageStyle="cursor: pointer; max-width:100% ; max-height:100vh !important;" preview />
    </div>
</div>-->

</template>

<script>

import Galleria from 'primevue/galleria';
import { mapGetters } from 'vuex'
//import Image from 'primevue/image';
import ContextMenu from 'primevue/contextmenu';

export default { 

    computed: mapGetters(['images']), 

    components:{
        Galleria,
       // Image,
       ContextMenu
        
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
        },
        onImageRightClick(event) {
					this.$refs.menu.show(event);
				}
        
    },

beforeMount () {
    this.$store.dispatch('getImages') 
  }


}
</script> 

