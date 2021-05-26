<template>
  <v-list-item class="message_outline" :class="{message_currentUser: userMessage}" inactive >
    <v-list-item-content :class="{textColor: userMessage}">
      <v-list-item-subtitle> {{ message.author }} </v-list-item-subtitle>
      <p> {{ message.message  }} </p>
      <v-list-item-subtitle> {{ formatDistanceToNow(message.created_at.toDate(), { addSuffix: true }) }} </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import firebase from 'firebase/app';
require('firebase/auth');

export default {
  props: [ 'message', 'name' ],
  name: 'Message',
  data() {
    return {
      formatDistanceToNow,
      userMessage: false,
    }
   },
   computed: {
    currentUser() {
      return firebase.auth().currentUser
    }
  },
   created() {
     if(this.message.authorID === this.currentUser.uid) {
       this.userMessage = true;
     }
   }
}
</script>

<style>
.message_outline {
  background-color: #e0e0e0;
  width: fit-content;
  max-width: 60%;
  justify-self: start;
}
.message_currentUser {
  background-color: #2196F3;
  color: white !important;
  width: fit-content;
  max-width: 60%;
  justify-self: end;
}
.textColor {
  color: white;
}
</style>
