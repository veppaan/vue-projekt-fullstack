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
                <input type="file" @change="handleFileChange" class="form-control" id="image">
                <img v-if="base64string" :src="base64string" alt="preview" width="100" />
            </div>
            
            <button type="submit" class="btn btn-primary">Lägg till vara</button>
            </form>
    </template>

<script setup lang="ts">
    import Header from '@/components/Header.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

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

    const nameInput = ref('');
    const descriptionInput = ref('');
    const priceInput = ref('');
    const stockInput = ref('');
    const articleNumberInput = ref('');
    const imageInput = ref();
    const error = ref('');


    const addItem = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if(base64string.value){
                const inputs = {
                name: nameInput.value,
                description: descriptionInput.value,
                price: priceInput.value,
                stock: stockInput.value,
                articleNumber: articleNumberInput.value,
                image: base64string.value
                }
            } else {
                const inputs = {
                name: nameInput.value,
                description: descriptionInput.value,
                price: priceInput.value,
                stock: stockInput.value,
                articleNumber: articleNumberInput.value
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
    }

</script>