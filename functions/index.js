const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((req, res) => {
  //response.send("Hello from Firebase!");
//});

exports.activeIndex = functions.https.onRequest((req, res) => {
  return admin.database().ref('/activeUserKey').transaction((theIndex) => {
    return theIndex + 1;
  }).then(() => {
    return res.end();
  })
});


exports.checkLength = functions.database.ref('/activeUserKey').onUpdate((change, context) => {
  return admin.database().ref('/usersLength').once('value', function(snap){
    const activeNumIndex = change.after.val() * 1;
    const usersLengthNum = snap.val() * 1 - 1;
    // console.log('active user index is ', activeNumIndex);
    // console.log('length of users is', usersLengthNum);

    if (activeNumIndex > usersLengthNum) {
      // console.log('change the value');
      admin.database().ref('/activeUserKey').set(0);
    }
  });
});

exports.updateLength = functions.database.ref('/users').onWrite((change, context) => {
  const usersLength = change.after.val().length;
  // Set users length on users array updated
  admin.database().ref('/usersLength').set(usersLength);

  return admin.database().ref('/activeUserKey').once('value', function(snap){
    const activeIndexVal = snap.val() * 1;
    const lastItem = usersLength * 1 -1;

    if (activeIndexVal > lastItem) {
      // Update active user index to last if index is more than total users when users is updated
      admin.database().ref('/activeUserKey').set(lastItem);
    }
  });
});
