<template> 
 
        <div class="grid overflow-hidden align-items-center justify-content-center p-2 lg:p-0 m-0">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="grid flex flex-column align-items-center">
                        <div class="flex justify-content-center align-items-center bg-orange-500 border-circle" style="width:3.2rem; height:3.2rem;">
                            <i class="pi pi-fw pi-lock text-2xl text-50"></i>
                        </div>
                        <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">Доступ запрещен</h1>
                        <span class="text-600 text-2xl text-center">Отсутствуют права на добавление пользователя. Свяжитесь с администратором.</span>
                        <div class="col-12 mt-5 text-center">
                            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align:center;"></i>
                            <router-link to="/" class="text-xl text-blue-500">Вернуться на главную</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
</template>