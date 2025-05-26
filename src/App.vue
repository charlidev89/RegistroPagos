<template>
  <div id="app">
    <!-- Header de la aplicación -->
    <header class="app-header">
      <h1 class="rounded-4">🎯 Sistema de Registro de Pagos</h1>
      
      <!-- Navegación -->
      <nav class="app-nav">
        <router-link to="/" class="nav-link" active-class="active">
          Pagos de Clientes
        </router-link>
        <router-link to="/resultados" class="nav-link" active-class="active">
          Consultas Vuejs
        </router-link>
      </nav>
    </header>

    <!-- Contenido principal con router-view -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
<footer class="bg-dark text-white text-center py-3 mt-auto fixed-bottom">
  <p class="mb-0">Hecho por Charlie 🚀</p>
</footer>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-header {
  color: rgb(255, 255, 255);
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 20px;
  border-color: #ffffff;
  
 
}

.app-header h1 {
  margin-bottom: 1rem;
}

.app-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #495057;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #212529;
}

.nav-link.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.main-content {
  min-height: calc(100vh - 200px);
}
</style>