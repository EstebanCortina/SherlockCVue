<script setup lang="ts">

</script>

<template>
  <div id="drop-area">
    <strong><p>Arrastra y suelta archivos PDF</p></strong>
    <div id="pdf-container"></div>
  </div>
</template>

<style scoped>
#drop-area {
  background-color: var(--secondary-color);
  color: var(--details-color);
  width: 100%;
  max-width: 850px;
  height: 400px;
  border: 4px dashed #fbfada;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.466);
  margin: 20px;
}
#pdf-container {
  max-width: 100%;
  max-height: 80%;
}
@media screen and (min-width: 1200px) {
    #drop-area {
      width: 850px; /* Cambiado */
      height: 400px;
    }
}

</style>