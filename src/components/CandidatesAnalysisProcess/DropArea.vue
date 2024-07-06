<script setup lang="ts">
import { onMounted, ref } from 'vue'
import handleFiles from '@/handlers/handleFiles'

const pdfContainerRef = ref(null)
const dropAreaRef = ref(null)
const docsToSend = ref([])
onMounted(() => {
  document.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer?.files
    if (files && dropAreaRef.value && pdfContainerRef.value) {
      handleFiles(files, pdfContainerRef.value, dropAreaRef.value, docsToSend)
    }
  })
  document.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
})
</script>

<template>
  <div ref="dropAreaRef" id="drop-area">
    <strong><p>Arrastra y suelta archivos PDF</p></strong>
    <div ref="pdfContainerRef" id="pdf-container"></div>
  </div>
</template>

<style scoped>

.row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 25px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

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
    width: 850px;
    height: 400px;
  }
}

</style>