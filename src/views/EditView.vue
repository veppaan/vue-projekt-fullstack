<template>
    <Header />
    <form @submit.prevent="updateItem">
        <h2>Ändra</h2>
        <div class="form-group">
            <label for="name">Namn</label>
            <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Skriv namnet på varan" v-model="item.name">
        </div>
        <div class="form-group">
            <label for="description">Beskrivning</label>
            <input type="textarea" class="form-control" id="description" aria-describedby="description" placeholder="Skriv beskrivning" v-model="item.description">
        </div>
        <div class="form-group">
            <label for="price">Pris</label>
            <input type="number" class="form-control" id="price" aria-describedby="price" placeholder="Pris" v-model.number="item.price">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Lagersaldo</label>
            <input type="number" class="form-control" id="stock" aria-describedby="stock" placeholder="Saldo" v-model.number="item.stock">
        </div>
        <div class="form-group">
            <label for="article-number">Artikelnummer</label>
            <input type="number" class="form-control" id="article-number" aria-describedby="artikelnummer" placeholder="Artikelnummer" v-model.number="item.articleNumber">
        </div>
        <div class="form-group">
            <label for="image">Bild</label>
            <input type="text" class="form-control" id="image" aria-describedby="bild" placeholder="Bild" v-model="item.image">
        </div>

        <button type="submit" class="btn btn-primary">Uppdatera vara</button>
</form>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';

    onMounted(() => {
            getItem();
    })

    const route = useRoute()
    const router = useRouter()

    const item = ref({
        name: '',
        description: '',
        price: null,
        stock: null,
        articleNumber: null,
        image: ''
    })
    
    //Get metod för att hämta alla produkter
    const getItem = async () => {
                const token = localStorage.getItem('token');
                console.log(token);
                const id = route.params.id
                try {
                const resp = await fetch(`https://backend-projekt-fullstack.onrender.com/items/${id}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ` + token
                    }
                })
                if(resp.ok) {
                    const data = await resp.json();
                    console.log(data);
                    item.value.name = data.name
                    item.value.description = data.description
                    item.value.price = data.price
                    item.value.stock = data.stock
                    item.value.image = data.image
                    item.value.articleNumber = data.articleNumber
                }
                } catch (error) {
                    console.log("Error fetching items: " + error)
                }
            }

        //Uppdatera vara
        const updateItem = async () => {
            const inputs = {
                name: item.value.name,
                description: item.value.description,
                price: item.value.price,
                stock: item.value.stock,
                articleNumber: item.value.articleNumber,
                image: item.value.image
            }
            console.log(inputs)
            const token = localStorage.getItem('token');
            const id = route.params.id
            try {
            const resp = await fetch(`https://backend-projekt-fullstack.onrender.com/items/${id}`, {
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
                console.log("Vara uppdaterad!");
                router.push('/items')
            }
            } catch (error) {
                console.log("Error updating item: " + error)
            }
        }
    
    </script>