<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
  modalData: null,
})

const emit = defineEmits(['modal-close'])

const target = ref(null)

onClickOutside(target, () => {
  emit('modal-close')
})

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> default header</slot>
        </div>
        <div class="modal-body">
          <slot name="content"> default content</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.modal-header {
  margin: 0;
  text-align: center;
}

.modal-body {
  margin: 0;
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  color: var(--details-color);
  background-color: var(--secondary-color);

  max-width: 40vw;
  margin: 150px auto;
  padding: 20px 30px;

  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  transition: ease;
}

</style>