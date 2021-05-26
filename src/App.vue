<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-row>
        <v-col :cols="3">
          <h3 v-if="signedIn"> {{ name }} </h3>
        </v-col>
        <v-col :cols="3">
          <v-btn v-if="signedIn" @click="signOut">Log Out</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  
    <v-main v-if="signedIn">
      <div class="message-field">
      <InputMessage @onSubmit="submitMessage" />
      </div>
      <div class="overflow-y-auto message_board">
        <v-list rounded>
          <v-list-item-group class="message-grid">
            <Message v-for="message in messages" :key="message.id" :message="message" :name="name" />
          </v-list-item-group>
        </v-list>
      </div>
    </v-main>
    <UserInputs @allowUser="allowUser" v-else />

  </v-app>
</template>

<script>
import Message from './components/Message.vue';
import InputMessage from './components/InputMessage.vue';
import UserInputs from './components/UserInputs.vue';
import db from '../src/firebase/init';
import firebase from 'firebase/app';
require('firebase/auth');

export default {
  name: 'App',

  components: {
    Message,
    InputMessage,
    UserInputs,
  },

  data: () => ({
    messages: [],
    name: '',
    signedIn: false,
  }),
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.signedIn = false;
      }).catch(err => {
        console.error(err);
      })
    },
    allowUser(user) {
      if (user || this.currentUser) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    },
    submitMessage(message) {
      const now = new Date();
      db.collection('messages').add({
        message,
        author: this.currentUser.displayName,
        created_at: db.app.firebase_.firestore.Timestamp.fromDate(now),
        authorID: this.currentUser.uid
      })
    },
    getMessages() {
      db.collection('messages').orderBy('created_at', 'desc').onSnapshot(snapshot => {
          const messages = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            messages.push(data);
            this.messages = messages;
          })
      }, err => {
        console.error(err);
      })
    },
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser
    }
  },
  created() {
    this.getMessages();
    this.allowUser();
    
    console.log(this.currentUser);
    console.log(this.messages);
  },
  mounted() {
    this.name = this.currentUser.displayName;
  }

};
</script>

<style>
  .message-grid {
    display: grid;
  }
  .message_board {
    height: 63vh;
  }
  .message-field {
    margin: 20px;
  }
</style>
