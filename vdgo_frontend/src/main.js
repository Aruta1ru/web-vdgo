import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import { ru } from '@formkit/i18n'
import axios from 'axios';
import store  from "./store/index.js";
import router  from "./router/index.js";
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

app.config.debug = true;
app.config.devtools = true;
app.config.globalProperties.$http = axios;
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

app.use(router)
app.use(store)
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);
app.use(ToastService)
app.use(plugin, defaultConfig({
    locales: { ru },
    // Define the active locale
    locale: 'ru',
}) )
app.mount('#app')
