<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
            <nuevoForm />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import nuevoForm from '@/components/centro/nuevoForm'

  export default {
    components: {
      nuevoForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
