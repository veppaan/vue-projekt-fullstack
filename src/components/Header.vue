<template>
    <nav>
    <ul>
      <li><RouterLink to="/">Hem</RouterLink></li>
      <li><RouterLink to="/items">Varor</RouterLink></li>
    </ul>
  </nav>
</template>

<script>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
    ul{
        display: flex;
        justify-content: center;
        gap: 3em;
    }
</style>