const service_url=process.env.NEXT_PUBLIC_MAIL_SERVICE
const bk_service_url= process.env.NEXT_PUBLIC_MAIL_BK_SERVICE

export const sendEmail = async (email)=>{
    let res = null
    try{
        res = await fetch(`${service_url}/send-email`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email": email,
                "message": "Bienvenido a la familia"
            })
        })
        const data = await res.json()
        return res.status(200).json(data);
    }catch(error){
        
        if(error.message === "Failed to fetch"){
            console.log("Error 503");
            sendEmailBK(email)
        }else{
            console.log(error.message)
        }
    }
}  

export const sendEmailBK = async (email)=>{
    let res = null
    try{
        res = await fetch(`${bk_service_url}/send-email`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email": email,
                "message": "Bienvenido a la familia"
            })
        })
        const data = await res.json()
        return res.status(200).json(data);
    }catch(error){
        console.log(error.message)
        if(error.message === "Failed to fetch"){
            console.log("Error 503");
        }
    }
}  
