<script setup lang="ts">
import { reactive } from 'vue'
import type { CSSProperties } from 'vue'

const props = defineProps({
  gap: {
    type: String,
    required: true
  }
})

const obj: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: props.gap
}
const gapStyle = reactive(obj)
</script>

<template>
  <div :style="gapStyle">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>