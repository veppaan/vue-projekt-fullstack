<template>
    <tr>
      <th scope="row">{{item.name}}</th>
      <td>{{item.description}}</td>
      <td>{{item.price}}</td>
      <td class="w-auto text-nowrap"><div class="d-flex align-items-center gap-2" style="width: 25ch;"><input type="number" v-model.number="item.stock" class="form-control form-control-sm w-25"> <button type="button" class="btn btn-primary btn-sm">Uppdatera saldo</button></div></td>
      <td>{{item.articleNumber}}</td>
      <td>{{item.image}}</td>
      <td><i class="bi bi-pen"></i><i class="bi bi-trash3-fill"></i></td>
    </tr>
</template>

<script setup>
    const props = defineProps({
        item: Object
    })
</script>