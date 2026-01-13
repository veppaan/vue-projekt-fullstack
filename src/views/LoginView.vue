<template>
    <HeaderFirst />
    <div class="container">
        <h1>Logga in</h1>
    <form @submit.prevent="loginUser">
        <div class="form-group">
            <label for="exampleInputEmail1">Användarnamn:</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Skriv ditt användarnamn" v-model="username">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Lösenord:</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Skriv ditt lösenord" v-model="password">
        </div>

        <button type="submit" class="btn btn-primary">Logga in</button>
    </form>
</div>
</template>

<script setup lang="ts">
    import HeaderFirst from '@/components/HeaderFirst.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const username = ref('');
    const password = ref('');
    const error = ref('');

    const loginUser = async () => {

        const inputs = {
                username: username.value,
                password: password.value,
        }

        error.value = "";
        try {
            const res = await fetch("https://backend-projekt-fullstack.onrender.com/admins/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            if(res.ok){
                const data = await res.json();
                console.log("Inloggning lyckades!");
                localStorage.setItem('token', data.token);
                router.push('/home')
            }
            
        } catch (error) {
            console.log("Error logging in: " + error)
        }
    }
    
</script>