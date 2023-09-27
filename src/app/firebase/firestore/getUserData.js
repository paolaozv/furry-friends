import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Retrieves user data
 * @param {string} collection - firebase collection
 * @param {string} id - user id
 * @returns user data
 */
export default async function getUserData(collection, id) {
	const docRef = doc(db, collection, id);

	try {
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.log(error);
	}
};
