<script setup lang="ts">
import HeaderCom from '@/components/Basics/HeaderCom.vue'
import { useRoute } from 'vue-router'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import router from '@/router'
import { onMounted, type Ref, ref } from 'vue'
import axios from 'axios'
import type { FinalAnalysis } from '@/types/FinalAnalysis'

const route = useRoute()
const jobPositionId = route.params.id

const apiUrl = import.meta.env.VITE_API_URL

const analysis: Ref<FinalAnalysis[]> = ref([])
const reportId = ref(null)

const selectedCard = ref(null)
const isClosed = ref(false)
const isLoading = ref(false)

onMounted(async () => {
  try {
    axios.get(`${apiUrl}/job-positions/${route.params.id}`).then(async (firstResponse) => {
      if (!firstResponse.data.job_position_is_open) {
        isClosed.value = true
      }
      let response = await axios.get(`${apiUrl}/reports/${jobPositionId}`)
      reportId.value = response.data.id
      analysis.value = response.data.final_analysis
    })
  } catch (e) {
    //@ts-ignore
    console.error(e.message)
  }
})

function chooseCandidate(candidate: FinalAnalysis, index: number) {

  if (isClosed.value) {
    return
  }


  if ((selectedCard.value === null) || (selectedCard.value !== index)) {
    //@ts-ignore
    selectedCard.value = index
    candidate.is_selected = true
    analysis.value[index] = candidate
  } else if (selectedCard.value === index) {
    //@ts-ignore
    selectedCard.value = null
    delete candidate.is_selected
    analysis.value[index] = candidate
  }
}

function endCAP() {
  isLoading.value = true
  setTimeout(async () => {
    try {
      await axios.put(`${apiUrl}/reports/${reportId.value}`, {
        final_analysis: JSON.stringify(analysis.value)
      })
      await axios.patch(`${apiUrl}/job-positions/toggle-status/${route.params.id}`)
      window.location.reload()
    } catch (e: any) {
      isLoading.value = false
      console.error(e.message)
    }
  }, 4000)

}


</script>

<template>
  <div class="main-container">
    <HeaderCom />
    <div style="display: flex; justify-content: center;">
      <div style="display: flex; flex-direction: column; align-items: center; width: 70%">
        <span style="margin: 10px; color: var(--primary-color); font-size: 24px"><b>Reporte de resultados:</b></span>
        <AcceptBtnCom style="width: 15%" @click="router.push({name: 'Vacants'})" :is-default="true">
          Analizar otra vacante
        </AcceptBtnCom>
      </div>
      <div v-if="selectedCard !== null" style="display: flex; justify-content: center; align-items: center">
        <AcceptBtnCom style="width: 100%; height: 50%; margin: 0" @click="endCAP"
                      :is-default="true">
          Finalizar vacante
        </AcceptBtnCom>
      </div>
    </div>

    <div class="content">
      <div @click="chooseCandidate(item, index)"
           :class="['candidate-item', {'candidate-item-selected': (selectedCard === index) || item?.is_selected === true}]"
           v-for="(item, index) in analysis" :key="index"
           style="display: flex; align-items: center; justify-content: space-evenly; max-width: 1100px; margin: 10px"
           title="Elegir candidato...">

        <div class="candidate-info" style="width: 500px; margin: 20px">

          <div class="candidate-item-header"
               style="display: flex; justify-content: space-between; align-items: baseline">
            <span class="primary-color" style="font-size: 24px"><b>{{ item.candidate_name }}</b></span>
            <span
              style="color: var(--primary-color); font-size: 24px; background-color: antiquewhite; padding: 10px; border-radius: 15%">{{ item.candidate_overall
              }}</span>
          </div>

          <p style="text-align: justify;">{{ item.candidate_resume }}</p>

          <span>Fortalezas:</span>
          <ul class="list-container">
            <li v-for="(strength, i) in item.candidate_strengths" :key="i"
                style="text-align: left; text-overflow: fade;">
              {{ strength }}
            </li>
          </ul>

          <span>Debilidades:</span>
          <ul class="list-container">
            <li v-for="(weakness, i) in item.candidate_weaknesses" :key="i"
                style="text-align: left; text-overflow: fade;">
              {{ weakness }}
            </li>
          </ul>

        </div>

        <div style="display: flex; flex-direction: column; align-items: center; margin: 20px">
          <img style="width: 240px; height: 340px;" :src="item.front_page_url">
          <span style="font-style: italic">{{ item.file_name }}</span>
        </div>

      </div>
    </div>
  </div>
  <div v-if="isLoading" class="loading-screen">
    <iframe style="border-style: none; width: 100%; height: 30%"
            src="https://lottie.host/embed/a1b8b497-0171-45fb-b8ed-0109bc89450f/F6Mcq3cKfy.json"></iframe>
    <span><b>Finalizando vacante...</b></span>
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

.list-container {
  margin: 5px;
}

.primary-color {
  color: var(--primary-color);
}

.candidate-item {
  width: 70%;
  cursor: pointer;
  border-radius: 2%;
  box-shadow: 0 0 10px rgba(130, 130, 130, 0.88);
  transition: background-color 0.2s ease-in;
}

.candidate-info {
  transition: background-color 0.2s ease-in;
}

.candidate-item:hover {

  background-color: var(--secondary-color);
  color: var(--details-color);

  .primary-color {
    color: var(--details-color);
    transition: background-color 0.2s ease-in;
  }

}

.candidate-item-selected {
  width: 70%;
  cursor: pointer;
  border-radius: 2%;
  box-shadow: 0 0 10px rgba(130, 130, 130, 0.88);
  background-color: var(--secondary-color);
  color: var(--details-color);

  .primary-color {
    color: var(--details-color);
    transition: background-color 0.2s ease-in;
  }
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