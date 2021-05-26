<template>
  <v-container>
    <v-row>
      <v-text-field
        v-model="content"
        @click:append-outer="onSubmit"
        v-on:keyup.enter="onSubmit"
        :append-outer-icon="'mdi-send'"
        solo
        outlined
        flat
        type="text"
      ></v-text-field>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "InputMessage",
  data() {
    return {
      content: ''
    };
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.content);
      this.content = '';
    }
  }
};
</script>

<style>
</style>
