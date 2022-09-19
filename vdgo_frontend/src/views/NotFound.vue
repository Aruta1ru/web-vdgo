<template> 

        <div class="grid overflow-hidden align-items-center justify-content-center m-0 p-2 lg:p-0">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);">
                <div class="flex justify-content-center h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="grid flex-column align-items-center">
                        <h1 class="text-blue-500 font-bold lg:text-5xl mb-2">404</h1>
                        <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">Страница не найдена</h1>
                        <span class="text-gray-600 text-2xl">Запрашиваемый ресурс не обнаружен</span>
                        <div class="col-12 mt-5 text-center">
                            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align:center;"></i>
                            <router-link to="/" class="text-blue-500 text-xl">Вернуться на главную</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
</template>