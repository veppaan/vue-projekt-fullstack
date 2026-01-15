<template>
    <Header />
    <div class="container">
        <h1>Startsida</h1>
    </div>
</template>

<script setup lang="ts">
    import Header from '@/components/Header.vue';
    import { authToken } from '@/utils/authToken';
    import { onMounted } from 'vue';

    onMounted(() => {
        const checkingToken = async () => { await authToken()
        if(!checkingToken) return
        }
        checkingToken()
    })
    
</script>