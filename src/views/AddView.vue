    <template>
        <Header />
        <form @submit.prevent="addItem">
            <h2>Lägg till produkt</h2>
            <div class="form-group">
                <label for="name">Namn</label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Skriv namnet på varan" v-model="nameInput">
            </div>
            <div class="form-group">
                <label for="description">Beskrivning</label>
                <input type="textarea" class="form-control" id="dec" aria-describedby="emailHelp" placeholder="Skriv beskrivning" v-model="descriptionInput">
            </div>
            <div class="form-group">
                <label for="price">Pris</label>
                <input type="number" class="form-control" id="price" aria-describedby="emailHelp" placeholder="Pris på varan" v-model.number="priceInput">
            </div>
            <div class="form-group">
                <label for="stock">Lagersaldo</label>
                <input type="number" class="form-control" id="stock" aria-describedby="emailHelp" placeholder="Saldo på lager" v-model.number="stockInput">
            </div>
            <div class="form-group">
                <label for="articlenumber">Artikelnummer</label>
                <input type="text" class="form-control" id="articlenumber" placeholder="Artikelnummer" v-model.number="articleNumberInput">
            </div>
            <div class="form-group">
                <label for="image">Bild</label>
                <input type="text" class="form-control" id="image" v-model="imageInput">
            </div>
            
            <button type="submit" class="btn btn-primary">Lägg till vara</button>
            </form>
    </template>

<script setup lang="ts">
    import Header from '@/components/Header.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const nameInput = ref('');
    const descriptionInput = ref('');
    const priceInput = ref('');
    const stockInput = ref('');
    const articleNumberInput = ref('');
    const imageInput = ref('');
    const error = ref('');


    const addItem = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            const inputs = {
                name: nameInput.value,
                description: descriptionInput.value,
                price: priceInput.value,
                stock: stockInput.value,
                articleNumber: articleNumberInput.value,
                image: imageInput.value
            }
            try {
                console.log(inputs)
            const res = await fetch("https://backend-projekt-fullstack.onrender.com/items", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ` + token
                },
                body: JSON.stringify(inputs)
            })
            if(res.ok){
                console.log("test")
                const data = await res.json();
                console.log("Vara tillagd!");
                router.push('/items')
            }
            } catch (error) {
                console.log("Error adding item: " + error)
            }
        }

</script>