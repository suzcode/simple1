<template>
    <div>
      <div id="GoogleSignInWithPopup" v-if="!isSignedIn">
        <button @click="signIn">Sign in with Google</button>
      </div>
      <div>
        <h3 v-if="user">Signed in User {{ user }}</h3>
        <h3 v-if="uid"> uid {{ uid }}</h3>
      </div>
    </div>
    <div id="logout" v-if="isSignedIn">
            <button @click="logout">Logout</button>
    </div>
</template>
  
<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, defineProps } from "vue";
import { useRouter } from 'vue-router';
import app from "@/firebase/init.js";
import axios from "axios";

// define Prop for profile pic used in NavBar.vue
defineProps({
  userProfileString: String
});

const userProfileString = ref(null);
const auth = getAuth(app);
const isSignedIn = ref(false);
const user = ref(null);
const uid = ref(null);
const photoURL = ref(null);
const responseData = ref(null);

// url for kubernetes backend
const url = "http://34.31.236.147/updateusers";

const provider = new GoogleAuthProvider();

const signIn = () => {
signInWithPopup(auth, provider)
    .then((result) => {
        const userCredential = result;
        const user = userCredential.user;
        const { displayName, uid } = user;

        console.log("Sign-in provider: Google");
        console.log("user: ", user);
        console.log("  Name: " + displayName);
        console.log("  UID: " + uid);

        isSignedIn.value = true;

        // Add user to Users subcollection
        addUserToUsersSubcollection(uid, user, displayName);
    })
    .catch((error) => {
    console.error("Sign-in error:", error.message);
    // You may want to display this error message to the user
    });
};
  
function addUserToUsersSubcollection(uid, user, displayName) {
    var userDetails = {};
    var userDetailsDict_json = ref(null);
    var userDetailsDict = {};
    // Check is subscriber document exists for the current user
    console.log("User added to Users subcollection under default Subscriber as uid");
    console.log("uid: ", uid);
    console.log("displayName: ", displayName);
    console.log("user: ", user);
    userDetails = {
        uid: uid,
        displayName: displayName,
    };
    console.log("userDetails: ", userDetails);
    userDetailsDict["entries"] = userDetails;
    console.log("userDetailsDict", userDetailsDict);
    userDetailsDict_json = JSON.stringify(userDetailsDict);
    console.log("data is as follows", userDetailsDict_json);
    sendUser(userDetailsDict_json);
};

// This function posts the logged in user info to the python backend
function sendUser(userDetailsDict_json) {
  axios
    .post(url, userDetailsDict_json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("OK", response.data);
      responseData.value = response.data;
      return responseData;
    })
    .catch((error) => {
      console.log("ERROR", error);
      if (error.response) {
        console.log("Server responded with a non-2xx status", error.response.data);
      }
      console.log('response is ', responseData);
      throw error;  // Re-throw the error to propagate it to the calling code
    });
}

function handleAuthStateChanged(currentUser)  {
    if (currentUser) {
        // user is signed in
        user.value = currentUser.displayName;
        uid.value = currentUser.uid;
        userProfileString.value = currentUser.photoURL;
        isSignedIn.value = true;
    } else {
        // not signed in
        user.value = null;
        uid.value = null;
        userProfileString.value = null;
        isSignedIn.value = false;
    }
};

onAuthStateChanged(auth, handleAuthStateChanged);

function logout() {
    signOut(auth)
        .catch((error) => {
            console.log(error);
        });
}

// Navigate to App.vue with userProfileString as query parameter
const router = useRouter();
router.push({ name: 'app', query: { userProfileString } });

</script>