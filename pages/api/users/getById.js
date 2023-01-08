import { collection, getDocs, addDoc, doc, getDoc, where, query } from "firebase/firestore";
import { db } from "../../../config/client";

const Collections = {
    USERS: 'users',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}

export default async function getUser(req,res) {
    const {id} = req.query 
    // const docRef = doc(db, Collections.USERS, id)
    // const docSnap = await getDoc(docRef)
    // let user = 'none' 
    // if (docSnap.exists()) {
    //     user = docSnap.data()
    // } 

    const usersRef = collection(db, Collections.USERS);

    // Create a query against the collection.
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs[0].data()

    return res.status(200).json(result)
}