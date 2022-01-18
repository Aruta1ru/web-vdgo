<template>
<Dialog v-model:visible="editDialog"  header="Параметры оборудования" :maximizable="true" :modal="true" class="p-fluid" dismissableMask
:style="{width: '390px'}"> 
<!--:breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}"-->

<div class="p-field">
                <label for="name">Тип</label>
                <InputText id="name" v-model.trim="product.name" disabled />
            </div>


 <div class="p-field mb-2" >
				<label for="inventoryStatus" class="p-mb-3">Изготовитель</label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>

<div class="p-field mb-2">
				<label for="inventoryStatus" class="p-mb-3">Модель</label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>

<div class="p-field mb-2">
                    <label for="quantity">Количество комфорок</label>
                    <InputNumber id="quantity" v-model="product.quantity" showButtons :min="0" integeronly />
                </div>


<div class="p-field mb-2">
				<label for="inventoryStatus" class="p-mb-3">Вид подводки </label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div> 

<div class="p-field mb-2">
                    <label for="quantity"> Мощность </label>
                    <InputNumber id="quantity" v-model="product.quantity" showButtons :min="0" mode="decimal" :minFractionDigits="1" integeronly />
                </div> 


<div class="p-field mb-2">
				<label for="inventoryStatus" class="p-mb-3">Тип камеры сгорания </label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div> 

<div class="p-field mb-2">
				<label for="inventoryStatus" class="p-mb-3"> Место установки </label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div> 


<div class="p-field mb-2">
                    <label for="quantity">Срок эксплуатации </label>
                    <InputNumber id="quantity" v-model="product.quantity" showButtons :min="0" integeronly />
                </div>

<div class="p-field mb-2">
                    <label for="date1"> Дата установки </label>
                    <InputMask id="date1" v-model="value1" mask="99/99/9999" slotChar="dd/mm/yyyy" />
                </div>

<div class="p-field mb-2">
                    <label for="date2"> Дата отключения </label>
                    <InputMask id="date2" v-model="value2" mask="99/99/9999" slotChar="dd/mm/yyyy" />
                </div>

<div class="p-field mb-2">
                    <label for="quantity"> Показания счетчика </label>
                    <InputNumber id="quantity" v-model="product.quantity" showButtons :min="0" integeronly />
                </div>


<div class="p-field mb-2">
                    <label for="date3"> Дата учета показаний  </label>
                    <InputMask id="date2" v-model="value3" mask="99/99/9999" slotChar="dd/mm/yyyy" />
                </div>	

<div class="p-field mb-2">
                    <label for="valve">Наличие клапана</label>
             <SelectButton id="valve" v-model="valueValve" :options="options" />
		</div>				


<div class="p-field" id="controlled_env">
 <label for="controlled_env"> Контролируeмая среда </label> 
 <div class="p-field-radiobutton">
            <RadioButton id="env1" name="env" value="1" v-model="env" />
            <label for="env1"> CH4 </label>
        </div>
        <div class="p-field-radiobutton">
            <RadioButton id="city2" name="env" value="2" v-model="env" />
            <label for="env2">CO2</label>
        </div>
        <div class="p-field-radiobutton">
            <RadioButton id="city3" name="env" value="3" v-model="env" />
            <label for="env3">CH4+CO2</label>
        </div> 
		</div>

<div class="p-field mb-2">
                <label for="extra_info">Дополнительная информация</label>
                <Textarea id="extra_info" v-model="product.description" required="true" rows="3" cols="20" />
            </div>

            <template #footer>
                <Button label="Предыдущие значения" icon="pi pi-directions-alt" class="p-button-text"/>
                <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog> 

<Button icon="pi pi-ellipsis-h" class="p-button-rounded p-button-outlined p-button-primary p-mr-2" @click="editDialog=true" />


        </template> 

        <script> 

import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'
import SelectButton from 'primevue/selectbutton'

export default {
       components: {
           Dialog,
           InputText,
           Textarea,
           Dropdown,
           RadioButton,
           InputNumber,
           Button,
           InputMask, SelectButton
       },
    data() {
        return {
            editDialog: false,
            products: null,
			env: null,
            product: {},
            selectedProducts: null,
            filters: {},
            value1: null,
            value2: null,
			value3: null,
			valueValve: 'Нет',
			options: ['Да', 'Нет'],
            submitted: false,
            statuses: [
				{label: 'INSTOCK', value: 'instock'},
				{label: 'LOWSTOCK', value: 'lowstock'},
				{label: 'OUTOFSTOCK', value: 'outofstock'}
            ]
        }
    },
	methods: {
		
	}

}
            </script>


<style lang="scss" scoped> 

.p-field-radiobutton {
	margin-bottom: 1rem;
	margin-top:0.5rem;
	display: flex;
	align-items: center; 

 label {
	margin-left: 0.5rem;
    line-height: 1;
}
} 


</style>			