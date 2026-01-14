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

    <ItemSection v-for="item in filterItems" :item="item" :key="item._id" @delete-item="deleteItem" @update-stock="updateStock"/>

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

        //Uppdatera ett saldo
        const updateStock = async (id, stock) => {
            const inputs = {
                stock: stock
            }
            const token = localStorage.getItem('token');
            try {
            const resp = await fetch(`https://backend-projekt-fullstack.onrender.com/items/edit/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ` + token
                },
                body: JSON.stringify(inputs)
            })
            if(resp.ok) {
                const data = await resp.json();
                console.log(data);
                getItems();
            }
            } catch (error) {
                console.log("Error updating stock: " + error)
            }
        }

        const deleteItem = async (id, name) => {
            console.log(id, name)
        const ask = confirm("Vill du verkligen radera " + name + "?")
        if(!ask){
            return
        } else{
            const token = localStorage.getItem('token');
            try {
                
            const resp = await fetch(`https://backend-projekt-fullstack.onrender.com/items/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ` + token
                }
            })
            if(resp.ok) {
                getItems();
            }
            } catch (error) {
                console.log("Error deleting item: " + error)
            }
        }
    }

        //Filtrerar sökinputs
        const filterItems = computed(() => {
            return items.value.filter(item => {
               return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
            })
        })

        
    
    </script>