<template>
  <div>
    <v-card>
      <v-toolbar card prominent color="primary darken-2" dark="">
        <v-toolbar-title class="body-2">Buscar Pacientes</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex lg11 sm12>
              <v-text-field label="Paciente" name="paciente" v-model="search">
              </v-text-field>
            </v-flex>
            <v-flex lg1 sm12>
              <v-btn depressed outline icon fab dark color="info" small @click="onSearch">
                <v-icon>search</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>remove</v-icon>
              </v-btn>
              <v-btn v-if="$strapi.user.role.name === 'Secretaria'" depressed outline icon fab dark color="success" small @click="onAdd">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>        
        </v-form>
      </v-card-text>
    </v-card>

    <v-flex sm12>
      <h3>Resultado Pacientes</h3>
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
          <td>{{ props.item.matricula }}</td>
          <td>{{ props.item.sexo }}</td>
          <td class="text-xs-center">
            <!-- Boton Editar -->
            <v-btn v-if="$strapi.user.role.name === 'Secretaria'" depressed outline icon fab dark color="warning" small @click="onEdit(props.item.id)">
              <v-icon>edit</v-icon>
            </v-btn>
            <!-- Boton Eliminar -->
            <eliminarForm v-if="$strapi.user.role.name === 'Secretaria'" :id="props.item.id" />
            <!-- Boton Nuevo Loboratorio -->
            <v-btn depressed outline icon fab dark color="info" small @click="onRecepcion(props.item.id)">
              <v-icon>description</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </div>
</template>

<script>
import eliminarForm from '@/components/paciente/eliminarForm'

export default {
  components: {
    eliminarForm
  },
  data() {
    return {
      search: '',
      items: [],
      basic: {
        headers: [
          {
            text: 'Nombre',
            align: 'center',
            sortable: true,
            value: 'nombre'
          },
          {
            text: 'Paterno', 
            align: 'center',
            sortable: true,
            value: 'paterno'
          },
          {
            text: 'Materno', 
            align: 'center',
            sortable: true,
            value: 'materno'
          },
          {
            text: 'Matricula', 
            align: 'center',
            value: 'matricula'
          },
          {
            text: 'Sexo', 
            align: 'center',
            value: 'sexo'
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
      this.$router.push('/paciente/nuevo');
    },
    onEdit(id) {
      this.$router.push('/paciente/' + id);
    },
    async onSearch() {
      let response = await this.$strapi.$personas.find({ nombres_contains: this.search, _limit: 20 });
      this.basic.items = response;
    },
    onRecepcion(id) {
      this.$router.push('/recepcion/' + id);
    }
  }
};
</script>
