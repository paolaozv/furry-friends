import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);

/**
 * Creates an application to adopt a pet
 * @param {string} idPet - pet id
 * @param {object} userInfo - information of applicant
 * @param {string} uid - applicant id
 * @param {string} rescueGroupId - rescuer id
 * @returns application information
 */
export default async function requestForAdoption(idPet, userInfo, uid, rescueGroupId) {

  try {
    const userRef = doc(db, "users", uid);
    const response = await addDoc(collection(db, "requestsforadoption"), {
      idPet,
      rescueGroupId,
      applicant: `${userInfo.firstName} ${userInfo.lastName}`,
      applicantEmail: userInfo.email
    });
    // Updates the adoptant firebase collection
    const responseUpdate = await updateDoc(userRef, {
      requests: arrayUnion(idPet)
    });
    
    return { response, responseUpdate };
  } catch (error) {
    console.log(error);
  }
}
