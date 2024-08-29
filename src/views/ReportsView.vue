<script setup lang="ts">
import HeaderCom from '@/components/Basics/HeaderCom.vue'
</script>

<template>
  <div class="main-container">
    <HeaderCom />
    <div>
      <span style="color: var(--primary-color); font-size: 64px">Reporte de resultados:</span>
    </div>

    <div class="content">

    </div>
  </div>
</template>

<style scoped>
.main-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>