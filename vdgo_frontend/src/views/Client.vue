<template>
  <div class="client">
    <ClientInfo /> 
    
  </div>
</template>

<script>
// @ is an alias to /src
import ClientInfo from '@/components/Information/ClientInfo.vue'
export default {
  name: 'Client',
  components: {
    ClientInfo
   
  },
}
</script>