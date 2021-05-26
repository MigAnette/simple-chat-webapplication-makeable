<template>
  <v-layout align-center justify-center fill-height mx-7>

    <!-- LOGIN -->
    <v-flex xs12 sm6 md6 lg6 v-if="show">
    <v-btn @click="show = false">Signup</v-btn>
      <h1 class="text-xs-center hidden-md-and-down desktopH1">Login</h1>
      <!-- H1 for everything else: -->
      <h1 class="text-xs-center hidden-lg-and-up">Login</h1>
      <v-form class="px-3" ref="form">
        <v-text-field type="email" v-model="email" :rules="emailRules" label="Email:" required></v-text-field>

        <v-text-field type="password" v-model="password" :rules="passwordRules" :counter="6" label="Password:" required></v-text-field>


        <p v-if="feedback">{{ feedback }}</p>

        <div class="btnContainer">
          <v-btn @click="loginUser" color="teal white--text">Login</v-btn>
        </div>
      </v-form>
    </v-flex>

    <!-- SIGNUP -->
    <v-flex xs12 sm6 md6 lg6 v-else>
      <v-btn @click="show = true">Login</v-btn>
      <h1 class="text-xs-center hidden-md-and-down desktopH1">Sign Up</h1>
      <!-- H1 for everything else: -->
      <h1 class="text-xs-center hidden-lg-and-up">Sign Up</h1>
      <v-form class="px-3" ref="form">
        <v-text-field type="text" v-model="name" :rules="nameRules" label="Name:" required></v-text-field>
        <v-text-field type="email" v-model="email" :rules="emailRules" label="Email:" required></v-text-field>
        <v-text-field type="password" v-model="password" :rules="passwordRules" :counter="6" label="Password:" required></v-text-field>


        <p v-if="feedback">{{ feedback }}</p>

        <div class="btnContainer">
          <v-btn @click="signupUser" color="teal white--text">Signup</v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
// import db from '../firebase/init';
import firebase from 'firebase/app';
require('firebase/auth');

export default {
  name: 'UserInputs',
  data() {
    return {
      show: true,
      email: null,
      name: null,
      password: null,
      feedback: null,
      emailRules: [v => /.+@.+/.test(v) || "Email needs to be valid", v => !!v || "Email is required" ],
      passwordRules: [ v => !!v || "Password is required", v => v.length >= 6 || "Password needs to be least 6 characters long"],
      nameRules: [v => !!v || 'Name is required'],
    }
   },
   methods: {
     loginUser() {
       console.log(this.email, this.password);
       if (this.email && this.password) {
         firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
           this.$emit('allowUser', cred);
         }).catch(err => {
           this.feedback = err.message;
         });
         this.feedback = null;
       } else {
         this.feedback = 'Please fill out both fields';
       }
     },

     signupUser() {
       console.log(this.email, this.name, this.password);
       if (this.email && this.password && this.name) {
         firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(result => {
           result.user.updateProfile({
             displayName: this.name
           }).catch(err => {
             console.error(err);
           })
           this.$emit('allowUser', result);
         }).catch(err => {
             this.feedback = err.message;
           })
         this.feedback = null;
       } else {
         this.feedback = 'Please fill all fields';
       }
     }
   }
}
</script>

<style>

</style>
