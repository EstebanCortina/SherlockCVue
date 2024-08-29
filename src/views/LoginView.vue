<script setup lang="ts">
import axios from 'axios'
import FormCom from '@/components/Basics/FormCom.vue'
import AcceptBtnCom from '@/components/Basics/AcceptBtnCom.vue'
import GapUtil from '@/components/utils/GapUtil.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const apiUrl = import.meta.env.VITE_API_URL
const email = ref('')
const password = ref('')

function login() {
  axios.post(`${apiUrl}/login`,
    {
      'email': email.value,
      'password': password.value
    }).then(response => {
    localStorage.setItem('authToken', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    router.push({ name: 'Vacants' })
  })
    .catch(error => {
      console.log(error.response.data.message)
    })
}

function goToSignup() {
  router.push({ name: 'Signup' })
}

</script>

<template>
  <div class="main-body">
    <div class="overlay">
      <FormCom form-title="Iniciar sesión">
        <template #form-fields>
          <GapUtil gap="16px">
            <div class="form-group">
              <label for="email">Correo:</label>
              <input name="email" type="email" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">Contraseña:</label>
              <input name="password" type="password" v-model="password" />
            </div>
          </GapUtil>
        </template>

        <template #form-buttons>
          <GapUtil gap="16px">
            <AcceptBtnCom @click="login" :is-inverted="true">Login</AcceptBtnCom>
            <AcceptBtnCom @click="goToSignup" :is-inverted="true">Crear cuenta</AcceptBtnCom>
          </GapUtil>
        </template>

        <template #form-footer>
          <GapUtil gap="2px">
            <svg height="2" width="100%">
              <line class="divider" x1="0" y1="0" x2="100%" y2="0" />
            </svg>
            <p style="font-weight: 300; line-height: 150%; text-align: center; color: #828282">
              Al crear una cuenta, aceptas nuestros
              <b style="color: var(--details-color); font-weight: 300">Términos de Servicio</b>
              y la <b style="color: var(--details-color); font-weight: 300">Política de Privacidad</b>
            </p>
          </GapUtil>
        </template>
      </FormCom>
    </div>
  </div>

</template>

<style scoped>

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Aplicar desenfoque */
  /*
  backdrop-filter: blur(10px);
   */
}

.divider {
  stroke: var(--details-color);
  stroke-width: 1;
}

.main-body {
  background-color: var(--secondary-color);
  color: var(--details-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /*
    background-image: radial-gradient(closest-side, transparent 98%, rgba(0, 0, 0, .3) 99%),
    radial-gradient(closest-side, transparent 98%, rgba(0, 0, 0, .3) 99%);
    background-size: 80px 80px;
    background-position: 0 0, 40px 40px;
   */


  /*
  --s: 150px;
  --c: var(--secondary-color);
  --_s: calc(2 * var(--s)) calc(2 * var(--s));
  --_g: 35.36% 35.36% at;
  --_c: #0000 66%, #20222a 68% 70%, #0000 72%;
  background: radial-gradient(var(--_g) 100% 25%, var(--_c)) var(--s) var(--s)/var(--_s),
  radial-gradient(var(--_g) 0 75%, var(--_c)) var(--s) var(--s)/var(--_s),
  radial-gradient(var(--_g) 100% 25%, var(--_c)) 0 0/var(--_s),
  radial-gradient(var(--_g) 0 75%, var(--_c)) 0 0/var(--_s),
  repeating-conic-gradient(var(--c) 0 25%, #0000 0 50%) 0 0/var(--_s),
  radial-gradient(var(--_c)) 0 calc(var(--s) / 2)/var(--s) var(--s) var(--c);
  background-attachment: fixed;
  */

}

.form-group {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: 250;
}

input {
  width: calc(100% - 1em);
  height: 20px;
  padding: 0.5em;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
}

input:focus {
  outline: none;
  box-shadow: 0 0 8px var(--details-color);
  transition: box-shadow 0.3s ease;
}

button {
  width: 100%;
}

</style>