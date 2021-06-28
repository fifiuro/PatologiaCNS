<template>
  <v-widget title="Basic Usage">
    <div slot="widget-content">
      <v-dialog v-model="nuevo.dialog" persistent max-width="800px">
        <v-btn depressed outline icon fab dark color="success" small slot="activator" @click="onCarga()"><v-icon>addchart</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Resultado de Laboratorio</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex lg12 sm12>
                  <v-textarea
                    outline
                    label="Macroscopia" 
                    v-model="dataHistopatologia.macroscopia">
                  </v-textarea>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-textarea
                    outline
                    label="Microscopia" 
                    v-model="dataHistopatologia.microscopia">
                  </v-textarea>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-autocomplete
                    :items="dataDiagnostico"
                    v-model="dataHistopatologia.diagnostico"
                    label="Diagnostico"
                    item-text="diagnostico"
                    item-value="id"
                    single-line
                  ></v-autocomplete>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-textarea
                    outline
                    label="Comentario" 
                    v-model="dataHistopatologia.comentario">
                  </v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.native="onAddResultado()">GUARDAR</v-btn>
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
      dataHistopatologia: [],
      dataResultado: {
        macroscopia: "",
        microscopia: "",
        diagnostico: "",
        comentario: "",
        fecha_entrega: "",
        estado: false
      },
      nuevo: {
        dialog: false
      },
      date: null,
      menu: false,
      modal: false,

      modal1: false,
      hora: null,
    };
  },
  props: [
    "id",
    "dataDiagnostico"
  ],
  mounted() { },
  computed: { },
  methods: {
    async onCarga() {
      let res = await this.$strapi.$histopatologias.find( { id: this.id } );
      this.dataHistopatologia = res[0];
    },
    async onAddResultado() {
      var fecha = new Date(), dia = fecha.getDate(), mes = fecha.getMonth() + 1;
      var hora = fecha.getHours(), min = fecha.getMinutes(), sec = fecha.getSeconds();
      if(dia < 10)
        dia = '0' + dia;
      if(mes < 10)
        mes = '0' + mes;
      if(hora < 10)
        hora = '0' + hora;
      if(min < 10)
        min = '0' + min;
      if(sec < 10)
        sec = '0' + sec;
      var fh = fecha.getFullYear() + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + sec;
      this.dataHistopatologia.fecha_ent = fh;
      this.dataHistopatologia.estado = false;
      let resp = await this.$strapi.$histopatologias.update(this.id, this.dataHistopatologia);
      this.nuevo.dialog = false;
    }
  }
};
</script>
