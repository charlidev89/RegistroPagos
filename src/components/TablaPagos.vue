<template>
    <div class="tabla-pagos-wrapper">
        <div class="table-header">
            <h4 class="table-title">
                <i class="bi bi-list-ul"></i>
                Registros de Pagos
            </h4>
        </div>

        <!-- Sin registros -->
        <div v-if="registros.length === 0" class="empty-state">
            <i class="bi bi-inbox empty-icon"></i>
            <p class="empty-text">No hay registros de pagos aún</p>
            <p class="empty-subtext">Los pagos registrados aparecerán aquí</p>
        </div>

        <!-- Tabla con registros -->
        <div v-else class="table-responsive">
            <table class="table custom-table">
                <thead>
                    <tr>
                        <th>
                            <i class="bi bi-person"></i>
                            Cliente
                        </th>
                        <th>
                            <i class="bi bi-card-text"></i>
                            DNI
                        </th>
                        <th class="text-end">
                            <i class="bi bi-currency-dollar"></i>
                            Total
                        </th>
                        <th class="text-end">
                            <i class="bi bi-cash"></i>
                            Pagado
                        </th>
                        <th class="text-end">
                            <i class="bi bi-calculator"></i>
                            Saldo
                        </th>
                        <th>
                            <i class="bi bi-calendar3"></i>
                            Fecha
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(registro, index) in registros" :key="index" :class="getRowClass(registro)"
                        class="table-row">
                        <td>
                            <div class="cliente-info">
                                <div class="cliente-avatar">{{ getInitials(registro.nombre) }}</div>
                                <span>{{ registro.nombre }}</span>
                            </div>
                        </td>
                        <td>{{ formatDNI(registro.dni) }}</td>
                        <td class="text-end fw-semibold">${{ registro.monto.toLocaleString() }}</td>
                        <td class="text-end">${{ registro.pagoRealizado.toLocaleString() }}</td>
                        <td class="text-end">
                            <span class="saldo-badge" :class="getSaldoClass(registro)">
                                ${{ Math.abs(calcularSaldo(registro)).toLocaleString() }}
                                <i v-if="calcularSaldo(registro) === 0" class="bi bi-check-circle-fill ms-1"></i>
                                <i v-else-if="calcularSaldo(registro) > 0"
                                    class="bi bi-exclamation-circle-fill ms-1"></i>
                                <i v-else class="bi bi-arrow-up-circle-fill ms-1"></i>
                            </span>
                        </td>
                        <td>
                            <small class="fecha-text">{{ formatearFecha(registro.fecha) }}</small>
                        </td>
                        <td class="text-center">
                            <div class="btn-group" role="group">

                                <button @click="confirmarEliminacion(index)" class="btn btn-sm btn-danger btn-action"
                                    title="Eliminar registro">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal de confirmación para eliminar -->
        <div v-if="mostrarConfirmacion" class="modal-overlay" @click="cancelarEliminacion">
            <div class="modal-confirm" @click.stop>
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-exclamation-triangle text-warning"></i>
                        Confirmar Eliminación
                    </h5>
                </div>
                <div class="modal-body">
                    <p>¿Está seguro que desea eliminar este registro?</p>
                    <p class="text-muted mb-0">Esta acción no se puede deshacer.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="cancelarEliminacion">
                        Cancelar
                    </button>
                    <button class="btn btn-danger" @click="eliminarRegistro">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

        <!-- Resumen de estadísticas -->
        <div v-if="registros.length > 0" class="table-footer">
            <div class="row text-center">
                <div class="col-md-4">
                    <div class="stat-mini">
                        <p class="stat-label">Total a Cobrar</p>
                        <p class="stat-value text-primary">
                            ${{ totalACobrar.toLocaleString() }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-mini">
                        <p class="stat-label">Total Cobrado</p>
                        <p class="stat-value text-success">
                            ${{ totalCobrado.toLocaleString() }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-mini">
                        <p class="stat-label">Saldo Pendiente</p>
                        <p class="stat-value text-danger">
                            ${{ saldoPendiente.toLocaleString() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TablaPagos',
    props: {
        registros: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            mostrarConfirmacion: false,
            indexAEliminar: null
        }
    },
    computed: {
        totalACobrar() {
            return this.registros.reduce((sum, reg) => sum + reg.monto, 0);
        },
        totalCobrado() {
            return this.registros.reduce((sum, reg) => sum + reg.pagoRealizado, 0);
        },
        saldoPendiente() {
            return this.totalACobrar - this.totalCobrado;
        }
    },
    methods: {
        calcularSaldo(registro) {
            return registro.monto - registro.pagoRealizado;
        },

        getRowClass(registro) {
            const saldo = this.calcularSaldo(registro);

            if (saldo === 0) {
                return 'row-success';
            } else if (saldo > 0) {
                return 'row-danger';
            } else {
                return 'row-primary';
            }
        },

        getSaldoClass(registro) {
            const saldo = this.calcularSaldo(registro);

            if (saldo === 0) {
                return 'badge-success';
            } else if (saldo > 0) {
                return 'badge-danger';
            } else {
                return 'badge-primary';
            }
        },

        getInitials(nombre) {
            return nombre
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        },

        formatDNI(dni) {
            // Formatea el DNI con puntos: 12345678 -> 12.345.678
            return dni.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        formatearFecha(fecha) {
            let fechaObj;

            if (fecha instanceof Date) {
                fechaObj = fecha;
            } else if (typeof fecha === 'string') {
                fechaObj = new Date(fecha);
            } else {
                fechaObj = new Date();
            }

            if (isNaN(fechaObj.getTime())) {
                fechaObj = new Date();
            }

            const dia = fechaObj.getDate().toString().padStart(2, '0');
            const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaObj.getFullYear();

            const horas = fechaObj.getHours().toString().padStart(2, '0');
            const minutos = fechaObj.getMinutes().toString().padStart(2, '0');

            return `${dia}/${mes}/${año} ${horas}:${minutos}`;
        },

        confirmarEliminacion(index) {
            this.indexAEliminar = index;
            this.mostrarConfirmacion = true;
        },

        cancelarEliminacion() {
            this.mostrarConfirmacion = false;
            this.indexAEliminar = null;
        },

        eliminarRegistro() {
            if (this.indexAEliminar !== null) {
                this.$emit('eliminar-registro', this.indexAEliminar);
                this.cancelarEliminacion();
            }
        }
    }
}
</script>

<style scoped>
.tabla-pagos-wrapper {
    height: 100%;
}

.table-header {
    margin-bottom: 1.5rem;
}

.table-title {
    color: var(--dark-color);
    font-weight: 600;
    margin: 0;
}

.table-title i {
    color: var(--primary-color);
    margin-right: 0.5rem;
}

/* Estado vacío */
.empty-state {
    text-align: center;
    padding: 3rem;
}

.empty-icon {
    font-size: 4rem;
    color: #ffffff;
    display: block;
    margin-bottom: 1rem;
}

.empty-text {
    font-size: 1.2rem;
    color: #c9ccce;
    margin-bottom: 0.5rem;
}

.empty-subtext {
    color: #ffffff;
    margin: 0;
}

/* Tabla personalizada */
.custom-table {
    border-collapse: separate;
    border-spacing: 0;
}

.custom-table thead th {
    background-color: #f8f9fa;
    border: none;
    color: #6c757d;
    font-weight: 600;
    padding: 1rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.custom-table thead th i {
    margin-right: 0.5rem;
    font-size: 1rem;
}

.table-row {
    transition: all 0.3s ease;
}

.table-row:hover {
    transform: translateX(5px);
}

.custom-table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef;
}

/* Estilos de filas por estado */
.row-success {
    background-color: rgba(92, 184, 92, 0.1);
}

.row-danger {
    background-color: rgba(217, 83, 79, 0.1);
}

.row-primary {
    background-color: rgba(74, 144, 226, 0.1);
}

/* Cliente info */
.cliente-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.cliente-avatar {
    width: 35px;
    height: 35px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
}

/* Badges de saldo */
.saldo-badge {
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
}

.badge-success {
    background-color: rgba(92, 184, 92, 0.2);
    color: #3d8b3d;
}

.badge-danger {
    background-color: rgba(217, 83, 79, 0.2);
    color: #c9302c;
}

.badge-primary {
    background-color: rgba(74, 144, 226, 0.2);
    color: #2e6da4;
}

/* Botones de acción */
.btn-action {
    border: none;
    padding: 0.375rem 0.75rem;
    transition: all 0.3s ease;
}

.btn-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-warning {
    background-color: #ffc107;
    color: #212529;
}

.btn-warning:hover {
    background-color: #e0a800;
}

/* Modal de confirmación */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    animation: fadeIn 0.3s ease;
}

.modal-confirm {
    background: white;
    border-radius: 15px;
    padding: 0;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease;
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
}

.modal-title {
    margin: 0;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e9ecef;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

/* Footer de tabla */
.table-footer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #e9ecef;
}

.stat-mini {
    padding: 1rem;
}

.stat-label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

/* Animaciones */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .custom-table {
        font-size: 0.875rem;
    }

    .cliente-avatar {
        width: 30px;
        height: 30px;
        font-size: 0.75rem;
    }

    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
}
</style>