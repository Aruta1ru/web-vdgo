<template>
  <div class="tabs">
    <TabMenu /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import TabMenu from '@/components/NavTabs/TabMenu.vue'
export default {
  name: 'Tabs',
  components: {
    TabMenu
   
  }
}
</script>