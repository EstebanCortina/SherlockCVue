<script setup lang="ts">
import CandidatesPoolCom from '@/components/CandidatesAnalysisProcess/CandidatesPoolCom.vue'
import HeaderCom from '@/components/Basics/HeaderCom.vue'
import { useJobPositionProcessStore } from '@/stores/jobPositionProcessStore'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import type { JobPosition } from '@/types/JobPosition'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import SkillPointsTableCom from '@/components/CandidatesAnalysisProcess/SkillPointsTableCom.vue'
import router from '@/router'
import axios from 'axios'
import type { CAP } from '@/types/CAP'

const apiUrl = import.meta.env.VITE_API_URL

let currentProcess: any
let currentJobPosition: JobPosition
let newCAP: CAP = {} as CAP
const scoreList = ref({})
const jobPositionFiles = ref([])

const isLoadingFiles = ref(false)
// let currentJobPosition = {
//   'id': '5110f768-5823-11ef-a067-4e482286164d',
//   'user_id': '9becfb0d-3963-11ef-a067-4e482286164d',
//   'name': 'Backend Developer',
//   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
//   'key_points': [
//     'aws',
//     'python',
//     'terraform',
//     'git',
//     'gitlab',
//     'ingles',
//     'javascript',
//     'serverless'
//   ],
//   'is_open': 1,
//   'created_at': '2024-08-12T02:50:17.000Z',
//   'deleted_at': null
// }

onBeforeMount(() => {
  currentProcess = useJobPositionProcessStore().processData

  if (!currentProcess) {
    const router = useRouter()
    router.back()
  } else {
    currentJobPosition = currentProcess.job_position
    console.log(currentJobPosition)
  }
})

async function startAnalysis() {

  const formData = new FormData()

  for (let i = 0; i < jobPositionFiles.value.length; i++) {
    const file = jobPositionFiles.value[i]
    formData.append('candidates_files', file)
  }

  newCAP.job_position_id = currentJobPosition.job_position_id
  newCAP.job_position_name = currentJobPosition.job_position_name
  newCAP.job_position_description = currentJobPosition.job_position_description
  newCAP.score_list = scoreList.value
  formData.append('data', JSON.stringify(newCAP))

  try {
    isLoadingFiles.value = true
    let response = await axios.post(`${apiUrl}/start-analysis`, formData)
    await router.push({ name: 'Reports', params: { id: response.data.job_position_id } })
  } catch (e: any) {
    isLoadingFiles.value = false
    console.error(e.message)
  }

}

</script>

<template>
  <div class="main-container">
    <HeaderCom />


    <div
      style="display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 4px rgba(83, 82, 82, 0.46); ">

      <AcceptBtnCom @click="router.back()"
                    style="margin: 0 50px 0 50px; height: 50%; width: 10%; font-size: 18px" :is-cancel="true">Cancelar
      </AcceptBtnCom>

      <div style="margin: 20px; width: 800px; text-align: center;">
        <p
          style="color: var(--primary-color); font-size: 64px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">
          <b>{{ currentJobPosition?.job_position_name }}</b>
        </p>
      </div>

      <AcceptBtnCom @click="startAnalysis" style="margin: 0 50px 0 50px; height: 50%; width: 10%; font-size: 18px"
                    :is-default="true">
        Iniciar análisis
      </AcceptBtnCom>
    </div>

    <div class="content">

      <!--      <span style="color: var(&#45;&#45;primary-color); margin: 3dvh; font-size: 3dvw">-->
      <!--        <b>{{ currentJobPosition?.name }}</b>-->
      <!--      </span>-->

      <div style="display: flex; column-gap: 10dvh; align-items: center;">
        <CandidatesPoolCom :files="jobPositionFiles" />

        <div class="job_description">

          <span style="color: var(--primary-color); margin: 0; font-size: 2dvw">
            Descripción:
          </span>

          <div style="overflow: auto; color: #828282; padding: 5%; margin-bottom: 10px;">
            <p style="text-align: justify; margin: 0">{{ currentJobPosition?.job_position_description }}</p>
            <ul class="key_points-container">
              <li v-for="(keyPoint, i) in currentJobPosition?.job_position_key_points" :key="i"
                  style="text-align: left; text-overflow: fade;">
                {{ keyPoint }}
              </li>
            </ul>
          </div>

          <!--          <AcceptBtnCom style="width: 60%" :is-cancel="true">Seleccionar otra vacante</AcceptBtnCom>-->
        </div>
      </div>
      <div style="width: 90%; margin: 50px">
        <svg height="2" width="100%">
          <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
        </svg>
      </div>
      <SkillPointsTableCom :score-list="scoreList" />
    </div>
  </div>

  <div v-if="isLoadingFiles" class="loading-screen">
    <iframe style="border-style: none; width: 100%; height: 30%"
            src="https://lottie.host/embed/312d2bcc-ae73-4658-a514-931dd0f251c1/UzfRCHYMFX.json"></iframe>
    <span><b>Analizando CVs...</b></span>
  </div>


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
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
}

.key_points-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 171px;

}

.job_description {
  height: 60dvh;
  width: 25dvw;
  max-height: 70dvh;
  max-width: 35dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.divider {
  stroke: rgba(130, 130, 130, 0.57);
  stroke-width: 5;
}

.loading-screen {
  font-size: 24px;
  color: var(--primary-color);
  position: fixed; /* Fija el overlay respecto al viewport */
  top: 0;
  left: 0;
  width: 100%; /* Cubre todo el ancho de la pantalla */
  height: 100%; /* Cubre todo el alto de la pantalla */
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

</style>
