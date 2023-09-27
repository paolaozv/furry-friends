import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase_app from "../config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebase_app);

/**
 * Creates a pet profile function
 * @param {string} name - pet name
 * @param {int} age - pet age
 * @param {string} breed - pet breed
 * @param {file} photo - pet photo
 * @param {string} description - pet description
 * @param {string} uid - user id who creates a pet profile
 * @returns an object with pet data and the photo pet link.
 */
export default async function createPetProfile(name, age, breed, photo, description, uid) {
  const imageRef = ref(storage, `furry-friends/images/${name}`);

  try {
    const result = await uploadBytes(imageRef, photo);
    const url = await getDownloadURL(result.ref);
    const doc = await addDoc(collection(db, "pets"), {
      uid,
      name,
      age,
      breed,
      photo: url,
      description
    });
    
    return { doc, url };
  } catch (error) {
    console.log(error);
  }
}
