<template>
  <v-widget title="Basic Usage">
    <div slot="widget-content">
      <v-dialog v-model="nuevo.dialog" persistent max-width="800px">
        <v-btn depressed outline icon fab dark color="warning" small slot="activator"><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Laboratorio</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex lg6 sm6>
                  <v-autocomplete
                    :items="dataCentro"
                    v-model="dataRecepcion.centro"
                    label="Centro de Salud"
                    item-text="centro"
                    item-value="id"
                    single-line
                    
                  ></v-autocomplete>
                </v-flex>
                <v-flex lg6 sm6>
                  <v-autocomplete
                    :items="dataServicio"
                    v-model="dataRecepcion.servicio"
                    label="Servicio"
                    item-text="servicio"
                    item-value="id"
                    single-line
                    
                  ></v-autocomplete>
                </v-flex>
                <v-flex lg6 sm6>
                  <v-autocomplete
                    :items="dataDiagnostico"
                    v-model="dataRecepcion.diagnostico"
                    label="Diagnostico"
                    item-text="diagnostico"
                    item-value="id"
                    single-line
                    
                  ></v-autocomplete>
                </v-flex>
                <v-flex lg6 sm6>
                  <v-autocomplete
                    :items="dataDoctor"
                    v-model="dataRecepcion.doctore"
                    label="Asignar Doctor"
                    item-text="completo"
                    item-value="id"
                    single-line
                    
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs11 sm5>
                  <v-dialog
                    ref="dialog"
                    persistent
                    v-model="modal"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="date"
                  >
                    <v-text-field
                      slot="activator"
                      label="Fecha de Recepción"
                      v-model="date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.native="onAddLaboratorio()">GUARDAR</v-btn>
            <v-btn color="error" @click.native="nuevo.dialog = false">CERRAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-widget>
</template>

<script>
export default {
  data() {
    return {
      basic: {
        dialog: false
      },
      fullscreen: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      },
      scrollable: {
        name: '',
        dialog: false
      },
      dataRecepcion: {
        persona: "",
        centro: "",
        servicio: "",
        diagnostico: "",
        doctore: "",
        fecha_recep: ""
      },
      nuevo: {
        dialog: false
      },
      date: null,
      menu: false,
      modal: false
    };
  },
  props: [
    "id",
    "dataCentro",
    "dataServicio",
    "dataDiagnostico",
    "dataDoctor"
  ],
  mounted() {
    this.dataRecepcion.persona = "";
    this.dataRecepcion.centro = "";
    this.dataRecepcion.servicio = "";
    this.dataRecepcion.diagnostico = "";
    this.dataRecepcion.doctore = "";
    this.dataRecepcion.fecha_reg = "";
   },
  computed: { },
  methods: {
    async onAddLaboratorio() {
      this.dataRecepcion.persona = this.$route.params.id;
      this.dataRecepcion.fecha_recep = this.date;
      let response = await this.$strapi.$histopatologias.create(this.dataRecepcion);
      this.nuevo.dialog = false;
    }
  }
};
</script>
