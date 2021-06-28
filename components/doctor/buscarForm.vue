<template>
  <div>
    <v-card>
      <v-toolbar card prominent color="primary" dark="">
        <v-toolbar-title class="body-2">Buscar Doctores</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex lg10 sm10>
                <v-text-field label="Doctor" name="doctor" v-model="search">
                </v-text-field>
              </v-flex>
              <v-flex lg2>
                <v-btn depressed outline icon fab dark color="info" small @click="onSearch">
                  <v-icon>search</v-icon>
                </v-btn>
                <!-- <v-btn color="info">Buscar</v-btn> -->
                <v-btn depressed outline icon fab dark color="success" small @click="onAdd">
                  <v-icon>add</v-icon>
                </v-btn>
                <!-- <v-btn color="success">Agregar</v-btn> -->
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
      
      <v-flex sm12>
        <h3>Resultado Doctores</h3>
      </v-flex>
      <v-flex lg12>
        <v-data-table
          :headers="basic.headers"
          :items="basic.items"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.nombres }}</td>
            <td>{{ props.item.paterno }}</td>
            <td>{{ props.item.materno }}</td>
            <td class="text-xs-center">{{ props.item.mat_prof }}</td>
            <td class="text-xs-center">
              <span v-if="props.item.estado">ACTIVADO</span>
              <span v-else>DESACTIVADO</span>
          </td>
            <td class="text-xs-center">
              <v-btn depressed outline icon fab dark color="warning" small @click="onEdit(props.item.id)">
                <v-icon>edit</v-icon>
              </v-btn>
              <eliminarForm :id="props.item.id" />
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </div>
</template>

<script>
import eliminarForm from '@/components/doctor/eliminarForm'
import axios from 'axios'

export default {
  components: {
    eliminarForm
  },
    data() {
      return {
        search: '',
        basic: {
          headers: [
            {
              text: 'Nombre',
              align: 'left',
              sortable: false,
              value: 'nombre'
            },
            {
              text: 'Paterno',
              align: 'left',
              sortable: false,
              value: 'paterno'
            },
            {
              text: 'Materno',
              align: 'left',
              sortable: false,
              value: 'materno'
            },
            {
              text: 'Matricula', 
              align: 'center',
              value: 'mat_prof'
            },
            {
              text: 'Estado', 
              align: 'center',
              value: 'estado'
            },
            {
              text: 'Acciones',
              align: 'center'
            }
          ],
          items: [ ]
        }
      };
    },
    methods: {
      onAdd() {
        this.$router.push('/doctor/nuevo');
      },
      onEdit(id) {
        this.$router.push('/doctor/' + id);
      },
      onSearch() {
        if (this.search != ""){
          axios.get('http://173.16.1.67:1337/doctor/' + this.search)
            .then(result => (this.basic.items = result.data))
            .catch(e => console.log(e));
        } else {
          axios.get('http://173.16.1.67:1337/doctores/')
            .then(result => (this.basic.items = result.data))
            .catch(e => console.log(e));
        }
      }
    }
  };
</script>
