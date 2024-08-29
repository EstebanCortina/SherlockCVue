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

onMounted(async () => {
  try {
    let response = await axios.get(`${apiUrl}/reports/${jobPositionId}`)
    console.log(response.data)
    reportId.value = response.data.id
    analysis.value = response.data.final_analysis
  } catch (e) {
    //@ts-ignore
    console.error(e.message)
  }
})

async function chooseCandidate(candidate, index){
  selectedCard.value = index
  candidate.is_selected = true;
  analysis.value[index] = candidate
  console.log(analysis.value)
  try {
    console.log(reportId)
    let response = await axios.put(`${apiUrl}/reports/${reportId.value}`, {
      final_analysis: analysis.value
    })
    console.log(response.data)
  }catch (e) {
    console.error(e)
  }
}


</script>

<template>
  <div class="main-container">
    <HeaderCom />
    <div style="display: flex; justify-content: center;">
      <div style="display: flex; flex-direction: column; align-items: center; width: 70%">
        <span style="margin: 20px; color: var(--primary-color); font-size: 24px"><b>Reporte de resultados:</b></span>
        <AcceptBtnCom style="width: 15%" @click="router.push({name: 'Vacants'})" :is-default="true">
          Analizar otra vacante
        </AcceptBtnCom>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <AcceptBtnCom style="width: 100%; height: 50%; margin: 0" @click="router.push({name: 'Vacants'})" :is-default="true">
          Finalizar vacante
        </AcceptBtnCom>
      </div>
    </div>

    <div class="content">

      <div @click="chooseCandidate(item, index)" :class="['candidate-item', {'candidate-item-selected': selectedCard === index || item.is_selected}]"
           v-for="(item, index) in analysis" :key="index"
           style="display: flex; align-items: center; justify-content: space-evenly; max-width: 1100px; margin: 10px" title="Elegir candidato...">

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
          <span style="font-style: italic">{{item.file_name}}</span>
        </div>

      </div>
    </div>
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
  width: 100vh;
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
  width: 100vh;
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


</style>