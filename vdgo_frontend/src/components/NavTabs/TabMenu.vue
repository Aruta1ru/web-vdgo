 <template>


        <div class="card "> 
            <h3> Объект object.name </h3>
            <TabMenu :model="items" /> 
        </div>  
        
            <router-view></router-view>
            
</template>

<script> 

import TabMenu from 'primevue/tabmenu';
export default { 
    components: {
        TabMenu
        },

    data() {
        return {  
          items: [

              {
                    icon: 'pi pi-arrow-left',
                    to: '/', 
                    
                },

                {
                    label: 'Сведения',
                    icon: 'pi pi-id-card',
                    to: '/tabs/client', 
                    
                },
                {
                    label: 'Оборудование',
                    icon: 'pi pi-briefcase',
                    to: '/tabs/equipment'
                },

                    {
                    label: 'Фото',
                    icon: 'pi pi-camera',
                    to: '/tabs/gallery'
                },

                {
                    label: 'ИТД',
                    icon: 'pi pi-file-pdf',
                    to: '/tabs/itd'
                }

                ],
        }
    }
}
</script>
