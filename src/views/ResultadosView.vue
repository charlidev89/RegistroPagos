<template>
  <div class="resultados-view">
    <h2 class="mb-4">Vuejs Preguntas y Respuestas</h2>
    
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>Pregunta</th>
            <th>Respuesta Correcta</th>
            <th>Explicación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Pregunta 1/3:</strong><br>
              ¿Qué es un componente en Vue.js?
            </td>
            <td>
              <span class="badge bg-success">a</span> Son elementos personalizados reutilizables
            </td>
            <td>
              Los componentes en Vue.js son piezas reutilizables de código que encapsulan 
              template, lógica y estilos, permitiendo construir interfaces modulares.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Pregunta 2/3:</strong><br>
              ¿Qué función cumple el modificador number aplicado a v-model?
            </td>
            <td>
              <span class="badge bg-success">c</span> Modifica el dato de entrada para 
              guardarlo como número en la propiedad vinculada
            </td>
            <td>
              El modificador .number convierte automáticamente el valor del input a número 
              antes de almacenarlo en la propiedad del componente.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Pregunta 3/3:</strong><br>
              vue create se utiliza para:
            </td>
            <td>
              <span class="badge bg-success">b</span> Crear un proyecto base Vue basado en Vue CLI
            </td>
            <td>
              El comando vue create es parte de Vue CLI y genera un nuevo proyecto Vue 
              con toda la estructura y configuración inicial necesaria.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="resumen mt-4">
      <div class="alert alert-info">
        <h5>Resumen de Respuestas:</h5>
        <ul>
          <li><strong>Pregunta 1:</strong> Opción A</li>
          <li><strong>Pregunta 2:</strong> Opción C</li>
          <li><strong>Pregunta 3:</strong> Opción B</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultadosView'
}
</script>

<style scoped>
.resultados-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.table {
  margin-top: 20px;
}

.badge {
  font-size: 0.9rem;
}

.resumen ul {
  margin-bottom: 0;
}
</style>