<script setup lang="ts">
import CandidatesPoolCom from '@/components/CandidatesAnalysisProcess/CandidatesPoolCom.vue'
import HeaderCom from '@/components/Basics/HeaderCom.vue'

</script>

<template>
  <div class="main-body">
    <HeaderCom />
    <CandidatesPoolCom />
  </div>
</template>

<style scoped>

.main-body {
  color: var(--secondary-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
