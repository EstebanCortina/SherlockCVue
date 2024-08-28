<script setup lang="ts">
import HeaderCom from '@/components/Basics/HeaderCom.vue'
import JobCardsContainerCom from '@/components/JobCards/JobCardsContainerCom.vue'
import type { JobPosition } from '@/types/JobPosition'
import { ref, type Ref, onMounted } from 'vue'
import MessageCom from '@/components/Modals/MessageCom.vue'
import FormCom from '@/components/Basics/FormCom.vue'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import GapUtil from '@/components/utils/GapUtil.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//@ts-expect-error
import Vue3TagsInput from 'vue3-tags-input'
import axios from 'axios'
import { useJobPositionProcessStore } from '@/stores/jobPositionProcessStore'

const apiUrl = import.meta.env.VITE_API_URL

let jobPositionsMuck: Ref<JobPosition[]> = ref([])

onMounted(async () => {
  try {
    let response = await axios.get(`${apiUrl}/job-positions`)
    jobPositionsMuck.value = response.data
  } catch (e) {
    //@ts-ignore
    console.error(e.message)
  }
})

const openCreateModal = ref(false)
const openUpdateModal = ref(false)
const openDeleteMessage = ref(false)
let currentModalJobPosition = {} as JobPosition

async function deleteJobPosition(index: number) {
  currentModalJobPosition = jobPositionsMuck.value[index]
  openDeleteMessage.value = true
}

function createJobPosition() {
  currentModalJobPosition = {} as JobPosition
  openCreateModal.value = true
}

function updateJobPosition(index: number = 0) {
  currentModalJobPosition = jobPositionsMuck.value[index]
  openUpdateModal.value = true
}

function updateKeyPoints(tags: string[]) {
  currentModalJobPosition.key_points = tags
}

function closeCreateModal() {
  currentModalJobPosition = {} as JobPosition
  openCreateModal.value = false

}

async function performAction() {
  let axiosInstance
  let jobPositionId = currentModalJobPosition.id ?? null

  if (openUpdateModal.value) {

    delete currentModalJobPosition.id
    delete currentModalJobPosition.user_id
    delete currentModalJobPosition.created_at
    delete currentModalJobPosition.deleted_at

    axiosInstance = axios.put(`${apiUrl}/job-positions/${jobPositionId}`, currentModalJobPosition)

  } else if (openCreateModal.value) {

    axiosInstance = axios.post(`${apiUrl}/job-positions`, currentModalJobPosition)

  } else if (openDeleteMessage.value) {

    axiosInstance = axios.delete(`${apiUrl}/job-positions/${jobPositionId}`)

  }

  try {
    await axiosInstance
    let response = await axios.get(`${apiUrl}/job-positions`)
    jobPositionsMuck.value = response.data
    // considerar apuntar todas estos estados a una sola variable de estado
    // ya que solo puede estar mostrado un modal a la vez.
    openCreateModal.value = false
    openUpdateModal.value = false
    openDeleteMessage.value = false
  } catch (e) {
    //@ts-ignore
    alert(e.message)
  }
}

function selectJobPosition(jobPosition: JobPosition) {
  useJobPositionProcessStore().setProcessData({
    job_position: jobPosition,
    data: null
  })
  router.push({ name: 'CandidatesPool' })
}

</script>

