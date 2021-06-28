<template>
  <v-app id="login" class="" style="background: #085148">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/CNS.jpeg" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text" style="text-align: center; color: #085148 !important">Patología - Hospital Obrero N° 1</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Correo Electrónico" type="text"
                                v-model="model.identifier"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Contraseña" id="password" type="password"
                                v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="" style="background-color: #085148; color: white" @click="login" :loading="loading">INGRESAR</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'default',
    data: () => ({
      loading: false,
      model: {
        identifier: '',
        password: ''
      }
    }),

    methods: {
      async login() {
        this.loading = true;
        try {
          const user = await this.$strapi.login(this.model)
          this.$router.push('/dashboard');
          console.log(user)
        } catch (error) {
          this.error = 'Error al comprobar las credenciasles.'
          console.log(this.error)
          this.loading = false
        }
        
        // setTimeout(() => {
        //   this.$router.push('/dashboard');
        // }, 1000);
      }
    },
    middleware: 'authenticated',

  };
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
