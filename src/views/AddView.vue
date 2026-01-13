<script setup lang="ts">
    import Header from '@/components/Header.vue';
    
    </script>
    
    <template>
        <Header />
        <form>
            <h2>Lägg till produkt</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Namn</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Skriv användarnamn">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Beskrivning</label>
        <input type="textarea" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Skriv användarnamn">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Pris</label>
        <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ditt förnamn">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Lagersaldo</label>
        <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ditt efternamn">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Artikelnummer</label>
        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Artikelnummer</label>
        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
    
      <button type="submit" class="btn btn-primary">Lägg till vara</button>
    </form>
    </template>