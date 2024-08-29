<script setup lang="ts">

import HeaderCom from '@/components/Basics/HeaderCom.vue'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import router from '@/router'
</script>

<template>
  <div class="main-container">
    <HeaderCom />
    <div class="content">
      <p style="color: var(--primary-color); font-size: 64px;"><b>Sorry Watson... 404 :(</b></p>
      <AcceptBtnCom @click="router.back()" :is-default="true" style="width: 20%; height: 10%; font-size: 20px">
        Regresar
      </AcceptBtnCom>
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
}
</style>