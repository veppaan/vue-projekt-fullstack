    <template>
        <Header />
        <div class="container">
        <form @submit.prevent="addItem" style="max-width: 800px; margin: 0 auto;">
            <h2 class="mt-1 fw-normal">Lägg till produkt</h2>
            <div class="form-group mt-3">
                <label for="name">Namn</label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Skriv namnet på varan" v-model="nameInput">
                <p class="error" v-if="errors['name']">{{ errors['name'] }}</p>
            </div>
            <div class="form-group">
            <label for="description">Beskrivning</label>
            <textarea rows="5" class="form-control" id="description" aria-describedby="description" placeholder="Skriv beskrivning" v-model="descriptionInput"></textarea>
            <p class="error" v-if="errors['description']">{{ errors['description'] }}</p>
        </div>
            <div class="form-group">
                <label for="price">Pris</label>
                <input type="number" class="form-control" min="1" id="price" aria-describedby="emailHelp" placeholder="Pris på varan" v-model.number="priceInput">
                <p class="error" v-if="errors['price']">{{ errors['price'] }}</p>
            </div>
            <div class="form-group">
                <label for="stock">Lagersaldo</label>
                <input type="number" class="form-control" min="0" id="stock" aria-describedby="emailHelp" placeholder="Saldo på lager" v-model.number="stockInput">
                <p class="error" v-if="errors['stock']">{{ errors['stock'] }}</p>
            </div>
            <div class="form-group">
                <label for="articlenumber">Artikelnummer</label>
                <input type="number" class="form-control" min="1" id="articlenumber" placeholder="Artikelnummer" v-model.number="articleNumberInput">
                <p class="error" v-if="errors['articleNumber']">{{ errors['articleNumber'] }}</p>
            </div>
            <div class="form-group">
                <label for="image">Bild</label>
                <input type="file" @change="handleFileChange" class="form-control" id="image">
                <img v-if="base64string" :src="base64string" alt="preview" width="100" />
                <button v-if="base64string" type="button" class="btn btn-danger m-3" @click="deleteImg">Ta bort bild</button>
                <p class="error" v-if="errors['image']">{{ errors['image'] }}</p>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 mt-3 mb-7">Lägg till vara</button>
            </form>
        </div>
    </template>

<script setup lang="ts">
    import Header from '@/components/Header.vue';
    import { authToken } from '@/utils/authToken';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { onMounted } from 'vue';

    onMounted(() => {
        const checkingToken = async () => { await authToken()
        if(!checkingToken) return
        }
        checkingToken()
    })

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

    const deleteImg = () => {
        console.log(chosenImage.value, base64string.value)
        chosenImage.value = ''
        base64string.value = null
        console.log(chosenImage.value, base64string.value)
    }

    const nameInput = ref('');
    const descriptionInput = ref('');
    const priceInput = ref('');
    const stockInput = ref('');
    const articleNumberInput = ref('');
    const errors = ref({});


    const addItem = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

                let inputs = {
                name: nameInput.value,
                description: descriptionInput.value,
                price: priceInput.value,
                stock: stockInput.value,
                articleNumber: articleNumberInput.value,
                image: undefined
                }

                if(base64string.value){
                    inputs.image = base64string.value
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
            if(res.status === 413){
                errors.value = {
                    image: 'Filen är för stor, välj en mindre'
                }
                return
            }
            const data = await res.json()
            if(!res.ok){
                console.log(data)
                errors.value = data.errors;
            }
            if(res.ok){
                console.log("Vara tillagd!");
                router.push('/items')
            }
            } catch (error) {
                console.log("Error adding item: " + error)
            }
        }

</script>

<style scoped>
    .error{
        font-weight: 300;
        color: red;
    }
</style>