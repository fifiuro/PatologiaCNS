<template>
    <v-dialog v-model="basic.dialog" persistent max-width="500px">
        <v-btn depressed outline icon fab dark color="error" small slot="activator">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Eliminar Doctor</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <h3>¿Esta seguro de eliminar al Doctor?</h3>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">NO</v-btn>
                <v-btn color="blue darken-1" flat @click.native="basic.dialog = false" @click="onDelete">SI</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'

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
      }
    };
  },
  props: ["id"],
  computed: {},
  methods: {
    onDelete() {
      //console.log("Este es para eliminar!!!" + this.id);
      axios.delete('http://173.16.1.67:1337/doctores/' + this.id)
        .then(result => { this.$router.push('/dashboard') })
        .catch(e => console.log(e))
    }
  }
};
</script>
