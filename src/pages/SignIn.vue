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
</template>
  
<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import app from "@/firebase/init.js";

const auth = getAuth(app);
const isSignedIn = ref(false);
const user = ref(null);
const uid = ref(null);
const userDetails = ref(null);
let userDetailsDict_json = ref(null);

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
        // user.value = displayName;
        // uid.value = uid;

        // Add user o Users subcollection
        addUserToUsersSubcollection(uid, user, displayName);
    })
    .catch((error) => {
    console.error("Sign-in error:", error.message);
    // You may want to display this error message to the user
    });
};
  
const addUserToUsersSubcollection = async (uid, user, displayName) => {
    // Check is subscriber document exists for the current user
    console.log("User added to Users subcollection under default Subscriber as uid");
    console.log("uid: ", uid);
    console.log("displayName: ", displayName);
    console.log("user: ", user);
    userDetails = {
        uid: uid,
        displayName: displayName,
    };
    userDetailsDict = {};
    userDetailsDict["entries"] = userDetails;
    console.log("userDetailsDict", userDetailsDict);
    userDetailsDict_json.value = JSON.stringify(userDetailsDict);
    console.log("data is as follows", userDetailsDict_json.value);
};


onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
        currentUser.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Name: " + profile.displayName);
        user.value = profile.displayName;
        uid.value = profile.uid;
        isSignedIn.value = true;
        });
    } else {
        user.value = null;
        uid.value = null;
        isSignedIn.value = false;
    }
});

</script>