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
import { getFirestore, collection, doc, setDoc, addDoc, query, where, getDocs } from "firebase/firestore";

const auth = getAuth(app);
const isSignedIn = ref(false);
const user = ref(null);
const uid = ref(null);

const provider = new GoogleAuthProvider();
const db = getFirestore();

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

        // Add user o Users subcollection
        addUserToUsersSubcollection(uid, user);
    })
    .catch((error) => {
    console.error("Sign-in error:", error.message);
    // You may want to display this error message to the user
    });
};
  
const addUserToUsersSubcollection = async (uid, user) => {
    // Check is subscriber document exists for the current user
    const subscriberQuery = query(collection (db, "subscribers"), where("uid", "==", uid));
    const querySnapshot = await getDocs(subscriberQuery);

    if (querySnapshot.empty) {
        // Subscriber document doesn't exist, create a default one
        const defaultSubscriberData = {
            name: "Default Subscriber",
        };

        try {
            const docRef = await addDoc(collection(db, "subscribers"), defaultSubscriberData);
            console.log("Default Subscriber document created with ID: ", docRef.id);

            // Now add the user to the Users subcollection under the newly created default Subscriber
            const userRef = doc(db, "subscribers", docRef.id, "users", uid);
            await setDoc(userRef, {
                email: user.email,
                name: user.displayName,
                status: "user",
            });

            console.log("User added to Users subcollection under default Subscriber");
        } catch (error) {
            console.error("Error creating default Subscriber document:", error);
        }
    }

} else {
    // Subscriber document exists, add user to Users subcollection
    query.Snapshot.forEach((doc) => {
        const subscriberId = doc.id;
        const userRef = doc(db, "subscribers", subscriberId, "users", uid);

        setDoc(userRef, {
            email: user.email,
            name: user.displayName,
            status: "user", // default status
        })
            .then(() => {
                console.log("User added to Users subcollection");
            })
            .catch((error) => {
                console.error("Error adding user to Users subcollection:", error);
            });
    });
}

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