import { collection, collec, doc,deleteDoc, } from "firebase/firestore";
import { db } from "config/client";
const Collections = {
    USERS: 'users',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}

export default handler=async(req,res) =>
{
    const {method,body,query:{id}} = req
    switch(method){
        case "DELETE":
            try{
                const result = await deleteDoc(doc(db,Collections.ARTISTS,id))
                return res.status(204).json(result)
            }catch(error){
                return res.status(400).json({msg: error.message})
            }
        default:
            return res.status(400).json({msg:"This method is not available"})
    }
}