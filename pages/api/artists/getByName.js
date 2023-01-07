import { collection, getDocs, addDoc, doc, getDoc, where, query } from "firebase/firestore";
import { db } from "config/client";
const Collections = {
    USERS: 'users',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}

export default async function getByName(req,res){
    //console.log('query :' ,req)
    const {name} = req.query
    if(!name){
        res.status(400).send("Se debe enviar un nombre")
        return
    }
    const artistsRef = collection(db, Collections.ARTISTS);

    // Create a query against the collection.
    const q = query(artistsRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs[0].data()
    return res.status(200).json(result)
}