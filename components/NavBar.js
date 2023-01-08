import Link from "next/link"
import styles from '../styles/Navbar.module.css'
import { auth } from "config/client"
import useUser from "hooks/useUser"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { getUser } from "controllers/usersController"

export const NavBar =()=>{
    const user = useUser()
    const [userInfo,setUserInfo] = useState('')
    useEffect(()=>{
        async function getInfo(id){
            //console.log('User info',user.uid)
            const info = await getUser({id:id})
            setUserInfo(info)
            console.log('User info',userInfo)
            //console.log('Tipo: ', info.tipo==1?'user':'admin')
        }
        if(user){
           getInfo(user.uid)
           //console.log(user.uid)
        }
    },[user])

    function closeSession(){
        signOut(auth)
        setUserInfo('')
    }

    useEffect(()=>{
        if(!userInfo){
            console.log('info',userInfo)
        }
    },[userInfo])

    if(userInfo.role==='user'){
        return(<nav className={styles.navbar}>
            <ul>
                <Link href='/'>
                    <li>Home</li>
                </Link>
                <Link href='/public/suggestions'>
                    <li>For me</li>
                </Link>
                <Link href='/public/albums'>
                    <li>Albums</li>
                </Link>
                <button onClick={()=>{closeSession()} }  >
                        Cerrar Sesión
                </button> 
            </ul>
        </nav>)
    }else if(userInfo.role==='admin'){
        return(
        <nav className={styles.navbar}>
            <ul>
            <Link href='/'>
                <li>Home</li>
            </Link>
            <Link href='/admin/artists'>
                <li>Artistas</li>
            </Link>
            <Link href='/admin/albums'>
                <li>Albums</li>
            </Link>
            <Link href='/admin/albums/create'>
                <li>Crear album</li>
            </Link>  
            <button onClick={()=>{closeSession()} }  >
                Cerrar Sesión
            </button> 
            </ul>
        </nav>)
    }
    else{
        console.log('No hay usuario')
        return(
            <nav className={styles.navbar}>
            <ul>
            <Link href='/'>
                <li>Home</li>
            </Link>
            <Link href='/signin'>
                <li>Login</li>
            </Link>
            <Link href='/signup'>
                <li>Registrarse</li>
            </Link>
            </ul>
        </nav>
        )
    }
}