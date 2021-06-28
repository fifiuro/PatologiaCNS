<template>
    <v-card>
        <v-toolbar card prominent color="primary darken-2" dark="">
            <v-toolbar-title class="body-2">Modificar Paciente</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form ref="form" lazy-validation>
                <v-layout row wrap>
                    <v-flex lg12 sm4>
                        <v-text-field label="Nombre" name="nombre" v-model="dataPaciente.nombres">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm4>
                        <v-text-field label="Apellido Paterno" name="paterno" v-model="dataPaciente.paterno">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm4>
                        <v-text-field label="Apellido Materno" name="materno" v-model="dataPaciente.materno">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm4>
                        <v-text-field label="Matriculas" name="matricula" v-model="dataPaciente.matricula">
                        </v-text-field>
                    </v-flex>
                    <v-flex lg12 sm4>
                        <v-select
                          :items="genero"
                          v-model="dataPaciente.sexo"
                          label="Select"
                          item-text="text"
                          item-value="value"
                          single-line
                        ></v-select>
                    </v-flex>
                    <v-flex lg6 sm4>
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
            <v-btn color="success" @click="onSave">MODIFICAR</v-btn>
            <v-btn color="error" @click="onCerrar">CERRAR</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      dataPaciente: {
        nombres: "",
        paterno: "",
        materno: "",
        matricula: "",
        sexo: ""
      },
      dataBeneficiario: {
        id: "",
        codigo: "",
        persona: ""
      },
      codigo: [],
      genero: [
        {
          text: "Masculino",
          value: "M"
        },
        {
          text: "Femenino",
          value: "F"
        }
      ]
    }
  },
  async mounted() {
    let res = await this.$strapi.$personas.find( { id: this.$route.params.id } );
    this.dataPaciente = res[0];

    let resp = await this.$strapi.$codigos.find();
    for (var i in resp) {
      var completo = resp[i].codigo + " - " + resp[i].descripcion
      resp[i].completo = completo
    }
    this.codigo = resp

    // let resp = await this.$strapi.$codigos.find()
    // this.codigo = resp;

    this.dataBeneficiario.codigo = this.dataPaciente.beneficiarios[0].codigo
    this.dataBeneficiario.id = this.dataPaciente.beneficiarios[0].id
    this.dataBeneficiario.persona = this.dataPaciente.id
  },
  methods: {
    onCerrar() {
      this.$router.push('/paciente/')
    },
    async onSave() {
      let res = await this.$strapi.$personas.update(this.$route.params.id, this.dataPaciente)
      let resp = await this.$strapi.$beneficiarios.update(this.dataBeneficiario.id, this.dataBeneficiario)
      this.$router.push('/paciente/');

    }
  }
};
</script>
