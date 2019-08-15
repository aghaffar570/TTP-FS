import firebase from 'firebase'
import fire from '../secret'

const firebaseConfig = {
  apiKey: fire.apiKey,
  authDomain: fire.authDomain,
  databaseURL: fire.databaseURL,
  projectId: fire.projectId,
  storageBucket: fire.storageBucket,
  messagingSenderId: fire.messagingSenderId,
  appId: fire.appId,
};

export default firebase.initializeApp(firebaseConfig)
