<template>
    <v-dialog v-model="basic.dialog" persistent max-width="500px">
        <v-btn depressed outline icon fab dark color="error" small slot="activator">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Eliminar Paciente</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <h3>¿Esta seguro de eliminar el Paciente?</h3>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click.native="basic.dialog = false">NO</v-btn>
                <v-btn color="success" @click.native="basic.dialog = false" @click="onDelete">SI</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
      }
    };
  },
  dataEliminar: [],
  props: ["id"],
  computed: {},
  methods: {
    async onDelete() {
      let res = await this.$strapi.$personas.delete(this.id)
      for (var b in res.beneficiarios) {
        let resp = await this.$strapi.$beneficiarios.delete(res.beneficiarios[0].id)
      }
      for (var h in res.histopatologias) {
        let respo = await this.$strapi.$histopatologias.delete(res.histopatologias[h].id)
      }
      this.$router.push('/paciente');
    }
  }
};
</script>
