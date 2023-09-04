import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function deleteAPetProfile(id) {
  try {
    await deleteDoc(doc(db, "pets", id));
  } catch (error) {
    console.log(error);
  }
}