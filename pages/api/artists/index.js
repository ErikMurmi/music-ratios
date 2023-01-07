import { collection, getDocs, addDoc, doc, getDoc, setDoc, QuerySnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/client";

const Collections = {
    USERS: 'users',
    ARTISTS: 'artists'
}

export default async function handler(req, res) {
    const { method, body } = req
    switch (method) {
        // case 'GET':
        //     const sol = await getAllUsers()
        //     return res.status(200).json(sol)
        case 'POST':
            console.log("body ", body)
            const result = await addDoc(collection(db,Collections.ARTISTS),body)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg: 'This method does not exits'
            })
    };
}