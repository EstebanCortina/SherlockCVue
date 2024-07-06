<script setup lang="ts">
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'

function startAnalysis() {
  alert('analysis')
}

</script>

<template>
  <div id="explain-form">
    <textarea id="job-description-area"></textarea>
    <AcceptBtnCom @click="startAnalysis" id="analyze-btn">Analizar</AcceptBtnCom>
  </div>
</template>

<style scoped>

#analyze-btn {
  width: 100%;
}

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

@media screen and (min-width: 1200px) {
  #explain-form {
    width: 20%;
  }
}
</style>