<template>
    <div id="page-forms">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg12>
                    <modForm />
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import modForm from '@/components/servicio/modificarForm'

export default {
    components: {
        modForm
    },
    data() {
        return {}
    }
}
</script>