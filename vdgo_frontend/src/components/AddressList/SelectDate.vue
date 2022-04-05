<template>  

<div class="grid"> 
    <div class="col-12 md:col-6 lg:col-6 xl:col-3 mb-2 "> 
        <div class="flex justify-content-between mb-3">
          <div>
            <h3 class="block text-500 font-medium mb-3"> Дата </h3>
            <div class="text-900 font-medium text-xl"> 
        <Calendar @date-select="setDate(this.date)" style="width: 12em"  v-model="date" :monthNavigator="true" :yearNavigator="true" 
        yearRange="2019:2023"  :showIcon="true" :showButtonBar="true" autocomplete="off"/>
  </div>
            </div>
              </div> 
            <span class="text-green-600 text-base">  {{bypassCount}} </span>
             адресов на
              <span class="text-blue-500 text-base" v-if="selectedDateTxt"> {{selectedDateTxt}} </span> 
              <span class="text-orange-500 text-base" v-else> - </span>
    </div>
</div> 
</template>


<script>

import Calendar from 'primevue/calendar';
import {mapActions, mapGetters} from "vuex"


export default {

components: {
Calendar
},

data () {
    return {
        date: null
    }
},


computed: {
  ...mapGetters({
    bypassCount: "bypassCount",
    selectedDateTxt: "selectedDateTxt"
  })
},


methods: {
    ...mapActions({
    setDate: "setDate"
  })
}

}

</script>