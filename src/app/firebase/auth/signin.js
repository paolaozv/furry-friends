import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
		}).catch((error) => {
			const errorCode = error.code;
    	const errorMessage = error.message;
		});
}