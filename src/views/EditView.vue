<template>
    <Header />
    <div class="container mb-5">
    <form @submit.prevent="updateItem" style="max-width: 800px; margin: 0 auto;">
        <RouterLink to="/items"><i class="bi bi-arrow-left fs-4"></i></Routerlink>
        <h2 class="mt-1 fw-normal">Ändra vara</h2>
        <div class="form-group mt-3">
            <label for="name">Namn</label>
            <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Skriv namnet på varan" v-model="item.name">
            <p class="error" v-if="errors['name']">{{ errors['name'] }}</p>
        </div>
        <div class="form-group">
            <label for="description">Beskrivning</label>
            <textarea rows="5" class="form-control" id="description" aria-describedby="description" placeholder="Skriv beskrivning" v-model="item.description"></textarea>
            <p class="error" v-if="errors['description']">{{ errors['description'] }}</p>
        </div>
        <div class="form-group">
            <label for="price">Pris</label>
            <input type="number" class="form-control" id="price" min="1" aria-describedby="price" placeholder="Pris" v-model.number="item.price">
            <p class="error" v-if="errors['price']">{{ errors['price'] }}</p>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Lagersaldo</label>
            <input type="number" class="form-control" id="stock" min="0" aria-describedby="stock" placeholder="Saldo" v-model.number="item.stock">
            <p class="error" v-if="errors['stock']">{{ errors['stock'] }}</p>
        </div>
        <div class="form-group">
            <label for="article-number">Artikelnummer</label>
            <input type="number" class="form-control" min="1" id="article-number" aria-describedby="artikelnummer" placeholder="Artikelnummer" v-model.number="item.articleNumber">
            <p class="error" v-if="errors['articleNumber']">{{ errors['articleNumber'] }}</p>
        </div>
        <div class="form-group">
                <label for="image">Bild</label>
                <input type="file" @change="handleFileChange" class="form-control mb-3" id="image">
                <img v-if="item.image || base64string" :src="item.image || base64string" alt="preview" width="100" />
                <button v-if="item.image || base64string" type="button" class="btn btn-danger" @click="deleteImg">Ta bort bild</button>
                <p class="error" v-if="errors['image']">{{ errors['image'] }}</p>
            </div>

        <button type="submit" class="btn btn-primary w-100">Uppdatera vara</button>
</form>
</div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import { authToken } from '@/utils/authToken';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';

    onMounted(() => {
        const checkingToken = async () => { await authToken()
        if(!checkingToken) return

            getItem();
        }
        checkingToken()
    })

    const chosenImage = ref(null)
    const base64string = ref("")

    //Funktion för att hantera fil
    const handleFileChange = (event) => {
    chosenImage.value = event.target.files[0];
    
    //Filereader för att kunna läsa fil
    const reader = new FileReader();
    //gör till en sträng
    reader.readAsDataURL(chosenImage.value);
        //resultatet har strängen
        reader.onload = () => {
            if(typeof reader.result === "string")
            base64string.value = reader.result;
        };
    };

    const deleteImg = () => {
        console.log(chosenImage.value, base64string.value)
        chosenImage.value = ''
        base64string.value = null
        item.value.image = ''
        console.log(chosenImage.value, base64string.value)
    }

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
            const errors = ref({})

        //Uppdatera vara
        const updateItem = async () => {
            let inputs = {
                name: item.value.name,
                description: item.value.description,
                price: item.value.price,
                stock: item.value.stock,
                articleNumber: item.value.articleNumber,
                image: undefined
                }

                if(base64string.value){
                    inputs.image = base64string.value
                }
            console.log(inputs)
            const token = localStorage.getItem('token');
            const id = route.params.id
            console.log(id)
            try {
            const resp = await fetch(`https://backend-projekt-fullstack.onrender.com/items/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ` + token
                },
                body: JSON.stringify(inputs)
            })
            if(resp.status === 413){
                errors.value = {
                    image: 'Filen är för stor, välj en mindre'
                }
                return
            }
            const data = await resp.json()
            if(!resp.ok){
                errors.value = data.errors;
            }
            if(resp.ok) {
                console.log(data);
                console.log("Vara uppdaterad!");
                router.push('/items')
            }
            } catch (error) {
                console.log("Error updating item: " + error)
            }
        }
    
    </script>

<style scoped>
    .error{
        font-weight: 300;
        color: red;
    }
</style>