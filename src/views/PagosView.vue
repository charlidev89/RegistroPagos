<template>
  <div class="pagos-view">
    <!-- Estadísticas rápidas -->
    <div class="stats">
      <div class="stat-card">
        <h3>{{ registros.length }}</h3>
        <p>Total Registros</p>
      </div>
      <div class="stat-card">
        <h3>{{ registrosHoy }}</h3>
        <p>Registros Hoy</p>
      </div>
    </div>

    <!-- Formulario - Escucha el evento 'registro-creado' -->
    <Formulario @registro-creado="agregarRegistro" />

    <!-- Tabla - Recibe los registros como prop -->
    <TablaPagos 
      :registros="registros"
      @eliminar-registro="eliminarRegistro"
    />
  </div>
</template>

<script>
import TablaPagos from '../components/TablaPagos.vue'
import Formulario from '../components/Formulario.vue' 

export default {
  name: 'PagosView',
  components: {
    Formulario,
    TablaPagos,
  },
  data() {
    return {
      registros: []
    }
  },
  computed: {
    registrosHoy() {
      const hoy = new Date().toDateString();
      return this.registros.filter(registro => {
        const fechaRegistro = new Date(registro.fecha).toDateString();
        return fechaRegistro === hoy;
      }).length;
    }
  },
  methods: {
    agregarRegistro(nuevoRegistro) {
      this.registros.push(nuevoRegistro);
      console.log('Nuevo registro:', nuevoRegistro);
    },
    eliminarRegistro(index) {
      this.registros.splice(index, 1);
      console.log('Registro eliminado en índice:', index);
    }
  }
}
</script>

<style scoped>
.pagos-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
  text-align: center;
  flex: 1;
}

.stat-card h3 {
  margin: 0;
  color: #007bff;
  font-size: 2rem;
}

.stat-card p {
  margin: 0.5rem 0 0 0;
  color: #6c757d;
}
</style>