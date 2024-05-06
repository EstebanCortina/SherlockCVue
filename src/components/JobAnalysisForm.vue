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
  width: calc(100% - 20px);
  height: 200px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
}
#explain-form {
  width: 100%;
  max-width: 80%;
  text-align: center;
}
#analyze-btn{
  width: 100%;
}
@media screen and (min-width: 1200px) {
  #explain-form{
    width: 20%;
  }
}
</style>