<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  isDefault: {
    type: Boolean,
    required: true
  }
})
const isDefault = ref(props.isDefault)
</script>

<template>
  <button :class="{'default-accept-btn': isDefault, 'inverted-accept-btn': !isDefault}" type="button">
    <slot>Aceptar</slot>
  </button>
</template>

<style scoped>

.default-accept-btn {
  color: var(--details-color);
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: var(--secondary-color);
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.inverted-accept-btn {
  color: var(--details-color);
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: var(--primary-color);
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.default-accept-btn:hover {
  background-color: var(--primary-color);
  color: var(--details-color);
  box-shadow: 0 0 20px #d5d4ab;
}

.inverted-accept-btn:hover {
  color: var(--details-color);
  box-shadow: 0 0 20px #d5d4ab;
}

</style>