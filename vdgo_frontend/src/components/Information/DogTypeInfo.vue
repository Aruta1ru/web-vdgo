<template>
<h3 class="block text-500 font-medium mb-2"> Тип договора </h3>
            <div class="text-900 font-medium text-lg"> {{ dogType }} </div>

</template> 


<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
   ...mapGetters(['dogType']),
 },
}

</script>