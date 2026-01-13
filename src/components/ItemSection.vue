<template>
    <tr>
      <th scope="row">item.name</th>
      <td>item.description</td>
      <td>item.price</td>
      <td>item.stock</td>
      <td>item.articleNumber</td>
      <td>item.image</td>
    </tr>
</template>

<script setup>
    const props = defineProps({
        serie: Object
    })
</script>