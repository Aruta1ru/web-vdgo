<template>
  <div class="form-registry">
    <div class="p-d-flex p-jc-center">
      <div class="card"> 
        <div class="text-center mb-5"> 
        <div class="text-900 text-2xl font-medium mb-3">Регистрация</div>
    </div>
        <form class="p-fluid" @submit.prevent>
          <div class="p-field p-col-12 p-md-4">
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
          <div class="p-field p-col-12 p-md-4">
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

          <div class="p-field p-col-12 p-md-4">
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

          <div class="p-field p-col-12 p-md-4">
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
            icon="pi pi-sign-in"
            label=" Зарегистрировать "
            @click="register"
          />
        </form>
      </div>
    </div>
  </div> 


</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { mapActions, mapMutations, mapState} from "vuex";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    Button,
    InputText,
    Dropdown,
    Password,
  },

   data() {
    return {
      username: null,
      password: null,
      selectedExecutor: null,
      selectedUnit: null,  
    };
  },


  computed: {
    ...mapState(  
      {
      units: (state) => state.units.units,
      executors: (state) => state.executors.executors,
      registerUser: (state) => state.registerUser
    })
  },

  methods: {
    ...mapMutations({
      setUnit: "SET_UNIT",
      setRegisterUsername: "SET_REGISTER_USERNAME",
      setRegisterPassword: "SET_REGISTER_PASSWORD",
      setRegisterExecutor: "SET_REGISTER_EXECUTOR"
    }),

    ...mapActions({
      getUnits: "getUnits",
      getExecutors: "getExecutors",
      register: "register"
    })

  },

  created() 
  { 
      this.getUnits(),
      this.getExecutors()
  }
};
</script>


