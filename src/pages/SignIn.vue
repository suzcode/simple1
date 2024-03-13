<template>
    <div>
      <h1>Sign In</h1>
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, watchEffect } from "vue";
import app from "@/firebase/init.js";

const auth = getAuth(app);
const isSignedIn = ref(false);
const user = ref(null);
const uid = ref(null);

const provider = new GoogleAuthProvider();

const signIn = () => {
signInWithPopup(auth, provider)
    .then((result) => {
    const userCredential = result;
    const user = userCredential.user;
    const { displayName, uid } = user;

    console.log("Sign-in provider: Google");
    console.log("  Name: " + displayName);
    console.log("  UID: " + uid);

    isSignedIn.value = true;
    user.value = displayName;
    uid.value = uid;
    })
    .catch((error) => {
    console.error("Sign-in error:", error.message);
    // You may want to display this error message to the user
    });
};
  
onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
        currentUser.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
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