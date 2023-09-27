import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Retrieves all pets that belongs to its creator
 * @param {string} uid - user id
 * @returns all pets
 */
export default async function getPetsByUid(uid) {
  try {
    const q = query(collection(db, "pets"), where("uid", "==", uid));
    const response = await getDocs(q);
    return response;
  } catch (error) {
    console.log(error);
  }
};
