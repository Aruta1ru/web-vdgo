import { createApp } from 'vue'

import store from "./store";
import router from "./router";
import Axios from 'axios';
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'; 
import './assets/layout/layout.scss';
import BadgeDirective from 'primevue/badgedirective';
import ToastService from 'primevue/toastservice'
import StyleClass from 'primevue/styleclass';
const app = createApp(App)


app.config.globalProperties.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.use(PrimeVue, 
    {
        locale: {
           dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
           dayNamesMin: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
           monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
           monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"],
           today: 'Сегодня',
           weekHeader: 'Нед',
           firstDayOfWeek: 1,
           dateFormat: 'dd.mm.yy',
           clear:'Очистить' }
        }, 
    
    {ripple: false}, 
);

app.use(router);
app.use(store);
app.use(ToastService)
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);
app.mount('#app')

