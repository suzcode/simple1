<template>
    <div>
        <h1>Profile</h1>
        <!-- <div id="GoogleSignIn" v-if="!isSignedIn">
            <h3>Google Sign In</h3>
            <button @click="handleSignInGoogle">Login</button>
        </div> -->
        <div id="GoogleSignInWithPopup" v-if="!isSignedIn">
            <h3>Google Sign In page</h3>
            <button @click="handleSignInGooglePopup">Login with Popup placeholder</button>
        </div>
        <div id="logout" v-if="isSignedIn">
            <button @click="signOut">Logout</button>
        </div>
        <div>
            <h3>Signed in User {{ user }}</h3>
            <h3>Result {{ result }}</h3>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { ref } from "vue";
import app from "@/firebase/init.js";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const user = ref(null);
const isSignedIn = ref(false);
const result = ref(null);
const userProfile = ref(null);


signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(result);
        isSignedIn = true;
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(error);
    });


</script>