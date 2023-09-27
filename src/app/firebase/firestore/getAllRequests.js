import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Retrieves all applications for adoption
 * @param {string} uid - user id
 * @returns all applications
 */
export default async function getAllRequests(uid) {
  try {
    const q = query(collection(db, "requestsforadoption"), where("rescueGroupId", "==", uid));
    const response = await getDocs(q);
    return response;
  } catch (error) {
    console.log(error);
  }
};
