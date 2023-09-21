import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import firebase_app from "../config";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

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