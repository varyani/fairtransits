// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAgOqIIE2Tac-Vp-f_BmwnwHekOht1UL_Q",
//   authDomain: "react-getting-started-a6b43.firebaseapp.com",
//   databaseURL: "https://react-getting-started-a6b43-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "react-getting-started-a6b43",
//   storageBucket: "react-getting-started-a6b43.appspot.com",
//   messagingSenderId: "1069584237005",
//   appId: "1:1069584237005:web:56660d5383057b13530484"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAHaGqhba8FU0LiAo8MS5gZQGOEEDPxa4c",
  authDomain: "fairtransits.firebaseapp.com",
  databaseURL: "https://fairtransits-default-rtdb.firebaseio.com",
  projectId: "fairtransits",
  storageBucket: "fairtransits.appspot.com",
  messagingSenderId: "1076727764820",
  appId: "1:1076727764820:web:d860e62e0fc656f024dac1",
  measurementId: "G-N6W95KS52S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
