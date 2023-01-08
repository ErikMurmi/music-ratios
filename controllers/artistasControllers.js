const base_url=process.env.NEXT_PUBLIC_base_api_url
export const addArtist = async (newArtist)=>{
    try{
        const res = await fetch(`${base_url}/artists`,{
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
        const res = await fetch(`${base_url}/artists/`+id,{
            method:'DELETE'
        })
        return res
    }catch(error){
        console.log(error)
    }
}

export const getArtists = async()=>{
    const res = await fetch(`${base_url}/artists`)
    const data = await res.json()
    console.log('artist data', data)
    return data   
}
