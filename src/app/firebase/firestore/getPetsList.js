import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getPetsList() {
  try {
    const result = await getDocs(collection(db, "pets"));
    return result;
  } catch (error) {
    console.log(error);
  }
};
