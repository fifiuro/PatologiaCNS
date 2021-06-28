<template>
    <v-dialog v-model="basic.dialog" persistent max-width="500px">
        <v-btn depressed outline icon fab dark color="error" small slot="activator">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Eliminar histopatologia</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <h3>¿Esta seguro de eliminar la Histopatologia?</h3>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">NO</v-btn>
                <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">SI</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import VWidget from '@/components/VWidget';

  export default {
    components: {
      VWidget
    },
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
        }
      };
    },
    computed: {},
    methods: {}
  };
</script>
