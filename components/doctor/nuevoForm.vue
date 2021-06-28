<template>
    <v-card>
        <v-toolbar card prominent color="primary" dark="">
            <v-toolbar-title class="body-2">Agregar Doctor</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout row wrap>
                    <v-flex lg12 sm12>
                        <v-text-field label="Nombre" name="nombre" v-model="dataDoctor.nombres">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Apellido Paterno" name="paterno" v-model="dataDoctor.paterno">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Apellido Materno" name="materno" v-model="dataDoctor.materno">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm12>
                        <v-text-field label="Matricula Profesional" name="matricula" v-model="dataDoctor.mat_prof">
                        </v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                </v-layout>        
            </v-form>
        </v-card-text>
        <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="onSave">AGREGAR</v-btn>
            <v-btn color="error" @click="onCerrar">CERRAR</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dataDoctor: {
        nombres: "",
        paterno: "",
        materno: "",
        mat_prof: ""
      }
    }
  },
  methods: {
      onCerrar() {
          this.$router.push('/doctor/')
      },
      onSave() {
        console.log(this.dataDoctor)
        axios.post('http://173.16.1.67:1337/doctores/', this.dataDoctor)
          .then(result => { this.$router.push('/doctor/') })
          .catch(e => console.log(e))
      }
  }
};
</script>
