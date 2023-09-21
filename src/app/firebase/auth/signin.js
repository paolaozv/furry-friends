import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
	} catch(error) {
		return error;
	}
}