import 'firebase/app'
import {initializeApp} from 'firebase/app'

import 'firebase/storage'
import { getStorage, ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDA-CIl_1vICWfs1mGxrKxo0JRZ6PXxdy4",
    authDomain: "pdf-project-e7477.firebaseapp.com",
    projectId: "pdf-project-e7477",
    storageBucket: "pdf-project-e7477.appspot.com",
    messagingSenderId: "1060908769529",
    appId: "1:1060908769529:web:db131170617a3cc3124228",
    measurementId: "G-YCR73ZWH3N"
})

const storage = getStorage(firebaseConfig);

export async function AllListed(folder) {
    // Create a reference under which you want to list
    const listRef = ref(storage, folder);
    try {
      // Find all the prefixes and items.
      const res = await listAll(listRef);
      const itemsWithMetadata = await Promise.all(
        res.items.map(async (itemRef) => {
            const fullPath = itemRef.fullPath;
            const downloadURL = await getDownloadURL(ref(storage, fullPath));
          const metadata = await getMetadata(itemRef);
          return { itemRef, metadata, downloadURL  };
        })
      );
    //  itemsWithMetadata.map((res)=>(console.log("res: ", res)))
      return itemsWithMetadata;
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      return [];
    }
  }

export default storage;