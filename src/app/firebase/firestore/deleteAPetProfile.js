import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Deletes a pet profile
 * @param {string} id - pet id
 */
export default async function deleteAPetProfile(id) {
  try {
    await deleteDoc(doc(db, "pets", id));
  } catch (error) {
    console.log(error);
  }
}