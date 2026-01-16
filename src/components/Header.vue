<template>
<!--Header för alla sidor med godkänd token-->

<!--Navigering-->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
    <!--Logotyp-->
  <RouterLink to="/home" class="navbar-brand"><img :src="logo" alt="Logotyp Design House Stockholm" width="300"></RouterLink>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <!--li som visas för inloggade-->
    <ul class="navbar-nav">
        <li class="nav-item"><RouterLink to="/home" active-class="active" class="nav-link">Hem</RouterLink></li>
        <li class="nav-item"><RouterLink to="/items" active-class="active" class="nav-link">Varor</RouterLink></li>
        <!--Logga ut knapp i menyn-->
        <li class="nav-item"><button class="nav-item btn btn-light" @click="logout">Logga ut</button></li>
    </ul>
  </div>
</div>
</nav>

</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    import logo from '@/assets/DHS_Logo-Secondary_Black.png'

    const router = useRouter()
    //Loggar ut en användare
    const logout = () => {
        console.log("klick")
        const token = localStorage.getItem('token')
        console.log(token)
        localStorage.removeItem('token')
        router.push('/login')
    }
</script>

<style scoped>
    /* Hover för logga ut knapp */
    .logout:hover{
        cursor: pointer;
    }

</style>