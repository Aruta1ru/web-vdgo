<template>
  <div class="client">
    <ClientInfo /> 
    
  </div>
</template>

<script>

import ClientInfo from '@/components/Information/ClientInfo.vue'

export default {
  name: 'ClientPage',
  components: {
    ClientInfo
  },
}
</script>