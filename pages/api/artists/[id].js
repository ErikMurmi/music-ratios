import { collection, collec, doc,deleteDoc, } from "firebase/firestore";
import { db } from "config/client";
const Collections = {
    USERS: 'users',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}

export default async(req,res) =>
{
    const {method,body,query:{id}} = req
    switch(method){
        // case "GET":
        //     try{
        //         const user = await User.findById(id)
        //         if(!user) return res.status(400).json({msg: "User not found"})
        //         return res.status(200).json(user)
        //     }catch(error){
        //         return res.status(500).json({msg:error.message})
        //     }  
        // case "PUT":
        //     try{
        //         const user = await User.findByIdAndUpdate(id,body,{
        //             new:true
        //         })
        //         if (!user) return res.status(404).json({msg: "User not found"})
        //         return res.status(200).json(user)
        //     }catch(error){
        //         return res.status(500).json({msg:error.message})
        //     }
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