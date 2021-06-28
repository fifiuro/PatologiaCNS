<template>
    <v-card>
        <v-toolbar card prominent color="primary" dark="">
            <v-toolbar-title class="body-2">Agregar Histopalogia</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout row wrap>
                    <v-flex lg6 sm12>
                        <v-text-field label="Paciente" name="paciente" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg6 sm12>
                        <v-text-field label="Centro de Salud" name="centro" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg6 sm12>
                        <v-text-field label="Servicio" name="servicio" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg6 sm12>
                        <v-text-field label="Doctor" name="doctor" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Fecha de Recepción" name="fecha_recepcion" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg6 sm12>
                        <v-text-field label="Macroscopia" name="macroscopia" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg6 sm12>
                        <v-text-field label="Microscopia" name="microscopia" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Diagnostico" name="diagnostico" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Comentarios" name="comentario" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Fecha Entrega" name="fecha_entrega" v-model="title">
                        </v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                </v-layout>        
            </v-form>
        </v-card-text>
        <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn color="success">AGREGAR</v-btn>
            <v-btn color="error" @click="onCerrar">CERRAR</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data: () => ({
    title: null,
    valid: true,
    date: null,
    startDateMenu: false,
    startDate: null,
    startTimeMenu: false,
    startTime: null,
    endDateMenu: false,
    endDate: null,
    endTimeMenu: false,
    endTime: null,
    modal: false    
  }),
  methods: {
      onCerrar() {
          this.$router.push('/histopatologia/')
      }
  }
};
</script>
