<template>
    <Header />
    <div class="container">

    <h1>Alla varor</h1>

    <table class="table">
  <thead>
    <tr>
      <th scope="col">Namn</th>
      <th scope="col">Beskrivning</th>
      <th scope="col">Pris</th>
      <th scope="col">Saldo</th>
      <th scope="col">Artikelnummer</th>
      <th scope="col">Bild</th>
    </tr>
  </thead>
  <tbody>

    <ItemSection v-for="item in items" :item="item" :key="item._id"/>

  </tbody>
</table>
</div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import ItemSection from '@/components/ItemSection.vue';
        import { ref, onMounted } from 'vue';
    
        const items = ref([])
    
        onMounted(() => {
            getItems();
        })
    
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
    
    </script>