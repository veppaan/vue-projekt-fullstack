<template>
    <Header />
    <div class="container mb-7">
        <h1 class="text-center mt-4 fw-normal">Välkommen {{ usersFirstname }}</h1>
        <p class="text-center mb-5 mt-3">Detta är lagervaruhanteringen för Kippels keramik hos Design House Stockholm. <br> Navigera till Varor i menyn för att hantera lagret.</p>
        <div class="pic text-center mb-5 d-flex flex-lg-row flex-md-column-reverse flex-sm-column-reverse flex-column-reverse align-items-center justify-content-center">
            <img :src="picOne" alt="Bild på Catharina" width="400" height="400">
            <img :src="picTwo" alt="Bild på muggar och skålar" width="300" height="300">
            <img :src="picThree" alt="Bild på muggar i diskställ" width="400" height="400">
        </div>
    </div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import { authToken } from '@/utils/authToken';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import picOne from '@/assets/catharina_kippel_2.jpg';
    import picTwo from '@/assets/image7-2413-0100-2287-0100-2580-0100-2577-0100-ElsaBeskow-Group.jpg';
    import picThree from '@/assets/image8-EBMugWhHandle-Group.jpg';

    const usersFirstname = ref('')

    onMounted(() => {
        const checkingToken = async () => { 
        const res = await authToken()
        if(!res) return
        usersFirstname.value = res.user
        }
        checkingToken()
    })
    
</script>

<style scoped>
    img{
        border-radius: 20px;
        width: 350px;
        height: 350px;
        object-fit: cover;
        object-position: center;
    }
    .pic{
        gap: 2em;
    }
</style>