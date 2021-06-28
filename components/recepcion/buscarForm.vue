<template>
  <div>
    <!-- DATOS EL PACIENTE -->
    <v-card>
      <v-toolbar card prominent color="primary darken-2" dark="">
        <v-toolbar-title class="body-2">Datos del Paciente</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs3>
              <v-subheader>Nombres: {{ dataPersona.nombres }}</v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Paterno: {{ dataPersona.paterno }}</v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Materno: {{ dataPersona.materno }}</v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Matricula de Asegurado: {{ dataPersona.matricula }}</v-subheader>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- PARAMETROS DE BUSQUEDA -->
    <v-card>
      <v-toolbar card prominent color="primary darken-2" dark="">
        <v-toolbar-title class="body-2">Lista Recepción de Laboratorios</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex lg6 sm7>
              <v-autocomplete
                :items="dataCentro"
                v-model="centro"
                label="Centro de Salud"
                item-text="centro"
                item-value="id"
                single-line
              ></v-autocomplete>
            </v-flex>
            <v-flex lg5 sm4>
              <v-dialog
                ref="dialog1"
                persistent
                v-model="modal"
                lazy
                full-width
                width="290px"
                :return-value.sync="date"
              >
                <v-text-field
                  slot="activator"
                  label="Fecha Recepción"
                  v-model="date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex lg1 sm1>
              <v-btn depressed outline icon fab dark color="info" small @click="onSearch">
                <v-icon>search</v-icon>
              </v-btn>
              <!-- SECCION DE NUEVO LABORATORIO -->
              <nuevoForm
                v-if="$strapi.user.role.name === 'Secretaria'" 
                :dataCentro="dataCentro" 
                :dataServicio="dataServicio" 
                :dataDiagnostico="dataDiagnostico"
                :dataDoctor="dataDoctor"
              />
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
    
    <!-- RESULTADO DE LA BUSQUEDA -->
    <v-flex sm12>
      <h3>Resultado de Laboratorios</h3>
    </v-flex>
    <v-flex lg12>
      <v-data-table
        :headers="basic.headers"
        :items="basic.items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.centro.centro }} - {{ props.item.servicio.servicio }}</td>
          <td>{{ props.item.diagnostico.diagnostico }}</td>
          <td>{{ props.item.doctore.nombres }} {{ props.item.doctore.paterno }} {{ props.item.doctore.materno }}</td>
          <td>{{ fechaFormato(props.item.fecha_recep) }}</td>
          <td class="text-xs-center">
            <span v-if="props.item.estado">PENDIENTE DE DIAGNOSTICO</span>
            <span v-else>DIAGNOSTICADO</span>
          </td>

          <td class="text-xs-center">
            <!-- SECCION DE MODIFICAR RECEPCION DE LABORATORIO -->
            <modificarForm
              v-if="$strapi.user.role.name === 'Secretaria'"  
              :id="props.item.id" 
              :dataCentro="dataCentro" 
              :dataServicio="dataServicio" 
              :dataDiagnostico="dataDiagnostico"
              :dataDoctor="dataDoctor"
            />
            <!-- SECCION DE ELIMINAR RECEPCION DE LABORATORIO -->
            <eliminarForm
              v-if="$strapi.user.role.name === 'Secretaria'" 
              :id="props.item.id" />
            <!-- SECCION DE AGREGAR DIAGNOSTICO -->

            <resultadoForm
              v-if="$strapi.user.role.name === 'Doctor'" 
              :id="props.item.id" 
              :dataDiagnostico="dataDiagnostico"
            />
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </div>
</template>

<script>
import eliminarForm from '@/components/recepcion/eliminarForm'
import modificarForm from '@/components/recepcion/modificarForm'
import nuevoForm from '@/components/recepcion/nuevoForm'
import resultadoForm from '@/components/resultado/nuevoForm'

export default {
  components: {
    modificarForm,
    eliminarForm,
    nuevoForm,
    resultadoForm
  },
  data() {
    return {
      centro: '',
      fecha: '',
      // Calendario
      date: null,
      menu: false,
      modal: false,
      dataRecepcion: {
        persona: "",
        centro: "",
        servicio: "",
        diagnostico: "",
        doctore: "",
        fecha_recep: ""
      },
      dataPersona: [],
      dataCentro: [],
      dataServicio: [],
      dataDoctor: [],
      dataDiagnostico: [],
      nuevo: {
        dialog: false
      },
      modificar: {
        dialog: false
      },
      basic: {
        headers: [
          {
            text: 'Centro de Salud - Servicio',
            align: 'left',
            sortable: false,
            value: 'Centro de Salud'
          },
          {
            text: 'Diagnostico',
            align: 'left',
            sortable: false,
            value: 'diagnostico'
          },
          {
            text: 'Doctor Asignado',
            align: 'left',
            sortable: true,
            value: 'nombres'
          },
          {
            text: 'Fecha Recpeción',
            align: 'left',
            sortable: true,
            value: 'fecha_recep'
          },
          {
            text: 'Estado',
            align: 'center',
            sortable: false,
            value: 'estado'
          },
          {
            text: 'Acciones',
            align: 'center',
            sortable: false
          }
        ],
        items: [ ]
      }
    };
  },
  async mounted() {
    let res = await this.$strapi.$personas.find( { id: this.$route.params.id} );
    this.dataPersona = res[0];
    console.log(this.dataPersona)
    
    let resp = await this.$strapi.$centros.find();
    this.dataCentro = resp;

    let respo = await this.$strapi.$servicios.find();
    this.dataServicio = respo;

    let respon = await this.$strapi.$diagnosticos.find();
    this.dataDiagnostico = respon;

    let respons = await this.$strapi.$doctores.find()
    for (var i in respons) {
      var completo = respons[i].nombres + " " + respons[i].paterno + " " + respons[i].materno;
      respons[i].completo = completo;
    }
    this.dataDoctor = respons;
  },
  methods: {
    async onSearch() {
      if (this.centro != "" && this.date != null) {
        const h = await this.$strapi.$histopatologias.find( { persona: this.$route.params.id, centro: this.centro, fecha_recep: this.date } );
        this.basic.items = h;
      } else {
        const h = await this.$strapi.$histopatologias.find( { persona: this.$route.params.id } );
        this.basic.items = h;
      }
    },
    fechaFormato(fecha) {
      var info = fecha.split('-').reverse().join('/');
      return info;
    }
  }
};
</script>
