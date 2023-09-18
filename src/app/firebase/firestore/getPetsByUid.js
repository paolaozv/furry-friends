import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getPetsByUid(uid) {
  try {
    const q = query(collection(db, "pets"), where("uid", "==", uid));
    const response = await getDocs(q);
    return response;
  } catch (error) {
    console.log(error);
  }
};
