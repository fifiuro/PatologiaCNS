<template>
    <nuxt-child />
</template>

<script>
    export default {
      layout: 'dashboard',
      middleware({ $strapi, redirect }) {
        if ($strapi.user === null) {
          redirect('/login')
        }
      },
    }
</script>

<style scoped>

</style>
