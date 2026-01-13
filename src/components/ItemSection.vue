<template>
    <tr>
      <th scope="row">{{item.name}}</th>
      <td>{{item.description}}</td>
      <td>{{item.price}}</td>
      <td class="w-auto text-nowrap"><div class="d-flex align-items-center gap-2" style="width: 25ch;"><input type="number" v-model.number="item.stock" class="form-control form-control-sm w-25"> <button type="button" class="btn btn-primary btn-sm" @click="$emit('updateStock', item._id, item.stock)">Uppdatera saldo</button></div></td>
      <td>{{item.articleNumber}}</td>
      <td>{{item.image}}</td>
      <td><div class="icons"><RouterLink :to="{ name: 'edit', params: { id: item._id } }"><i class="bi bi-pen"></i></Routerlink><i class="bi bi-trash3-fill" @click="$emit('deleteItem', item._id, item.name)"></i></div></td>
    </tr>
</template>

<script setup>
    const props = defineProps({
        item: Object
    })

    const emits = defineEmits(["deleteItem", "updateStock"]);

</script>

<style scoped>
    .icons{
        display: flex;
        justify-content: center;
        gap: 1em;
    }
    .icons i:hover{
        cursor: pointer;
    }
</style>