<template>
    <Header />
    <div class="container">

    <h1 class="fw-normal text-center mt-3">Alla varor</h1>

    <div class="addItemBtn d-flex justify-content-end">
    <RouterLink to="/add" class="btn btn-primary btn-md">Lägg till produkt</RouterLink>
</div>

    <input type="text" id="searchInput" v-model="searchValue" class="form-control mb-3 mt-3" placeholder="Sök vara...">
<div>
    <table class="table mb-5">
  <thead>
    <tr>
      <th scope="col">Namn</th>
      <th scope="col" class="d-none d-md-table-cell">Beskrivning</th>
      <th scope="col" class="d-none d-md-table-cell">Pris</th>
      <th scope="col">Saldo</th>
      <th scope="col" class="text-center">Artikelnummer</th>
      <th scope="col" class="text-center">Bild</th>
      <th scope="col" class="text-center">Ändringar</th>
    </tr>
  </thead>
  <tbody id="myTable">

    <ItemSection v-for="item in filterItems" :item="item" :key="item._id" @delete-item="deleteItem" @update-stock="updateStock" :is-success="successState[item._id] || false"/>

    <p v-if="filterItems.length === 0">Inga produkter matchade sökningen</p>

  </tbody>
</table>
</div>
</div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import ItemSection from '@/components/ItemSection.vue';
    import { authToken } from '@/utils/authToken';
    import { RouterLink } from 'vue-router';
    import { reactive } from 'vue';
        import { ref, onMounted, computed } from 'vue';
    
        const items = ref([])
        const searchValue = ref('')
    
        onMounted(() => {
        const checkingToken = async () => { await authToken()
        if(!checkingToken) return
        
            getItems();
        }
        checkingToken()
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
        //Skapar ett tomt reaktivt object
        const successState = reactive({})
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
                //Gör reaktiv data true i 3 sekunder
                successState[id] = true
                setTimeout(() => {
                    successState[id] = false
                }, 3000)
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
               return (item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||item.description.toLowerCase().includes(searchValue.value.toLowerCase()) || String(item.articleNumber).includes(searchValue.value) || String(item.price).includes(searchValue.value)) ;
            })
        })

        
    
    </script>