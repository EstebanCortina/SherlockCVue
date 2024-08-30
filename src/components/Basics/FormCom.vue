<script setup lang="ts">

import GapUtil from '@/components/utils/GapUtil.vue'

defineProps({
  formTitle: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="container">
    <div class="form-head">
      <p>{{ formTitle }}</p>
    </div>

    <form>
      <div class="form-body">
        <GapUtil gap="16px">
          <slot name="form-fields"></slot>
          <slot name="form-buttons"></slot>
          <slot name="form-footer"></slot>
        </GapUtil>
      </div>
    </form>

  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.form-head {
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.24px;
}

.form-body {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  width: 30vw;
  gap: var(24px);
}
</style>