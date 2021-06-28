<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
            <centroForm />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import centroForm from '@/components/centro/centroForm'

  export default {
    components: {
      centroForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
