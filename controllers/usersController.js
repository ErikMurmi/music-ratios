const base_url=process.env.NEXT_PUBLIC_APIKEY

export const deleteUser = async(selectedUser)=>{
    try{
      await fetch(`${base_url}/users/${selectedUser._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const addUser = async (newUser)=>{
    try{
        await fetch(`${base_url}/users`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newUser)
        })
    }catch(error){
        console.log(error)
    }
  }
  
export const updateUser = async ({query,newUser})=>{
try{
    await fetch(`${base_url}/users/`+query.id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(newUser)
    })
}catch(error){
    console.log(error)
}
}

export const getUser = async(query)=>{
    console.log('la query es : ', query )
    const res = await fetch(`${base_url}/users/getById?id=${query.id}`)
    const data = await res.json()
    return data   
}
