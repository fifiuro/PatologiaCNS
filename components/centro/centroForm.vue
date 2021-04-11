<template>
    <div>
        <v-card>
            <v-toolbar card prominent color="primary" dark="">
                <v-toolbar-title class="body-2">Buscar Centros de Salud</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-layout row wrap>
                        <v-flex lg10 sm10>
                            <v-text-field label="Centro de Salud" name="centro" v-model="title">
                            </v-text-field>
                        </v-flex>
                        <v-flex lg2>
                            <v-btn depressed outline icon fab dark color="info" small>
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
            <h3>Resultado Centros de Salud</h3>
        </v-flex>
        <v-flex lg12>
            <v-data-table
                :headers="basic.headers"
                :items="basic.items"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.calories }}</td>
                    <td class="text-xs-center">
                        <v-btn depressed outline icon fab dark color="warning" small @click="onAdd">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <eliminarForm />
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </div>
</template>

<script>
import eliminarForm from '@/components/centro/eliminarForm'
import {Items as Users} from '@/api/user';


export default {
  components: {
    eliminarForm
  },
    data() {
      return {
        search: '',
        complex: {
          selected: [],
          headers: [
            {
              text: 'Avatar',
              value: 'avatar'
            },
            {
              text: 'Name',
              value: 'name'
            },
            {
              text: 'Email',
              value: 'email'
            },
            {
              text: 'Phone',
              value: 'phone'
            },
            {
              text: 'Action',
              value: ''
            },
          ],
          items: Users
        },
        basic: {
          headers: [
            {
              text: 'Nº',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            {
                text: 'Centro de Salud', 
                align: 'center',
                value: 'calories'
            },
            {
                text: 'Acciones',
                align: 'center'
            }
          ],
          items: [
            {
              value: false,
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: '1%'
            },
            {
              value: false,
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              iron: '1%'
            },
            {
              value: false,
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              iron: '7%'
            },
            {
              value: false,
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              iron: '8%'
            },
            {
              value: false,
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              iron: '16%'
            },
            {
              value: false,
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              iron: '0%'
            },
            {
              value: false,
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              iron: '2%'
            },
            {
              value: false,
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              iron: '45%'
            },
            {
              value: false,
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              iron: '22%'
            },
            {
              value: false,
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              iron: '6%'
            }
          ]
        }

      };
    },
    methods: {
        onAdd() {
            this.$router.push('/centros/nuevo');
        }
    }
  };
</script>
