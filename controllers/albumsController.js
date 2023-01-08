// export const deleteUser = async(selectedUser)=>{
//     try{
//       await fetch(`http://localhost:3000/api/users/${selectedUser._id}`,{
//       method:"DELETE",})
//     }catch (error){
//       console.log(error)
//     }
// }

export const addAlbum = async (newAlbum)=>{
    try{
        const res = await fetch('http://localhost:3000/api/albums',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newAlbum)
        })
        return res
    }catch(error){
        console.log(error)
    }
}

export const deleteAlbum = async (id)=>{
    try{
        const res = await fetch('http://localhost:3000/api/albums/'+id,{
            method:'DELETE'
        })
        return res
    }catch(error){
        console.log(error)
    }
}


export const rateAlbum = async (id,rate) => {
    // Send rate to backend here
    console.log('id:',id,' rate:',rate)
    try{
        const res = await fetch('http://localhost:3000/api/albums/rateAlbum',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({id:id,rate:rate})
        })
        return res
    }catch(error){
        console.log(error)
    }
};
  
// export const updateUser = async ({query,newUser})=>{
// try{
//     await fetch('http://localhost:3000/api/users/'+query.id,{
//         method:'PUT',
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body : JSON.stringify(newUser)
//     })
// }catch(error){
//     console.log(error)
// }
// }

export const getAlbums = async()=>{
    const res = await fetch("http://localhost:3000/api/albums")
    const data = await res.json()
    return data   
}

export const getSuggestions = async (preferences) => {
    // Send rate to backend here
    console.log('preferences:',preferences)
    try{
        const res = await fetch('http://localhost:3000/api/albums/getSuggestions',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({preferences:preferences})
        })
        const data = await res.json()
        return data   
    }catch(error){
        console.log(error)
    }
};