<script setup lang="ts">
import DropArea from '@/components/CandidatesAnalysisProcess/DropArea.vue'
import JobAnalysisForm from '@/components/CandidatesAnalysisProcess/JobAnalysisForm.vue'

</script>

<template>
  <section id="first">
    <DropArea></DropArea>
  </section>
</template>

<style scoped>
#first {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media screen and (min-width: 1200px) {
  #first {
    flex-direction: row;
  }
}

</style>
