<template>
    <HeaderFirst />
    <div class="container mt-4">
        <h1 class="text-center">Logga in</h1>
    <form @submit.prevent="loginUser" class="d-flex flex-column justify-content-center align-items-center">
        <div class="form-group col-12 col-md-6">
            <label for="username">Användarnamn:</label>
            <input type="text" class="form-control" id="username" aria-describedby="Username" placeholder="Skriv ditt användarnamn" v-model="username">
            <p class="error" v-if="errors['username']">{{ errors['username'] }}</p>
        </div>
        <div class="form-group col-12 col-md-6 mt-2">
            <label for="password">Lösenord:</label>
            <input type="password" class="form-control" id="password" aria-describedby="Password" placeholder="Skriv ditt lösenord" v-model="password">
            <p class="error" v-if="errors['password']">{{ errors['password'] }}</p>
        </div>

        <button type="submit" class="btn btn-primary mt-3">Logga in</button>
    </form>
</div>
</template>

<script setup>
    import HeaderFirst from '@/components/HeaderFirst.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const username = ref('');
    const password = ref('');
    const errors = ref({});

    //Logga in användare med POST-anrop
    const loginUser = async () => {

        const inputs = {
                username: username.value,
                password: password.value,
        }
        try {
            const res = await fetch("https://backend-projekt-fullstack.onrender.com/admins/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            //Om det blir autentiseringsfel så lägger jag in ett felmeddelande
            if(res.status === 401){
                errors.value = {
                    password: 'Fel lösenord/användarnamn'
                }
                return
            }
            //Lägg in error meddelanden under varje input
            if(!res.ok){
                errors.value = data.errors;
            }
            //Om autentisering godkänns så skickas användaren till home-sida
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

<style scoped>
    /* Style för error-texter */
    .error{
        font-weight: 300;
        color: red;
    }
</style>