<template>
<v-layout>
  <v-flex lg3></v-flex>
  <v-flex lg6>
    <v-card>
      <v-toolbar card prominent color="primary" dark="">
        <v-toolbar-title class="body-2">Modificar Código Beneficiario</v-toolbar-title>
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
            <v-flex lg12 sm12>
              <v-widget title="Switches" class="mt-3">
                <div slot="widget-content">
                  <div class="basic">
                      <v-subheader class="pa-0">Estado: </v-subheader>
                      <v-switch :label="dataCodigo.estado ? 'Activado': 'Desactivado'" v-model="dataCodigo.estado"></v-switch>
                  </div>
                </div>
              </v-widget>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>        
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn color="success" @click="onSave">MODIFICAR</v-btn>
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
        descripcion: "",
        estado: ""
      }
    }
  },
  mounted() {
    axios.get('http://173.16.1.67:1337/codigos/' + this.$route.params.id, { responseType: 'json' })
      .then(result => (this.dataCodigo = result.data))
      .catch(e => console.log(e))
  },
  methods: {
    onCerrar() {
      this.$router.push('/codigo/')
    },
    onSave() {
      axios.put('http://173.16.1.67:1337/codigos/' + this.$route.params.id, this.dataCodigo)
        .then(result => { this.$router.push('/codigo/') })
        .catch(e => console.log(e))
    }
  }
};
</script>
