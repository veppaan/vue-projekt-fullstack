<template>
  <!--Header för utloggade/användare utan token-->

  <!--Navigering-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <!--Logotyp-->
          <RouterLink to="/home" class="navbar-brand"><img :src="logo" alt="Logotyp Design House Stockholm" width="300"></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!--menyns innehåll för uttloggade-->
            <li class="nav-item"><RouterLink to="/login" active-class="active" class="nav-link">Logga in</RouterLink></li>
            <li class="nav-item"><RouterLink to="/register" active-class="active" class="nav-link">Registrera</RouterLink></li>
        </ul>
      </div>
    </div>
    </nav>
    
    </template>
    
    <script setup>
        import { RouterLink } from 'vue-router';
        //Importerar bild från mapp
        import logo from '@/assets/DHS_Logo-Secondary_Black.png'
    </script>
    
    <style scoped>
    
    </style>