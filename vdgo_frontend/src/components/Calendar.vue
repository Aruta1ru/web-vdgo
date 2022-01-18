<template>

<Calendar style="width: 12em" id="calendar" 
v-model="value" 
:monthNavigator="true" 
:yearNavigator="true" 
yearRange="2000:2030" 
:showIcon="true" 
:showButtonBar="true" 
:touchUI="true"
dateFormat="dd.mm.yy"/>
       
         
</template>

<script>

import Calendar from 'primevue/calendar';


export default {
    components:{
        Calendar
    },
    data() {
        return {
            value: null
        }
    }
}
</script>