import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function requestForAdoption(idPet, userInfo, uid, rescueGroupId) {

  try {
    const userRef = doc(db, "users", uid);
    const response = await addDoc(collection(db, "requestsforadoption"), {
      idPet,
      rescueGroupId,
      applicant: `${userInfo.firstName} ${userInfo.lastName}`,
      applicantEmail: userInfo.email
    });
    const responseUpdate = await updateDoc(userRef, {
      requests: arrayUnion(idPet)
    });
    
    return { response, responseUpdate };
  } catch (error) {
    console.log(error);
  }
}
