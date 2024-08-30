<script setup lang="ts">
import { computed, type PropType } from 'vue'
import router from '@/router'
import type { JobPosition } from '@/types/JobPosition'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'


const props = defineProps({
  jobPositions: {
    type: Array as PropType<JobPosition[]>,
    required: true
  }
})

const availableJobPositions = computed(() => {
  return props.jobPositions.filter((position) => !position.job_position_deleted_at)
})

const emit = defineEmits(['select-job-position', 'delete-modal-open', 'edit-modal-open', 'modal-close'])

</script>

<template>

  <div class="job-card" v-for="(jobPosition, index) in availableJobPositions" :key="index">

    <div style="width: 100%; display: flex; flex-flow: row-reverse; align-items: center; gap: 10px">
      <img title="Eliminar vacante" @click="emit('delete-modal-open', index)" class="icon delete-icon"
           src="@/assets/close-icon.svg"
           alt="close icon" />
      <img title="Editar vacante" @click="emit('edit-modal-open', index)" class="icon edit-icon"
           src="@/assets/pencil-icon.svg"
           alt="close icon" />
    </div>


    <p class="primary-color" v-if="jobPosition.job_position_is_open">Abierta</p>
    <p class="primary-color" v-else>Cerrada</p>

    <p class="secondary-color"
       style="font-size: 30px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0">
      <b>{{ jobPosition.job_position_name }}</b>
    </p>

    <ul class="key_points-container">
      <li v-for="(keyPoint, i) in jobPosition.job_position_key_points" :key="i"
          style="text-align: left; text-overflow: fade;">
        {{ keyPoint }}
      </li>
    </ul>

    <br>

    <div style="display: flex; gap: 5px">
      <div v-if="jobPosition.job_position_is_open" class="job-card-btn-container">
        <AcceptBtnCom class="btn-class" @click="emit('select-job-position', jobPosition)" :is-default="true">
          Seleccionar
        </AcceptBtnCom>
      </div>
      <div v-if="jobPosition.report_final_analysis" class="job-card-btn-container">
        <AcceptBtnCom @click="router.push({name: 'Reports', params: { id: jobPosition.job_position_id }})" class="btn-class" :is-default="true">Ver reporte</AcceptBtnCom>
      </div>
    </div>


  </div>


</template>

<style scoped>

.job-card {


  padding: 20px 30px 30px 30px;
  border-style: solid;
  border-width: 2px;
  border-color: darkgray;
  border-radius: 10px;
  width: 300px;
  height: 400px;
  box-shadow: 0 0 10px rgba(130, 130, 130, 0.88);

  transition: background-color 0.3s, color 0.2s, box-shadow 0.2s
}

.key_points-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 171px;
  overflow: auto;
}


.key_points-container::-webkit-scrollbar {
  width: 10px;
}

.key_points-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.key_points-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f0f0f0;
}

.key_points-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}


.job-card-btn-container {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center
}


.icon {
  cursor: pointer;
}

.edit-icon {
  cursor: pointer;
  width: 35px;
  height: 35px;
  float: right;

  transition: filter 0.2s ease-in;

}

.delete-icon {
  cursor: pointer;
  width: 25px;
  height: 25px;
  float: right;

  transition: filter 0.2s ease-in;
}


.job-card:hover {
  background-color: var(--secondary-color);
  color: var(--details-color);
  box-shadow: 0 0 30px #dad77c;;
}

.job-card:hover .primary-color {
  color: var(--details-color);
}

.job-card:hover .secondary-color {
  color: var(--details-color);
}

.job-card:hover .btn-class {
  box-shadow: 0 0 20px #d5d4ab;
}

.job-card:hover .icon {
  filter: invert(99%) sepia(3%) saturate(1962%) hue-rotate(334deg) brightness(103%) contrast(97%);
}

.job-card:hover .delete-icon:hover {
  /* HEX Color: #F33D3D */
  filter: invert(48%) sepia(60%) saturate(4247%) hue-rotate(334deg) brightness(98%) contrast(110%);

}

.job-card:hover .edit-icon:hover {
  /* HEX Color: #3D64F3 */
  filter: invert(32%) sepia(46%) saturate(3725%) hue-rotate(220deg) brightness(99%) contrast(93%);

}

.btn-class {
  font-size: large;
  width: 100%;
  height: 50px
}

.primary-color {
  color: var(--primary-color)
}

.secondary-color {
  color: var(--secondary-color)
}

</style>