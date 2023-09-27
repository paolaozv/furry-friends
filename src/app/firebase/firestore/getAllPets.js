import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Retrieves all pets available for adoption
 * @returns the list of pets
 */
export default async function getAllPets() {
  try {
    const response = await getDocs(collection(db, "pets"));
    return response;
  } catch (error) {
    console.log(error);
  }
};