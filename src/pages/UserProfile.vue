<template>
    <div>
        <h1>Profile</h1>
        <div id="GoogleSignIn" v-if="!isSignedIn">
            <h3>Google Sign In</h3>
            <button @click="handleSignInGoogle">Login</button>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider
const auth = getAuth();

const user = '';
const isSignIn = false;

function handleSignInGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
            isSignedIn = true;
        }).catch((error) => {
            console.log(error);
        });
}

function signOut() {
    signOut(auth)
        .then(() => {
            user = '';
            isSignIn = false;
        }).catch((error) => {
            console.log(error);
        });
}



</script>
