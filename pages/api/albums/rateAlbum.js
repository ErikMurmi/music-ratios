import { collection, getDocs, addDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "config/client";

const Collections = {
    USERS: 'users',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}

export default async function rateAlbum(req,res){
    const {id,rate} = req.body
    console.log('body: ', req.body )
    let album = null
    if(!id){
        res.status(400).send("Se debe enviar un id")
        return
    }

    const albumRef = doc(db, Collections.ALBUMS, id);
    const docSnap = await getDoc(albumRef);
    if (docSnap.exists()) {
        album = docSnap.data();
        console.log("document: ", album);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    const newRating = (album.ratingSum + parseInt(rate) )/ (album.votes + 1)
    
    // Set the "capital" field of the city 'DC'
    const result = await updateDoc(albumRef, {
        votes: increment(1),
        ratingSum: album.ratingSum + parseInt(rate),
        rating: newRating
    }); 
    return res.status(200).json(result)
}