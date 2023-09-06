<script setup lang="ts">
import axios from 'axios';
const result = ref("not yet");
onMounted(async () => {
  const res = await axios({
    method: "post",
    url: "/api/nested/test1",
    data: {}
  })
  result.value = res.data;
})
</script>

<template>
  <div>
    {{ result }}
  </div>
</template>
