<template>
    <div>
        <h1>Profile</h1>
        <!-- <div id="GoogleSignIn" v-if="!isSignedIn">
            <h3>Google Sign In</h3>
            <button @click="handleSignInGoogle">Login</button>
        </div> -->
        <div id="GoogleSignInWithPopup" v-if="!isSignedIn">
            <h3>Google Sign In with Popup</h3>
            <button @click="handleSignInGooglePopup">Login with Popup</button>
        </div>
        <div id="logout" v-if="isSignedIn">
            <button @click="signOut">Logout</button>
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

// signInWithRedirect(auth, provider);

// function handleSignInGoogle() {
//     getRedirectResult(auth)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access Google APIs.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;

//             // The signed-in user info.
//             const user = result.user;
//             auth.preventDefault();
//             // IdP data available using getAdditionalUserInfo(result)
//             // ...
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
// }

Google popup initiated
function handleSignInGooglePopup() {
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
}

// signInWithPopup(auth, provider)
//     .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         console.log(result);
//         isSignedIn = true;
//     }).catch((error) => {
//         const errorMessage = error.message;
//         console.log(error);
//     });

// Sign out user
function signOut() {
    signOut(auth)
        .then(() => {
            user = null;
            isSignIn = false;
        }).catch((error) => {
            console.log(error);
        });
        router.push("/");
}
</script>
