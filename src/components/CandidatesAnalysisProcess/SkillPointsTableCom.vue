<script setup lang="ts">

import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import { computed, type Ref, ref } from 'vue'
import type { ScoreItem } from '@/types/ScoreItem'

const props = defineProps({
  scoreList: {
    type: Object,
    required: true
  }
})

const isVisibleAddSkillItem = ref(false)
const newScoreItemName = ref('')
const newScoreItemPoints = ref(0)

const scoreItems = props.scoreList


// const scoreItems: Ref<ScoreItem[]> = ref([
//   // {
//   //   name: 'Experiencia laboral',
//   //   points: 50
//   // },
//   // {
//   //   name: 'Experiencia con Python',
//   //   points: 20
//   // }
// ])

const totalPoints = 100

// Computado que calcula los puntos restantes
const remainingPoints = computed(() => {
  const assignedPoints = Object.values(scoreItems).reduce((sum: number, value: number) => sum + value, 0)
  return totalPoints - assignedPoints
})

function addScoreItem() {
  //Aquí debería invertir el valor de una variable para mostrar u ocultar el componente de añadir
  let newScoreItem: ScoreItem = {
    [newScoreItemName.value]: newScoreItemPoints.value
  }

  if (newScoreItemPoints.value > 0 && newScoreItemName.value !== '') {
    Object.assign(scoreItems, newScoreItem)
    isVisibleAddSkillItem.value = !isVisibleAddSkillItem.value
  }
}

function cancelScoreItem() {
  newScoreItemName.value = ''
  newScoreItemPoints.value = 0
  isVisibleAddSkillItem.value = false
}

function openNewScoreItem() {
  newScoreItemName.value = ''
  newScoreItemPoints.value = remainingPoints.value
  isVisibleAddSkillItem.value = true
}


</script>

<template>
  <div class="skill-table">
  <span style="font-size: 32px;">
    <b style="color: var(--primary-color); font-size: 2dvw">Puntaje</b>
  </span>

    <div class="score-list">
      <div class="score-frame">

        <div v-for="([name, value], index) of Object.entries(scoreItems)" :key="index">
          <div class="score-item">
            <span>{{ name }}</span>
            <span>{{ value }} pts</span>
          </div>
          <svg height="2" width="100%">
            <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
          </svg>
        </div>

        <div v-if="isVisibleAddSkillItem" class="score-item">
          <span>
<!--            <label>Característica a evaluar:</label>-->
            <input required type="text" v-model="newScoreItemName" />
          </span>
          <span>
<!--            <label>Valor:</label>-->
            <input :placeholder="remainingPoints.toString()" type="number" v-model="newScoreItemPoints" /> pts
          </span>
        </div>

        <img v-if="!isVisibleAddSkillItem" @click="openNewScoreItem" class="add-icon"
             style="width: 6dvw; height: 6dvh; margin-top: 20px"
             src="@/assets/plus-circle.svg"
             alt="Añadir criterio" title="Añadir criterio" />

        <div v-else style="display: flex; justify-content: space-evenly; margin-top: 20px">

          <img class="add-icon" @click="cancelScoreItem" style="width: 3dvw; height: 6dvh"
               src="@/assets/cancel-icon.png" alt="Aceptar" title="Aceptar" />

          <img class="add-icon" @click="addScoreItem" style="width: 3dvw; height: 6dvh"
               src="@/assets/check-icon.png" alt="Aceptar" title="Aceptar" />
        </div>
      </div>
      <!--      <AcceptBtnCom style="width: 80%; font-size: 18px" :is-default="true">Iniciar análisis</AcceptBtnCom>-->
    </div>

  </div>
</template>

<style scoped>

.divider {
  stroke: #828282;
  stroke-width: 2;
}

.skill-table {
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.score-list {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.score-frame {
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  border-color: #828282;
  padding: 30px;
  margin: 30px 30px 50px 30px;

  text-align: center;

}

.score-item {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}

li {
  list-style-type: none;
}

.add-icon {
  cursor: pointer;
}

</style>