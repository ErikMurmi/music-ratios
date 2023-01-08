import { collection, getDocs, addDoc, doc, getDoc, setDoc, QuerySnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/client";

const Collections = {
    USERS: 'users',
    BADGES: 'badges'
}

export default async function handler(req, res) {
    const { method, body } = req
    switch (method) {
        case 'GET':
            const sol = await getAllUsers()
            return res.status(200).json(sol)
        case 'POST':
            console.log("body ", body)
            body.role = "user"
            const result = await addDoc(collection(db,Collections.USERS),body)
            //const result = await getUser(body.id)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg: 'This method does not exits'
            })
    };
}