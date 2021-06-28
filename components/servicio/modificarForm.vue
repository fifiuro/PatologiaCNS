<template>
<v-layout>
  <v-flex lg3></v-flex>
  <v-flex lg6>
    <v-card>
      <v-toolbar card prominent color="primary" dark="">
        <v-toolbar-title class="body-2">Modificar Servicios</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex lg12 sm12>
              <v-text-field label="Servicios" name="servicios" v-model="dataServicio.servicio">
              </v-text-field>
            </v-flex>
            <v-flex lg12 sm12>
              <v-widget title="Switches" class="mt-3">
                <div slot="widget-content">
                  <div class="basic">
                    <v-subheader class="pa-0">Estado: {{s1}}</v-subheader>
                    <v-switch :label="dataServicio.estado ? 'Activado': 'Desactivado'" v-model="dataServicio.estado"></v-switch>
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
      dataServicio: {
        servicio: "",
        estado: ""
      }
    }
  },
  mounted() {
    axios.get('http://173.16.1.67:1337/servicios/' + this.$route.params.id, { responseType: 'json' })
      .then(result => (this.dataServicio = result.data))
      .catch(e => console.log(e));
  },
  methods: {
    onCerrar() {
      this.$router.push('/servicios/')
    },
    onSave() {
      axios.put('http://173.16.1.67:1337/servicios/' + this.$route.params.id, this.dataServicio)
        .then(resul => { this.$router.push('/servicios/') })
        .catch(e => console.log(e))
    }
  }
};
</script>
