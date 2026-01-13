<script setup lang="ts">
import HeaderFirst from '@/components/HeaderFirst.vue';

</script>

<template>
    <HeaderFirst />
    <div class="container">
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email:</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Skriv din email">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Lösenord:</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Skriv ditt lösenord">
        </div>

        <button type="submit" class="btn btn-primary">Logga in</button>
    </form>
</div>
</template>