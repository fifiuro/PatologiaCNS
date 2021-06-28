<template>
  <v-card>
    <v-toolbar card prominent color="primary darken-2" dark="">
      <v-toolbar-title class="body-2">Agregar Paciente</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row wrap>
          <v-flex lg4 sm4>
              <v-text-field label="Nombre" name="nombre" v-model="dataPaciente.nombres">
              </v-text-field>
          </v-flex>
          <v-flex lg4 sm4>
              <v-text-field label="Apellido Paterno" name="paterno" v-model="dataPaciente.paterno">
              </v-text-field>
          </v-flex>
          <v-flex lg4 sm4>
              <v-text-field label="Apellido Materno" name="materno" v-model="dataPaciente.materno">
              </v-text-field>
          </v-flex>
          <v-flex lg4 sm4>
              <v-text-field label="Matricula" name="matricula" v-model="dataPaciente.matricula">
              </v-text-field>
          </v-flex>
          <v-flex lg4 sm4>
            <v-select
              :items="genero"
              v-model="dataPaciente.sexo"
              label="Sexo"
              item-text="text"
              item-value="value"
              single-line
            ></v-select>
          </v-flex>
          <v-flex lg4 sm4>
            <v-select
              :items="codigo"
              v-model="dataBeneficiario.codigo"
              label="Tipo Beneficario"
              item-text="completo"
              item-value="id"
              single-line
            ></v-select>
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
      valid: true,
      dataPaciente: {
        nombres: "",
        paterno: "",
        materno: "",
        matricula: "",
        sexo: ""
      },
      dataBeneficiario: {
        codigo: "",
        persona: ""
      },
      genero: [
        {
          text: "Masculino",
          value: "M"
        },
        {
          text: "Femenino",
          value: "F"
        }
      ],
      codigo: []
    }
  },
  async mounted() {
    let res = await this.$strapi.$codigos.find();
    for (var i in res) {
      var completo = res[i].codigo + " - " + res[i].descripcion
      res[i].completo = completo
    }
    this.codigo = res
  },
  methods: {
    onCerrar() {
      this.$router.push('/paciente/')
    },
    async onSave() {
      let response = await this.$strapi.$personas.create(this.dataPaciente);
      this.dataBeneficiario.persona = response.id;
      let res = await this.$strapi.$beneficiarios.create(this.dataBeneficiario);
      this.$router.push('/paciente/');
    }
  }
};
</script>
