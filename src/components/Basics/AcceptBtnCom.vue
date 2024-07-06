<script setup lang="ts">

</script>

<template>
  <button id="accept-btn">
    <slot>Aceptar</slot>
  </button>
</template>

<style scoped>

button {
  color: var(--details-color);
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: var(--secondary-color);
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: var(--primary-color);
  color: var(--details-color);
  box-shadow: 0 0 20px #d5d4ab;
}
</style>