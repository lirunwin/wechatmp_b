<template>
  <v-dialog ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px">
    <!-- <v-text-field slot="activator"
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="event"
                  readonly></v-text-field> -->
    <base-input slot="activator"
                v-model="date"
                readonly
                class="input-rtl px-0"></base-input>
    <v-date-picker v-model="date"
                   type="month"
                   locale="cn-ZH"
                   :max="new Date().toISOString().substr(0, 10)"
                   min="1950-01-01"
                   scrollable>
      <v-spacer></v-spacer>
      <v-btn flat
             color="primary"
             @click="modal = false">Cancel</v-btn>
      <v-btn flat
             color="primary"
             @click="$refs.dialog.save(date)">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    date: null,
    modal: false
  })
}
</script>
