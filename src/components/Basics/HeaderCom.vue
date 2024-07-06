<script setup lang="ts">

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
</template>

<style scoped>

header {
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

a {
  color: inherit;
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
</style>