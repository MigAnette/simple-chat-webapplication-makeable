const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.censorCompanies = functions.firestore
    .document("messages/{messageId}")
    .onCreate((snap, context) => {
      const companies = ["microsoft", "google", "apple"];
      const newValue = snap.data();
      const message = newValue.message;
      // const id = snap.id;

      let sentence = "";
      const regex = new RegExp(`\\b(${companies.join("|")}\\b)`, "gi");
      sentence = message.replace(regex, "");

      return admin.firestore()
          .collection("messages")
          .doc(context.params.messageId)
          .update({message: sentence});
    });
