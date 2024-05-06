<script setup lang="ts">
import HeaderCom from '@/components/HeaderCom.vue'
import DropArea from '@/components/DropArea.vue'
import JobAnalysisForm from '@/components/JobAnalysisForm.vue'
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#">SherlockCV</a>
      </div>
      <ul class="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca</a></li>
        <li><a href="#">Servicios</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </nav>
  </header>
  <section id="first">
    <DropArea></DropArea>
    <JobAnalysisForm></JobAnalysisForm>
  </section>
</template>

<style scoped>
#first {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
header{
  font-weight: bold;
  background-color: #003c43;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(83, 82, 82, 0.46);
}
nav {
  color: var(--details-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 24px;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links li a {
  text-decoration: none;
}

.nav-links li a:hover {
  color: #f0f0f0;
}


@media screen and (min-width: 1200px) {
  #first {
    flex-direction: row;
  }
}
</style>
