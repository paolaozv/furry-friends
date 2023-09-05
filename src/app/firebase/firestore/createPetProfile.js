import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase_app from "../config";

const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);

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
