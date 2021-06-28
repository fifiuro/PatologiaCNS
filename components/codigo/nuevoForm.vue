<template>
<v-layout>
  <v-flex lg3></v-flex>
  <v-flex lg6>
    <v-card>
      <v-toolbar card prominent color="primary" dark="">
        <v-toolbar-title class="body-2">Agregar Código Beneficiario</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex lg12 sm12>
              <v-text-field label="Código Beneficiario" name="codigo" v-model="dataCodigo.codigo">
              </v-text-field>
            </v-flex>
            <v-flex lg12 sm12>
              <v-text-field textarea label="Descripción" v-model="dataCodigo.descripcion">
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
  </v-flex>
  <v-flex lg3></v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dataCodigo: {
        codigo: "",
        descripcion: ""
      }
    }
  },
  methods: {
    onCerrar() {
      this.$router.push('/codigo/')
    },
    onSave() {
      axios.post('http://173.16.1.67:1337/codigos/', this.dataCodigo)
        .then(resul => { this.$router.push('/codigo/') })
        .catch(e => console.log(e))
    }
  }
};
</script>
