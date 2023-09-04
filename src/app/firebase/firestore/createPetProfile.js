import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase_app from "../config";

const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);

export default async function createPetProfile(name, age, breed, photo, description) {
  const imageRef = ref(storage, `furry-friends/images/${name}`);
  try {
    const result = uploadBytes(imageRef, photo).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        return await addDoc(collection(db, "pets"), {
          name,
          age,
          breed,
          photo: url,
          description
        })
      });
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
