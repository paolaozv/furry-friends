import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getAllRequests(uid) {
  try {
    const q = query(collection(db, "requestsforadoption"), where("rescueGroupId", "==", uid));
    const response = await getDocs(q);
    return response;
  } catch (error) {
    console.log(error);
  }
};
