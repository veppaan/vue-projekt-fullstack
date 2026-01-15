<template>
    <tr class="align-middle">
      <th scope="row">{{item.name}}</th>
      <td class="d-none d-md-table-cell"><span class="description">{{item.description}}</span></td>
      <td class="d-none d-md-table-cell">{{item.price}}</td>
      <td><div class="d-flex flex-column flex-md-row gap-2"><input type="number" v-model.number="item.stock" class="form-control form-control-sm" style="min-width: 50px;"> <button type="button" class="btn btn-sm update-btn" :class="isSuccess ? 'btn-success' : 'btn-primary'" @click="$emit('updateStock', item._id, item.stock)">{{isSuccess ? 'Uppdaterat saldo' : 'Uppdatera saldo'}}</button></div></td>
      <td class="text-center">{{item.articleNumber}}</td>
      <td><img v-if="item.image" :src="item.image" class="itemImg" alt="Bild på produkt" width="100" height="100"/><div v-else class="fallbackDivImg"></div></td>
      <td><div class="icons"><RouterLink :to="{ name: 'edit', params: { id: item._id } }"><i class="bi bi-pen"></i></Routerlink><i class="bi bi-trash3-fill" @click="$emit('deleteItem', item._id, item.name)"></i></div></td>
    </tr>
</template>

<script setup>
    const props = defineProps({
        item: Object,
        isSuccess: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits(["deleteItem", "updateStock"]);

</script>

<style scoped>
    /* lägger flex och placering på ikoner */
    .icons{
        display: flex;
        justify-content: center;
        gap: 1em;
    }
    /* ikoner vid hover */
    .icons i:hover{
        cursor: pointer;
    }
    /*fallback-bild om ingen fil är vald*/ 
    .fallbackDivImg{
        min-width: 100px;
        min-height: 100px;
        background-color: lightgray;
    }
    /* inlagd bild får styling */
    .itemImg{
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
    }
    .btn-success, .btn-primary, .update-btn{
        transition: all 0.5s ease;
        width: 88px;
        height: 52px;
    }
    /* Bryter beskrivning när den blir för lång*/
    .description{
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        max-width: 300px;
        word-wrap: break-word;
    }
</style>