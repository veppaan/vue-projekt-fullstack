<script setup>
import Header from '@/components/Header.vue';

</script>

<template>
    <Header />
    <form>
        <h2>Ändra</h2>
  <div class="form-group">
    <label for="name">Namn</label>
    <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Skriv namnet på varan">
  </div>
  <div class="form-group">
    <label for="description">Beskrivning</label>
    <input type="textarea" class="form-control" id="description" aria-describedby="description" placeholder="Skriv beskrivning">
  </div>
  <div class="form-group">
    <label for="price">Pris</label>
    <input type="number" class="form-control" id="price" aria-describedby="price" placeholder="Pris">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Lagersaldo</label>
    <input type="number" class="form-control" id="stock" aria-describedby="stock" placeholder="Saldo">
  </div>
  <div class="form-group">
    <label for="article-number">Artikelnummer</label>
    <input type="number" class="form-control" id="article-number" aria-describedby="artikelnummer" placeholder="Artikelnummer">
  </div>
  <div class="form-group">
    <label for="image">Bild</label>
    <input type="number" class="form-control" id="image" aria-describedby="bild" placeholder="Bild">
  </div>

  <button type="submit" class="btn btn-primary">Uppdatera vara</button>
</form>
</template>