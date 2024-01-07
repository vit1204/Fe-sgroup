<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter()

let accessToken = localStorage.getItem('accessToken')
const isLogin = computed(() => Boolean(accessToken.value))


const logOut = () => {
    if (isLogin) {
        localStorage.removeItem('accessToken')
        
        accessToken = null
        router.push("/")
        console.log("You have been Logout")

    }
}
</script>

<template>
    <div class="w-[300px] left-0 px-5 border-[1px] fixed h-[100vh] bg-white ">
        <div class="w-full text-center mt-5 text-2xl font-bold text-[#2b00d4]">
            <img src="../../../public/logo.jpg" alt="">
        </div>
        <div>
            <div class="flex flex-col mt-14 gap-6 px-3">
                <div class="flex flex-row items-center gap-4 text-base">
                    <i class="fi fi-rr-dashboard"></i>
                    <div class="font-medium text-[#bcbcbc]">Dashboard</div>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <i class=" font-medium fi fi-rr-users-alt"></i>
                    <div class=" font-medium text-[#bcbcbc]">User manager</div>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <i class="fi fi-rr-calendar"></i>
                    <div class="font-medium text-[#bcbcbc]">Sgrup Premium</div>
                </div>
               <div class="flex flex-row items-center gap-4">
                        
                        <div @click="logOut" class=" cursor-pointer  font-medium text-black">Logout</div>
                    </div> 
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css');
</style>