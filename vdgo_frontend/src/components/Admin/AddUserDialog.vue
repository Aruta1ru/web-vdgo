<template>
<Dialog v-model:visible="addUserDialog"  header="Регистрация нового пользователя"  :modal="true" class="p-fluid" dismissableMask
:style="{width: '390px'}"> 
<!--:breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}"-->

 <div class="form-registry">
    
        <form class="p-fluid" @submit.prevent>
          <div class="p-field mt-6 mb-5">
            <div class="p-float-label">
              <InputText
                id="username"
                v-model="username"
                autocomplete="off"
                @change="setRegisterUsername(this.username)"
              />
              <label for="username">Имя пользователя</label>
            </div>
          </div>
          <div class="p-field mb-5">
            <div class="p-float-label">
              <Password
                id="password"
                v-model="password"
                autocomplete="off"
                @change="setRegisterPassword(this.password)"
                toggleMask
              />
              <label for="password">Пароль</label>
            </div>
          </div>

          <div class="p-field mb-4">
            <span class="p-float-label">
              <Dropdown
                v-model="selectedUnit"
                @change="getExecutors(this.selectedUnit.id)"
                :options="units"
                optionLabel="name_short"
                dataKey="id"
                :filter="true"
                placeholder="Выбрать подразделение"
                :showClear="true"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value">
                    <div>{{ slotProps.value.name_short }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                    <div>{{ slotProps.option.name_short }}</div>
                </template>
              </Dropdown>
            </span>
          </div>

          <div class="p-field mb-4">
            <span class="p-float-label">
              <Dropdown
                v-model="selectedExecutor"
                :options="executors"
                @change="setRegisterExecutor(this.selectedExecutor)"
                optionLabel="name"
                dataKey="id"
                :filter="true"
                placeholder="Выбрать исполнителя"
                :showClear="true"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                    <div>{{ slotProps.option.name }}</div>
                </template>
              </Dropdown>
            </span>
          </div>
          <Button
           class="mb-4"
            icon="pi pi-sign-in"
            label=" Зарегистрировать "
            @click="onRegister()"
          />
        </form>
      </div>
  </Dialog>

<Button icon="pi pi-user-plus" 
label="Добавить"
class="p-button-rounded p-button-outlined p-button-primary p-mr-2" 
@click="addUserDialog=true" />
        </template>


 <script> 
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from "primevue/password";
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
       components: {
           Dialog,
           InputText,
           Dropdown,
           Button, 
           Password,
    
       },
	computed: {
    ...mapState(  
      {
      units: (state) => state.units.units,
      executors: (state) => state.executors.executors,
      registerUser: (state) => state.registerUser
    }),

    
    ...mapGetters(['users', 'errorStatus', 'errorMessage'])
,
  },
	

    data() {
        return {
      addUserDialog: false,
      username: null,
      password: null,
      selectedExecutor: null,
      selectedUnit: null, 
        }
    },
	
    methods: { 
    ...mapMutations({
      setUnit: "SET_UNIT",
      setRegisterUsername: "SET_REGISTER_USERNAME",
      setRegisterPassword: "SET_REGISTER_PASSWORD",
      setRegisterExecutor: "SET_REGISTER_EXECUTOR"
    }),

  onRegister() {  
      this.register()
     .then(() => {
            this.addUserDialog=false
            this.$toast.add({severity:'success', summary:'Регистрация', detail:'Пользователь добавлен', 
            life: 3000})} 
        )
        .catch(() => {
             this.$toast.add({severity:'error', summary:'Ошибка' + ' ' + this.errorStatus, 
             detail: this.errorMessage, life: 3000}) 
        }
        );    
    
  },

    ...mapActions({
      getUnits: "getUnits",
      getExecutors: "getExecutors",
      register: "register"
    }),

  },

}
</script>