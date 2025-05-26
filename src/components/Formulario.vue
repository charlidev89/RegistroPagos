<template>
    <h4 class="mb-5">Formulario de Pagos</h4>

    <!-- @submit: escucha el evento submit del formulario.

.prevent: previene el comportamiento por defecto del formulario (que recargaría la página).

"agregarPago()": llama al método agregarPago cuando se dispara el submit.

 -->
    <form class="border p-4 rounded-5" novalidate @submit.prevent="agregarPago()">
        <div class="mb-3  ">
            <label class="form-label">Nombre Completo del Cliente</label>
            <input v-model.trim="formData.nombreCompleto" type="text" class="form-control"
                @input="formDirty.nombreCompleto = true" />
            <div v-if="errorNombreCompleto.mostrar" class="alert alert-danger my-1">
                {{ errorNombreCompleto.mensaje }}
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">DNI</label>
            <input v-model.trim="formData.dni" type="text" class="form-control" @input="formDirty.dni = true" />
            <div v-if="errorDni.mostrar" class="alert alert-danger my-1">
                {{ errorDni.mensaje }}
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Monto a pagar</label>
            <input v-model.number="formData.monto" type="number" class="form-control" @input="formDirty.monto = true" />
            <div v-if="errorMonto.mostrar" class="alert alert-danger my-1">
                {{ errorMonto.mensaje }}
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Pago realizado</label>
            <input v-model.number="formData.pagoRealizado" type="number" class="form-control"
                @input="formDirty.pagoRealizado = true" />
            <div v-if="errorPago.mostrar" class="alert alert-danger my-1">
                {{ errorPago.mensaje }}
            </div>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="validarBotonEnviar()">Registrar pago</button>
    </form>
</template>

<script>
export default {
    name: 'Formulario',
    props: [], // Corregido: props debe ser un array (o objeto)
    data() {
        return { // Faltaba el return
            formData: this.getDataInicial(),
            formDirty: this.getDirtyInicial()
        }
    },
    methods: {
        validarBotonEnviar() {
            // Implementar lógica de validación
            return (!this.formData.nombreCompleto || !this.formData.dni || !this.formData.pagoRealizado ||
                !this.formData.monto || this.errorNombreCompleto.mostrar || this.errorDni.mostrar || this.errorMonto.mostrar || this.errorPago.mostrar

            )
        },

        getDataInicial() {
            return {
                nombreCompleto: null,
                dni: null,
                monto: null,
                pagoRealizado: null,
            }
        },
        agregarPago() { /* este metodo se activa  en el formulario al apretar submit que esta en el boton registrar */

            const nuevoPago = {
                nombre: this.formData.nombreCompleto,
                dni: this.formData.dni,
                monto: this.formData.monto,
                pagoRealizado: this.formData.pagoRealizado,
                fecha: new Date().toLocaleString(),

            };

            this.$emit('registro-creado', nuevoPago); /* Emite el evento registro creado donde tiene guiardado el objeto nuevo pago , este evento luego es llamado desde app vue */
            // Limpiar formulario para proximos registros
            this.formData = this.getDataInicial();
            this.formDirty = this.getDirtyInicial();
        },

        getDirtyInicial() {
            return {
                nombreCompleto: false,
                dni: false,
                monto: false,
                pagoRealizado: false,
            }

        }

    },
    computed: {
        errorNombreCompleto() {
            let mensaje = "";
            if (!this.formData.nombreCompleto) {
                mensaje = "El nombre no puede estar vacío"
            }
            else if (this.formData.nombreCompleto.length > 20) {
                mensaje = "No puede superar los 20 caracteres"
            }
            else if (this.formData.nombreCompleto.length < 3) {
                mensaje = "No puede ser menos de 3 caracteres"
            }

            return {
                mostrar: mensaje !== '' && this.formDirty.nombreCompleto,
                mensaje: mensaje
            }
        },
        errorDni() {
            let mensaje = "";
            if (!this.formData.dni) {
                mensaje = "El DNI no puede estar vacío";
            } else if (isNaN(this.formData.dni)) {
                mensaje = "El DNI debe ser un número válido";
            }
            return {
                mostrar: mensaje !== '' && this.formDirty.dni,
                mensaje: mensaje,
            }

        },
        errorMonto() {
            let mensaje = "";
            const montoNumerico = Number(this.formData.monto);

            if (this.formData.monto === '' || this.formData.monto === null || this.formData.monto === undefined) {
                mensaje = "El monto no puede estar vacío";
            } else if (isNaN(montoNumerico)) {
                mensaje = "Caracter inválido";
            } else if (montoNumerico <= 0) {
                mensaje = "El monto a pagar no puede ser negativo, ni cero";
            }
            return {
                mostrar: mensaje !== '' && this.formDirty.monto,
                mensaje: mensaje,
            }


        },
        errorPago() {
            let mensaje = "";
            const pagoNumerico = Number(this.formData.pagoRealizado);


            if (this.formData.pagoRealizado === '' || this.formData.pagoRealizado === null || this.formData.pagoRealizado === undefined) {
                mensaje = "El pago realizado no puede estar vacío";
            } else if (isNaN(this.formData.pagoRealizado)) {
                mensaje = "Caracter invalido";
            } else if (pagoNumerico <= 0) {
                mensaje = "El pago realizado no puede ser negativo, ni cero";
            }
            return {
                mostrar: mensaje !== '' && this.formDirty.pagoRealizado,
                mensaje: mensaje,
            }


        },

    }
}
</script>


<style>

</style>