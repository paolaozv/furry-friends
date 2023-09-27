import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";

// Initialize Cloud Auth Firestore and get a reference to the service
const auth = getAuth(firebase_app);

/**
 * Log in to a user account
 * @param {string} email - user email
 * @param {string} password - user password
 */
export default async function signIn(email, password) {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
	} catch(error) {
		return error;
	}
}