<template>
  <div class="main-container">
    <HeaderCom class="header" />
    <div class="content">

      <div class="container">
        <div style="text-align: center; width: 600px; margin: 0">
          <h1 style="color: var(--secondary-color); font-size:60px">Selecciona o crea tu vacante</h1>
        </div>
        <p style="font-size: 24px; font-weight: 225; margin: 0">Los candidatos serán evaluados para la vacante que
          elijas</p>
      </div>

      <div
        style="display: flex; column-gap: 20px; padding: 50px; flex-wrap: wrap; gap: 20px; justify-content: center">
        <JobCardsContainerCom @select-job-position="selectJobPosition" @edit-modal-open="updateJobPosition"
                              @delete-modal-open="deleteJobPosition"
                              :job-positions="jobPositionsMuck" />
        <div class="new-job-card">
          <img @click="createJobPosition" class="add-icon" style="width: 74px; height: 74px;"
               src="@/assets/plus-circle.svg"
               alt="Añadir vacante" />
        </div>
      </div>
    </div>


  </div>


  <MessageCom :is-open="openCreateModal" @modal-close="openCreateModal=false">
    <template #header>
      <span style="font-size: 5vh; font-weight: 600">Crear nueva vacante</span>
      <svg height="2" width="100%">
        <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
      </svg>
    </template>


    <template #content>
      <FormCom>
        <template #form-fields>
          <GapUtil gap="16px">
            <div class="form-group">
              <label for="jobPositionName">Nombre de la vacante*:</label>
              <input name="jobPositionName" type="text" v-model="currentModalJobPosition.name" required />
            </div>
            <div class="form-group">
              <label for="jobPositionDescription">Descripción general*:</label>
              <textarea name="jobPositionDescription" v-model="currentModalJobPosition.description" required />
            </div>
            <div class="form-group">
              <label for="jobPositionKeyPoints">Lita de puntos clave*:</label>
              <!--                  <input name="jobPositionKeyPoints" type="text" v-model="currentModalJobPosition.key_points" required/>-->
              <Vue3TagsInput :tags="currentModalJobPosition.key_points" @on-tags-changed="updateKeyPoints" />
            </div>
          </GapUtil>
        </template>
      </FormCom>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: space-evenly;">
        <AcceptBtnCom style="font-size: 4vh;" @click="closeCreateModal" :is-default="false">Cancelar
        </AcceptBtnCom>
        <!-- Crear el componente  CanelBtnCom y usarlo aquí !-->
        <AcceptBtnCom style="font-size: 4vh;" @click="performAction" :is-default="false">Crear</AcceptBtnCom>
      </div>
    </template>
  </MessageCom>

  <MessageCom :is-open="openUpdateModal" @modal-close="openUpdateModal=false">
    <template #header>
      <span style="font-size: 5vh; font-weight: 600">Editar vacante</span>
      <svg height="2" width="100%">
        <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
      </svg>
    </template>


    <template #content>
      <FormCom>
        <template #form-fields>
          <GapUtil gap="16px">
            <div class="form-group">
              <label for="jobPositionName">Nombre de la vacante*:</label>
              <input name="jobPositionName" type="text" v-model="currentModalJobPosition.name" required />
            </div>
            <div class="form-group">
              <label for="jobPositionDescription">Descripción general*:</label>
              <textarea name="jobPositionDescription" v-model="currentModalJobPosition.description" required />
            </div>
            <div class="form-group">
              <label for="jobPositionKeyPoints">Lita de puntos clave*:</label>
              <!--                  <input name="jobPositionKeyPoints" type="text" v-model="currentModalJobPosition.key_points" required/>-->
              <Vue3TagsInput :tags="currentModalJobPosition.key_points" @on-tags-changed="updateKeyPoints" />
            </div>
          </GapUtil>
        </template>
      </FormCom>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: space-evenly;">
        <AcceptBtnCom style="font-size: 4vh;" @click="closeCreateModal" :is-default="false">Cancelar
        </AcceptBtnCom>
        <!-- Crear el componente  CanelBtnCom y usarlo aquí !-->
        <AcceptBtnCom style="font-size: 4vh;" @click="performAction" :is-default="false">Aceptar
        </AcceptBtnCom>
      </div>
    </template>
  </MessageCom>

  <MessageCom :is-open="openDeleteMessage" @modal-close="openDeleteMessage=false">

    <template #header>
      <span style="font-size: 5vh; font-weight: 600">Eliminar vacante</span>
      <svg height="2" width="100%">
        <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
      </svg>
    </template>


    <template #content>
      <div style="display: flex; justify-content: center; align-items: center; height: 30vh; font-size: 3vh">
        <p>¿Desea eliminar esta vacante?</p>
      </div>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: space-evenly;">
        <AcceptBtnCom style="font-size: 4vh;" @click="openDeleteMessage=false" :is-default="false">Cancelar
        </AcceptBtnCom>
        <!-- Crear el componente  CanelBtnCom y usarlo aquí !-->
        <AcceptBtnCom style="font-size: 4vh;" @click="performAction" :is-default="false">Eliminar</AcceptBtnCom>
      </div>
    </template>
  </MessageCom>
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
  flex-grow: 1;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.new-job-card {
  color: #828282;
  min-width: 300px;
  min-height: 378px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 20px 30px 30px 30px;

  border-style: dashed;
  border-width: 5px;
  border-color: darkgray;
  border-radius: 10px;

  max-width: 300px;
  max-height: 400px;

}

.add-icon {
  /* HEX Color: #A0A3AB */
  cursor: pointer;
  filter: invert(69%) sepia(1%) saturate(2485%) hue-rotate(205deg) brightness(96%) contrast(80%);
  transition: filter 0.2s ease-in;
}

.new-job-card:hover .add-icon {
  filter: invert(26%) sepia(98%) saturate(348%) hue-rotate(138deg) brightness(95%) contrast(96%);
  transition: filter 0.1s;
}

.divider {
  stroke: var(--details-color);
  stroke-width: 1;
}

.form-group {
  display: flex;
  flex-direction: column
}

</style>
