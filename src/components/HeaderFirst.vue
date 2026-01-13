<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
      <a class="navbar-brand" href="#">Titel</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item"><RouterLink to="/login" active-class="active" class="nav-link">Logga in</RouterLink></li>
            <li class="nav-item"><RouterLink to="/register" active-class="active" class="nav-link">Registrera</RouterLink></li>
        </ul>
      </div>
    </div>
    </nav>
    
    </template>
    
    <script>
        import { RouterLink } from 'vue-router';
    </script>
    
    <style scoped>
    
    </style>