import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import firebase_app from "../config";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(email, password, firstName, lastName, role) {
	await createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			return await setDoc(doc(db, "users", userCredential.user.uid), {
				email,
				firstName,
				lastName,
				role
			})
		});
}