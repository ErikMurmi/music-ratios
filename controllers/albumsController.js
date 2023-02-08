const base_url=process.env.NEXT_PUBLIC_base_api_url

const service_url=process.env.NEXT_PUBLIC_MUSIC_SERVICE

export const addAlbum = async (newAlbum)=>{
    try{
        const res = await fetch(`${service_url}/albums`,{
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
        const res = await fetch(`${service_url}/albums/`+id,{
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
        const res = await fetch(`${base_url}/albums/rateAlbum`,{
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
    const res = await fetch(`${service_url}/albums`)
    const data = await res.json()
    return data   
}

export const getSuggestions = async (preferences) => {
    // Send rate to backend here
    console.log('preferences:',preferences)
    try{
        const res = await fetch(`${base_url}/albums/getSuggestions`,{
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