import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3Y0mP4EixeSn67lTtwFGfzLUzusrRSmw",
  authDomain: "over-write-c2444.firebaseapp.com",
  projectId: "over-write-c2444",
  storageBucket: "over-write-c2444.appspot.com",
  messagingSenderId: "388914454516",
  appId: "1:388914454516:web:32eaa74a60416a2e9563a1",
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();

// import { useNavigate } from "react-router-dom";

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   apiKey: "AIzaSyB3Y0mP4EixeSn67lTtwFGfzLUzusrRSmw",
//   authDomain: "over-write-c2444.firebaseapp.com",
//   projectId: "over-write-c2444",
//   storageBucket: "over-write-c2444.appspot.com",
//   messagingSenderId: "388914454516",
//   appId: "1:388914454516:web:32eaa74a60416a2e9563a1",
// });
// Initialize Firebase Authentication and get a reference to the service

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogle = (cb) => {
//   signInWithPopup(auth, googleProvider)
//     .then((res) => {
//       console.log(res.user);
//       localStorage.setItem("gmailEmail", JSON.stringify(res.user.email));
//       localStorage.setItem("gmailName", JSON.stringify(res.user.displayName));
//       localStorage.setItem("gmailToken", JSON.stringify(res.user.accessToken));
//       cb(res.user);
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log(error.message);
//     });
// };

// export const signOutGoogle = (cb) => {
//   const auth = getAuth();
//   signOut(auth)
//     .then((res) => {
// Sign-out successful.
//   console.log({ res });
// })
// .catch((error) => {
// An error happened.
//     });
// };
