<template>
    <Header />
    <div class="container">

    <h1>Alla varor</h1>

    <input type="text" id="searchInput" v-model="searchValue" class="form-control m-3" placeholder="Sök vara...">

    <table class="table">
  <thead>
    <tr>
      <th scope="col">Namn</th>
      <th scope="col">Beskrivning</th>
      <th scope="col">Pris</th>
      <th scope="col">Saldo</th>
      <th scope="col">Artikelnummer</th>
      <th scope="col">Bild</th>
      <th scope="col">Ändringar</th>
    </tr>
  </thead>
  <tbody id="myTable">

    <ItemSection v-for="item in filterItems" :item="item" :key="item._id"/>

    <p v-if="filterItems.length === 0">Inga produkter matchade sökningen</p>

  </tbody>
</table>
</div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import ItemSection from '@/components/ItemSection.vue';
        import { ref, onMounted, computed } from 'vue';
    
        const items = ref([])
        const searchValue = ref('')
    
        onMounted(() => {
            getItems();
        })
        
        //Get metod för att hämta alla produkter
        const getItems = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
            const resp = await fetch("https://backend-projekt-fullstack.onrender.com/items", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ` + token
                }
            })
            if(resp.ok) {
                const data = await resp.json();
                console.log(data);
                items.value = data;
            }
            } catch (error) {
                console.log("Error fetching items: " + error)
            }
        }

        //Filtrerar sökinputs
        const filterItems = computed(() => {
            return items.value.filter(item => {
               return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
            })
        })

        
    
    </script>