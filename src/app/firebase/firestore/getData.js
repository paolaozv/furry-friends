import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getDocumentData(collection, id) {
	const docRef = doc(db, collection, id);

	try {
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.log(error);
	}
	
	// await getDoc(docRef).then((response) => {
	// 	console.log(response.data());
	// 	return response.data();
	// }).catch((error) => {
	// 	console.log(error);
	// });
};
