<script setup lang="ts">

</script>

<template>
  <div class="header-container">
    <h1><slot>SherlockCV</slot></h1>
  </div>
</template>

<style scoped>
.header-container{
  color: var(--primary-color);
  font-style: italic;
  text-align: center;
  align-content: center;
  padding: 0;
  margin: 0;
  float: left;
}
</style>