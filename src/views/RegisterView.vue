<template>
    <HeaderFirst />
    <div class="container">
        <h1 class="text-center mt-4">Registrera konto</h1>
    <form @submit.prevent="registerUser" class="d-flex flex-column justify-content-center align-items-center">
        <div class="form-group col-12 col-md-6">
            <label for="firstname">Förnamn:</label>
            <input type="text" class="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Skriv ditt förnamn" v-model="firstname">
            <p class="error" v-if="errors['firstname']">{{ errors['firstname'] }}</p>
        </div>
        <div class="form-group col-12 col-md-6 mt-2">
            <label for="username">Användarnamn:</label>
            <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Skriv ditt användarnamn" v-model="username">
            <p class="error" v-if="errors['username']">{{ errors['username'] }}</p>
        </div>
        <div class="form-group col-12 col-md-6 mt-2">
            <label for="password">Lösenord:</label>
            <input type="password" class="form-control" id="password" placeholder="Skriv ditt lösenord" v-model="password">
            <p class="error" v-if="errors['password']">{{ errors['password'] }}</p>
        </div>
        <div class="form-group col-12 col-md-6 mt-2">
            <label for="code">Företagskod:</label>
            <input type="password" class="form-control" id="code" placeholder="Skriv in företagskoden" v-model="key">
            <p class="error" v-if="errors['key']">{{ errors['key'] }}</p>
        </div>

        <button type="submit" class="btn btn-primary mt-4">Registrera</button>
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
    const firstname = ref('')
    const key = ref('')
    const errors = ref({});

    //POST anrop för att registrera en användare
    const registerUser = async () => {

        const inputs = {
                firstname: firstname.value,
                username: username.value,
                password: password.value,
                key: key.value
        }
        console.log(inputs)

        try {
            const res = await fetch("https://backend-projekt-fullstack.onrender.com/admins/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json()
            if(!res.ok){
                //Visar error-meddelanden under inputs
                errors.value = data.errors;
            }
            if(res.ok){
                console.log("Registrering lyckades " + firstname.value);
                router.push('/login')
            }
            
        } catch (error) {
            console.log("Error register user: " + error)
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