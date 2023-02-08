const base_url=process.env.NEXT_PUBLIC_base_api_url

const service_url=process.env.NEXT_PUBLIC_MUSIC_SERVICE

export const addArtist = async (newArtist)=>{
    try{
        const res = await fetch(`${service_url}/artists`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newArtist)
        })

        // const res = await fetch(`http://localhost:5000/artists`,{
        //     method:'POST',
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body : JSON.stringify(newArtist)
        // })
        // const data = res.json()
        return res.status(200).json(data);
    }catch(error){
        console.log(error)
    }
}  

export const deleteArtist = async (id)=>{
    try{
        const res = await fetch(`${service_url}/artists/`+id,{
            method:'DELETE'
        })
        return res.status(200).json({ok:true})
    }catch(error){
        console.log(error)
    }
}

export const getArtists = async()=>{
    const res = await fetch(`${service_url}/artists`)
    const data = await res.json()
    console.log('artist data', data)
    return data   
}
