import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Auth Firestore and get a reference to the service
const auth = getAuth(firebase_app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Creates a user account
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} firstName - user firstname
 * @param {string} lastName - user lastname
 * @param {string} role - user role
 * @returns user information
 */
export default async function signUp(email, password, firstName, lastName, role) {
	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		await setDoc(doc(db, "users", response.user.uid), {
			email,
			firstName,
			lastName,
			role
		});
	} catch(error) {
		return error;
	}
}