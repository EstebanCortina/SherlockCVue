<script setup lang="ts">

</script>

<template>
  <div id="explain-form">
    <textarea id="job-description-area"></textarea>
    <button class="accept-btn" id="analyze-btn">Analizar</button>
  </div>
</template>

<style scoped>
#job-description-area {
  width: calc(100% - 20px); /* Cambiado */
  height: 200px;
  border: 1px solid #50727b;
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
}
#explain-form {
  width: 100%; /* Cambiado */
  text-align: center;
}
@media screen and (min-width: 1200px) {
  #explain-form {
    width: calc(100% - 850px - 20px);
  }
}
</style>