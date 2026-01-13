<template>
    <HeaderFirst />
    <div class="container">
        <h1>Registrera konto</h1>
    <form @submit.prevent="registerUser">
        <div class="form-group">
            <label for="firstname">Förnamn:</label>
            <input type="text" class="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Skriv ditt förnamn" v-model="firstname">
        </div>
        <div class="form-group">
            <label for="username">Användarnamn:</label>
            <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Skriv ditt användarnamn" v-model="username">
        </div>
        <div class="form-group">
            <label for="password">Lösenord:</label>
            <input type="password" class="form-control" id="password" placeholder="Skriv ditt lösenord" v-model="password">
        </div>

        <button type="submit" class="btn btn-primary">Registrera</button>
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
    const firstname = ref('')
    const error = ref('');

    const registerUser = async () => {

        const inputs = {
                firstname: firstname.value,
                username: username.value,
                password: password.value,
        }

        error.value = "";
        try {
            const res = await fetch("https://backend-projekt-fullstack.onrender.com/admins/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            if(res.ok){
                console.log("Registrering lyckades " + firstname);
                router.push('/login')
            }
            
        } catch (error) {
            console.log("Error register user: " + error)
        }
    }
    
</script>