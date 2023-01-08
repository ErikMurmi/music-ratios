// export const deleteUser = async(selectedUser)=>{
//     try{
//       await fetch(`http://localhost:3000/api/users/${selectedUser._id}`,{
//       method:"DELETE",})
//     }catch (error){
//       console.log(error)
//     }
// }

export const addArtist = async (newArtist)=>{
    try{
        const res = await fetch('http://localhost:3000/api/artists',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newArtist)
        })
        return res
    }catch(error){
        console.log(error)
    }
}

export const deleteArtist = async (id)=>{
    try{
        const res = await fetch('http://localhost:3000/api/artists/'+id,{
            method:'DELETE'
        })
        return res
    }catch(error){
        console.log(error)
    }
}

export const getArtists = async()=>{
    const res = await fetch("http://localhost:3000/api/artists")
    const data = await res.json()
    console.log('artist data', data)
    return data   
}
