<template>
    <nav class="navbar navbar-expand-md">
    <div class="container">
        <ul class="navbar-nav">
        <li class="nav-item"><RouterLink to="/">Hem</RouterLink></li>
        <li class="nav-item"><RouterLink to="/items">Varor</RouterLink></li>
        </ul>
    </div>
  </nav>
</template>

<script>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>

</style>